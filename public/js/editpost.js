const editPostFormHandler = async (e) => {
    e.preventDefault();
    
        const title = document.getElementById('editpost-title').value;
        const blogpost_body = document.getElementById('editpost-content').value;
        // Grab the idea directly from the browser URL bar. 
        const id = window.location.toString().split('/')[
            window.location.toString().split('/').length -1
        ];

        const response = await fetch(`/api/posts/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                id: id, 
                title,
                blogpost_body
            }),
            headers: {
                'Content-type': 'application/json'
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('editposts Sucks');
        }

}

document.getElementById('edit-post-form').addEventListener('submit', editPostFormHandler);