import 'Login.js'

fetch('https://example.com/api/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Specify the data format being sent
  },
  body: JSON.stringify({ roomCode: Login.roomCode, text: 'value2' }), // Send data in JSON format
})
.then(response => response.json())
.then(data => {
  // Process the response data 
})
.catch(error => {
  // Handle errors
});