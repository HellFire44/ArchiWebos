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

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(response => {
      if (response.ok) {
        console.log("Connexion réussie");
        // Après une connexion réussie, stockez le jeton dans un cookie
        setAuthToken("votre-token-ici");
        window.location.href = "./index.html";
      } else {
        console.error("Échec de la connexion");
        displayError(emailError, "Identifiants incorrects");
      }
    })
    .catch(error => {
      console.error("Erreur réseau :", error);
      displayError(emailError, "Erreur de connexion");
    });
}

loginForm.addEventListener("submit", handleLogin);

// Après une connexion réussie, stockez le jeton dans un cookie
function setAuthToken(token) {
  document.cookie = `authToken=${token}; path=/`;
}

// Récupérez le jeton à partir du cookie
function getAuthToken() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "authToken") {
      return value;
    }
  }
  return null;
}

// Vérifiez si l'utilisateur est connecté
 export function isUserLoggedIn() {
  const authToken = getAuthToken();
  return authToken !== null;
}
// Utilisation : après une connexion réussie, appelez setAuthToken(token)
