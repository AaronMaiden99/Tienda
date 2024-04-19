



let resultados = document.querySelector("#resultados") //row donde van las col
let carrito = []



function pintarCartas(arr){
    resultados.innerHTML = ""
    arr.forEach((element, indice) =>{
        let carousel = document.createElement("div")
        // carousel.style.height = "10rem"
        carousel.classList.add("carousel", "slide", "rounded-4")
        carousel.id = "carousel" + indice
        carousel.innerHTML = ` <button class="carousel-control-prev" type="button" data-bs-target="#${carousel.id}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${carousel.id}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>`
        
        let carouselIndicator = document.createElement("div")
        carouselIndicator.classList.add("carousel-indicators")
        carouselIndicator.innerHTML = ` <button type="button" data-bs-target="${carousel.id}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`
        
        let carouselInner = document.createElement("div")
        carouselInner.classList.add("carousel-inner", "rounded-top-4")
        carouselInner.innerHTML = `<div class="carousel-item active rounded-top-4">
        <img  src="${element.images[0]}" class="d-block w-100 card-img-top object-fit-cover rounded-top-4" style="height: 25rem;" alt="...">
      </div>`


        for (let index = 1; index < element.images.length; index++) {
            let link = element.images[index];
           
            carouselIndicator.innerHTML += `<button type="button" data-bs-target="${carousel.id}" data-bs-slide-to="${index}" aria-label="Slide ${index + 1}"></button>`
            
            carouselInner.innerHTML += `<div class="carousel-item">
            <img src="${link}" class="d-block w-100 card-img-top object-fit-cover rounded-top-4" style="height: 25rem;" alt="...">
          </div>`
        }

        carousel.appendChild(carouselIndicator)
        carousel.appendChild(carouselInner)

        let accordion = document.createElement("div")
        accordion.classList.add("accordion")
        accordion.id = `accordion${indice}`
        accordion.innerHTML = ` <div class="accordion-item">
              <h2 class="accordion-header">
                 <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${indice}" aria-expanded="false" aria-controls="collapseTwo">
                   Más información
                 </button>
               </h2>
               <div id="${indice}" class="accordion-collapse collapse" data-bs-parent="${accordion.id}">
                 <div class="accordion-body">
                   <p> Marca: ${element.brand} </p>
                   <p> Categoria: ${element.category}</p>
                   <p> Rating: ${element.rating}/5 </p>
                 </div>
               </div>
             </div>`

        let agregarCarro = document.createElement('a')
        agregarCarro.classList.add("btn", "btn-warning") 
        agregarCarro.innerText = "agregar al carrito"
        agregarCarro.onclick = ()=>{
            encontrado = carrito.findIndex((coso)=>{
                return coso.getID() == element.id
            })
            if(encontrado == -1){
                carrito.push(new ProductoCarro(element.id, element.title, element.price))
            }else{
                carrito[encontrado].aumentar()
            }
       
            Swal.fire({
                title: "Agregado con éxito!",
                confirmButtonColor: "#ffc107",
                icon: "success"
              });
            
        }
    

        let precio = document.createElement("div")
        precio.innerHTML = `<span class="badge border border-warning text-dark p-3 position-relative">
        ${element.price} $
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          ${element.discountPercentage}% off
          <span class="visually-hidden">unread messages</span>
        </span>
      </span>`

        let col = document.createElement(`div`);
        col.classList.add("col-4", "mt-5")

        let card = document.createElement(`div`);
        card.classList.add("card", "border", "border-warning", "rounded-4", "shadow", "animate__animated", "animate__slideInLeft")
        card.style.width = "25rem"

        let cardBody = document.createElement(`div`);
        cardBody.classList.add("card-body")
        cardBody.innerHTML = ` <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.description}</p>`

        let pie = document.createElement("div")
        pie.classList.add("d-flex", "justify-content-between", "p-3", "pe-5")
        
        pie.appendChild(agregarCarro)
        pie.appendChild(precio)

        card.appendChild(carousel)

       

        card.appendChild(cardBody);

        card.appendChild(accordion)

        card.appendChild(pie)

        col.appendChild(card)
        
        resultados.appendChild(col)
    })
}

    //un montón de variables relacionadas con el formulario de filtrado
    let precioMaximo = 0;
    let slider = document.querySelector("#slider")
    let precioMinimo = document.querySelector("#precio-minimo")
    let rango3 = document.querySelector("#rango3")
    let rango1 = document.querySelector("#rango1")
    let rango2 = document.querySelector("#rango2")
    let categorias = []
    let marcas = []
    let selectMarca = document.querySelector("#select-marca")
    let selectCategoria = document.querySelector("#select-categoria")

//Esto se ejecuta nada más entrar a la página, cogemos el json y usamos sus datos para crear el formulario y también para llamar a la función pintarCartas
fetch("https://dummyjson.com/products").then((result)=>{
    return result.json()
}).then((result2) =>{

    result2.products.forEach((element, indice) => {
        //recogemos datos para el formulario de filtrado
        if(element.price > precioMaximo) precioMaximo = element.price 
        if(!categorias.includes(element.category)) categorias.push(element.category)
        if(!marcas.includes(element.brand)) marcas.push(element.brand)
        
    });

    //pintamos el formulario de filtrado, podría ser una función aparte, pero solo se debería de hacer una vez así que no lo pongo en una función porque no pienso tener que llamarla
    slider.addEventListener("click", ()=>{
        precioMinimo.innerText = slider.value + " $"
    })
    rango3.innerText = precioMaximo
    rango1.innerText = precioMaximo/3
    rango2.innerText = precioMaximo * 2/3
    slider.max = precioMaximo

  
    marcas.forEach((elem) =>{
        selectMarca.innerHTML += `<option value="${elem}">${elem}</option>`
    })

  
    categorias.forEach((elem) =>{
        selectCategoria .innerHTML += `<option value="${elem}">${elem}</option>`
    })

    //pintamos las cartas
    pintarCartas(result2.products)
}).catch();

const pintarCarrito = function()
    {
        carritoDesplegado = document.querySelector("#carrito-desplegado")
        carritoDesplegado.innerHTML = ""
        precioFinalRecuento = 0
        carrito.forEach((element) =>{
           if(element.getCantidad() > 0){
            precioFinalRecuento += element.getCantidad()*element.getPrecio()
           
            lineaCarro = document.createElement("div")
            lineaCarro.classList.add("d-flex", "justify-content-between", "mt-3")
            lineaCarro.innerHTML= `  <div>${element.getNombre()}</div>`
    
            lineaCarroInfo = document.createElement("div")
            
            lineaCarroInfoMenos = document.createElement("button")
            lineaCarroInfoMenos.classList.add("btn", "px-3", "btn-outline-danger", "btn-sm" )
            lineaCarroInfoMenos.innerText = "-"
            lineaCarroInfoMenos.onclick = ()=>{
                element.reducir()
                pintarCarrito()
            }
    
            lineaCarroInfoCantidad = document.createElement("div")
            lineaCarroInfoCantidad.classList.add("badge", "rounded-pill", "text-bg-light", "mx-3")
            lineaCarroInfoCantidad.innerText = `${element.getCantidad()}`
    
            lineaCarroInfoMas = document.createElement("button")
            lineaCarroInfoMas.classList.add("btn", "px-3", "btn-outline-warning", "btn-sm")
            lineaCarroInfoMas.innerText = "+"
            lineaCarroInfoMas.onclick = ()=>{
                element.aumentar()
                pintarCarrito()
            }
    
    
            lineaCarroInfo.appendChild(lineaCarroInfoMenos)
            lineaCarroInfo.appendChild(lineaCarroInfoCantidad)
            lineaCarroInfo.appendChild(lineaCarroInfoMas)
    
            lineaCarro.appendChild(lineaCarroInfo)
    
            carritoDesplegado.appendChild(lineaCarro)
           }


      
        })
        let precioTotal = document.querySelector("#precio-total");
        precioTotal.innerText = `${precioFinalRecuento} $`
}

//botón de mostrar carrito
document.querySelector("#boton-carrito").addEventListener("click", pintarCarrito)

//botón de filtrar
document.querySelector("#boton-filtrar").addEventListener("click", ()=>{
    fetch("https://dummyjson.com/products").then((result)=>{
    return result.json()
    }).then((result2) =>{
        let filtrado = result2.products.filter(elemento => elemento.price >= slider.value)
        
        if(selectMarca.value != "Marca"){
            filtrado = filtrado.filter(producto => producto.brand == selectMarca.value)
      
        }
        if(selectCategoria.value != "Categoría"){
            filtrado = filtrado.filter(producto => producto.category == selectCategoria.value)
            
        }
        pintarCartas(filtrado)
        console.log(filtrado)
    
    }).catch()
})
//botón resetear
//botón de filtrar
document.querySelector("#boton-resetear").addEventListener("click", ()=>{
    fetch("https://dummyjson.com/products").then((result)=>{
    return result.json()
    }).then((result2) =>{
        slider.value = 0
        precioMinimo.innerText = slider.value + " $"
        selectMarca.value = "Marca"
        
        selectCategoria.value ="Categoría"
        pintarCartas(result2.products)
    
    }).catch()
})

//boton para mostar formulario de filtrado. Aquí sólo hago que haga scroll hasta arriba, mostrar el formulario lo hace bootstrap
document.querySelector("#boton-mostrar-filtro").addEventListener('click', () => {
   
    window.scrollTo({
    
    top: 0,
   
    behavior: 'smooth'
    
    });
    
});


