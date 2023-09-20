document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let name = document.querySelector("#name").value
    let email = document.querySelector("#email").value
    let password = document.querySelector("#password").value
    var raw = JSON.stringify({
        name, email, password
    });

    fetch("/api/users/signup", {
        method: "POST",
        headers: myHeaders,
        body: raw
    })
        .then(res => res.json())
        .then(res => {
            document.location.replace("/dashboard")
        }).catch(err=>document.location.replace("/"))
})
