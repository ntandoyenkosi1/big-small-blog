function handleLike(event){
 let id=event.target.id
 //fetch for liking a comment using the id
}
function handleRedirect(event){
    let id=event.target.id
    console.log(id);
    //fetch for redirecting to the post page
   }
document.querySelectorAll("button").forEach((btn)=>btn.addEventListener("click",handleLike))
document.querySelectorAll(".view").forEach((btn)=>btn.addEventListener("click",handleRedirect))