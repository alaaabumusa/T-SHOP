const getCategories = async () => {  // بجيب الداتا

    const { data } = await axios.get(`https://dummyjson.com/products/category-list`);
  
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

const getProducts = async (page) => {  // بجيب الداتا
    const skip = (page - 1) * 9 ;
    const { data } = await axios.get(`https://dummyjson.com/products?limit=9&skip=${skip}`);
    return data;
}

const displayProducts = async (page = 1) => {  // بعرض الداتا
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");

    try {
        const data = await getProducts(page);
        const numberOfPages= Math.ceil(data.total / 9) ;
        console.log(page);
        const result = data.products.map((product) => {
        return ` <div class="product">
        <img src =${product.thumbnail} alt =${product.title} />
        <h3>${product.title}</h3>
        
        <span>$${product.price}</span>
        </div>`

    }).join(' ');
    document.querySelector(".products .row").innerHTML = result;

    let paginationLink = `<li class="page-item"><button class="page-link" onclick="displayProducts(${page - 1})" ${page === 1 ? 'disabled' : ''}>&laquo;</button></li>`;

for (let i = 1; i <= numberOfPages; i++) {
    paginationLink += `<li class="page-item ${i === page ? 'active' : ''}"><button onclick="displayProducts(${i})" class="page-link">${i}</button></li>`;
}

paginationLink += `<li class="page-item"><button class="page-link" onclick="displayProducts(${page + 1})" ${page === numberOfPages ? 'disabled' : ''}>&raquo;</button></li>`;

       
        console.log(paginationLink);

        document.querySelector(".pagination").innerHTML =paginationLink;
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
          nav.classList.add("scrolNavbar");
        }else{
            nav.classList.remove("scrolNavbar");
        }
    }

    const countDown =()=>{
        const countDownDate = new Date("2025-2-5 23:59:59").getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
       

        document.querySelector(".days").textContent = days;
        document.querySelector(".hours").textContent = hours;
        document.querySelector(".minutes").textContent = minutes;
        document.querySelector(".seconds").textContent = seconds;
    }
        
  


    setInterval(()=>{
        countDown();
    },1000)
