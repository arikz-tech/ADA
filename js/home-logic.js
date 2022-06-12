const url = "https://ada-electric-shop.herokuapp.com";

window.onbeforeunload = function (e) {
  if (getCookie("rememberme") === "false") {
    setCookie("connected", "false", 5);
  }
};

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

if (getCookie("connected") === "false") {
  window.location.href = url + "/log-in";
} else {
  $("#homepageName").text(getCookie("firstname") + " " + getCookie("lastname"));
  $("#logoutButton").click(() => {
    setCookie("connected", "false", 5);
  });
}
