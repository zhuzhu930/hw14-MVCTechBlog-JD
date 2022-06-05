//const { response } = require("express");

const blogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogTitle').value.trim();
    const content = document.querySelector('#blogContent').value.trim();
    const author = document.querySelector('#blogAuthor').value.trim();
    const created_date = document.querySelector('#createdDate').value.trim();
  
    if (title && content && author && created_date) {
      const response = await fetch('/api/blog', {
        method: 'POST',
        body: JSON.stringify({ 
            title,
            content, 
            author,
            created_date,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        //?double check the redirect
        document.location.replace('/blogpage');
      } else {
        alert('Failed to create a blog');
      }
    }
  };
  
  document
    .querySelector('.blog-form')
    .addEventListener('submit', blogFormHandler);