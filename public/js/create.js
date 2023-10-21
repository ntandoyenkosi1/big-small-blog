document.querySelector("input[type=submit]").addEventListener("click", function () {
    let title = document.querySelector("#title").value
    let content = document.querySelector("#content").value
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ title, content });

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