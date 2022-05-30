const url = "localhost:8080";

$("#resetPasswordButton").click(() => {
  var emailInput = $("input#emailInput").val();

  console.log(emailInput);
  alert(emailInput + " ");

  /*
  $.post(url + "/forgotPassword", {
    email: emailInput,
  }).done((data) => {
    alert("Data Loaded:" + data);
  });
  */
});
