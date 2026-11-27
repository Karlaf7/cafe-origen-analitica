const { ventas } = require('./datos');
const {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
} = require('./analitica');

const completo = ventas;
const uno = [ventas[0]]; 
const vacio = [];

console.log('valorVenta (recibe una venta, no un arreglo)');
console.log('id 1:', valorVenta(ventas[0]));
console.log('id 8 (cantidad 0):', valorVenta(ventas[7]));

console.log('Arreglo completo');
console.log('totalVendido:', totalVendido(completo));
console.log('unidadesVendidas:', unidadesVendidas(completo));
console.log('ventaMayor:', ventaMayor(completo));
console.log('ticketPromedio:', ticketPromedio(completo));
console.log('ventasPorCiudad Medellín:', ventasPorCiudad(completo, 'Medellín'));

console.log('Un solo elemento');
console.log('totalVendido:', totalVendido(uno));
console.log('unidadesVendidas:', unidadesVendidas(uno));
console.log('ventaMayor:', ventaMayor(uno));
console.log('ticketPromedio:', ticketPromedio(uno));
console.log('ventasPorCiudad Medellín:', ventasPorCiudad(uno, 'Medellín'));
console.log('ventasPorCiudad Bogotá:', ventasPorCiudad(uno, 'Bogotá'));

console.log('Arreglo vacío');
console.log('totalVendido:', totalVendido(vacio));
console.log('unidadesVendidas:', unidadesVendidas(vacio));
console.log('ventaMayor:', ventaMayor(vacio));
console.log('ticketPromedio:', ticketPromedio(vacio));
console.log('ventasPorCiudad Medellín:', ventasPorCiudad(vacio, 'Medellín'));