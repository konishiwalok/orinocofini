let cart = JSON.parse(localStorage.getItem('cart') || '{}')

product.addEventListener('click', e => {
    console.log(e.target.parentElement);
    addCart(e)
})

const addCart = e => {
    //console.log(e.target);
    //console.log(e.target.classList.contains('add-cart'));

    if (e.target.classList.contains('add-cart')) {
        if (lenseCheck(e.target.parentElement.querySelector('#lenses-all-buttons'))) {
            setCart(e.target.parentElement)
        } else {
            window.alert("escoja una lente")
        }
    }
    e.stopPropagation();
}
// Separa la informacion del item
const setCart = obj => {

    const product = {
        id: obj.querySelector('.add-cart').dataset.id,
        name: obj.querySelector('h3').textContent,
        lense: lenseCheck(obj.querySelector('#lenses-all-buttons')),
        price: obj.querySelector('.price-camera').textContent,
        desc: obj.querySelector('.description').textContent,
        cantidad: 1
    }

    if (cart.hasOwnProperty(product.id + product.lense)) {
        product.cantidad = cart[product.id + product.lense].cantidad + 1;
    }
    
    cart[product.id + product.lense] = { ...product };
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Verificamos cual de las lentes selecciono cuando agrego al carro de compra
const lenseCheck = lenses => {

    for (let i = 0; i < lenses.children.length; i++) {
        if (lenses.children[i].checked === true) {
            buttonIsChecked = lenses.children[i].id;
            return buttonIsChecked;
        }
    }
}
