export function DataModal() {

// Récupérez l'élément modal avec l'ID "modal"
const modalDialog = document.getElementById("modal");

// Créez un élément h1 avec le texte "test"
const title = document.createElement('h2');
title.textContent = "Galerie photo";

// Ajoutez l'élément title au modal
modalDialog.appendChild(title);


}