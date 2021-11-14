const addPostFormHandler = async function(e) {
    e.preventDefault();
    const title = document.getElementById('newpost-title').value.trim();
    const post_body = document.getElementById('newpost-body').value.trim();

    const response = await fetch('/api/posts/add', { // Where /api/posts/new === '/new'
        method: 'POST',
        body: JSON.stringify({ title, post_body }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard'); 
    }
}; 
document.getElementById('newpost-form').addEventListener('submit', addPostFormHandler);
