// const db = require("./models/index")
// const { app, port } = require("./app")
// require("dotenv").config();



// // function for conecting to database and conecting to the server
// function conection_db_server() {

//     db()
//         .then(msg => {


//             //if the conection with the db is successfull
//             app.listen(port, () => {
//                 console.log(`Conected to the database, Servidor funcionando en el puerto ${port}`);

//             });

//         })
//         .catch(err => {
//             console.log("cant conect to the database " + err)
//         })

// }

// //function to close server

// async function closeServer() {

//     const serverClose = app.listen().close()
//     console.log(serverClose)
// }

// //running server
// conection_db_server()


// module.exports = {
//     conection_db_server,
//     closeServer
// }