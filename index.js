const URL = "https://striveschool-api.herokuapp.com/api/product/";
const row = document.querySelector(".row");

const generateCard = (event) => {
  fetch(URL, {
    method: "GET",

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
    .then((data) => {
      console.log(data);
      data.forEach((obj) => {
        const img = obj.imageUrl;
        const name = obj.name;
        const description = obj.description;
        const price = obj.price;
        const _id = obj._id;
        const div = document.createElement("div");
        div.classList.add("col-md-4");

        div.innerHTML = `<div class="card my-3 shadow bg-body-tertiary rounded">
        <img src=${img} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description} </p>
          <p class="fw-bold">${price + "€"} </p>
          <div class="d-flex">
          <a href="./details.html?appId=${_id}" class="btn btn-primary">Scopri di più</a>
          <a href="./back-office.html?appId=${_id}" class="btn btn-danger ms-auto">Modifica</a>
        </div>
          </div>
      </div> `;
        row.appendChild(div);
      });
    })
    .catch((err) => console.log(err));
};

window.onload = () => {
  generateCard();
};
