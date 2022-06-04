const blogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogTitle').value.trim();
    const content = document.querySelector('#blogContent').value.trim();
    const author = document.querySelector('#blogAuthor').value.trim();
  
    if (title && content && author) {
      const response = await fetch('/api/user/blogPost', {
        method: 'POST',
        body: JSON.stringify({ 
            "title": response.title, 
            "content": response.content, 
            "author":response.author}),
        // headers: { 'Content-Type': 'application/json' },
      });
  
    //   if (response.ok) {
    //     document.location.replace('/');
    //   } else {
    //     alert('Failed to log in');
    //   }
    }
  };
  
  document
    .querySelector('.blog-form')
    .addEventListener('submit', blogFormHandler);