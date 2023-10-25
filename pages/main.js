document.addEventListener("DOMContentLoaded", function() {
  function cargarCarritoDesdeLocalStorage() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    return carrito;
  }

  function agregarProductosAlCarritoDOM(productos) {
    const carritoLista = document.getElementById("carrito-lista");
    const totalCarrito = document.getElementById("total-carrito");
    carritoLista.innerHTML = '';
    let total = 0;

    productos.forEach(producto => {
      const nuevoItem = document.createElement("li");
      const precioFormateado = parseFloat(producto.precio).toFixed(2);
      nuevoItem.textContent = `${producto.nombre} - $${precioFormateado}`;
      
      // Boton para eliminar un producto
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.style.backgroundColor = "#ff3333";
      botonEliminar.style.color = "#fff";
      botonEliminar.style.margin = "5px";
      botonEliminar.addEventListener("click", () => eliminarProductoDelCarrito(producto));
      nuevoItem.appendChild(botonEliminar);

      carritoLista.appendChild(nuevoItem);

      total += parseFloat(producto.precio);
    });

    const totalFormateado = total.toFixed(2);
    totalCarrito.textContent = `Total: $${totalFormateado}`;
  }

  function agregarProductoAlCarritoDOM(producto) {
    const carrito = cargarCarritoDesdeLocalStorage();
    // Agregar producto
    producto.cantidad = 1;
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    agregarProductosAlCarritoDOM(carrito);
  }

  function eliminarProductoDelCarrito(producto) {
    const carrito = cargarCarritoDesdeLocalStorage();
    // Para encontrar el indice del producto
    const index = carrito.findIndex(item => item.nombre === producto.nombre);

    if (index !== -1) {
      // Si se encuentra un producto se elimina
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      agregarProductosAlCarritoDOM(carrito);
    }
  }

  function inicializarCarrito() {
    const carrito = cargarCarritoDesdeLocalStorage();
    agregarProductosAlCarritoDOM(carrito);
  }

  function vaciarCarrito() {
    localStorage.removeItem("carrito");
    const carritoLista = document.getElementById("carrito-lista");
    carritoLista.innerHTML = '';
    const totalCarrito = document.getElementById("total-carrito");
    totalCarrito.textContent = 'Total: $0.00';
  }

  const vaciarCarritoButton = document.getElementById("vaciar-carrito");
  vaciarCarritoButton.addEventListener("click", vaciarCarrito);

  const botonesAgregarCarrito = document.querySelectorAll(".agregar-carrito");

  botonesAgregarCarrito.forEach(boton => {
    boton.addEventListener("click", () => {
      const producto = {
        nombre: boton.parentElement.querySelector("p").textContent,
        precio: parseFloat(boton.parentElement.querySelector("h3").textContent.slice(1)),
      };
      agregarProductoAlCarritoDOM(producto);
    });
  });

  inicializarCarrito();
});