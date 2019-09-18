

const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const doggos = document.querySelector(".doggos");

function addNewDoggo() {
  const promise = fetch(DOG_URL);
  console.log(promise);
  promise
    .then(function(response) {
      console.log(response);
      const processingPromise = response.json();
      console.log(processingPromise);
      return processingPromise;
    })
    .then(function(processedResponse) {
      console.log(processedResponse)
      const img = document.createElement("img");
      img.src = processedResponse.message;
      img.alt = "Cute doggo";
      doggos.appendChild(img);
    });
}

document.querySelector(".add-doggo").addEventListener("click", addNewDoggo);

