const url = "https://ada-electric-shop.herokuapp.com";

if (getCookie("connected") === "false") {
  window.location.href = url + "/log-in";
} else {
  $("#homepageName").text(getCookie("firstname") + " " + getCookie("lastname"));
  $("#logoutButton").click(() => {
    setCookie("connected", "false", 5);
  });
}

$("#firstnameInput").hide();
$("#lastnameInput").hide();
$("#emailInput").hide();
$("#phoneNumberInput").hide();
$("#countryInput").hide();
$("#cityInput").hide();
$("#streetInput").hide();
$("#zipcodeInput").hide();
$("#confirmButton").hide();
$("#updateButton").show();

$("#updateButton").click(() => {
  $("#firstnameInput").show();
  $("#lastnameInput").show();
  $("#emailInput").show();
  $("#phoneNumberInput").show();
  $("#countryInput").show();
  $("#cityInput").show();
  $("#streetInput").show();
  $("#zipcodeInput").show();
  $("#confirmButton").show();
  $("#updateButton").hide();
  $("#firstname").hide();
  $("#lastname").hide();
  $("#email").hide();
  $("#phonenumber").hide();
  $("#country").hide();
  $("#city").hide();
  $("#street").hide();
  $("#zipcode").hide();
});

$("#confirmButton").click(() => {
  profileFields = {
    firstname: $("#firstnameInput").val(),
    lastname: $("#lastnameInput").val(),
    email: $("#emailInput").val(),
    phonenumber: $("#phoneNumberInput").val(),
    country: $("#countryInput").val(),
    city: $("#cityInput").val(),
    street: $("#streetInput").val(),
    zipcode: $("#zipcodeInput").val(),
  };
  var connectedEmail = getCookie("email");
  $.post(url + "/profileUpdate", { profileFields, connectedEmail }).done(
    (data, status) => {
      if (data.emailChanged) {
        alert("Changing mail, require to re-login");
        setCookie("connected", "false", 5);
        window.location.href = url + "/log-in";
      }
      $.post(url + "/profileFields", { email: getCookie("email") }).done(
        (data, status) => {
          $("#firstname").text(data.firstname);
          $("#lastname").text(data.lastname);
          $("#email").text(data.email);
          $("#phonenumber").text(data.phonenumber);
          $("#country").text(data.country);
          $("#city").text(data.city);
          $("#street").text(data.street);
          $("#zipcode").text(data.zipcode);

          $("#firstnameInput").val(data.firstname);
          $("#lastnameInput").val(data.lastname);
          $("#emailInput").val(data.email);
          $("#phoneNumberInput").val(data.phonenumber);
          $("#countryInput").val(data.country);
          $("#cityInput").val(data.city);
          $("#streetInput").val(data.street);
          $("#zipcodeInput").val(data.zipcode);
          $("#firstnameInput").hide();
          $("#lastnameInput").hide();
          $("#emailInput").hide();
          $("#phoneNumberInput").hide();
          $("#countryInput").hide();
          $("#cityInput").hide();
          $("#streetInput").hide();
          $("#zipcodeInput").hide();
          $("#confirmButton").hide();
          $("#updateButton").show();
          $("#firstname").show();
          $("#lastname").show();
          $("#email").show();
          $("#phonenumber").show();
          $("#country").show();
          $("#city").show();
          $("#street").show();
          $("#zipcode").show();
        }
      );
    }
  );
});

$.post(url + "/profileFields", { email: getCookie("email") }).done(
  (data, status) => {
    $("#firstname").text(data.firstname);
    $("#lastname").text(data.lastname);
    $("#email").text(data.email);
    $("#phonenumber").text(data.phonenumber);
    $("#country").text(data.country);
    $("#city").text(data.city);
    $("#street").text(data.street);
    $("#zipcode").text(data.zipcode);

    $("#firstnameInput").val(data.firstname);
    $("#lastnameInput").val(data.lastname);
    $("#emailInput").val(data.email);
    $("#phoneNumberInput").val(data.phonenumber);
    $("#countryInput").val(data.country);
    $("#cityInput").val(data.city);
    $("#streetInput").val(data.street);
    $("#zipcode").val(data.zipcode);
  }
);

$("#changepass").click(() => {
  var oldPasswordInput = $("#oldpassword").val();
  var passwordInput = $("#newpassword").val();
  var rePasswordInput = $("#confirmpassword").val();
  var password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/;

  if (!passwordInput.match(password_regex)) {
    $("#changePasswordLabel").text(
      "Password must be at least 6 characters long and include at least 1 number"
    );
    return;
  }

  if (passwordInput != rePasswordInput) {
    $("#changePasswordLabel").text("Passwords doesn't match");
    return;
  }

  var parameters = {
    password: passwordInput,
    oldPassword: oldPasswordInput,
    email: getCookie("email"),
  };

  $.post(url + "/updatePassword", parameters).done((data, status) => {
    $("#changePasswordLabel").text(data.message);
  });
});

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

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
