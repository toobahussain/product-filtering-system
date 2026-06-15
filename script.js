let allProducts = [];
let filteredProducts = [];

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortPrice = document.getElementById("sortPrice");
const productContainer = document.getElementById("productContainer");
const resultCount = document.getElementById("resultCount");

async function loadProducts() {
  try {
    const res = await fetch("assets/products.json");
    allProducts = await res.json();
    filteredProducts = [...allProducts];
    renderProducts(filteredProducts);
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

function filterProducts() {
  let result = [...allProducts];

  const searchText = searchInput.value.toUpperCase().trim();
  if (searchText) {
    result = result.filter(p =>
      p.name.toUpperCase().includes(searchText)
    );
  }

  const category = categoryFilter.value;
  if (category !== "all") {
    result = result.filter(p => p.category === category);
  }

  const sortValue = sortPrice.value;
  if (sortValue === "low-high") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high-low") {
    result.sort((a, b) => b.price - a.price);
  }

  filteredProducts = result;
  renderProducts(filteredProducts);
}

function renderProducts(products) {
  productContainer.innerHTML = ""; 

  resultCount.textContent = `${products.length} product(s) found`;

  if (products.length === 0) {
    productContainer.innerHTML = "<p>No products found</p>";
    return;
  }

  const fragment = document.createDocumentFragment();

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = `card ${product.category.toLowerCase()}`;

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <p class="price">$${product.price}</p>
    `;

    fragment.appendChild(card);
  });

  productContainer.appendChild(fragment);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
sortPrice.addEventListener("change", filterProducts);

loadProducts();