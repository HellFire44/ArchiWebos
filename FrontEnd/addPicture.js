
import { DataModal } from "./modal.js";
export function addPicture() {

    const modalDialog = document.getElementById("modal")

    //  Fermer le modal 
    const closebtn = document.createElement('button')
    closebtn.id = 'closemodal';
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-xmark");
    closebtn.appendChild(icon)
    modalDialog.appendChild(closebtn)

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

    // Barmodal
    const paragraph = document.createElement("p");
    paragraph.classList.add('barmodal');
    modalDialog.appendChild(paragraph);


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
    titleInput.name = 'imageTitle'

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

    modalDialog.appendChild(form)



    backModal.addEventListener("click", function () {
        modalDialog.innerHTML = "";

        DataModal()
    })




    // action close 
    closebtn.addEventListener("click", function () {
        modalDialog.close()
        window.location.reload()
    })
  }
  