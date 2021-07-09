const url = 'http://localhost:3000/api/cameras';

const product = document.getElementById('product'); // llama donde va a ir la info 
const productItem = document.getElementById('product-item').content;// llamamos al template
const fragment = document.createDocumentFragment(); // agrega el fragmento de codigo que se quiere mostrar

const valores = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(valores);
//Accedemos a los valores
let orderId = urlParams.get('id');


document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

const fetchData = async () => {

    try {
        const res = await fetch(url + "/" + orderId); // respuesta del API
        const data = await res.json(); // cambio de los datos a archivo JSON
        //console.log(data);
        showProduct(data);
    } catch (error) {
        console.log(error);
    }
}

const showProduct = data => {
    productItem.querySelector('h3').textContent = data.name;
    productItem.querySelector('p').textContent = data.description;
    productItem.querySelector('img').setAttribute('src', data.imageUrl);
    productItem.querySelector('.price-camera').textContent = data.price;
    productItem.querySelector('.add-cart').dataset.id = data._id;
    document.getElementById("titleCamera").innerHTML =  data.name;
    

    console.log(data.lenses)
    data.lenses.forEach(element => {
        console.log(element)
        const lenseButton = `
                <input id="${element}" type="radio" name="lense" class="">${element}</button>
            `;
        lensesAllButtons = productItem.querySelector("#lenses-all-buttons");
        lensesAllButtons.innerHTML += lenseButton;
    });

    const clone = productItem.cloneNode(true);

    fragment.appendChild(clone);

    product.appendChild(fragment);
}