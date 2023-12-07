window.addEventListener('load', function () {

    cargarPacientes();

    async function cargarPacientes() {
        try {
            const tabla = document.getElementById('tablaPacientes');
            const tbody = tabla.getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';
            const response = await fetch('/paciente/todos');
            const pacientes = await response.json();
            console.log(pacientes);

            pacientes.forEach(paciente => {
                const fila = document.createElement('tr');

                const idCelda = document.createElement('td');
                idCelda.textContent = paciente.id;
                fila.appendChild(idCelda);

                const nombreCelda = document.createElement('td');
                nombreCelda.textContent = paciente.nombre;
                fila.appendChild(nombreCelda);

                const apellidoCelda = document.createElement('td');
                apellidoCelda.textContent = paciente.apellido;
                fila.appendChild(apellidoCelda);

                const cedulaCelda = document.createElement('td');
                cedulaCelda.textContent = paciente.cedula;
                fila.appendChild(cedulaCelda);

                const fechaIngresoCelda = document.createElement('td');
                fechaIngresoCelda.textContent = paciente.fechaIngreso;
                fila.appendChild(fechaIngresoCelda);

                const calleCelda = document.createElement('td');
                calleCelda.textContent = paciente.domicilio.calle;
                fila.appendChild(calleCelda);

                const numeroCelda = document.createElement('td');
                numeroCelda.textContent = paciente.domicilio.numero;
                fila.appendChild(numeroCelda);

                const localidadCelda = document.createElement('td');
                localidadCelda.textContent = paciente.domicilio.localidad;
                fila.appendChild(localidadCelda);

                const provinciaCelda = document.createElement('td');
                provinciaCelda.textContent = paciente.domicilio.provincia;
                fila.appendChild(provinciaCelda);

                const emailCelda = document.createElement('td');
                emailCelda.textContent = paciente.email;
                fila.appendChild(emailCelda);

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
                    eliminarPaciente(botonEliminar);
                };

                accionesCelda.appendChild(botonEditar);
                accionesCelda.appendChild(botonEliminar);
                fila.appendChild(accionesCelda);
                tbody.appendChild(fila);
            });
        } catch (error) {
            console.error('Error al cargar pacientes:', error);
        }

    }
    // -----------------------------FUNCIONES EDICION---------------------

    function habilitarEdicion(btnEditar) {
        let fila = btnEditar.parentNode.parentNode;
        console.log(fila);

        for (let i = 1; i < fila.cells.length - 1; i++) {
            let celda = fila.cells[i];
            celda.contentEditable = true;
            celda.style.backgroundColor = "#f4f4f4";
        }

        btnEditar.textContent = "Guardar";
        btnEditar.onclick = function () {
            deshabilitarEdicion(btnEditar, fila);
        };
    }
    function deshabilitarEdicion(btnGuardar, fila) {
        const datosEditados = {
            id: fila.cells[0].textContent,
            nombre: fila.cells[1].textContent,
            apellido: fila.cells[2].textContent,
            cedula: fila.cells[3].textContent,
            fechaIngreso: fila.cells[4].textContent,
            calle: fila.cells[5].textContent,
            numero: fila.cells[6].textContent,
            localidad: fila.cells[7].textContent,
            provincia: fila.cells[8].textContent,
            email: fila.cells[9].textContent
        };

        const updatePcte = {
            id: datosEditados.id,
            nombre: datosEditados.nombre,
            apellido: datosEditados.apellido,
            cedula: datosEditados.cedula,
            fechaIngreso: datosEditados.fechaIngreso,
            domicilio: {
                calle: datosEditados.calle,
                numero: datosEditados.numero,
                localidad: datosEditados.localidad,
                provincia: datosEditados.provincia
            },
            email: datosEditados.email
        };
        console.log(updatePcte);

        fetch("/paciente", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatePcte)
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
                    swal("Exito!", "Paciente actualizado con exito!", "success")

                    console.log('Paciente actualizado con exito.');
                } else {
                    sweetAlert("Oops...", "No se ha podido actualizar el paciente.", "error");
                    console.error('Error al actualizar paciente:', response.status);
                }
            })
            .catch(error => {
                console.error('Error al actualizar paciente:', error);
            });
    }



    // --------------------FUNCION ELIMINAR-----------------------------

    function cancelarEliminar() {
        document.getElementById('modalEliminar').style.display = 'none';
    }


    function eliminar(btnEliminar) {
        document.getElementById('modalEliminar').style.display = 'flex';
        let idPaciente = btnEliminar.parentNode.parentNode.cells[0].textContent;

        document.getElementById('eliminarConfirmar').onclick = function () {
            eliminarPaciente(idPaciente);
        };
    }

    function eliminarPaciente(botonEliminar) {
        let fila = botonEliminar.parentNode.parentNode;
        console.log(fila);
        const idPaciente = fila.cells[0].textContent;
        console.log(idPaciente);

        let botonConfirmar = document.getElementById('eliminarConfirmar');
        let botonCancelar = document.getElementById('eliminarCancelar')

        document.getElementById('modalEliminar').style.display = 'flex';

        botonConfirmar.onclick = async function () {
            try {
                const response = await fetch(`/paciente/${idPaciente}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    document.getElementById('modalEliminar').style.display = 'none';
                    swal("Exito!", "Paciente eliminado.", "success")

                    console.log('Paciente eliminado con éxito.');
                } else {
                    sweetAlert("Oops...", "No se ha podido eliminar el paciente.", "error");
                    console.error('Error al eliminar Paciente:', response.status);
                }
            } catch (error) {
                console.error('Error al eliminar Paciente:', error);
            }
            eliminarPacienteConfirmado(fila);
        };

        botonCancelar.onclick = function () {
            cancelarEliminar();
        }

    }

    function eliminarPacienteConfirmado(fila) {
        fila.parentNode.removeChild(fila);
    }



});

