const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');

const users = [{
    userName: "Fernanda Alves",
    userEmail: "fernanda@gmail.com",
    userAge: "22",
    userUniqueId: '1'
},
{
    userName: "João Paulo",
    userEmail: "joao@gmail.com",
    userAge: "21",
    userUniqueId: '2'
},
{
    userName: "Ana Albuquerque",
    userEmail: "ana@gmail.com",
    userAge: "28",
    userUniqueId: '3'
}]

const app = express();

// Definindo o EJS como view engine
app.set('view engine', 'ejs');

// Middleware para servir arquivos estáticos (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Body parser para lidar com requests do tipo JSON e form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Rota para a página principal
app.get("/", function (req, res) {
    res.render("home", {
        data: users
    });
});

// Adicionar um novo usuário
app.post("/", (req, res) => {
    const inputUserName = req.body.userName;
    const inputUserEmail = req.body.userEmail;
    const inputUserAge = req.body.userAge;
    const inputUserUniqueId = req.body.userUniqueId;

    users.push({
        userName: inputUserName,
        userEmail: inputUserEmail,
        userAge: inputUserAge,
        userUniqueId: inputUserUniqueId
    });

    res.render("home", {
        data: users
    });
});

// Deletar um usuário
app.post('/delete', (req, res) => {
    var requestedUserUniqueId = req.body.userUniqueId;
    var j = 0;
    users.forEach(user => {
        j = j + 1;
        if (user.userUniqueId === requestedUserUniqueId) {
            users.splice((j - 1), 1);
        }
    });
    res.render("home", {
        data: users
    });
});

// Atualizar um usuário
app.post('/update', (req, res) => {
    const inputUserName = req.body.userName;
    const inputUserEmail = req.body.userEmail;
    const inputUserAge = req.body.userAge;
    const inputUserUniqueId = req.body.userUniqueId;

    var j = 0;
    users.forEach(user => {
        j = j + 1;
        if (user.userUniqueId === inputUserUniqueId) {
            user.userName = inputUserName;
            user.userEmail = inputUserEmail;
            user.userAge = inputUserAge;
        }
    });
    res.render("home", {
        data: users
    });
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
