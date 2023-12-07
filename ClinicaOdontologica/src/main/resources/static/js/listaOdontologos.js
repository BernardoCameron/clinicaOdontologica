window.addEventListener('load', function () {

    function onWindowLoad() {
        console.log('datos cargados con exito');
    }
    onWindowLoad();
    obtenerOdontologos();

    async function obtenerOdontologos() {
        try {
            const response = await fetch('/odontologo/todos');
            const odontologos = await response.json();

            const tabla = document.getElementById('tablaOdontologos');
            const tbody = tabla.getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';

            odontologos.forEach(odontologo => {
                const fila = document.createElement('tr');

                const idCelda = document.createElement('td');
                idCelda.textContent = odontologo.id;
                fila.appendChild(idCelda);

                const matriculaCelda = document.createElement('td');
                matriculaCelda.textContent = odontologo.matricula;
                fila.appendChild(matriculaCelda);

                const nombreCelda = document.createElement('td');
                nombreCelda.textContent = odontologo.nombre;
                fila.appendChild(nombreCelda);

                const apellidoCelda = document.createElement('td');
                apellidoCelda.textContent = odontologo.apellido;
                fila.appendChild(apellidoCelda);

                const accionesCelda = document.createElement('td');
                const botonEditar = document.createElement('button');
                botonEditar.textContent = 'Editar';
                botonEditar.className = 'bg-blue-500 text-white p-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300';
                botonEditar.onclick = function () {
                    habilitarEdicion(botonEditar);
                };

                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                botonEliminar.className = 'bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300';
                botonEliminar.onclick = function () {
                    eliminarOdontologo(botonEliminar);
                };

                accionesCelda.appendChild(botonEditar);
                accionesCelda.appendChild(botonEliminar);
                fila.appendChild(accionesCelda);
                tbody.appendChild(fila);
            });
        } catch (error) {
            console.error('Error al obtener odontólogos:', error);
        }
    }





    //--------------------------------------FUNCIONES DE EDICION------------------------------------------------

    function habilitarEdicion(btnEditar) {
        let fila = btnEditar.parentNode.parentNode;
        console.log(fila);
        for (var i = 1; i < fila.cells.length - 1; i++) {
            let celda = fila.cells[i];
            celda.contentEditable = true;
            celda.style.backgroundColor = "#f4f4f4";
        }

        btnEditar.innerHTML = "Guardar";
        btnEditar.onclick = function () {
            deshabilitarEdicion(btnEditar, fila);
        };
    }

    function deshabilitarEdicion(btnGuardar, fila) {
        const datosEditados = {
            id: fila.cells[0].textContent,
            matricula: fila.cells[1].textContent,
            nombre: fila.cells[2].textContent,
            apellido: fila.cells[3].textContent
        };

        fetch("/odontologo", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosEditados)
        })
            .then(response => {
                if (response.ok) {
                    fila.querySelectorAll('[contenteditable="true"]').forEach(celda => {
                        celda.contentEditable = false;
                        celda.classList.remove('bg-yellow-100');
                    });

                    fila.classList.remove('editando');
                    btnGuardar.innerHTML = "Editar";
                    btnGuardar.onclick = function () {
                        habilitarEdicion(btnGuardar);
                    };
                    swal("Exito!", "Odontologo actualizado con exito!", "success")
                    console.log('Odontólogo actualizado con éxito.');
                } else {
                    sweetAlert("Oops...", "Ha habido un problema al actualizar el Odontologo.", "error");
                    console.error('Error al actualizar odontólogo:', response.status);
                }
            })
            .catch(error => {
                console.error('Error al actualizar odontólogo:', error);
            });
    }

    //------------------------------------FUNCIONES DE ELIMINACION---------------------------------------
    function cancelarEliminar() {
        document.getElementById('modalEliminar').style.display = 'none';
    }


    function eliminar(btnEliminar) {
        document.getElementById('modalEliminar').style.display = 'flex';
        let idOdontologo = btnEliminar.parentNode.parentNode.cells[0].textContent;

        document.getElementById('eliminarConfirmar').onclick = function () {
            eliminarOdontologo(idOdontologo);
        };
    }

    function eliminarOdontologo(botonEliminar) {
        let fila = botonEliminar.parentNode.parentNode;
        console.log(fila);
        const idOdontologo = fila.cells[0].textContent;
        console.log(idOdontologo);

        let botonConfirmar = document.getElementById('eliminarConfirmar');
        let botonCancelar = document.getElementById('eliminarCancelar')

        document.getElementById('modalEliminar').style.display = 'flex';

        botonConfirmar.onclick = async function () {
            try {
                const response = await fetch(`/odontologo/${idOdontologo}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    document.getElementById('modalEliminar').style.display = 'none';
                    swal("Exito!", "Odontologo eliminado con exito!", "success")
                    console.log('Odontólogo eliminado con éxito.');
                } else {
                    sweetAlert("Oops...", "Hubo un problema al eliminar el Odontologo", "error");
                    console.error('Error al eliminar odontólogo:', response.status);
                }
            } catch (error) {
                console.error('Error al eliminar odontólogo:', error);
            }
            eliminarOdontologoConfirmado(fila);
        };

        botonCancelar.onclick = function () {
            cancelarEliminar();
        }

    }

    function eliminarOdontologoConfirmado(fila) {
        fila.parentNode.removeChild(fila);
    }

});
