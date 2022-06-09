const url = "http://localhost:8080";

$("#change-password-form").submit((e) => {
  e.preventDefault();
  const captcha = document.querySelector('#g-recaptcha-response').value;
  var emailInput = $("#emailInput").val();

  $.post(url + "/forgotPassword", { email: emailInput, captcha }).done((data) => {
    if(data.is_pass==false){
      $("#error-msg-label").text(data.message);
      return;
    }
    if(data.is_pass==true){
      alert(data.message)
      window.location.href = url+"/log-in"
    }
    return false
  });
});
