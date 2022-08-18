function success() {
  if (
    document.getElementById("username").value !== "" &&
    document.getElementById("password").value !== "" &&
    document.getElementById("fullname").value !== "" &&
    document.getElementById("tel").value !== "" &&
    document.getElementById("skill").value !== "" &&
    document.getElementById("address").value !== ""
  ) {
    document.getElementById("btn-create").disabled = false;
  }
}

$("#btn-create").on("click", () => {
  $.ajax({
    url: "/admin/users/create",
    method: "POST",
    data: {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      role:
        document.getElementById("roleAdmin").checked == true ? "admin" : "user",
      fullname: document.getElementById("fullname").value,
      tel: document.getElementById("tel").value,
      skill: document.getElementById("skill").value,
      address: document.getElementById("address").value,
    },
    dataType: "json",
    success: (data, success) => {
      if (success) {
        location.reload();
      }
    },
    error: () => {
      alert("create user failure!!!");
    },
  });
});

//delete user
let btn_delete = $("#btn-delete");
let user_id;
$("#deleteUser").on("show.bs.modal", function (event) {
  let button = $(event.relatedTarget);
  let id = button.data("id");
  user_id = id;
});

btn_delete.on("click", async () => {
  let user = {};
  return $.ajax({
    url: `/admin/users/${user_id}`,
    type: "DELETE",
    data: { user: user },
    dataType: "json",
    success: (data, success) => {
      if (data.success) {
        window.location.href = "/admin";
      }
    },
  });
});

// get edit user
// edit
let editusername = document.getElementById("editusername");
let editfullname = document.getElementById("editfullname");
let edittel = document.getElementById("edittel");
let editskill = document.getElementById("editskill");
let editaddress = document.getElementById("editaddress");
let editroleAdmin = document.getElementById("editroleAdmin");
let editroleUser = document.getElementById("editroleUser");

$("#editUser").on("show.bs.modal", function (event) {
  let button = $(event.relatedTarget);
  let id = button.data("id");
  user_id = id;

  $.ajax({
    url: `/admin/users/${user_id}`,
    method: "get",
    success: function (response) {
      editusername.value = response.userEdit.username;
      editfullname.value = response.userEdit.profile.fullname;
      edittel.value = response.userEdit.profile.tel;
      editskill.value = response.userEdit.profile.skills;
      editaddress.value = response.userEdit.profile.address;
      if (response.userEdit.role === "admin") {
        editroleAdmin.checked = true;
      } else {
        editroleUser.checked = true;
      }
    },
    error: (error) => {
      console.log(error);
    },
  });
});

//update user:
let acceptUpdate = $("#acceptUpdate");

acceptUpdate.on("click", async () => {
  return $.ajax({
    url: `/admin/users/${user_id}`,
    type: "PUT",
    dataType: "json",
    data: {
      username: editusername.value,
      role:
      editroleAdmin.checked == true ? "admin" : "user",
      fullname: editfullname.value,
      tel: edittel.value,
      skill: editskill.value,
      address: editaddress.value,
    }
  }).done(()=>{
    location.reload()
  })
});
