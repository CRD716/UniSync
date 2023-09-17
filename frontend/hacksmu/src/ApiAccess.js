import Login from "./Login.js"
import Modal from "./Modal.js"
function postData(code, data) {
  console.log(JSON.stringify({ roomCode: code, text: data }));
  const response = fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Specify the data format being sent
    },
    body: JSON.stringify({ roomCode: code, text: data }), // Send data in JSON format
  })
  .then(response => response.json())
  .then(data => {
    // Process the response data 
  })
  .catch(error => {
    // Handle errors
    console.log(error);
  });
}
export default postData;
