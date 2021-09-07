/* A simple Register function allowing new users to
have an account on the website. This allows them to 
shop. */

let signbtn = document.querySelector(".signbtn");

function register() {
  let firstName = document.querySelector(".firstName").value;
  let lastName = document.querySelector(".lastName").value;
  let email = document.querySelector(".email").value;
  let username = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;
  console.log(firstName, lastName, email, username, password);

  fetch(`https://serene-sea-89440.herokuapp.com/get-user/${username}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (!data["user"]) {
        fetch("https://serene-sea-89440.herokuapp.com/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            username: username,
            password: password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if ((data["status_code"] = 201)) {
              console.log(data);
              myStorage = window.localStorage;
              myStorage.setItem("jwt-token", data["access_token"]);
              myStorage.setItem("username", username);
              myStorage.setItem("password", password);
              window.location.href = "./index.html";
            }
          });
      } else {
        window.location.href = "./login.html";
      }

      document.querySelector(".form2").addEventListener("submit", (e) => {
        e.preventDefault();
        register();
      });
    });
}
