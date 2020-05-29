let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      getToyFormContainer().style.display = "block";
    } else {
      getToyFormContainer().style.display = "none";
    }
  });

  const addToyForm = document.querySelector(".add-toy-form");
  addToyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newToyName = document.getElementsByTagName("input")[0].value;
    const newToyImage = document.getElementsByTagName("input")[1].value;

    createNewToy(newToyName, newToyImage);
  });

  function createNewToy(newToyName, newToyImage){
    const newToy = createNewToyWithFetch(newToyName, newToyImage);
    appendChildCardToContainer(createCardForToy(newToy));
  }

  //fetch and render all toys:
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(objects => renderToys(objects))
  .catch(error => alert(error.message));

  function renderToys(toys){
    toys.forEach(toy => {
      appendChildCardToContainer(createCardForToy(toy));
    })
  }
});

function appendChildCardToContainer(card){
  getToyFormContainer().appendChild(card);
}

function createCardForToy(toy){
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

  const divChildren = [toyHeading, toyImg, toyLikes, toyLikeButton];
  divChildren.forEach(child => {
    newToyDiv.appendChild(child);
  });

  //giving newToyDiv a unique id
  newToyDiv.id = `toy-with-id-${toy.id}`;
  return newToyDiv;
}

// function incrementLikesForToyWithId(id){
//   const toy = fetchToyFromDB(id);
//   const newLikesTotal = parseInt(toy.likes) + 1;
//   const updatedToy = updateToyWithId(toy.id, toy.name, toy.image, newLikesTotal);
//   return newLikesTotal;
// }

function createNewToyWithFetch(name, image){
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

function updateToyWithId(id, name, image, likes){
  let data = {
    id: id,
    name: name,
    image: image,
    likes: likes
  }

  let configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  }

  return fetch(`http://localhost:3000/toys/${id}`, configurationObject)
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => alert(error.message));
}

function getToyFormContainer(){
  return document.querySelector(".container");
}

function fetchToyFromDB(id){
  return fetch(`http://localhost:3000/toys/${id}`)
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => alert(error.message));
}
