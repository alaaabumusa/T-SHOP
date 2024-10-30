const getCategories = async () => {  // بجيب الداتا

    const { data } = await axios.get(`https://dummyjson.com/products/category-list`);
    console.log(data);
    return data;
}

const displayCategories = async () => {  // بعرض الداتا
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");

    try {
        const categories = await getCategories();
        const result = categories.map((category) => {
            return ` <div class="category">
        <h2>${category}</h2>
        <a href="categoryDetails.html?category=${category}">Details</a>
        </div>`

        }).join(' ');

        document.querySelector(".categories .row").innerHTML = result;

    }
    catch (error) {
        console.error(error);
        alert("Failed to load categories. Please check your internet connection.");
    }

    finally {
        loader.classList.remove("active");
    }

}

const getProducts = async () => {  // بجيب الداتا

    const { data } = await axios.get(`https://dummyjson.com/products`);
    console.log(data);
    return data;
}

const displayProducts = async () => {  // بعرض الداتا
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");

    try {
        const data = await getProducts();
        console.log(data);
        const result = data.products.map((product) => {
        return ` <div class="product">
        <img src =${product.thumbnail} alt =${product.title} />
        <h3>${product.title}</h3>
        
        <span>$${product.price}</span>
        </div>`

    }).join(' ');
    document.querySelector(".products .row").innerHTML = result;
}

    catch (error) {
        console.error(error);
        alert("Failed to load products. Please check your internet connection.");
    } finally {
        loader.classList.remove("active");
    }
}

    displayCategories();
    displayProducts();


    window.onscroll = function(){
        const nav = document.querySelector(".header");
        const categories = document.querySelector(".categories");
        
        if (window.scrollY > categories.offsetTop) {
          console.log('test');
          nav.classList.add("scrolNavbar");
        }else{
            nav.classList.remove("scrolNavbar");
        }
    }
        
  
