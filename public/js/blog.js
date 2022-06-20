//Create a blog
const createBlogHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogTitle').value.trim();
    const content = document.querySelector('#blogContent').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/blogs/create', {
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
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  
    const response = await fetch(
        //check this route: 
        `/api/blogs/${id}/edit`, {
        //update a blog use PUT
        method: 'PUT',
        body: JSON.stringify({ 
            title,
            content, 
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText); 
      }
    };


  const delBlogHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  // fetch route is right, but can't have an id to identify the blog.
  // maybe move the delete button to the show blog page...
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          blog_id: id
        }), 
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        window.alert('This blog is deleted successfully!')
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
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
    .querySelector('#deleteBlogBtn')
    .addEventListener('submit', delBlogHandler);