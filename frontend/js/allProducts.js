const url = 'http://localhost:3000/api/cameras';

const items = document.getElementById('items'); // llama donde va a ir la info 
const cardItems = document.getElementById('items-camera').content; // llamado del template por id
const fragment = document.createDocumentFragment(); // agrega el fragmento de codigo que se quiere mostrar

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

const fetchData = async () => {

    try {
        const res = await fetch(url); // response  d API
        const data = await res.json(); // changement de ficher JSON
        //console.log(data);
        showAllCards(data) //
    } catch (error) {
        console.log(error);
    }
}

const showAllCards = data => {
    data.forEach( product => {

        cardItems.querySelector('h5').textContent = product.name;
        cardItems.querySelector('p').textContent = product.description;
        cardItems.querySelector('img').setAttribute('src', product.imageUrl);
        cardItems.querySelector('a').setAttribute('href',  `product.html?id=${product._id}`);

        const clone = cardItems.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);
}