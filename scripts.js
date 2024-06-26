let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

document.addEventListener('DOMContentLoaded', () => {
    if (currentUser) {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('registerButton').style.display = 'none';
        document.getElementById('userMenu').style.display = 'inline';
        document.getElementById('welcomeMessage').innerText = `Bienvenido, ${currentUser.username}`;
    }
    updateCart();
});

function searchProducts() {
    const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
    const products = document.querySelectorAll('.product');
    let searchResultsHTML = '';

    products.forEach(product => {
        const productName = product.querySelector('.name').innerText.trim().toLowerCase();
        if (productName.includes(searchText)) {
            searchResultsHTML += product.outerHTML;
        }
    });

    const encodedSearchResultsHTML = encodeURIComponent(searchResultsHTML);
    window.open(`productos.html?searchResults=${encodedSearchResultsHTML}`, '_blank');
}

function addToCart(id, name, price, imageUrl) {
    cart.push({ id, name, price, imageUrl });
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    // Mostrar u ocultar el botón "Iniciar Pago" según el contenido del carrito
    const checkoutButton = document.getElementById('checkoutButton');
    if (cart.length > 0) {
        checkoutButton.style.display = 'block';
    } else {
        checkoutButton.style.display = 'none';
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    
    const purchasesWithThumbnails = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl
    }));
    
    localStorage.setItem('lastPurchase', JSON.stringify(purchasesWithThumbnails));
    window.location.href = 'estadoCompra.html'; // Redireccionar a la página de estado de compras
}

document.getElementById('loginButton').addEventListener('click', function() {
    openModal('loginModal');
});

document.getElementById('logoutButton').addEventListener('click', function() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    alert('Sesión cerrada');
    document.getElementById('loginButton').style.display = 'inline';
    document.getElementById('registerButton').style.display = 'inline';
    document.getElementById('userMenu').style.display = 'none';
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Sesión iniciada');
        closeModal('loginModal');
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('registerButton').style.display = 'none';
        document.getElementById('userMenu').style.display = 'inline';
        document.getElementById('welcomeMessage').innerText = `Bienvenido, ${user.username}`;
    } else {
        alert('Correo o contraseña incorrectos');
    }
});

function openModal(id) {
    document.getElementById(id).classList.add('show');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

document.getElementById('complaintForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('complaintUsername').value;
    const email = document.getElementById('complaintEmail').value;
    const details = document.getElementById('complaintDetails').value;

    alert('se envio la queja al gerente y sera analizada.');

    document.getElementById('successMessage').style.display = 'block';
    
    document.getElementById('complaintForm').reset();
});

document.addEventListener('DOMContentLoaded', function() {
    const complaintForm = document.getElementById('complaintForm');
    const successMessage = document.getElementById('successMessage');

    complaintForm.addEventListener('submit', function(event) {
        event.preventDefault();

        successMessage.style.display = 'block';

        complaintForm.reset();
    });
});
