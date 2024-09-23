let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescipcionGastos = [];

function clickBoton(){
    nombreGasto = document.getElementById("nombreGasto").value;
    descripcionGasto = document.getElementById("descripcionGasto").value;
    valorGasto = document.getElementById("valorGasto").value;

    
    console.log(nombreGasto);
    console.log(descripcionGasto);
    console.log(valorGasto);

    listaNombresGastos.push(nombreGasto);
    listaDescipcionGastos.push(descripcionGasto);
    listaValoresGastos.push(valorGasto);

    console.log(listaNombresGastos);
    console.log(listaDescipcionGastos);
    console.log(listaValoresGastos);

    //alert('click de usuario');
    actualizarListaGastos();

}

function actualizarListaGastos(){
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;
    listaNombresGastos.forEach((elemento, posicion) => {
        const descripcionGasto = listaDescipcionGastos[posicion];
        const valorGasto = Number(listaValoresGastos[posicion]);
        htmlLista += `<li> <b>${elemento}</b> - <i>${descripcionGasto}</i> - USD ${valorGasto.toFixed(2)} 
                    <button onclick="modificarGasto(${posicion});">Modificar</button>
                    <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                    </li>`;

        //Calculamos el total de gastos
        totalGastos += Number(valorGasto);
        if (totalGastos > 150) {
            swal.fire({
                title: "¡Cuidado!",
                text: "La cantidad comienza a exceder los 150USD",
                icon: "warning",
                background: "#F6FEF5",
                position: "top",
                width: "27%",

                
            })

        }

    });
    
    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();

}

function limpiar() {
    document.getElementById("nombreGasto").value = '';
    document.getElementById("descripcionGasto").value = '';
    document.getElementById("valorGasto").value = '';

}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaDescipcionGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    actualizarListaGastos();

}

function modificarGasto(posicion) {
        // Obtener los datos del gasto a modificar
        const nombreActual = listaNombresGastos[posicion];
        const descripcionActual = listaDescipcionGastos[posicion];
        const valorActual = listaValoresGastos[posicion];
    
        // Crear un formulario de edición (Ejemplo usando SweetAlert2)
        swal.fire({
            title: 'Modificar Gasto',
            html: `
                <input id="nuevoNombre" type="text" value="${nombreActual}">
                <input id="nuevaDescripcion" type="text" value="${descripcionActual}">
                <input id="nuevoValor" type="number" value="${valorActual}">
            `,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Obtener los nuevos valores del formulario
                const nuevoNombre = document.getElementById('nuevoNombre').value;
                const nuevaDescripcion = document.getElementById('nuevaDescripcion').value;
                const nuevoValor = document.getElementById('nuevoValor').value;
    
                // Actualizar los arreglos
                listaNombresGastos[posicion] = nuevoNombre;
                listaDescipcionGastos[posicion] = nuevaDescripcion;
                listaValoresGastos[posicion] = nuevoValor;
    
                // Actualizar la lista
                actualizarListaGastos();
            }
        });
    }

