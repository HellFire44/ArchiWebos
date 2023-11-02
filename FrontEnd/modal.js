export function DataModal() {
    const galleryModal = document.querySelector(".galleryModal");
    const modalDialog = document.getElementById("modal");
  
    // Création du titre avec la classe titleModal
    const title = document.createElement('h2');
    title.textContent = "Galerie photo";
    title.classList.add('titleModal'); 
  
    // Ajouter le titre à la modal
    modalDialog.appendChild(title);
  
    // Création du bouton "Ajouter une photo"
    const addButton = document.createElement('button');
    addButton.id = 'addPicture';
    addButton.textContent = 'Ajouter une photo';
  
    // Ajouter le bouton "Ajouter une photo" à la modal
    modalDialog.appendChild(addButton);
  
    // Création de la balise <p> avec la class "barmodal"
    const paragraph = document.createElement('p');
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
  
          figure.appendChild(img);
          galleryDiv.appendChild(figure);
        });
  
        // Ajouter la div .galleryModal à la modal
        modalDialog.appendChild(galleryDiv);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des images : ", error);
      });
  }
  