const itemsCart = document.getElementById('items-cart')
const footerCart = document.getElementById('footer-cart')
const templateFooter = document.getElementById('template-footer').content;
const templateCart = document.getElementById('template-cart').content;
const fragment = document.createDocumentFragment();


let cart = JSON.parse(localStorage.getItem('cart') || '{}')

document.addEventListener('DOMContentLoaded', () => {
    showCart();
})

itemsCart.addEventListener('click', e => {
    btnAction(e);
})

const showCart = () => {
    itemsCart.innerHTML = ``
    Object.values(cart).forEach(product => {

        templateCart.querySelector('th').textContent = product.name
        templateCart.querySelector('.name-item').textContent = product.lense
        templateCart.querySelector('.cantidad-item').textContent = product.cantidad
        templateCart.querySelector('#precio-item').textContent = product.price
        templateCart.querySelector('#total-item').textContent = product.price * product.cantidad
        templateCart.querySelector('.sum').dataset.id = product.id + product.lense
        templateCart.querySelector('.res').dataset.id = product.id + product.lense


        const clone = templateCart.cloneNode(true);
        fragment.appendChild(clone);
    })
    itemsCart.appendChild(fragment);
    showFooter();
}

const showFooter = () => {
    footerCart.innerHTML = ``
    if (Object.keys(cart).length === 0) {
        footerCart.innerHTML = `
        <th scope="row " class="bg-info" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }

    const nCantidad = Object.values(cart).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPriceTotal = Object.values(cart).reduce((acc, { cantidad, price }) => acc + (cantidad * price), 0)

    templateFooter.querySelector('.total-products').textContent = nCantidad
    templateFooter.querySelector('.total-price').textContent = nPriceTotal

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footerCart.appendChild(fragment)

    const btnClear = document.getElementById('btn-clear-cart')

    btnClear.addEventListener('click', () => {
        cart = {}
        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
    })
}

const btnAction = e => {

    if (e.target.classList.contains('sum')) {
        const producto = cart[e.target.dataset.id]
        producto.cantidad = producto.cantidad + 1
        cart[e.target.dataset.id] = { ...producto }
        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
    }
    if (e.target.classList.contains('res')) {
        const producto = cart[e.target.dataset.id]
        producto.cantidad = producto.cantidad - 1
        cart[e.target.dataset.id] = { ...producto }
        if (producto.cantidad === 0) {
            delete cart[e.target.dataset.id]
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
    }
    e.stopPropagation();}