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

  const delBlogHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  // fetch route is right, but can't have an id to identify the blog.
  // maybe move the delete button to the show blog page...
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        window.alert('This blog is deleted successfully!')
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
  };
  
//this 3 eventlisteners are not working for somereason.
  document
    .querySelector('.create-blog-form')
    .addEventListener('submit', createBlogHandler);

  document
    .querySelector('.edit-blog-form')
    .addEventListener('submit', editBlogHandler);

  document
    .querySelector('.blog-list')
    .addEventListener('submit', delBlogHandler);