const getCategories = async () => {  // بجيب الداتا

    const { data } = await axios.get(`https://dummyjson.com/products/category-list`);
    console.log(data);
    return data;
}

const displayCategories = async () => {  // بعرض الداتا
    const categories = await getCategories();
    const result = categories.map((category) => {
        return ` <div class="category">
        <h2>${category}</h2>
        <a href="categoryDetails.html?category=${category}">Details</a>
        </div>`

    }).join(' ');

    document.querySelector(".categories .row").innerHTML = result;

}

const getProducts = async () => {  // بجيب الداتا

    const { data } = await axios.get(`https://dummyjson.com/products`);
    console.log(data);
    return data;
}

const displayProducts = async () => {  // بعرض الداتا
    const data = await getProducts();
    console.log(data);
    const result = data.products.map((product) => {
        return ` <div class="product">
        <img src =${product.thumbnail} alt =${product.title} />
        <h3>${product.title}</h3>
        
        <span>$${product.price}</span>
        </div>`

    }).join(' ');
    document.querySelector(".prodects .row").innerHTML = result;
}

displayCategories();
displayProducts();