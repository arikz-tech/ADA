const url = "https://ada-electric-shop.herokuapp.com";

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

$("#confirmButton").click(() => {});

$.post(url + "/profileFields", { email: getCookie("email") }).done(
  (data, status) => {
    $("#firstname").text(data.firstname);
    $("#lastname").text(data.lastname);
    $("#email").text(data.email);
    $("#phonenumber").text(data.phoneNumber);
    $("#country").text(data.Country);
    $("#city").text(data.city);
    $("#street").text(data.street);
    $("#zipcode").text(data.zipCode);

    $("#firstnameInput").val(data.firstname);
    $("#lastnameInput").val(data.lastname);
    $("#emailInput").val(data.email);
    $("#phoneNumberInput").val(data.phoneNumber);
    $("#countryInput").val(data.Country);
    $("#cityInput").val(data.city);
    $("#streetInput").val(data.street);
    $("#zipcode").val(data.zipCode);
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
