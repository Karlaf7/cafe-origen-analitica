Problemas encontrados en los datos de la tabla:

1. En las ciudades, algunas se encuentran con espacios y minusculas.
Desición:  normalizar antes de comparar (quitar espacios y unificar mayúsculas/minúsculas).

2. Los clientes C01, C02, C03, se muestran más de una vez.
Desición: es válido, un cliente puede comprar varias veces. Se usa en S5 y S6.


3. Pude notar que en la cantidad, hay un producto que aparece en 0.
Desición: no cuenta en el ticket.

----------------------------------------------------

Diccionario:

Propiedad | Tipo | Descripción
id        | entero     | identificador unico de cada venta
cliente   | texto      | código del cliente que realizó la compra
fecha     | date       | día en que se realizó la venta
producto  | texto      | nombre del producto vendido
ciudad    | texto      | ciudad donde se hizo la venta
cantidad  | entero     | número de unidades vendidas en la venta
precio    | decimal    | precio por unidad del producto
