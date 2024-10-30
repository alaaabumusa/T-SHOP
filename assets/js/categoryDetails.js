const getProducts = async () => {  // بجيب الداتا
    console.log(window.location);
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const { data } = await axios.get(`https://dummyjson.com/products/category/${category}`);

    return data;
}

const displayProducts = async () => {  // بعرض الداتا
    const data = await getProducts();

    const result = data.products.map((product) => {
        return ` <div class="product">
        <img src =${product.thumbnail} alt =${product.title} />
        <h3>${product.title}</h3>
        
        <span>$${product.price}</span>
        </div>`

    }).join(' ');
    document.querySelector(".prodects .row").innerHTML = result;
};

displayProducts();
