const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#commentContent').value.trim();
  
    if (comment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment }),

        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/blog-page');
      } else {
        alert('Failed to post a comment');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);