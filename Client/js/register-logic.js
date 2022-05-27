$("#registerButton").click(() => {
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var email = $("#email").val();
  var password = $("#password").val();
  var repeatPassword = $("#repeatPassword").val();
  var promoCode = $("#promoCode").val();

  alert(firstName + lastName + email + password + repeatPassword);
});
