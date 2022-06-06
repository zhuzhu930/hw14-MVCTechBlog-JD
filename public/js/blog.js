//const { response } = require("express");

const blogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogTitle').value.trim();
    const content = document.querySelector('#blogContent').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({ 
            title,
            content, 
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        //?double check the redirect
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create a blog');
      }
    }
  };
  
  document
    .querySelector('.blog-form')
    .addEventListener('submit', blogFormHandler);