document.querySelector("#submit").addEventListener("click", function (e) {
    const comment = document.querySelector("input[type=text]").value
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