document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let email = document.querySelector("#email").value
    let password = document.querySelector("#password").value
    var raw = JSON.stringify({
        email, password
    });

    fetch("/api/users/login", {
        method: "POST",
        headers: myHeaders,
        body: raw
    })
        .then(res => res.json())
        .then(res => {
            res?.error ? document.location.replace("/") : document.location.replace("/dashboard")
        }).catch(err => document.location.replace("/"))
})
