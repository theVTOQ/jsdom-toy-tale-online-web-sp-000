let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const addToyForm = document.querySelector(".add-toy-form");
  addToyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createNewToyWithFetch(name, img);
  });

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(objects => renderToys(objects))
  .catch(error => alert(error.message));

  function renderToys(toys){
    for(let toy in toys) {
      console.log(`renderToys: 1.${toy[0]} 2.${toy[0]}`);
//      const toy = fetchIndividualToy(toyId);

      toyFormContainer.appendChild(createToyCard(toy));
    }
  }

  function createToyCard(toy){
    const newToyDiv = document.createElement("div");
    newToyDiv.className = "card";

    const toyHeading = document.createElement("h2");
    toyHeading.innerHTML = toy.name;

    const toyImg = document.createElement("img");
    console.log(toy["image"]);
    toyImg.src = toy.image;
    toyImg.className = "toy-avatar";

    const toyLikes = document.createElement("p");
    toyLikes.innerHTML = `${toy.likes} Likes`;

    const toyLikeButton = document.createElement("BUTTON");
    toyLikeButton.className = "like-btn";
    toyLikeButton.innerHTML = "Like <3";

    toyLikeButton.addEventListener("click", () => {
      let data = { likes: toy.likes + 1 }
      let configurationObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      }

      fetch(`http://localhost:3000/toys/${toy.id}`, configurationObject)
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => alert(error.message));
    })

    const divChildren = [toyHeading, toyImg, toyLikes, toyLikeButton];
    divChildren.forEach(child => {
      newToyDiv.appendChild(child);
    });

    return newToyDiv;
  }
});

function fetchIndividualToy(id){
  return fetch(`http://localhost:3000/toys/${toy.id}`)
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => alert(error.message));
}

function createNewToyWithFetch(name, img){
  let formData = {
    name: name,
    image: image,
    likes: 0
  };

  let configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return fetch("http://localhost:3000/toys", configurationObject)
  .then(response => response.json())
  .then(object => console.log(object))
  .catch(error => alert(error.message));
}
