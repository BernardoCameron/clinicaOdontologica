window.addEventListener('load', function () {

    cargarOdontologos()
    cargarPacientes()
    cargarTurnos()

    let listaOdontologos;

    async function cargarOdontologos() {
        try {
            const responseOdontologos = await fetch("/odontologo/todos")
            listaOdontologos = await responseOdontologos.json();
            console.log(listaOdontologos);

            const selectOdontologo = document.getElementById("filtroOdontologo");

            listaOdontologos.forEach(odontologo => {
                const nombreOdontologo = odontologo.nombre + " " + odontologo.apellido;

                const option = document.createElement("option");
                option.value = odontologo.id;
                option.textContent = nombreOdontologo;

                selectOdontologo.appendChild(option);
            });

        } catch (error) {
            console.log("Error al cargar los Odontologos");
        }
    }

    let listaPacientes;
    async function cargarPacientes() {
        try {
            const responsePacientes = await fetch("/paciente/todos")
            listaPacientes = await responsePacientes.json();
            console.log(listaPacientes);

            const selectPaciente = document.getElementById("filtroPaciente");

            listaPacientes.forEach(odontologo => {
                const nombreOdontologo = odontologo.nombre + " " + odontologo.apellido;

                const option = document.createElement("option");
                option.value = odontologo.id;
                option.textContent = nombreOdontologo;

                selectPaciente.appendChild(option);
            });

        } catch (error) {
            console.log("Error al cargar los Pacientes");
        }
    }

    let listaTurnos;

    async function cargarTurnos() {
        try {
            const responseTurnos = await fetch("/turnos")
            listaTurnos = await responseTurnos.json();
            console.log(listaTurnos);


        } catch (error) {
            console.log("Error al cargar los Pacientes");
        }
    }

    const btnBuscarPaciente = document.getElementById("btnBuscarPaciente");
    const btnBuscarOdontologo = document.getElementById("btnBuscarOdontologo");

    btnBuscarPaciente.addEventListener('click', function () {
        const pacienteSeleccionadoId = document.getElementById("filtroPaciente").value;
        console.log("Lista", listaTurnos);
        const turnosPaciente = listaTurnos.filter(turno => turno.pacienteId === parseInt(pacienteSeleccionadoId));
        console.log(turnosPaciente);
        mostrarDatosTurno(turnosPaciente);

    });

    btnBuscarOdontologo.addEventListener('click', function () {
        const odontologoSeleccionadoId = document.getElementById("filtroOdontologo").value;
        const turnosOdontologo = listaTurnos.filter(turno => turno.odontologoId === parseInt(odontologoSeleccionadoId));
        mostrarDatosTurno(turnosOdontologo);
    });

    function mostrarDatosTurno(turnos) {
        const contenedorTurnos = document.getElementById("contenedorTurnos");
        contenedorTurnos.innerHTML = '';
        turnos.forEach(turno => {
            const paciente = listaPacientes.find(p => p.id === turno.pacienteId);
            const odontologo = listaOdontologos.find(o => o.id === turno.odontologoId);

            if (paciente && odontologo) {
                const turnoElemento = document.createElement("div");
                turnoElemento.classList.add("turno-container", "flex", "pr-3", "pb-6", "justify-around", "pt-6"); // Agregar clase para el estilo
                turnoElemento.innerHTML = `
                    <div><strong>Paciente:</strong> ${paciente.nombre} ${paciente.apellido}</div>
                    <div><strong>Odontólogo:</strong> ${odontologo.nombre} ${odontologo.apellido}</div>
                    <div><strong>Fecha de turno:</strong> ${turno.fechaTurno}</div>
                    <hr>
                `;
                contenedorTurnos.appendChild(turnoElemento);
                const separador = document.createElement('hr');
                contenedorTurnos.appendChild(separador);
            }
        });
    }



})