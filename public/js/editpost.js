const editPostFormHandler = async (e) => {
    e.preventDefault();
    try {
        const title = getElementById('editpost-title');
        const blogpost_body = getElementById('editpost-content');
        // Grab the idea directly from the browser URL bar. 
        const id = window.location.toString().split('/')[
            window.location.toString().split('/').length -1
        ];

        const response = await fetch(`/api/posts/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                blogpost_id: id, 
                title,
                blogpost_body
            }),
            headers: {
                'Content-type': 'application/json'
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        }
    } catch (err) {
        console.log(err);
    }

}

document.getElementById('edit-post-form').addEventListener('submit', editPostFormHandler);