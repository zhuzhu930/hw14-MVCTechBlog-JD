const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#commentContent').value.trim();
    const blog_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

  //need to define id: 
    if (comment) {
      const response = await fetch('/api/blogs/:id', {
        method: 'POST',
        body: JSON.stringify({ 
          comment, blog_id 
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to post a comment');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);