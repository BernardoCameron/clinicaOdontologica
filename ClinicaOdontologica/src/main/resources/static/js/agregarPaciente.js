window.addEventListener('load', function () {
    const formulario = document.getElementById('formularioPaciente');

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const cedula = document.getElementById('cedula').value;
        const fechaIngreso = document.getElementById('fechaIngreso').value;
        const calle = document.getElementById('calle').value;
        const numero = document.getElementById('numero').value;
        const localidad = document.getElementById('localidad').value;
        const provincia = document.getElementById('provincia').value;
        const email = document.getElementById('email').value;
        console.log(nombre);

        const datosPaciente = {
            nombre: nombre,
            apellido: apellido,
            cedula: cedula,
            fechaIngreso: fechaIngreso,
            domicilio: {
                calle: calle,
                numero: numero,
                localidad: localidad,
                provincia: provincia
            },
            email: email
        };

        console.log(datosPaciente);

        fetch('/paciente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosPaciente)
        })
            .then(response => {
                if (response.ok) {
                    swal("Paciente registrado con exito!", "Se ha registrado correctamente al paciente.", "success");
                } else {
                    sweetAlert("Oops...", "No se ha podido registrar al paciente.", "error");
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });


    });
});

