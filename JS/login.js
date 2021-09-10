/* A simple login function allowing user to enter 
their credentials. These credentials will be checked 
if it exists within the database. If they exist they
will be redirected back to home page with a token allowing
them to shop. */

// sending info to database to be validated.
/*existing accounts will be redirected and have a
token provided to them during their stay*/

function login() {
  let username = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;
  console.log(username, password);
  fetch("https://serene-sea-89440.herokuapp.com/auth", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["access_token"]) {
        fetch(`https://serene-sea-89440.herokuapp.com/get-user/${username}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `jwt ${window.localStorage["jwt-token"]}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            window.localStorage["user-id"] = data.user[0];
            var user_id = data.user[0];
            console.log(data);
            myStorage = window.localStorage;
            myStorage.setItem("user_id", user_id);

            myStorage.setItem("username", username);
            window.location = "./index.html";
          });
        myStorage = window.localStorage;
        myStorage.setItem("jwt-token", data["access_token"]);
      }
    });
}

document.querySelector(".form1").addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});
