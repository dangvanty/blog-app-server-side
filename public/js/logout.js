const handleLogout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(response.statusText);
    return;
  }
  document.location.replace("/");
};

document.querySelector("#btn-logout").addEventListener("click", handleLogout);
