$("#changepass").click(() => {
  var passwordInput = $("#newpassword").val();
  var rePasswordInput = $("#confirmpassword").val();

  if (!passwordInput.match(password_regex)) {
    $("#error-msg-change-password").text(
      "Password must be at least 6 characters long and include at least 1 number"
    );
    return;
  }

  if (passwordInput != rePasswordInput) {
    $("#error-msg-change-password").text("Passwords doesn't match");
    return;
  }

  var parameters = {
    password: passwordInput,
    email: getCookie("email"),
  };

  $.post(url + "/updatePassword", parameters).done((data, status) => {});
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
