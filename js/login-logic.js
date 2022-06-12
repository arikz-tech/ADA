const url = "https://ada-electric-shop.herokuapp.com";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has("token")) {
  alert("User successfully created");
}

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
  const captcha = document.querySelector("#g-recaptcha-response").value;
  $.post(url + "/login", { loginUser, captcha }).done((data, status) => {
    var user = data.user;

    if (data.user === undefined) {
      grecaptcha.reset();
      $("#login-msg").text(data.message);
      return;
    }

    setCookie("connected", "true", 5);
    setCookie("email", user.email, 5);
    setCookie("firstname", user.firstname, 5);
    setCookie("lastname", user.lastname, 5);

    var isChecked = document.getElementById("customCheck").checked();
    alert(isChecked);

    if (isChecked) {
      setCookie("rememberme", true, 5);
    } else {
      setCookie("rememberme", false, 5);
    }

    window.location.href = url;
    return false;
  });
});
