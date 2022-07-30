// Elements
const postTitle = document.querySelector("#title");
const postBody = document.querySelector("#content");

// Functions
const getPostID = () => document.location.toString().split("/").pop();

const getPostData = async () => {
  const response = await fetch(`/api/posts/${getPostID()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) return alert("Failed to get post");

  const postData = await response.json();
  postTitle.value = postData.title;
  postBody.value = postData.content;
};

const editPostHandler = async () => {
  const title = postTitle.value.trim();
  const content = postBody.value.trim();

  if (!title || !content) return alert("Provide post title and body update post");

  const response = await fetch(`/api/posts/${getPostID()}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) return alert("Failed to update post");

  document.location.replace("/dashboard");
};

const deletePostHandler = async () => {
  const response = await fetch(`/api/posts/${getPostID()}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) return alert("Failed to delete post");

  document.location.replace("/dashboard");
};

// Script execution
getPostData();

// Event listeners
document
  .querySelector("#btn-post-update")
  .addEventListener("click", editPostHandler);
document
  .querySelector("#btn-post-delete")
  .addEventListener("click", deletePostHandler);
