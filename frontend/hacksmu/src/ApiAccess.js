import Login from "./Login.js"
import Modal from "./Modal.js"
function postData(nam, code, data) {
  console.log(JSON.stringify({name: nam, roomid: code, txt: data }));
  const response = fetch(' https://termite-working-logically.ngrok-free.app/submit-text', {
    method: 'POST',
    mode: 'no-cors',
    /*
    headers: {
      'Content-Type': 'application/json', // Specify the data format being sent
    },*/
    body: JSON.stringify({name: nam, roomid: code, txt: data }), // Send data in JSON format
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
