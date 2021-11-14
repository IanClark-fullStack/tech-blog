// const signupFormHandler = async function(e) {
//     e.preventDefault();
//     const newPostTitle = document.getElementById('newpost-title').value.trim();
//     const newPostBody = document.getElementById('newpost-body').value.trim();

//     const response = await fetch('/api/posts/new', { // Where /api/posts/new === '/new'
//         method: 'POST',
//         body: JSON.stringify({ newPostTitle, newPostBody }),
//         headers: { 'Content-Type': 'application/json' },
//     });
//     if (response.ok) {
//         document.location('/dashboard'); 
//     }
// }; 
// document.getElementById('newpost-form').addEventListener('submit', signupFormHandler);
