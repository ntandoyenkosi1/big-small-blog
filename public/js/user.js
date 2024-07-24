document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const receiverId = e.target.children[0].value;
  const senderId = e.target.children[1].value;
  const content = e.target.children[2].value;
  if (receiverId != senderId) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`/api/chat/${senderId}/${receiverId}`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ receiverId, senderId, content }),
    }).then((data) => {
      document.location.reload();
    });
  }
});
