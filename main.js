let mostrador = document.getElementById("mostrador");
let mostradorNiño = document.getElementById("mostrador-niño");
let mostradorNiña = document.getElementById('mostrador-niña')
let seleccion = document.getElementById("seleccion");
let imgSeleccionada = document.getElementById("img");
let modeloSeleccionado = document.getElementById("modelo");
let descripSeleccionada = document.getElementById("descripcion");
let precioSeleccionado = document.getElementById("precio");
let verProducts = document.getElementById("ver");
let verProductsNiño = document.getElementById("ver-niño");
let verProductsNiña = document.getElementById('ver-niña');
let carritoCompras = document.getElementById('mostrar-carrito')


carritoCompras.addEventListener('click', e => {
    hacerVisibleCarrito();
})

verProductsNiña.addEventListener('click', e=>{
    document.getElementById('mostrador-niña').style.display = 'block';
    document.getElementById('mostrador-niño').style.display = 'none';
    document.getElementById('mostrador').style.display = 'none'
})


verProductsNiño.addEventListener('click', e=>{
    document.getElementById('mostrador-niño').style.display = 'block'
    document.getElementById('mostrador').style.display = 'none'
    document.getElementById('mostrador-niña').style.display = 'none';
})

verProducts.addEventListener('click', e =>{
    document.getElementById('mostrador').style.display = 'block'
    document.getElementById('mostrador-niño').style.display ='none'
    document.getElementById('mostrador-niña').style.display = 'none';
})

document.addEventListener('keyup', e=>{

    if (e.target.matches('#buscador')){
        document.querySelectorAll('#articulo').forEach(producto=>{
            producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? producto.classList.remove('filtro')
                : producto.classList.add('filtro');
        })
    }
})

function cargar(item){
    quitarBordes();
    mostrador.style.width = "60%";
    mostradorNiño.style.width = "60%"
    mostradorNiña.style.width = "60%"
    seleccion.style.width = "35%";
    seleccion.style.opacity = "1";
    item.style.border = "2px solid #1cb698";

    imgSeleccionada.src = item.getElementsByTagName("img")[0].src;

    modeloSeleccionado.innerHTML =  item.getElementsByTagName("p")[0].innerHTML;

    descripSeleccionada.innerHTML = "Descripción del modelo ";

    precioSeleccionado.innerHTML =  item.getElementsByTagName("span")[0].innerHTML;


}
function cerrar(){
    mostrador.style.width = "100%";
    mostradorNiño.style.width = '100%'
    mostradorNiña.style.width = '100%'
    seleccion.style.width = "0%";
    seleccion.style.opacity = "0";
    quitarBordes();
}
function quitarBordes(){
    var items = document.getElementsByClassName("item");
    for(i=0;i <items.length; i++){
        items[i].style.border = "none";
    }
}

let carritoVisible = false;

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready(){
    let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i < botonesEliminarItem.length; i++) {
        let button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }    
    
    let botonSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonSumarCantidad.length; i++) {
        let button = botonSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    let botonRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < botonRestarCantidad.length; i++) {
        let button = botonRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    let botonAgregarAlCarrito = document.getElementsByClassName('btn-ac');
    for (let i = 0; i < botonAgregarAlCarrito.length; i++) {
        let button = botonAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarrito);
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
}


function eliminarItemCarrito(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    actualizarTotalCarrito();

    ocultarCarrito();
}


function actualizarTotalCarrito(){
    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;

    for (let i = 0; i < carritoItems.length; i++) {
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];

        let precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        let cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        let cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString('es') + ',00' + ' COP';
}


function ocultarCarrito(){
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity= '0';
        carritoVisible = false;

        let items = document.getElementsByClassName('contenido')[0];
        items.style.width = '100%'
    }
}

function sumarCantidad(e){
    let buttonClicked = e.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

    actualizarTotalCarrito();
}

function restarCantidad(e){
    let buttonClicked = e.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;

    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

function agregarAlCarrito(event){
    let button = event.target;
    let item = button.parentElement;
    let titulo = document.getElementById('modelo').innerText;
    let precio = document.getElementById('precio').innerText;
    let imagen = document.getElementById('img').src;

    agregarItemAlCarrito(titulo, precio, imagen);
}

function agregarItemAlCarrito(titulo, precio, imagen){
    let item = document.createElement('div');
    item.classList.add = 'item';
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    let nombresItemCarritos = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (let i = 0; i < nombresItemCarritos.length; i++) {
        if(nombresItemCarritos[i].innerText==titulo){
            alert('El item seleccionado ya se encuentra en el carrito');
            return;
        }
    }

    let itemCarritoContenido = `
        <div class="carrito-item">
        <img src="${imagen}" alt="" width="80px">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <span class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </span>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    let botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    let botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    actualizarTotalCarrito();
}

function pagarClicked(event){
    alert("Gracias por su compra");

    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    ocultarCarrito();
}

function hacerVisibleCarrito(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';

    let items = document.getElementsByClassName('contenido')[0];
    carrito.style.opacity = '1';
}