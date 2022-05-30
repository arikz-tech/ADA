const url = "http://localhost:8080";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

$("#updateButton").click(() => {
  var passwordInput = $("#passwordInput").val();
  var rePasswordInput = $("#rePasswordInput").val();

  if (passwordInput != rePasswordInput) {
    return;
  }

  var parameters = {
    password: passwordInput,
    token: urlParams.get("token"),
  };

  $.post(url + "/updatePassword", parameters).done((data, status) => {});
});
