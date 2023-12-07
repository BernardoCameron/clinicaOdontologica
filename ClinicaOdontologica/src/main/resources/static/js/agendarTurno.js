window.addEventListener('load', async function () {
    const formularioTurno = document.getElementById('formularioTurno');

    async function cargarPacientes() {
        try {
            const response = await fetch('/paciente/todos');
            const pacientes = await response.json();
            const selectPaciente = document.getElementById('paciente');

            pacientes.forEach(paciente => {
                const option = document.createElement('option');
                option.value = JSON.stringify(paciente);
                option.text = `${paciente.nombre} ${paciente.apellido}`;
                option.setAttribute('data-paciente', JSON.stringify(paciente));
                selectPaciente.add(option);
            });
        } catch (error) {
            console.error('Error al cargar pacientes:', error);
        }
    }

    async function cargarOdontologos() {
        try {
            const response = await fetch('/odontologo/todos');
            const odontologos = await response.json();
            const selectOdontologo = document.getElementById('odontologo');

            odontologos.forEach(odontologo => {
                const option = document.createElement('option');
                option.value = JSON.stringify(odontologo);
                option.text = `${odontologo.nombre} ${odontologo.apellido}`;
                option.setAttribute('data-odontologo', JSON.stringify(odontologo)); //
                selectOdontologo.add(option);
            });
        } catch (error) {
            console.error('Error al cargar odontólogos:', error);
        }
    }

    formularioTurno.addEventListener('submit', function (e) {
        e.preventDefault();

        const pacienteSeleccionado = JSON.parse(document.getElementById('paciente').options[document.getElementById('paciente').selectedIndex].getAttribute('data-paciente'));

        const odontologoSeleccionado = JSON.parse(document.getElementById('odontologo').options[document.getElementById('odontologo').selectedIndex].getAttribute('data-odontologo'));

        const fechaSeleccionada = document.getElementById('fecha').value;

        const turno = {
            paciente: pacienteSeleccionado,
            odontologo: odontologoSeleccionado,
            fechaTurno: fechaSeleccionada
        };
        console.log(pacienteSeleccionado);




        console.log(JSON.stringify(turno));
        try {
            const response = fetch('/turnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(turno),
            });

            swal("Exito!", "Turno agendado con exito!", "success")

        } catch (error) {
            console.error('Error al agendar turno:', error);
        }
    });


    cargarPacientes();
    cargarOdontologos();
});