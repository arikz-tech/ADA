const url = "https://ada-electric-shop.herokuapp.com";

$.post(url + "/profileFields", { email: getCookie("email") }).done(
  (data, status) => {
    alert(data + " " + status);
  }
);

$("#changepass").click(() => {
  var oldPasswordInput = $("#oldpassword").val();
  var passwordInput = $("#newpassword").val();
  var rePasswordInput = $("#confirmpassword").val();
  var password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/;

  if (!passwordInput.match(password_regex)) {
    $("#changePasswordLabel").text(
      "Password must be at least 6 characters long and include at least 1 number"
    );
    return;
  }

  if (passwordInput != rePasswordInput) {
    $("#changePasswordLabel").text("Passwords doesn't match");
    return;
  }

  var parameters = {
    password: passwordInput,
    oldPassword: oldPasswordInput,
    email: getCookie("email"),
  };

  $.post(url + "/updatePassword", parameters).done((data, status) => {
    $("#changePasswordLabel").text(data.message);
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
