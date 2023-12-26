import { DataModal } from "./modal.js";

export function showImagesByCategory(categoryId) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(images => {
            images.forEach(imageData => {
                if (categoryId === null || imageData.category.id === categoryId) {
                    const figure = document.createElement("figure");
                    const img = document.createElement("img");
                    img.src = imageData.imageUrl;
                    const figcaption = document.createElement("figcaption");
                    figcaption.textContent = imageData.title;

                    figure.appendChild(img);
                    figure.appendChild(figcaption);
                    gallery.appendChild(figure);
                }
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des images : ", error);
        });
}

export function setupGallery() {
    const gallery = document.querySelector(".gallery");
    const filterContainer = document.querySelector(".container-filter");
    const allFilter = document.getElementById("all-filter");

    function getAuthToken() {
        return localStorage.getItem("authToken"); // true or false
    }

    if (getAuthToken()) {
        const toolbar = document.querySelector(".toolbar");
        const pToolbar = document.createElement('p');
        pToolbar.classList.add("edit-toolbar");

        const pIcon = document.createElement('i');
        pIcon.classList.add("fa-regular", "fa-pen-to-square");
        pToolbar.appendChild(pIcon);

        const textNode = document.createTextNode("Mode édition");
        pToolbar.appendChild(textNode);
        toolbar.appendChild(pToolbar);

        showImagesByCategory(null);
        filterContainer.innerHTML = "";

        const portfolioSection = document.getElementById("portfolio");
        const editButton = document.createElement('button');
        const icon = document.createElement('i');
        icon.classList.add("fa-regular", "fa-pen-to-square");
        const buttonText = document.createTextNode("Modifier");
        editButton.appendChild(icon);
        editButton.appendChild(buttonText);
        editButton.classList.add("edit-btn");
        const titleElement = portfolioSection.querySelector("h2");
        titleElement.appendChild(editButton);

        editButton.addEventListener("click", function () {
            const modal = document.querySelector('#modal');
            const body = document.querySelector('body');
            const main = body.querySelector('main');

            if (modal && !modal.open) {
                modal.showModal();
                modal.style.display = 'flex';
                DataModal();
            } else {
                const newModal = document.createElement('dialog');
                newModal.id = 'modal';
                newModal.style.display = 'flex';
                main.appendChild(newModal);
                newModal.open;
            }
        });

        const logout = document.getElementById("logout");
        logout.innerHTML = "logout";
        logout.href = "./index.html";
        logout.addEventListener("click", function() {
            localStorage.clear("authToken");
        });
    } else {
        console.log("Compte Non-Connecté");
        fetch("http://localhost:5678/api/categories")
            .then(response => response.json())
            .then(data => {
                data.forEach(categoryData => {
                    const p = document.createElement("p");
                    p.classList.add("filter");
                    p.textContent = categoryData.name;
                    p.addEventListener("click", () => {
                        if (p === allFilter) {
                            showImagesByCategory(null);
                        } else {
                            showImagesByCategory(categoryData.id);
                        }
                    });
                    filterContainer.appendChild(p);
                });
            })
            .catch(error => {
                console.error("Erreur lors du chargement des catégories depuis l'API : ", error);
            });

        allFilter.addEventListener("click", function() {
            showImagesByCategory(null);
        });

        showImagesByCategory(null);
    }
}
