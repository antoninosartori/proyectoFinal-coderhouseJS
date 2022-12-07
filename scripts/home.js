//validacion si esta logeado
const usersInLocalStorage = JSON.parse(localStorage.getItem('users'));
if(!usersInLocalStorage){
    location = '/';
    Swal.fire({
        title: 'Primero inicia sesion',
        title: 'Debes iniciar sesion o registrarte en caso de que no tengas una cuenta',
        icon: 'error',
    })
}

// peticion a "api"
async function getProducts(){
    const infoApi = await fetch('../scripts/products.json');
    const results = await infoApi.json();
    
    createProducts(results)
}




//creando los articulos
function createProducts(array){
    array.map(product => {
        const article = document.createElement('article');
        const productName = document.createElement('h3');
        productName.textContent = product.name;
    
        const productImage = document.createElement('img');
        productImage.setAttribute('src', product.image)
        productImage.setAttribute('alt', product.name)
    
        const productPrice = document.createElement('h4');
        productPrice.textContent = `$${product.price}`
    
        article.append(productName,productImage,productPrice);
        productsContainer.append(article);

        article.addEventListener('click', () => {
            if(!cartProducts){
                return cartProducts = [];
            }

            let isInCart = cartProducts.find(prod => prod.id === product.id);
            
            if(!isInCart){

                cartProducts.push(product)
                
                Swal.fire({
                    text: 'Producto agregado al carrito',
                    icon: 'success'});
                
                cartCounter.textContent = cartProducts.length
                cartContainer.innerHTML = '';
                crearProductsCarts()
            } else{
                Swal.fire({text: 'Este producto ya se encuentra en el carrito', icon: 'question'});
                return cartProducts
            }
        })
    })
}

getProducts()    



//carrito
let cartProducts;

btnCart.addEventListener('click', () => {
    cartContainer.classList.toggle('inactive');

    if(!cartProducts){
        return cartContainer.classList.add('inactive');
    }

})

function crearProductsCarts () {
    cartProducts.map(product => {
        
        const article = document.createElement('article');
        const productName = document.createElement('h3');
        productName.textContent = product.name;
    
        const productImage = document.createElement('img');
        productImage.setAttribute('src', product.image)
        productImage.setAttribute('alt', product.name)
    
        const productPrice = document.createElement('h4');
        productPrice.textContent = `$${product.price}`
    
        const deleteProduct = document.createElement('span')
        deleteProduct.textContent = 'X'
        deleteProduct.classList.add('deleteProduct');


        article.append(productName,productImage,productPrice, deleteProduct);
        cartContainer.append(article);

        deleteProduct.addEventListener('click', () => {
            let idx = cartProducts.findIndex(prod => prod.id === product.id)

            cartProducts.splice(idx,1)
            cartCounter.textContent = cartProducts.length
            cartContainer.innerHTML = '';
            crearProductsCarts()
        })

    })
}

//boton para log out
const btnLogOut = document.querySelector('.btn-logOut');

btnLogOut.addEventListener('click', () => {
    location = '/'
});


