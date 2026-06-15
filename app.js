const API_URL = "https://primer-commit-zu3g.onrender.com/productos";

// Obtener todos los productos
async function obtenerProductos() {
    try {
        const res = await fetch(API_URL);
        const datos = await res.json();

        const tabla = document.getElementById("tabla");
        tabla.innerHTML = "";

        datos.forEach(prod => {
            tabla.innerHTML += `
            <tr>
                <td>${prod.nombre}</td>
                <td>$${prod.precio}</td>
                <td>${prod.existencia} pzas</td>
                <td>
                    <button onclick="editarProducto('${prod._id}')">
                        Editar
                    </button>

                    <button onclick="eliminarProducto('${prod._id}')">
                        Eliminar
                    </button>
                </td>
            </tr>`;
        });

    } catch (err) {
        console.error("Error al traer datos:", err);
    }
}

// Registrar nuevo producto
document.getElementById("formProducto").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoObj = {
        nombre: document.getElementById("nombre").value,
        precio: Number(document.getElementById("precio").value),
        existencia: Number(document.getElementById("existencia").value)
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoObj)
        });

        if (res.ok) {
            alert("¡Guardado con éxito en MongoDB Atlas!");
            document.getElementById("formProducto").reset();
            obtenerProductos();
        }

    } catch (err) {
        console.error("Error al enviar datos:", err);
    }
});

// Eliminar producto
async function eliminarProducto(id) {

    const confirmar = confirm("¿Deseas eliminar este producto?");

    if (!confirmar) return;

    try {

        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            alert("Producto eliminado");
            obtenerProductos();
        }

    } catch (err) {
        console.error("Error al eliminar:", err);
    }
}

// Editar producto
async function editarProducto(id) {

    const nombre = prompt("Nuevo nombre del producto:");

    if (!nombre) return;

    const precio = prompt("Nuevo precio:");

    if (!precio) return;

    const existencia = prompt("Nueva existencia:");

    if (!existencia) return;

    try {

        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                precio: Number(precio),
                existencia: Number(existencia)
            })
        });

        if (res.ok) {
            alert("Producto actualizado");
            obtenerProductos();
        }

    } catch (err) {
        console.error("Error al actualizar:", err);
    }
}

// Cargar productos al abrir la página
obtenerProductos();