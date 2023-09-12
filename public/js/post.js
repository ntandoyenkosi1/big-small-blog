document.querySelector("#submit").addEventListener("click", function (e) {
    const comment = document.querySelector("input[type=text]").value
    console.log(comment)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "content": comment,
        "PostId": e.target.dataset.id,
        "UserId": 1
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3001/api/comments", requestOptions)
        .then(response => response.json())
        .then(result => {
            document.location.reload()
        })
        .catch(error => console.log('error', error));
})
function handleLike(event) {
    let id = event.target.id
    //fetch for liking a comment using the id
    var requestOptions = {
        method: 'PUT'
    };

    fetch(`http://localhost:3001/api/comments/${id}/like`, requestOptions)
        .then(response => response.json())
        .then(result => {
            document.location.reload()
        })
        .catch(error => console.log('error', error));
}
document.querySelectorAll("button").forEach((btn) => btn.addEventListener("click", handleLike))