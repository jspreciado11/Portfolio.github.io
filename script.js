const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();  // Prevent form from submitting normally

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Please wait...";  // Show a loading message

  // Send the data using the Web3Forms API
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: json,
  })
    .then(async (response) => {
      const jsonResponse = await response.json();
      if (response.status === 200) {
        result.innerHTML = "Form submitted successfully!";  // Success message
      } else {
        result.innerHTML = jsonResponse.message;  // Error message from Web3Forms
      }
    })
    .catch((error) => {
      console.error(error);
      result.innerHTML = "Something went wrong!";  // Error message in case of failure
    })
    .finally(() => {
      form.reset();  // Reset form after submission
      setTimeout(() => {
        result.style.display = "none";  // Hide the result message after 3 seconds
      }, 3000);
    });
});
