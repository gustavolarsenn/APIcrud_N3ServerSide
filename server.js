// Esse tipo de import funciona porque o "type" foi especificado como "module" em package.json
import express from "express"
import cors from "cors"
import db from "./config/database.js"
import Router from "./routers/veiculo_routes.js"

const server = express()
server.use(express.json())
server.use(cors())

try{
    await db.authenticate()
    console.log("Conexão com o MySQL estabelecida!")
} catch (err) {
    console.error("Conexão com o MySQL não estabelecida!")
}

server.use(Router)
server.listen(5000, () => console.log("Server executando em http://localhost:5000!"))