const loginForm = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");


function displayError(element, message) {
  element.textContent = message;
}

function clearErrors() {
  emailError.textContent = "";
  passwordError.textContent = "";
}

function validateForm() {
  clearErrors();

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    if (!email) displayError(emailError, "Champ requis");
    if (!password) displayError(passwordError, "Champ requis");
    return false;
  }

  return true;
}

function handleLogin(event) {
  event.preventDefault();
  if (!validateForm()) return;

  const email = emailInput.value;
  const password = passwordInput.value;
// Requête qui reçoit le mail 
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => response.json())
    .then(data => {
        console.log("Connexion réussie");
        // Enregistre le token dans le local storage
        setAuthToken(data.token);
        console.log(data.token);
        window.location.href = "./index.html";
    })
    .catch(error => {
      console.error("Erreur réseau :", error);
      displayError(emailError, "Erreur de connexion");
    });
}

loginForm.addEventListener("submit", handleLogin);

function setAuthToken(token) {
  localStorage.setItem("authToken", token);
}
function getAuthToken() {
  return localStorage.getItem("authToken");
}
