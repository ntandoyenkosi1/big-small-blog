document.querySelector("button").addEventListener("click", function () {
    let title = document.querySelector("input[placeholder=title]").value
    let content = document.querySelector("input[placeholder=content]").value
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "title": title,
        "content": content,
        "UserId": 1
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    fetch("/api/posts", requestOptions)
        .then(response => response.json())
        .then(result => document.location.replace("/dashboard"))
        .catch(error => console.log('error', error));
})