class ProductoCarro{
    id
    nombre
    precio
    cantidad
    aumentar
    reducir

    constructor(id, nombre, precio){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = 1
        this.aumentar = function(){
            this.cantidad++
        }
        this.reducir = function(){
            if(this.cantidad > 0) this.cantidad--
        }
    }

    getID(){
        return this.id
    }

    getNombre(){
        return this.nombre
    }

    getCantidad(){
        return this.cantidad
    }
    
    getPrecio(){
        return this.precio
    }
}