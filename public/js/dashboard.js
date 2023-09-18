document.querySelector("#edit").addEventListener("click", (e) => {
    document.location.replace(`/posts/edit/${e.target.dataset.id}`)
})
document.querySelector("#delete").addEventListener("click", (e) => {
    document.location.replace(`/posts/delete/${e.target.dataset.id}`)
})