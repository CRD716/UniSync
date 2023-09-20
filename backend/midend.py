from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import uuid

# Initialize the Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'  # SQLite database
# Initialize the SQLAlchemy database
db = SQLAlchemy(app)
CORS(app, support_credentials=True)

# Define the Room model for the database
class Room(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    data = db.Column(db.JSON)

# Function to create a new room and return its ID
def create_room():
    room_id = str(uuid.uuid4())
    room = Room(id=room_id, data={})
    db.session.add(room)
    db.session.commit()
    return room_id

# Sample data for demonstration purposes
sample_data = {
    "AAAAAA": {
        1: {
            "name": "john doe",
            "txt": "In the beginning God created the heavens and the earth."
        },
        2: {
            "name": "jane doe",
            "txt": "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters."
        }
    }
}

@app.route("/submit-text", methods=["POST"])
@cross_origin(supports_credentials=True)
def submittext():
    data = request.get_json()
    room_id = data['roomid']
    name = data['name']
    text = data['txt']

    # Check if the room exists in the database
    room = Room.query.get(room_id)
    if not room:
        # Create a new room if it doesn't exist
        room_id = create_room()
        room = Room.query.get(room_id)

    # Update the room data in the database
    room.data[name] = text
    db.session.commit()

    return jsonify(data), 201

@app.route("/getnotes/<roomid>", methods=["GET"])
def getnotes(roomid):
    room = Room.query.get(roomid)
    if not room:
        return "Invalid roomid", 404

    return jsonify(room.data), 200

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

# ...

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
