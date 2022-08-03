let editProfile_btn = document.getElementById('editProfile')
let Fullname= document.getElementById('name')
let Skills= document.getElementById('skill')
let Tel= document.getElementById('tel')
let Address= document.getElementById('address')

const createProfileHandler = async () => {

  const fullname = Fullname.value.trim()
  const tel = Tel.value.trim();
  const skills = Skills.value.trim();
  const address = Address.value.trim();

  if (!fullname || !tel || !skills || !address) return alert("Provide Profile properties update your profile");

  const response = await fetch(`/api/profiles`, {
    method: "POST",
    body: JSON.stringify({fullname, tel, skills, address }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) return alert("Failed to update profile");

  document.location.replace("/dashboard");
};

// Event listeners
document
  .getElementById("submitForm")
  .addEventListener("click", createProfileHandler);

