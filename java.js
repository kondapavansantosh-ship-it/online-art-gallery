// ARTWORK DETAILS

var artworks = [

    {
        id: 0,
        name: "Colorful Dreams",
        artist: "John Smith",
        category: "Painting",
        price: 2000,
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500",
        description: "A beautiful colorful painting that represents creativity and imagination."
    },

    {
        id: 1,
        name: "Nature Paradise",
        artist: "David Lee",
        category: "Nature",
        price: 1500,
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=500",
        description: "A peaceful nature artwork showing the beauty of natural landscapes."
    },

    {
        id: 2,
        name: "Abstract Beauty",
        artist: "Emma Wilson",
        category: "Abstract",
        price: 3000,
        image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500",
        description: "An attractive abstract artwork with creative colors and patterns."
    },

    {
        id: 3,
        name: "Modern Vision",
        artist: "Michael Brown",
        category: "Modern",
        price: 2500,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500",
        description: "A modern artwork designed to bring beauty and style to your space."
    },

    {
        id: 4,
        name: "Artistic Vision",
        artist: "Sophia Martin",
        category: "Painting",
        price: 3500,
        image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=500",
        description: "A creative painting that expresses artistic talent and imagination."
    },

    {
        id: 5,
        name: "Natural World",
        artist: "Olivia James",
        category: "Nature",
        price: 1800,
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500",
        description: "A beautiful natural landscape that brings peace and freshness."
    }

];


// SHOPPING CART ARRAY

var cart = [];


// SEARCH FUNCTION

function searchArt() {

    var searchValue = document.getElementById("search").value.toLowerCase();

    var cards = document.getElementsByClassName("card");

    var count = 0;

    for (var i = 0; i < cards.length; i++) {

        var title = cards[i].getElementsByTagName("h3")[0].innerHTML.toLowerCase();

        var artist = cards[i].getElementsByClassName("artist")[0].innerHTML.toLowerCase();

        if (title.indexOf(searchValue) !== -1 ||
            artist.indexOf(searchValue) !== -1) {

            cards[i].style.display = "block";

            count++;

        } else {

            cards[i].style.display = "none";

        }

    }

    showNoResult(count);

    filterArt();

}


// CATEGORY FILTER FUNCTION

function filterArt() {

    var category = document.getElementById("category").value;

    var searchValue = document.getElementById("search").value.toLowerCase();

    var cards = document.getElementsByClassName("card");

    var count = 0;

    for (var i = 0; i < cards.length; i++) {

        var cardCategory = cards[i].getAttribute("data-category");

        var title = cards[i].getElementsByTagName("h3")[0].innerHTML.toLowerCase();

        var artist = cards[i].getElementsByClassName("artist")[0].innerHTML.toLowerCase();

        var matchesCategory = (category === "all" || category === cardCategory);

        var matchesSearch = (
            title.indexOf(searchValue) !== -1 ||
            artist.indexOf(searchValue) !== -1
        );

        if (matchesCategory && matchesSearch) {

            cards[i].style.display = "block";

            count++;

        } else {

            cards[i].style.display = "none";

        }

    }

    showNoResult(count);

}


// NO RESULT MESSAGE

function showNoResult(count) {

    if (count === 0) {

        document.getElementById("noResult").style.display = "block";

    } else {

        document.getElementById("noResult").style.display = "none";

    }

}


// VIEW ARTWORK DETAILS

var selectedArtId = -1;

function viewArt(id) {

    if (id < 0 || id >= artworks.length) {
        return;
    }

    var art = artworks[id];

    selectedArtId = id;

    document.getElementById("modalImage").src = art.image;

    document.getElementById("modalTitle").innerHTML = art.name;

    document.getElementById("modalArtist").innerHTML =
        "Artist: " + art.artist;

    document.getElementById("modalDescription").innerHTML =
        art.description;

    document.getElementById("modalPrice").innerHTML =
        "Price: ₹" + art.price;

    document.getElementById("artModal").style.display = "block";

}


// CLOSE POPUP

function closeModal() {

    document.getElementById("artModal").style.display = "none";

}


// CLOSE POPUP WHEN CLICKING OUTSIDE

window.onclick = function(event) {

    var modal = document.getElementById("artModal");

    if (event.target === modal) {

        closeModal();

    }

};


// ADD TO CART

function addToCart(id) {

    var found = false;

    for (var i = 0; i < cart.length; i++) {

        if (cart[i].id === id) {

            cart[i].quantity++;

            found = true;

            break;

        }

    }

    if (found === false) {

        var art = artworks[id];

        if (!art) {
            return;
        }

        cart.push({

            id: art.id,
            name: art.name,
            price: art.price,
            quantity: 1

        });

    }

    saveCart();

    displayCart();

    alert("Artwork added to cart successfully!");

}


// ADD TO CART FROM POPUP

function addModalToCart() {

    if (selectedArtId !== -1) {

        addToCart(selectedArtId);

        closeModal();

    }

}


// DISPLAY CART ITEMS

function displayCart() {

    var cartItems = document.getElementById("cartItems");

    var total = 0;

    var count = 0;

    cartItems.innerHTML = "";

    for (var i = 0; i < cart.length; i++) {

        var item = cart[i];

        var subtotal = item.price * item.quantity;

        total = total + subtotal;

        count = count + item.quantity;

        var div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML =

            "<div>" +

            "<h3>" + item.name + "</h3>" +

            "<p>Price: ₹" + item.price + "</p>" +

            "<p>Quantity: " + item.quantity + "</p>" +

            "<p>Subtotal: ₹" + subtotal + "</p>" +

            "</div>" +

            "<div>" +

            "<button onclick='decreaseQuantity(" + item.id + ")'>-</button>" +

            "<button onclick='increaseQuantity(" + item.id + ")'>+</button>" +

            "<button onclick='removeItem(" + item.id + ")'>Remove</button>" +

            "</div>";

        cartItems.appendChild(div);

    }

    document.getElementById("total").innerHTML =

        "Total: ₹" + total;

    document.getElementById("cartCount").innerHTML = count;

}


// INCREASE QUANTITY

function increaseQuantity(id) {

    for (var i = 0; i < cart.length; i++) {

        if (cart[i].id === id) {

            cart[i].quantity++;

            break;

        }

    }

    saveCart();

    displayCart();

}


// DECREASE QUANTITY

function decreaseQuantity(id) {

    for (var i = 0; i < cart.length; i++) {

        if (cart[i].id === id) {

            cart[i].quantity--;

            if (cart[i].quantity <= 0) {

                cart.splice(i, 1);

            }

            break;

        }

    }

    saveCart();

    displayCart();

}


// REMOVE CART ITEM

function removeItem(id) {

    for (var i = 0; i < cart.length; i++) {

        if (cart[i].id === id) {

            cart.splice(i, 1);

            break;

        }

    }

    saveCart();

    displayCart();

}


// CLEAR ENTIRE CART

function clearCart() {

    if (cart.length === 0) {

        alert("Your cart is already empty!");

        return;

    }

    if (confirm("Are you sure you want to clear the cart?")) {

        cart = [];

        saveCart();

        displayCart();

    }

}


// SAVE CART IN LOCAL STORAGE

function saveCart() {

    try {

        localStorage.setItem("artVistaCart", JSON.stringify(cart));

    } catch (error) {

        alert("Unable to save cart in this browser.");

    }

}


// LOAD CART FROM LOCAL STORAGE

function loadCart() {

    try {

        var savedCart = localStorage.getItem("artVistaCart");

        if (savedCart !== null) {

            var loadedCart = JSON.parse(savedCart);

            if (Object.prototype.toString.call(loadedCart) === "[object Array]") {

                cart = loadedCart;

            }

        }

    } catch (error) {

        cart = [];

    }

    displayCart();

}


// CONTACT FORM

function sendMessage(event) {

    event.preventDefault();

    var name = document.getElementById("username").value;

    var email = document.getElementById("email").value;

    var message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {

        alert("Please fill all the fields!");

        return;

    }

    alert("Thank you " + name + "! Your message has been submitted.");

    document.getElementById("contactForm").reset();

}


// LOAD CART WHEN PAGE OPENS

window.onload = function() {

    loadCart();

};