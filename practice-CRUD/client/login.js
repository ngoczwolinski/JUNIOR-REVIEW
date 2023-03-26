// we should only do DOM manipulation once the DOM has been fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => processData(e));
});

function processData(e) {
  // e.preventDefault();

  // grab the login values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // console.log(username);
  // console.log(password);
}
