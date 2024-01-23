const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//READ
app.get('/', (req, res) => {
    res.send(`<h1>Lista de usuarios</h1>
    <ul>${usuarios.map((user) => `<li>ID: ${user.id} | Nombre: ${user.nombre} | Edad: ${user.edad} | Lugar de Procedencia: ${user.lugarProcedencia}
    </li>`).join(" ")}
    </ul>
    <form action="/usuarios" method="post">
    <label for="nombre">Nombre:</label>
    <input type="type" id="nombre" name="nombre" required>
    <label for="edad">Edad:</label>
    <input type="type" id="edad" name="edad" required>
    <label for="lugarProcedencia">Lugar de procedencia:</label>
    <input type="type" id="lugarProcedencia" name="lugarProcedencia" required>
    <button type="submit">Agregar usuario</button>
    </form>
    <a href="/usuarios">usuarios json</a>
    `)
})

//CREATE
app.get('/usuarios', (req, res) => {
    res.json(usuarios)
});

//POST
app.post('/usuarios', (req, res) => {
    const newUser = {
        id: usuarios.length +1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(newUser);
    res.redirect('/');
})

//RUTA PARA UN SOLO USUARIO
app.get("/usuarios/:nombre", (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find(user => user.nombre === nombre);

    if(!usuario) {
        res.status(404).json({mensaje: "usuario no encontrado"})
    } else {
        res.json(usuario)
    }
})
/* Corrección de Sori
app.put('/usuarios/:nombre', (req, res) => {
    const nombreUsuario = req.params.nombre;
    const index = usuarios.findIndex(usuario => usuario.nombre === nombre) 
    if (index !== -1) {
        usuarios[index] = {id: usuarios[index].id, ...req.body}
        res.json(usuarios)
    } else {
        res.status(404).json({mensaje: "usuario no encontrado"})
    }
});
*/

const port = 3000;
app.listen(3000, () => {
    console.log(`Express está escuchando en el puerto http://localhost:${port}`);
});

