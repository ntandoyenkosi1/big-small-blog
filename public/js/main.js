document.querySelector(".icon").addEventListener("click", () => {
    let nav = document.querySelector(".main-list")
    nav.style.display = "flex"
    let icon = document.querySelector(".icon")
    nav.prepend(icon)
    nav.style.backgroundColor = "white"
    nav.style.flexDirection = "column"
    nav.style.position = "absolute"
    nav.style.right = "0px"
    nav.style.top = "0px"
    nav.style.width = "70vw"
    nav.style.height = "50vh"
    nav.style.alignItems = "flex-end"
    nav.style.padding="30px"
    nav.style.boxShadow="grey -15px 13px 11px 0px"
    if (icon.getAttribute("expanded") == "true") {
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
        class="bi bi-list" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
    </svg>`
    icon.removeAttribute("expanded")
    document.querySelector(".main").append(icon)
    nav.style.display = "none"
    return
    }
    icon.setAttribute("expanded", true)
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
  </svg>`
    // display: flex;
    // background-color: white;
    // flex-direction: column;
    // position: absolute;
    // right: 0;
    // top: 0;
    // width: 80vw;
    // height: 50vh;
})