const url = "https://ada-electric-shop.herokuapp.com/";

$("#register-form").submit((e) => {
  e.preventDefault();
  const captcha = document.querySelector("#g-recaptcha-response").value;
  $("#register-msg").text("");

  user = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    repeatPassword: $("#repeatPassword").val(),
    promoCode: $("#promoCode").val(),
  };

  $.post(url + "/register", { user, captcha }).done((data) => {
    if (data.is_pass == false) {
      grecaptcha.reset();
      $("#register-msg").text(data.msg);
      return;
    } else if (data.is_pass == true) {
      alert(data.msg);
      window.location.href = url + "/log-in";
    }

    return false;
  });
});
