const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#commentContent').value.trim();
  
    if (comment) {
      const response = await fetch('/api/user/comment', {
        method: 'POST',
        body: JSON.stringify({ comment }),
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
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);