## Manejar el estado de una tienda en memoria con TS y POO
## Item: 
- id
- titulo
- descripcion
- describir(){ } Debera describir el producto por consola
## ItemManager
- global: Item[]
- obtenerPorId(item_id){} retorna el item
- agregar(title, descripcion) Añade el item al sistema
## ItemTienda
Manejar un item dentro de una Tienda
- id
- titulo
- descripcion
- precio
- stock
## Venta
- id
- id_item
- id_comprador (numero para identificar quien compro)
- cantidad
- precio_unitario
- fecha (Fecha actual new Date, tipo Date)
## Compra
- id
- id_vendedor
- cantidad
- precio_unitario
- fecha (Fecha actual new Date, tipo Date)