document.querySelectorAll("#edit").forEach((item) => item.addEventListener("click", (e) => {
    document.location.replace(`/posts/edit/${e.target.dataset.id}`)
}))
document.querySelectorAll("#delete").forEach((item) => item.addEventListener("click", (e) => {
    fetch(`/api/posts/${e.target.dataset.id}`, {method:"DELETE"})
        .then((res=>res.json()))
        .then((res)=>{
            document.location.replace(`/dashboard`)
        })
        .catch(err=>console.error(err))
}))