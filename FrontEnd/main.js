document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.querySelector(".gallery");
    fetch("http://localhost:5678/api/works/")
    .then(response => response.json())
    .then(data => {
        data.forEach(imageData => {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            img.src = imageData.imageUrl;
            const figcaption = document.createElement("figcaption");
            figcaption.textContent = imageData.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        });
    })
    .catch(error => {
        console.error("Une erreur s'est produite lors du chargement des images depuis l'API : ", error);
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const filter = document.querySelector(".container-filter");
    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
        data.forEach(filterData => {
            const p = document.createElement("p");
            p.classList.add("filter");
            p.textContent = filterData.name;

            filter.appendChild(p);
        })
    })
})








