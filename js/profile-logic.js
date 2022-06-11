const url = "https://ada-electric-shop.herokuapp.com";

$("#changepass").click(() => {
  var oldPasswordInput = $("#oldpassword").val();
  var passwordInput = $("#newpassword").val();
  var rePasswordInput = $("#confirmpassword").val();
  var password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/;
  alert("are you sure?");

  if (!passwordInput.match(password_regex)) {
    $("#error-msg-change-password").text(
      "Password must be at least 6 characters long and include at least 1 number"
    );
    alert("password regex problem");
    return;
  }

  if (passwordInput != rePasswordInput) {
    $("#error-msg-change-password").text("Passwords doesn't match");
    alert("password not match");
    return;
  }

  var parameters = {
    password: passwordInput,
    oldPassword: oldPasswordInput,
    email: getCookie("email"),
  };

  $.post(url + "/updatePassword", parameters).done((data, status) => {
    alert(
      "message: " +
        data.message +
        " is pass: " +
        data.is_pass +
        " status: " +
        status
    );
  });
});

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
