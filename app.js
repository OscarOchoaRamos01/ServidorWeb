const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs');
// Configuración de middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'Contactanos')));
app.use(express.static(path.join(__dirname, 'Login')));
app.use(express.static(path.join(__dirname)));

// Configuración de conexión a MySQL
let conexion = mysql.createConnection({
    host: "mysql-344b570b-vallegrande-161c.d.aivencloud.com",
    database: "db_consultas",
    user: "avnadmin",
    password: "AVNS_u8NtKzD1djLoParRG_W",
    port: 15909
});


conexion.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos.');
});

// Manejo de la solicitud POST del formulario
app.post('/submit-form', (req, res) => {
    const { nombres, apellidos, celular, gmail, consulta } = req.body;

    const query = 'INSERT INTO Consultas (nombres, apellidos, celular, gmail, consulta) VALUES (?, ?, ?, ?, ?)';
    conexion.query(query, [nombres, apellidos, celular, gmail, consulta], (err, result) => {
        if (err) {
            console.error('Error al insertar datos: ' + err.stack);
            res.status(500).send('Ocurrió un error al procesar tu consulta.');
            return;
        }


        const htmlPath = path.join(__dirname, 'Redirectorio.html');
        fs.readFile(htmlPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo HTML: ' + err);
                res.status(500).send('Ocurrió un error al procesar tu consulta.');
                return;
            }
            res.send(data);
        });
    });
});

// Manejo de la solicitud POST del formulario de registro
app.post('/registro', (req, res) => {
    const { nombre_completo, correo_electronico, usuario, contraseña } = req.body;

    const query = 'INSERT INTO usuarios (nombre_completo, correo_electronico, usuario, contraseña) VALUES (?, ?, ?, ?)';
    conexion.query(query, [nombre_completo, correo_electronico, usuario, contraseña], (err, result) => {
        if (err) {
            console.error('Error al insertar datos: ' + err.stack);
            return res.status(500).json({ message: 'Ocurrió un error al procesar tu registro.' });
        }

        const htmlPath = path.join(__dirname, 'Redirectorio2.html');
        fs.readFile(htmlPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo HTML: ' + err);
                res.status(500).send('Ocurrió un error al procesar tu consulta.');
                return;
            }
            res.send(data);
        });
    });
});


// Manejo de la solicitud POST del formulario de inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?';
    conexion.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Error al verificar datos: ' + err.stack);
            return res.status(500).json({ message: 'Ocurrió un error al procesar tu solicitud.' });
        }

        const htmlPath = path.join(__dirname, 'Redirectorio3.html');
        fs.readFile(htmlPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo HTML: ' + err);
                res.status(500).send('Ocurrió un error al procesar tu consulta.');
                return;
            }
            res.send(data);
        });
    });
});




//calendario..
app.get("/", function (req, res) {
    console.log("Ruta inicial");
    res.send("Ruta inicial");
});

app.get("/api/dates/:current", (req, res) => {
    var request = req.params.current;
    console.log(`Received request for date: ${request}`);

    const query = "SELECT NAMECAL, DESCCAL, DATE_FORMAT(DATECAL, '%d/%m/%Y') AS DATECAL FROM calendario WHERE DATECAL = ?";

    conexion.query(query, [request], function (err, rows, fields) {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.json(null);
        }
    });
});


// Ruta para obtener las noticias
app.get('/api/news', (req, res) => {
    // Ejecutar una consulta SQL para obtener las noticias
    const query = 'SELECT title, description, image_url FROM noticias';
    conexion.query(query, (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error al obtener las noticias' });
            return;
        }
        // Enviar los resultados de la consulta como respuesta
        res.json(results);
    });
});





// Servir el archivo HTML principal para Contactanos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Contactanos', 'contactanos.html'));
});

// Servir el archivo HTML principal para Login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Login', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${port}`);
});
