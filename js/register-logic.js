const url = "http://localhost:8080";

$("#registerButton").click(() => {
  $("#register-msg").text("");


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
    if(data.is_pass==false){
      $("#register-msg").text(data.msg);
      return
    }

  });
});



