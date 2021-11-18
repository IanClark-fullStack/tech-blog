const addCommentFormHandler = async function(e) {
    e.preventDefault();
    const content = document.getElementById('comment-content').value.trim();
    // Get the post_id directly from the URL 
    const idArr = window.location.toString('/').split('/');
    const id = idArr.length-1;
    console.log(id)
    

    const response = await fetch('/api/comments', { // Where /api/posts/new === '/new'
        method: 'POST',
        body: JSON.stringify({ content, id }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.reload(); 
    }
}; 
document.getElementById('commentForm').addEventListener('submit', addCommentFormHandler);
