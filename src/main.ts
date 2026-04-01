// 1. Clase Item (Base)
class Item {
    id: number;
    titulo: string;
    descripcion: string;

    constructor(id: number, titulo: string, descripcion: string) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        console.log(`Constructor: Item '${titulo}' creado.`);
    }

    describir(): void {
        console.log(`Metodo: ${this.titulo} - ${this.descripcion} (ID: ${this.id})`);
    }
}

// 2. Clase ItemManager
class ItemManager {
    global: Item[] = [];

    agregar(id: number, titulo: string, descripcion: string): void {
        const nuevoItem = new Item(id, titulo, descripcion);
        this.global.push(nuevoItem);
        console.log(`Metodo: '${titulo}' añadido al catálogo global.`);
    }

    obtenerPorId(item_id: number): Item | undefined {
        console.log(`Metodo: Buscando ID ${item_id}.`);
        return this.global.find(item => item.id === item_id);
    }
}

// 3. Clase ItemTienda (Hereda de Item)
class ItemTienda extends Item {
    precio: number;
    stock: number;

    constructor(id: number, titulo: string, descripcion: string, precio: number, stock: number) {
        super(id, titulo, descripcion);
        this.precio = precio;
        this.stock = stock;
        console.log(`Constructor: Empanada lista para venta con precio $${precio} y stock ${stock}`);
    }

    describir(): void {
        super.describir();
        console.log(`Detalle Tienda: Precio: $${this.precio} | Stock: ${this.stock} unidades.`);
    }
}

// 4. Clase Venta
class Venta {
    id: number;
    id_item: number;
    id_comprador: number;
    cantidad: number;
    precio_unitario: number;
    fecha: Date;

    constructor(id: number, id_item: number, id_comprador: number, cantidad: number, precio_unitario: number) {
        this.id = id;
        this.id_item = id_item;
        this.id_comprador = id_comprador;
        this.cantidad = cantidad;
        this.precio_unitario = precio_unitario;
        this.fecha = new Date();
        console.log(`Constructor: Venta #${id} registrada el ${this.fecha.toLocaleDateString()}`);
    }
}

// 5. Clase Compra
class Compra {
    id: number;
    id_vendedor: number;
    cantidad: number;
    precio_unitario: number;
    fecha: Date;

    constructor(id: number, id_vendedor: number, cantidad: number, precio_unitario: number) {
        this.id = id;
        this.id_vendedor = id_vendedor;
        this.cantidad = cantidad;
        this.precio_unitario = precio_unitario;
        this.fecha = new Date();
        console.log(`Constructor: Compra #${id} registrada el ${this.fecha.toLocaleDateString()}`);
    }
}

// 6. Pruebas

console.log("-GESTIÓN DE CATÁLOGO");
const manager = new ItemManager();
manager.agregar(1, "Empanada de Carne", "Carne cortada a cuchillo, tradicional");
manager.agregar(2, "Empanada de Pollo", "Pollo con cebolla de verdeo");

const empanadaBuscada = manager.obtenerPorId(1);
if (empanadaBuscada) empanadaBuscada.describir();

console.log("-STOCKS DE TIENDA");
const stockCarne = new ItemTienda(1, "Empanada de Carne", "Tradicional", 150, 100);
stockCarne.describir();

console.log("-REGISTRO DE MOVIMIENTOS");
const ventaHoy = new Venta(10, 1, 500, 12, 150);
const compraHoy = new Compra(99, 888, 50, 90);

console.log("Verificación Venta:", ventaHoy);
console.log("Verificación Compra:", compraHoy);

class Tienda {
    nombre: string;
    inventario: ItemTienda[];
    lista_ventas: Venta[];
    lista_compras: Compra[];
    dinero: number;

    constructor(nombre: string, dinero: number) {
        this.nombre = nombre;
        this.dinero = dinero;
        this.inventario = [];
        this.lista_ventas = [];
        this.lista_compras = [];
    }

    comprar(id_item: number, precio_unitario: number, cantidad: number, margen_esperado: number): void {
        const costoTotal = precio_unitario * cantidad;

        // 1. Verificamos dinero
        if (this.dinero < costoTotal) {
            console.log(`Error: Dinero insuficiente ($${costoTotal}) para comprar ID ${id_item}`);
            return;
        }

        // 2. Buscamos item en sistema
        const itemExistenteCatalogo = manager.obtenerPorId(id_item);
        if (!itemExistenteCatalogo) {
            console.log(`Error: El item con ID ${id_item} no existe en el catálogo global.`);
            return;
        }

        // 3. Procesamos la transacción
        this.dinero -= costoTotal;
        const precioFinal = precio_unitario * (1 + margen_esperado / 100);

        const itemEnInventario = this.inventario.find(item => item.id === id_item);
        if (itemEnInventario) {
            itemEnInventario.stock += cantidad;
            itemEnInventario.precio = precioFinal;
        } else {
            // Usamos los datos para crear el push en el inventario
            this.inventario.push(new ItemTienda(
                id_item,
                itemExistenteCatalogo.titulo,
                itemExistenteCatalogo.descripcion,
                precioFinal,
                cantidad
            ));
        }

        // Registro de la compra
        this.lista_compras.push(new Compra(this.lista_compras.length + 1, 0, cantidad, precio_unitario));
    }
}

// 7. Pruebas

console.log("-TIENDA");
const tienda_1 = new Tienda("Tienda 1", 7000);
console.log("Dinero inicial:", tienda_1.dinero);
tienda_1.comprar(1, 1400, 2, 20);
console.log("Dinero actual:", tienda_1.dinero);
tienda_1.comprar(1, 1500, 2, 20);
console.log("Dinero actual:", tienda_1.dinero);
tienda_1.comprar(1, 1500, 2, 20);
console.log("Dinero actual:", tienda_1.dinero);


