// const { response } = require("express");
//Create a blog
const createBlogHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogTitle').value.trim();
    const content = document.querySelector('#blogContent').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/blogs/create-blog', {
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

  //Edit a blog: 
  const editBlogHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogTitle').value.trim();
    const content = document.querySelector('#blogContent').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/blogs/:id/edit-blog', {
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
        alert('Failed to edit a blog');
      }
    }
  };
  
  document
    .querySelector('.create-blog-form')
    .addEventListener('click', createBlogHandler);

  document
    .querySelector('.edit-blog-form')
    .addEventListener('click', editBlogHandler);

  document.querySelector('.createBlogBtn').addEventListener('click', createBlogHandler);