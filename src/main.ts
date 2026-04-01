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

// --- EJECUCIÓN DEL EJERCICIO (PRUEBAS) ---

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
