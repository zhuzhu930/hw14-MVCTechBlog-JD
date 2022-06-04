const { response } = require("express");

const blogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogTitle').value.trim();
    const content = document.querySelector('#blogContent').value.trim();
    const author = document.querySelector('#blogAuthor').value.trim();
    const created_date = document.querySelector('#createdDate').value.trim();
  
    if (title && content && author && created_date) {
      const response = await fetch('/api/user/blogPost', {
        method: 'POST',
        body: JSON.stringify({ 
            "title": response.title, 
            "content": response.content, 
            "author":response.author,
            "created_date": response.created_date
        }),
        // headers: { 'Content-Type': 'application/json' },
      });
    }
  };
  
  document
    .querySelector('.blog-form')
    .addEventListener('submit', blogFormHandler);