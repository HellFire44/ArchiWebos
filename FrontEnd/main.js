document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    const filterContainer = document.querySelector(".container-filter");
    const allFilter = document.getElementById("all-filter");
  
    function showImagesByCategory(categoryId) {
      gallery.innerHTML = "";
        // API IMAGES 
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
  

    // API CATEGORIES
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
  });
  