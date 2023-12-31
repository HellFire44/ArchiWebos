import { addPicture } from "./addPicture.js";
import { showImagesByCategory } from "./setupGallery.js";

export function DataModal() {
  const modalDialog = document.getElementById("modal");

  // Fermer le modal 
  const closebtn = document.createElement('button');
  closebtn.id = 'closemodal';
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-xmark");
  closebtn.appendChild(icon);
  modalDialog.appendChild(closebtn);

  // Titre du Modal 
  const title = document.createElement('h2');
  title.textContent = "Galerie photo";
  title.classList.add('titleModal');

  // Ajouter le titre à la modal
  modalDialog.appendChild(title);

  // Bouton "Ajouter une photo"
  const addButton = document.createElement('button');
  addButton.id = 'addPicture';
  addButton.textContent = 'Ajouter une photo';

  // Ajouter le bouton à la modal
  modalDialog.appendChild(addButton);

  // Barmodal 
  const paragraph = document.createElement("p");
  paragraph.classList.add('barmodal');
  modalDialog.appendChild(paragraph);

  // Création de la div .galleryModal
  const galleryDiv = document.createElement("div");
  galleryDiv.classList.add("galleryModal");

  fetch("http://localhost:5678/api/works") // API IMAGES
    .then(response => response.json())
    .then(images => {
      images.forEach(imageData => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = imageData.imageUrl;

        // Création de l'icône poubelle
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can");
        trashIcon.setAttribute('data-id', imageData.id); 
        trashIcon.style.color = "#ffffff";
        trashIcon.style.cursor = "pointer";

        // Ajouter un gestionnaire d'événements pour supprimer l'image au clic sur l'icône
        trashIcon.addEventListener("click", function () {
          // Supprimer l'élément de l'interface utilisateur
          figure.remove();
      
          // Obtenir l'ID de l'image à supprimer
          const workId = this.getAttribute('data-id');
      
          // Effectuer la requête DELETE vers l'API
          fetch(`http://localhost:5678/api/works/${workId}`, {
              method: 'DELETE',
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
              },
          })
          .then(response => {
              if (response.ok) {
                showImagesByCategory(null);
              } else {
                  console.error('Erreur lors de la suppression de l\'Image');
              }
          })
          .catch(error => {
              console.error('Il y a eu un problème avec l\'opération fetch:', error);
          });
      });

        figure.appendChild(img);
        figure.appendChild(trashIcon);
        galleryDiv.appendChild(figure);
      });

      // Ajouter la div .galleryModal à la modal
      modalDialog.appendChild(galleryDiv);

      // MODAL Ajout Photo
      addButton.addEventListener("click", function() {
        modalDialog.innerHTML = "";
        galleryDiv.innerHTML = ""; // Efface le contenu de la galerie d'images
        addPicture();
      });
      
      closebtn.addEventListener("click", function () {
        modalDialog.remove();
        modalDialog.style.display = "none";
        // window.location.reload();
      });
    })
    .catch(error => {
      console.error("Erreur lors du chargement des images : ", error);
    });
}
