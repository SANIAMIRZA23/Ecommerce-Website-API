let allProducts = [];
let currentCategory = "all";

fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
        allProducts = data.products;
        loadCategories();
        showProducts(allProducts);
    })
    .catch(err => console.error(err));

function loadCategories() {
    let categorySelect = document.getElementById("categorySelect");
    let categoryHTML = '<option value="all">All Categories</option>';

    let seenCategories = {};
    allProducts.forEach(product => {
        if (!seenCategories[product.category]) {
            categoryHTML += `<option value="${product.category}">${product.category}</option>`;
            seenCategories[product.category] = true;
        }
    });

    categorySelect.innerHTML = categoryHTML;
    loadBrands();
}

function loadBrands() {
    let brandSelect = document.getElementById("brandSelect");
    let brandHTML = '<option value="all">All Brands</option>';
    let seenBrands = {};

    allProducts.forEach(product => {
        if ((currentCategory === "all" || product.category === currentCategory) && product.brand) {
            if (!seenBrands[product.brand]) {
                brandHTML += `<option value="${product.brand}">${product.brand}</option>`;
                seenBrands[product.brand] = true;
            }
        }
    });

    brandSelect.innerHTML = brandHTML;
}

function showProducts(products) {
    let row = document.getElementById("productRow");
    row.innerHTML = "";

    products.forEach(product => {
        row.innerHTML += `
        <div class="col">
            <div class="card h-100">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="fw-bold">$${product.price}</p>
                    <button class="btn" onclick="Swal.fire({title: 'Added to cart successfully!', icon: 'success'})">
                        Add to Cart 
                    </button>
                </div>
            </div>
        </div>
        `;
    });
}

function categoryChanged() {
    currentCategory = document.getElementById("categorySelect").value;
    loadBrands();
    filterProducts();
}

function filterProducts() {
    let selectedBrand = document.getElementById("brandSelect").value;
    let filtered = allProducts.filter(product =>
        (currentCategory === "all" || product.category === currentCategory) &&
        (selectedBrand === "all" || product.brand === selectedBrand)
    );
    showProducts(filtered);
}

function viewAllProducts() {
    currentCategory = "all";
    document.getElementById("categorySelect").value = "all";
    loadBrands();
    showProducts(allProducts);
}
