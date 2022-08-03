let btnDeleteComent = document.getElementById('deleteCmt')
let idComent=btnDeleteComent.getAttribute('data-id')
let idPost=btnDeleteComent.getAttribute('data-post')

const deletePostHandler = async () => {
  const response = await fetch(`/api/comments/${idComent}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) return alert("Failed to delete comments");

  document.location.replace(`/post/${idPost}`);
};


document
  .querySelector("#deleteCmt")
  .addEventListener("click", deletePostHandler);

