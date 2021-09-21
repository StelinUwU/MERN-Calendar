const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      events: "/api/events",
    };

    //Conexión con la db
    this.connectDB();

    //Middlewares (Función que siempre se ejecuta cuando levantemos el sv)
    this.middlewares();
    //Routas de mi app
    this.routes();
  }
  middlewares() {
    //Cors
    this.app.use(cors());

    //Directorio public
    this.app.use(express.static("public"));

    //Lectura y parseo del body
    this.app.use(express.json());
  }
  async connectDB() {
    await dbConnection();
  }
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.events, require("../routes/events"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
