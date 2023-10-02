document.addEventListener("DOMContentLoaded", function () {
  // Objeto cliente
  const cliente = {
    nombre: "",
    apellido: "",
    formaDePago: "",
  };

  // Array de productos
  const productos = [
    { nombre: "Cupcakes", precio: 2500 },
    { nombre: "Dorayakis", precio: 2700 },
    { nombre: "Cheesecake", precio: 3000 },
    { nombre: "Torta", precio: 4000 },
  ];

  // Array para el carrito de compras
  const carrito = [];

  // Función para validar que la cadena contenga solo letras
  function contieneSoloLetras(cadena) {
    return /^[A-Za-z]+$/.test(cadena);
  }

  // Función para obtener texto válido (nombre, apellido, etc.)
  function obtenerTextoValido(mensaje) {
    let texto;
    do {
      texto = prompt(mensaje);
      if (!texto) {
        alert("No dejar campos vacíos.");
      } else if (!contieneSoloLetras(texto)) {
        alert("El texto debe contener solo letras.");
      }
    } while (!texto || !contieneSoloLetras(texto));
    return texto;
  }

  // Función para agregar un producto al carrito
  function agregarAlCarrito(producto) {
    carrito.push(producto);
  }

  // Función para calcular el precio total del carrito
  function calcularPrecioTotal() {
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    return total;
  }

  // Función para mostrar el recibo de compra
  function mostrarRecibo() {
    let mensaje = "Cliente: " + cliente.nombre + " " + cliente.apellido + "\n";
    mensaje += "Forma de Pago: " + cliente.formaDePago + "\n";
    mensaje += "Productos Comprados:\n";
    carrito.forEach((producto) => {
      mensaje += producto.nombre + " $" + producto.precio + "\n";
    });

    // Calcular el precio total con descuento si es efectivo
    let precioTotal = calcularPrecioTotal();
    if (cliente.formaDePago === "1") {
      precioTotal -= precioTotal * 0.10; // Aplicar el 10% de descuento
    }

    mensaje += "Precio Total: $" + precioTotal.toFixed(2) + "\n"; // Mostrar el precio total con dos decimales
    mensaje += "Muchas gracias por visitar Aki Amai :)";
    alert(mensaje);
  }

  // Nombre y apellido del cliente
  cliente.nombre = obtenerTextoValido("Por favor, ingrese el nombre:");
  cliente.apellido = obtenerTextoValido("Por favor, ingrese el apellido:");

  // Validación de nombre y apellido
  if (cliente.nombre && cliente.apellido) {
    // Forma de pago
    cliente.formaDePago = prompt("Seleccione su forma de pago, Con efectivo tiene un 10% de descuento:\n1. Efectivo\n2. Tarjeta");

    // Validar que se haya seleccionado una forma de pago válida
    while (cliente.formaDePago !== "1" && cliente.formaDePago !== "2") {
      if (cliente.formaDePago === null) {
        alert("Debe seleccionar una forma de pago para continuar.");
        cliente.formaDePago = prompt("Seleccione su forma de pago, Con efectivo tiene un 10% de descuento:\n1. Efectivo\n2. Tarjeta");
      } else {
        alert("Seleccione una forma de pago válida: 1 para Efectivo, 2 para Tarjeta.");
        cliente.formaDePago = prompt("Seleccione su forma de pago, Con efectivo tiene un 10% de descuento:\n1. Efectivo\n2. Tarjeta");
      }
    }

    // Forma de pago y descuento
    let descuento;
    if (cliente.formaDePago === "1") {
      descuento = 0.10; // 10% de descuento
    } else {
      descuento = 0; // sin descuento
    }

    // Selección de productos
    const productosSeleccionados = [];
    while (true) {
      let opcionProducto = prompt("Seleccione un producto:\n1. Cupcakes - $2500 \n2. Dorayakis - $2700 \n3. Cheesecake - $3000 \n4. Torta - $4000\n5. Finalizar Compra");

      if (opcionProducto === "5") {
        // El usuario termino la compra
        break;
      }

      opcionProducto = parseInt(opcionProducto);

      if (!isNaN(opcionProducto) && opcionProducto >= 1 && opcionProducto <= 4) {
        const productoSeleccionado = productos[opcionProducto - 1];
        agregarAlCarrito(productoSeleccionado);
        productosSeleccionados.push(productoSeleccionado.nombre);
      } else {
        alert("Opción de producto no válida. Por favor, seleccione una de las 4 opciones válidas o finalice la compra.");
      }
    }

    // Mostrar los productos seleccionados
    if (productosSeleccionados.length > 0) {
      alert("Productos seleccionados:\n" + productosSeleccionados.join("\n"));
      // Mostrar el recibo de compra
      mostrarRecibo();
    } else {
      alert("No ha seleccionado ningún producto. La compra se ha cancelado.");
    }
  } else {
    alert("Debe ingresar el nombre y el apellido para continuar.");
  }
});