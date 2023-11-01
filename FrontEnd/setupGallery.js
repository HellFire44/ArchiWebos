import { DataModal } from "./modal.js";


export function setupGallery() {

  const gallery = document.querySelector(".gallery");
  const filterContainer = document.querySelector(".container-filter");
  const allFilter = document.getElementById("all-filter");
  
  
  function showImagesByCategory(categoryId) {
      gallery.innerHTML = "";
      fetch("http://localhost:5678/api/works") // API IMAGES
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
      
      function getAuthToken() {
        return localStorage.getItem("authToken");
      }
      
      if (getAuthToken(true)) {
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


        const modal = document.querySelector("#modal")
        const closeBtn = document.querySelector("#closemodal")
        //  MODAL OUVERT 
        editButton.addEventListener("click", function () {

          modal.showModal()
          DataModal()
              });

        // MODAL FERMER
        closeBtn.addEventListener("click", function () {

          modal.close()
        });
        
        const logout = document.getElementById("logout");
        
        logout.innerHTML = "logout";
        
        logout.addEventListener("click", function() {
          localStorage.clear("authToken")
        } )
      } else {
  console.log("Compte Non-Connecté")
  fetch("http://localhost:5678/api/categories") // API CATEGORIES
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
  
 
  