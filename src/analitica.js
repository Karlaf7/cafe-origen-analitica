const { ventas } = require('./datos');
const valorVenta = (venta) => venta.cantidad * venta.precio;
const normalizar = (texto) => texto.trim().toLowerCase();

function totalVendido(ventas) {
  let total = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total = total + valorVenta(venta);
    }
  }
  return total;
}

function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      unidades = unidades + venta.cantidad;
    }
  }
  return unidades;
}

function ventaMayor(ventas) {
  let mayor = null;
  let valorMayor = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0 && valorVenta(venta) > valorMayor) {
      mayor = venta;
      valorMayor = valorVenta(venta);
    }
  }
  return mayor;
}

function ticketPromedio(ventas) {
  let total = 0;
  let contador = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total = total + valorVenta(venta);
      contador = contador + 1;
    }
  }
  if (contador === 0) {
    return 0;
  }
  return total / contador;
}

function ventasPorCiudad(ventas, ciudad) {
  let total = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0 && normalizar(venta.ciudad) === normalizar(ciudad)) {
      total = total + valorVenta(venta);
    }
  }
  return total;
}

module.exports = { 
    valorVenta, 
    totalVendido, 
    unidadesVendidas, 
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
};

console.log('Total vendido:', totalVendido(ventas));
console.log('Unidades vendidas:', unidadesVendidas(ventas));
console.log('Venta mayor:', ventaMayor(ventas));
console.log('Ticket promedio:', ticketPromedio(ventas));
console.log('Medellín:', ventasPorCiudad(ventas, 'Medellín'));