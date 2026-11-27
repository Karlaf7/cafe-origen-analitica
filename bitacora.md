Diccionario de datos

| Propiedad | Tipo   | Significado                                                      |
|-----------|--------|------------------------------------------------------------------|
| id        | number | Identificador único de la venta                                  |
| fecha     | string | Fecha de la venta en formato AAAA-MM-DD                          |
| cliente   | string | Código del cliente que realizó la compra                         |
| producto  | string | Nombre del producto vendido, incluye presentación (500 g, 250 g) |
| ciudad    | string | Ciudad donde se hizo la venta o el envío                         |
| cantidad  | number | Unidades vendidas en la transacción                              |
| precio    | number | Precio unitario del producto                                     |

--------------------------------------------------------------------------------------------------------------------------

Problemas encontrados en los datos de la tabla:

1.Ciudad escrita distinto (id 5): aparece como "medellín" en minúscula, mientras los demás registros usan "Medellín".
Decisión: normalizar la ciudad (quitar espacios sobrantes y unificar mayúsculas/minúsculas) antes de agrupar o comparar, para que cuente como la misma ciudad.

2.Clientes repetidos (C01, C02, C03): aparecen en más de una venta.
Decisión: es válido, un cliente puede comprar varias veces. Se conservan todos los registros y se agrupa por cliente cuando se necesite.

3.Cantidad en cero (id 8, cliente C06):** la venta tiene `cantidad: 0`.
Decisión: se excluye de los cálculos de ventas y del ticket, porque no representa una venta real.

----------------------------------------------------------------------------------------------------------------------------