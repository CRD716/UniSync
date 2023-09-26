from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import uuid
from flask_migrate import Migrate

# Initialize the Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Initialize the SQLAlchemy database
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app, support_credentials=True)

# Define the Room model for the database
class Room(db.Model):
    id = db.Column(db.String(36), primary_key=True)  # Room ID
    notes = db.relationship('Note', backref='room', lazy=True)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255))
    room_id = db.Column(db.String(36), db.ForeignKey('room.id'), nullable=False)

# Function to create a new room and return its ID
def create_room():
    room_id = str(uuid.uuid4())
    room = Room(id=room_id, data={})
    db.session.add(room)
    db.session.commit()
    return room_id

# Sample data for demonstration purposes

@app.route("/submit-text", methods=["POST"])
@cross_origin(supports_credentials=True)
def submittext():
    data = request.get_json()
    room_id = data['roomid']
    text = data['text']

    # Check if the room exists in the database
    room = Room.query.get(room_id)
    if not room:
        # Create a new room if it doesn't exist
        room = Room(id=room_id)
        db.session.add(room)

    # Create a new note and associate it with the room
    note = Note(text=text, room_id=room_id)
    db.session.add(note)
    db.session.commit()

    return jsonify(data), 201
@app.route("/get-rooms", methods=["GET"])
def get_rooms():
    # Query all rooms from the database
    rooms = Room.query.all()

    # Create a list to store room data
    room_data = []

    # Loop through the rooms and extract relevant information
    for room in rooms:
        # Retrieve notes (messages) associated with the room
        notes = Note.query.filter_by(room_id=room.id).all()
        notes_data = [{"text": note.text} for note in notes]

        room_data.append({
            "id": room.id,
            "notes": notes_data
        })

    return jsonify(room_data), 200
@app.route("/get-room/<roomid>", methods=["GET"])
def get_room(roomid):
    room = Room.query.get(roomid)
    if not room:
        return "Invalid roomid", 404

    return jsonify({"room_id": room.id, "room_data": room.data}), 200

@app.route("/get-notes/<roomid>", methods=["GET"])
def get_notes(roomid):
    room = Room.query.get(roomid)
    if not room:
        return "Invalid roomid", 404

    # Retrieve notes associated with the room using the 'notes' relationship
    notes = room.notes

    # Convert notes to a list of dictionaries
    notes_data = [{"text": note.text} for note in notes]

    return jsonify(notes_data), 200

@app.route("/deletenote/<roomid>/<noteid>", methods=["DELETE"])
def deletenote(roomid, noteid):
    room = Room.query.get(roomid)
    if not room:
        return "Invalid roomid", 404

    if noteid in room.data:
        del room.data[noteid]
        db.session.commit()
        return "Note " + noteid + " deleted", 200
    else:
        return "Note " + noteid + " not found in room", 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
