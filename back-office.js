const params = new URLSearchParams(window.location.search);
const id = params.get("appId");
console.log(params);
const URL = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = id ? "PUT" : "POST";

const resetBtn = document.getElementById("resetBtn");

const mainBtn = document.getElementById("mainBtn");
const deleteBtn = document.getElementById("deleteBtn");
const subtitle = document.querySelector("h4");
window.addEventListener("DOMContentLoaded", () => {
  console.log("RESOURCE ID: " + id);

  if (id) {
    subtitle.innerText = "Modifica Prodotto";
    mainBtn.classList.remove("btn-primary");
    mainBtn.classList.add("btn-success");
    mainBtn.innerText = "Modifica";

    deleteBtn.addEventListener("click", handleDelete);
    deleteBtn.classList.remove("d-none");
    fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWNmNTdmMzA0NjAwMWFlNTlmNmYiLCJpYXQiOjE3MTI5MDk1NTcsImV4cCI6MTcxNDExOTE1N30.K04dk3uKhthE1EpEbOaOjkq8Eo4_5tIQGqyMbSeIqcU",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nella fetch");
        }
      })
      .then((appToModify) => {
        const { name, description, brand, price, imageUrl } = appToModify;

        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
        document.getElementById("brand").value = brand;
        document.getElementById("imageUrl").value = imageUrl;
        document.getElementById("price").value = price;
      })
      .then((modifiedProduct) => {
        alert("Prodotto " + modifiedProduct.name + " modificato con successo!");
      })
      .catch((err) => console.log(err));
  }
  window.onload = () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
  };

  const handleSubmit = (event) => {
    console.log("EVENT", event);
    event.preventDefault();
    const newProduct = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      brand: document.getElementById("brand").value,
      imageUrl: document.getElementById("imageUrl").value,
      price: document.getElementById("price").value,
    };

    fetch(URL, {
      method: method,
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",

        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWNmNTdmMzA0NjAwMWFlNTlmNmYiLCJpYXQiOjE3MTI5MDk1NTcsImV4cCI6MTcxNDExOTE1N30.K04dk3uKhthE1EpEbOaOjkq8Eo4_5tIQGqyMbSeIqcU",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nella fetch");
        }
      })
      .then((createdProduct) => {
        alert("Prodotto " + createdProduct.name + " creato con successo!");
      })
      .catch((err) => console.log(err));
  };
});
const handleDelete = () => {
  const hasConfirmed = confirm(
    "Sicuro di voler eliminare il prodotto dal catalogo?"
  );

  if (hasConfirmed) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWNmNTdmMzA0NjAwMWFlNTlmNmYiLCJpYXQiOjE3MTI5MDk1NTcsImV4cCI6MTcxNDExOTE1N30.K04dk3uKhthE1EpEbOaOjkq8Eo4_5tIQGqyMbSeIqcU",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nella fetch");
        }
      })
      .then((deletedObj) => {
        alert("Risorsa: " + deletedObj.name + " Eliminata con successo!");

        window.location.assign("./index.html");
      })
      .catch((err) => console.log(err));
  }
};

resetBtn.addEventListener("click", (event) => {
  if (confirm("sicuro di voler cancellare i dati inseirit?")) {
    form.reset();
  } else {
    event.preventDefault();
  }
});
