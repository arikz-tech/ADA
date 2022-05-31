const url = "http://localhost:8080";


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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

$("#login-form").submit((e) => {
  e.preventDefault();
  var loginUser = {
    email: $("#email").val(),
    password: $("#password").val(),
  };
  const captcha = document.querySelector('#g-recaptcha-response').value;
  $.post(url + "/login", { loginUser,captcha }).done((data, status) => {
    var user = data.user;
    if (data.user === undefined) {
      $("#login-msg").text(data.message)
      console.log(data.message);
      return;
    }
    setCookie("connected", "true", 5);
    setCookie("firstname", user.firstname, 5);
    setCookie("lastname", user.lastname, 5);
    window.location.href = url;
    return false
  });
});

