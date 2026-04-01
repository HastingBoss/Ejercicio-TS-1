// 1. Clase Base (Padre)
class Empanada {
    sabor: string;
    precio: number;

    constructor(sabor: string, precio: number) {
        console.log(`Constructor: Creado base '${sabor}'`);
        this.sabor = sabor;
        this.precio = precio;
    }

    preparar(): void {
        console.log(`Acción: Preparar relleno de '${this.sabor}'`);
    }

    obtenerDetalles(): object {
        console.log(`Detalle: '${this.sabor}'`);
        return {
            sabor: this.sabor,
            precio: this.precio
        };
    }
}

// 2. Clase Derivada (Hijo)
class EmpanadaEspecial extends Empanada {
    extra: string;

    constructor(sabor: string, precio: number, extra: string) {
        super(sabor, precio);
        this.extra = extra;
        console.log(`Constructor: Agregado extra '${extra}'`);
    }

    // Sobrescritura (Overriding)
    preparar(): void {
        console.log(`Acción: Iniciando preparación especial '${this.sabor}'`);
        super.preparar();
        console.log(`Acción: Agregando extra '${this.extra}'`);
    }

    obtenerDetalles(): object {
        console.log(`Detalle Extra: '${this.sabor}'`);
        const infoBase = super.obtenerDetalles();
        return {
            ...infoBase,
            extra: this.extra
        };
    }
}

// 3. Polimorfismo
function testPolimorfismo(empanada: Empanada) {
    console.log(`TEST: '${empanada.sabor.toUpperCase()}'`);
    empanada.preparar();

    const resumen = empanada.obtenerDetalles();
    console.log(`Resultado:`, resumen);
}

//4. Prueba
const p1 = new Empanada('Carne', 150);
const p2 = new EmpanadaEspecial('Pollo', 200, 'Queso');
const p3 = new EmpanadaEspecial('Humita', 250, 'Panceta');
const p4 = new EmpanadaEspecial('Verdura', 200, 'Queso');
const p5 = new Empanada('CheeseBurger', 300);

testPolimorfismo(p1);
testPolimorfismo(p2);
testPolimorfismo(p3);
testPolimorfismo(p4);
testPolimorfismo(p5);

// 5. Class Base Transaccion (Padre)  
class Transaccion {
    id: number;
    cantidad: number;
    precio_unitario: number;
    fecha: Date;

    constructor(id: number, cantidad: number, precio_unitario: number) {
        this.id = id;
        this.cantidad = cantidad;
        this.precio_unitario = precio_unitario;
        this.fecha = new Date();
        console.log(`Constructor: Transacción #${id} hecha el ${this.fecha.toLocaleDateString()}`);
    }

    calcularTotal(): number {
        return this.cantidad * this.precio_unitario;
    }
}

// 5. Class Venta (Hijo)
class Venta extends Transaccion {
    id_item: number;
    id_comprador: number;

    constructor(id: number, id_item: number, id_comprador: number, cantidad: number, precio_unitario: number) {
        super(id, cantidad, precio_unitario);
        this.id_item = id_item;
        this.id_comprador = id_comprador;
        console.log(`Constructor: Comprador #${id_comprador} realizada.`);
    }

    generarFactura(): string {
        return `FACTURA #${this.id} del Item: ${this.id_item} para el Comprador con id: ${this.id_comprador} Total: $${this.calcularTotal()}`;
    }
}

// 6. Class Compra (Hijo)   
class Compra extends Transaccion {
    id_vendedor: number;

    constructor(id: number, id_vendedor: number, cantidad: number, precio_unitario: number) {
        super(id, cantidad, precio_unitario);
        this.id_vendedor = id_vendedor;
        console.log(`Constructor: Compra al proveedor con id: ${id_vendedor} registrada.`);
    }

    generarComprobante(): string {
        return `COMPRA #${this.id} al Vendedor con id: ${this.id_vendedor} Costo Total: $${this.calcularTotal()}`;
    }
}

// 7. Prueba Transacciones

console.log(`TEST: Transacciones`);

const nuevaVenta = new Venta(1, 101, 500, 12, 150);
const nuevaCompra = new Compra(4, 999, 100, 90);

console.log(`Detalle: ${nuevaVenta.generarFactura()}`);
console.log(`Detalle: ${nuevaCompra.generarComprobante()}`);

