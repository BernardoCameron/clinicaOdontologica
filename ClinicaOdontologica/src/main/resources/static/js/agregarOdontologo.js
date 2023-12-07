window.addEventListener('load', function () {
    function handleSubmit() {
        const matricula = document.getElementById('matricula').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;

        const data = {
            matricula: matricula,
            nombre: nombre,
            apellido: apellido
        };
        fetch('/odontologo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    swal("Exito!", "Se ha registrado al Odontologo.", "success")
                } else {
                    sweetAlert("Oops...", "No se ha podido registrar al Odontologo, vuelve a intentar.", "error");
                }
            })
            .catch(error => {
                console.error('Error al enviar el formulario:', error);
                document.getElementById('modalError').classList.remove('hidden');
            });
    }

    const btnGuardar = document.getElementById('btnGuardar');
    btnGuardar.addEventListener('click', handleSubmit);

});