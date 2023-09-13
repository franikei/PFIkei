// validacion de solo letras
function contieneSoloLetras(cadena) {
    return /^[A-Za-z]+$/.test(cadena);
}

// validacion solo letras y sin elementos vacios
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

// Nombre y apellido del cliente
let nombre = obtenerTextoValido("Por favor, ingrese el nombre:");
let apellido = obtenerTextoValido("Por favor, ingrese el apellido:");


// mensaje de bienvenida
function mostrarBienvenida(nombre, apellido) {
    alert("¡Bienvenido, " + nombre + " " + apellido + "! a Aki Amai.");
}

// validacion de nombre y apellido
if (nombre && apellido) {
    mostrarBienvenida(nombre, apellido);

    // forma de pago
    let formaDePago = prompt("Seleccione su forma de pago, Con efectivo tiene un 10% de descuento:\n1. Efectivo\n2. Tarjeta");

    // forma de pago y descuento
    let descuento;
    if (formaDePago === "1") {
        descuento = 0.10; // 10% de descuento
    } else {
        descuento = 0; // sin descuento
    }

    // productos
    let opcionProducto;
    do {
        opcionProducto = prompt("Seleccione un producto:\n1. Cupcakes - $2500 \n2. Dorayakis - $2700 \n3. Cheesecake - $3000 \n4. Torta - $4000");
    
        // se convierte la opción de producto en un número entero
        opcionProducto = parseInt(opcionProducto);
    
        if (isNaN(opcionProducto) || opcionProducto < 1 || opcionProducto > 4) {
            alert("Por favor seleccione una de las 4 opciones");
        }
    } while (isNaN(opcionProducto) || opcionProducto < 1 || opcionProducto > 4);

    // se convierte el producto en numero entero
    opcionProducto = parseInt(opcionProducto);

    // se calcula el precio
    let precioProducto;
    switch (opcionProducto) {
        case 1:
            precioProducto = 2500;
            break;
        case 2:
            precioProducto = 2700;
            break;
        case 3:
            precioProducto = 3000;
            break;
        case 4:
            precioProducto = 4000;
            break;
        default:
            alert("Opción de producto no válida.");
            break;
    }

    // se calcula el precio total, si es efectivo con 10% de descuento 
    let precioTotal = precioProducto - (precioProducto * descuento);

    // precio total
    alert("El precio total a pagar es: $" + precioTotal);
    alert("Muchas gracias por visitar Aki Amai :)");

} else {
    alert("Debe ingresar el nombre y el apellido para continuar.");
}