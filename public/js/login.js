const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username_login').value.trim();
  const password = document.querySelector('#password_login').value.trim();

  if (username && password) {
    // send a Post request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
      window.alert(`You're now logged in!`);
    } else {
      alert('Failed to log in');
    }
  }
};
//Sign up is working.
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username_signup').value.trim();
  const password = document.querySelector('#password_signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),

      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      //check the redirect part
      document.location.replace('/dashboard');
      window.alert(`You're now signed up!`);
    } else {
      alert('Failed to sign up!');
    }
  }
};


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
