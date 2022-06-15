const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#commentContent').value.trim();
  //need to define id: 
    if (comment) {
      const response = await fetch('/blogs/:id', {
        method: 'POST',
        body: JSON.stringify({ comment }),

        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/blogs/:id');
      } else {
        alert('Failed to post a comment');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);