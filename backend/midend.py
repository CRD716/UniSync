export function postData(nam, code, data) {
  console.log(JSON.stringify({ name: nam, roomid: code, txt: data }));
  const response = fetch('http://localhost:5000/submit-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ name: nam, roomid: code, text: data }),
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

// Function to get notes data
export function getNotesData(roomId) {
  return fetch(`http://localhost:5000/get-notes/${roomId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then(response => response.json())
    .then(data => {
      // Process the retrieved notes data
      return data;
    })
    .catch(error => {
      // Handle errors
      console.log(error);
      return [];
    });
}
