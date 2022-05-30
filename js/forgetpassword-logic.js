const url = "http://localhost:8080";

$("#resetPasswordButton").click(() => {
  var emailInput = $("#emailInput").val();

  $.post(url + "/forgotPassword", {
    email: emailInput,
  }).done((data) => {
    alert("Data Loaded:" + data);
  });
});
