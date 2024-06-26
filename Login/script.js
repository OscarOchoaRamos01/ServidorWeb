document.getElementById('login-toggle').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'none';
    this.classList.add('active');
    document.getElementById('register-toggle').classList.remove('active');
});

document.getElementById('register-toggle').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('forgot-password-form').style.display = 'none';
    this.classList.add('active');
    document.getElementById('login-toggle').classList.remove('active');
});

document.getElementById('forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'block';
    document.getElementById('login-toggle').classList.remove('active');
    document.getElementById('register-toggle').classList.remove('active');
});




$(document).ready(function() {
    $('#login-toggle').click(function() {
        $('#login-form').show();
        $('#register-form').hide();
        $('#forgot-password-form').hide();
        $('#login-toggle').addClass('active');
        $('#register-toggle').removeClass('active');
    });

    $('#register-toggle').click(function() {
        $('#login-form').hide();
        $('#register-form').show();
        $('#forgot-password-form').hide();
        $('#register-toggle').addClass('active');
        $('#login-toggle').removeClass('active');
    });

    $('#registerForm').submit(function(event) {
        event.preventDefault();
        const formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:3000/registro',
            data: formData,
            success: function(response) {
                // Redirigir o mostrar un mensaje de éxito
                window.location.href = 'Redirectorio2.html';
            },
            error: function(xhr) {
                if (xhr.status === 400) {
                    $('#register-error').text('El correo electrónico ya está registrado.').show();
                } else {
                    $('#register-error').text('Ocurrió un error al procesar tu registro.').show();
                }
            }
        });
    });
});

