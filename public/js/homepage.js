function handleLike(event) {
    let id = event.target.id
    //fetch for liking a comment using the id
    var requestOptions = {
        method: 'PUT'
    };

    fetch(`http://localhost:3001/api/posts/${id}/like`, requestOptions)
        .then(response => response.json())
        .then(result => {
            document.location.reload()
        })
        .catch(error => console.log('error', error));
}
function handleRedirect(event) {
    let id = event.target.dataset.id
    //fetch for redirecting to the post page
    document.location.replace(`/posts/${id}`)
}
document.querySelectorAll("button").forEach((btn) => btn.addEventListener("click", handleLike))
document.querySelectorAll(".view").forEach((btn) => btn.addEventListener("click", handleRedirect))