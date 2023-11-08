import { DataModal } from "./modal.js";

export function addPicture() {
    const modalDialog = document.getElementById("modal");

    
    // Bouton Fermer le modal 
    const closebtn = document.createElement('button');
    closebtn.id = 'closemodal';
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-xmark");
    closebtn.appendChild(icon);
    modalDialog.appendChild(closebtn);

    // Bouton Retour 
    const backModal = document.createElement("button");
    backModal.id = 'backmodal';
    const iconBack = document.createElement('i');
    iconBack.classList.add("fa-solid", "fa-arrow-left");
    backModal.appendChild(iconBack);
    modalDialog.appendChild(backModal);

    // Titre du modal 
    const title = document.createElement('h2');
    title.textContent = "Ajout photo";
    title.classList.add('titleModal');
    modalDialog.appendChild(title);

    // Créer une section pour le glisser-déposer d'image (rectangle bleu pale)
    const imageUploadSection = document.createElement("div");
    imageUploadSection.classList.add("image-upload-section");
    modalDialog.appendChild(imageUploadSection);

    // Bouton + Ajouter photo
    const addPhotoButton = document.createElement('button');
    addPhotoButton.textContent = "+ Ajouter photo";
    addPhotoButton.classList.add('add-photo-button');
    imageUploadSection.appendChild(addPhotoButton);

    // Message de format d'image et limite de taille
    const imageMessage = document.createElement('p');
    imageMessage.textContent = "jpg, png : 4mo max";
    imageUploadSection.appendChild(imageMessage);

    // Créer un élément pour le glisser-déposer de l'image
    const imageUpload = document.createElement("input");
    imageUpload.type = "file";
    imageUpload.accept = ".jpg, .png"; // Autoriser uniquement les fichiers jpg et png
    imageUpload.classList.add("image-upload-input");
    imageUpload.style.display = "none"; // Masquer l'élément de téléchargement par défaut
    imageUploadSection.appendChild(imageUpload);

    // Gérez les événements de glisser-déposer
    imageUploadSection.addEventListener("click", function () {
        imageUpload.click();
    });

    imageUpload.addEventListener("change", function () {
        const selectedFile = imageUpload.files[0];
        if (selectedFile) {
            // Vérifiez le format et la taille du fichier ici
            if (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png") {
                if (selectedFile.size <= 4 * 1024 * 1024) {
                    // Le fichier est valide, traitez-le ici, par exemple, affichez un aperçu de l'image
                    const imagePreview = document.createElement("img");
                    imagePreview.classList.add("image-preview");
                    imagePreview.src = URL.createObjectURL(selectedFile);
                    imageUploadSection.appendChild(imagePreview);
                } else {
                    alert("La taille du fichier dépasse la limite de 4 Mo.");
                }
            } else {
                alert("Format de fichier non pris en charge. Utilisez uniquement jpg ou png.");
            }
        }
    });

    // Reste du contenu de votre modal (bouton Valider, etc.)


    // Formulaire 
    const form = document.createElement('form');
    form.action = "#";
    form.method = "post";

    // Titre label
    const titleLabel = document.createElement("label");
    titleLabel.for = "name";
    titleLabel.textContent = "Titre";

    // Titre Input
    const titleInput = document.createElement("input");
    titleInput.type = 'text';
    titleInput.name = 'imageTitle';

    titleLabel.appendChild(titleInput);
    form.appendChild(titleLabel);

    // Catégorie label
    const categoryLabel = document.createElement("label");
    categoryLabel.textContent = "Catégorie";

    const categorySelect = document.createElement("select");
    categorySelect.id = "category-choices";
    categorySelect.name = "category";

    // Créer des options pour les choix prédéfinis
    const categoryOption1 = document.createElement("option");
    categoryOption1.value = "1";
    categoryOption1.textContent = "Objets";

    const categoryOption2 = document.createElement("option");
    categoryOption2.value = "2";
    categoryOption2.textContent = "Appartements";

    const categoryOption3 = document.createElement("option");
    categoryOption3.value = "3";
    categoryOption3.textContent = "Hotels & restaurants";

    // Ajouter les options au select
    categorySelect.appendChild(categoryOption1);
    categorySelect.appendChild(categoryOption2);
    categorySelect.appendChild(categoryOption3);

    categoryLabel.appendChild(categorySelect);
    form.appendChild(categoryLabel);

    modalDialog.appendChild(form);

    backModal.addEventListener("click", function () {
        modalDialog.innerHTML = "";
        DataModal();
    });

    // action close 
    closebtn.addEventListener("click", function () {
        modalDialog.close();
        window.location.reload();
    });
}
