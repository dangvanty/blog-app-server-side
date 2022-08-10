// Functions
const getPostID = () => document.location.toString().split("/").pop();

const newCommentHandler = async (event) => {
  event.preventDefault();

  const message = document.querySelector("#comment").value.trim();

  if (!message) return alert("Provide comment message to post");

  const response = await fetch("/api/comments/", {
    method: "POST",
    body: JSON.stringify({ message, post_id: getPostID() }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) return alert("Failed to publish comment");

  document.location.reload();
};

// Event listeners
document
  .querySelector("#form-comment")
  .addEventListener("submit", newCommentHandler);
