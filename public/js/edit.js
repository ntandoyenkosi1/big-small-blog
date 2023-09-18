document.querySelector("button").addEventListener("click", function (e) {
    let title = document.querySelector("input[placeholder=title]").value
    let content = document.querySelector("input[placeholder=content]").value
    let id=e.target.id
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "title": title,
        "content": content
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw
    };
    fetch(`/api/posts/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => document.location.replace("/dashboard"))
        .catch(error => console.log('error', error));
})