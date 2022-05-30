const url = "http://localhost:8080";

$("#registerButton").click(() => {
  user = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    repeatPassword: $("#repeatPassword").val(),
    promoCode: $("#promoCode").val(),
  };

  $.post(url + "/register", {
    user,
  }).done((data) => {
    alert("Data Loaded:" + data);
  });
});
