let DOG_URL = 'https://dog.ceo/api/breeds/image/random'

function addNewDoggo(){
    promise = fetch(DOG_URL);
    promise.then(function (response) {
        console.log(response);
        return response.json();
    })
    .then( function (responseBody){
        //console.log(responseBody);
        const img = document.createElement("img");
        img.src = responseBody.message;
        img.alt = 'another doggo!';
        document.querySelector('.doggos').appendChild(img);
    })
}

document.querySelector('.add-doggo').addEventListener('click',addNewDoggo);


