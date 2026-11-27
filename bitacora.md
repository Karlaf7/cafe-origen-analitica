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

Plan en pseudocódigo de los indicadores

1.valorVenta(venta)
-Recorro: nada, recibe una sola venta.
-Condición: ninguna.
-Acumulo: nada.
-Inicio: no aplica.

    FUNCION valorVenta(venta):
        DEVOLVER venta.cantidad * venta.precio

2.totalVendido(ventas)
-recorro: todas las ventas.
-Condición: si `cantidad > 0`.
-Acumulo: `valorVenta(venta)` en `total`.
-Inicio: `total = 0`.

    FUNCION totalVendido(ventas):
        total = 0
        PARA CADA venta EN ventas:
            SI venta.cantidad > 0:
                total = total + valorVenta(venta)
        DEVOLVER total

3.unidadesVendidas(ventas)
-Recorro: todas las ventas.
-Condición: si `cantidad > 0`.
-Acumulo: `cantidad` en `unidades`.
-Inicio: `unidades = 0`.

    FUNCION unidadesVendidas(ventas):
        unidades = 0
        PARA CADA venta EN ventas:
            SI venta.cantidad > 0:
                unidades = unidades + venta.cantidad
        DEVOLVER unidades

4.ventaMayor(ventas)
-Recorro: todas las ventas.
-Condición: si `cantidad > 0` y su valor supera a `valorMayor`.
-Acumulo: guardo el registro completo en `mayor` y su valor en `valorMayor`.
-Inicio: `mayor = null`, `valorMayor = 0`.

    FUNCION ventaMayor(ventas):
        mayor = null
        valorMayor = 0
        PARA CADA venta EN ventas:
            SI venta.cantidad > 0 Y valorVenta(venta) > valorMayor:
                mayor = venta
                valorMayor = valorVenta(venta)
        DEVOLVER mayor

5.ticketPromedio(ventas)
-Recorro: todas las ventas.
-Condición: si `cantidad > 0`.
-Acumulo: `valorVenta(venta)` en `total` y 1 en `contador`.
-Inicio: `total = 0`, `contador = 0`.

    FUNCION ticketPromedio(ventas):
        total = 0
        contador = 0
        PARA CADA venta EN ventas:
            SI venta.cantidad > 0:
                total = total + valorVenta(venta)
                contador = contador + 1
        SI contador == 0:
            DEVOLVER 0
        DEVOLVER total / contador

6.ventasPorCiudad(ventas, ciudad)
-Recorro: todas las ventas.
-Condición: si `cantidad > 0` y la ciudad de la venta, normalizada, es igual a la ciudad buscada, normalizada.
-Acumulo: `valorVenta(venta)` en `total`.
-Inicio: `total = 0`.

    FUNCION ventasPorCiudad(ventas, ciudad):
        total = 0
        PARA CADA venta EN ventas:
            SI venta.cantidad > 0 Y normalizar(venta.ciudad) == normalizar(ciudad):
                total = total + valorVenta(venta)
        DEVOLVER total
        
----------------------------------------------------------------------------------------------------------------------------

Verificación manual (tablas de traza)

Traza 1: totalVendido(ventas)
Inicio: `total = 0`. Se suma `cantidad × precio` solo si `cantidad > 0`.

| id | cantidad | precio | ¿cantidad > 0? | valor | total acumulado |
|----|----------|--------|----------------|-------|-----------------|
| 1  | 2 | 42000  | sí | 84000  | 84000  |
| 2  | 1 | 26000  | sí | 26000  | 110000 |
| 3  | 1 | 95000  | sí | 95000  | 205000 |
| 4  | 1 | 42000  | sí | 42000  | 247000 |
| 5  | 3 | 45000  | sí | 135000 | 382000 |
| 6  | 2 | 26000  | sí | 52000  | 434000 |
| 7  | 1 | 120000 | sí | 120000 | 554000 |
| 8  | 0 | 42000  | no | se omite | 554000 |
| 9  | 2 | 45000  | sí | 90000  | 644000 |
| 10 | 4 | 42000  | sí | 168000 | 812000 |
| 11 | 1 | 95000  | sí | 95000  | 907000 |
| 12 | 3 | 26000  | sí | 78000  | 985000 |

Resultado a mano: 985000.

Traza 2: ventaMayor(ventas)
Inicio: `mayor = null`, `valorMayor = 0`. Se actualiza si la venta es válida y su valor supera a `valorMayor`.

| id | valor | ¿supera a valorMayor? | mayor | valorMayor |
|----|-------|-----------------------|-------|------------|
| 1  | 84000  | sí | id 1  | 84000  |
| 2  | 26000  | no | id 1  | 84000  |
| 3  | 95000  | sí | id 3  | 95000  |
| 4  | 42000  | no | id 3  | 95000  |
| 5  | 135000 | sí | id 5  | 135000 |
| 6  | 52000  | no | id 5  | 135000 |
| 7  | 120000 | no | id 5  | 135000 |
| 8  | cantidad 0 | se omite | id 5 | 135000 |
| 9  | 90000  | no | id 5  | 135000 |
| 10 | 168000 | sí | id 10 | 168000 |
| 11 | 95000  | no | id 10 | 168000 |
| 12 | 78000  | no | id 10 | 168000 |

Resultado a mano: el registro del id 10 (Origen Huila 500 g, Pereira, C07).

---------------------------------------------------------------------------------------------------------------------------
