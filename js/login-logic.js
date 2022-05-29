$("#loginButton").click(() => {
  var loginUser = {
    email: $("#email").val(),
    password: $("#password").val(),
  };

  $.post("http://localhost:8080/login", { loginUser }).done((data, status) => {
    console.log(data.user);
  });
});
