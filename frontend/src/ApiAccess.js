function postData(nam, code, data) {
  console.log(JSON.stringify({name: nam, roomid: code, txt: data }));
  const response = fetch('http://localhost:5000/submit-text', { // Update the URL to your local server address
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin':'*'
      // Specify the data format being sent
    },
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
