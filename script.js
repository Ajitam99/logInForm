"use strict";

const containerLogIn = document.querySelector(".containerLogIn");
const containerLogOut = document.querySelector(".containerLogOut");
const btnLogIn = document.querySelector(".btn-log-in");
const btnLogOut = document.querySelector(".btn-log-out");
const btn = document.querySelector(".btn");
const username = document.getElementById("email");
const password = document.getElementById("pass");
const welcomePage = document.querySelector(".welcome");

let userPas = { username, password };
let returnedData;
let welcomeBackMessage = "";
// test123
btn.addEventListener("click", function (e) {
  e.preventDefault();

  userPas.username = username.value;
  userPas.password = password.value;

  const sendJSON = async function () {
    try {
      const fetchPro = fetch(
        "https://api.getcountapp.com/api/v1/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userPas),
        }
      );
      const res = await fetchPro;
      const data = await res.json();

      if (!res.ok) throw new Error("Incorrect username or password.");

      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("client", data.client.name);
      welcomePage.innerHTML = `Welcome back ${data.client.name}`;
    } catch (err) {
      alert(err);
    }
  };

  sendJSON();

  if (localStorage.token) {
    containerLogIn.classList.add("hidden");
    containerLogOut.classList.remove("hidden");
  }
  console.log(localStorage);

  //if (localStorage.token) window.location.reload();
});

if (localStorage.token) {
  containerLogOut.classList.remove("hidden");
  containerLogIn.classList.add("hidden");
}

btnLogOut.addEventListener("click", function name() {
  localStorage.clear("token");

  containerLogOut.classList.add("hidden");
  containerLogIn.classList.remove("hidden");
  username.value = "";
  password.value = "";
});
welcomePage.innerHTML = `Welcome back ${localStorage.getItem("client")}`;
