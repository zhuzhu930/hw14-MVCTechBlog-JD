const logout = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    //this part is not right, fix it.
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);
