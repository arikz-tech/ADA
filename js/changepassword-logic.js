const url = "https://ada-electric-shop.herokuapp.com";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/;

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

$("#updateButton").click(() => {
  var passwordInput = $("#passwordInput").val();
  var rePasswordInput = $("#rePasswordInput").val();

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
    token: urlParams.get("token"),
  };

  $.post(url + "/forgotPasswordUpdate", parameters).done((data, status) => {
    $("#passwordInput").hide();
    $("#rePasswordInput").hide();
    $("#updateButton").hide();
    $("#title").text("Password has changed");
    $("#error-msg-change-password").text("");
    delay(2000).then(() => {
      window.location.href = url + "/log-in";
    });
  });
});
