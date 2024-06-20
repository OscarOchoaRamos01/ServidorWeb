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
    $('#login-btn').click(function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        
        // Realizar la solicitud AJAX para iniciar sesión
        $.ajax({
            url: '/login',
            method: 'POST',
            data: { username: username, password: password },
            success: function(response) {
                // Mostrar el mensaje de inicio de sesión exitoso
                $('#login-message').show();
                $('#login-status').text(response.message);
            },
            error: function(xhr, status, error) {
                // Mostrar el mensaje de error de inicio de sesión
                $('#login-message').show();
                $('#login-status').text(xhr.responseJSON.message);
            }
        });
    });
});
