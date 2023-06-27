// Esse tipo de import funciona porque o "type" foi especificado como "module" em package.json
import express from "express"
import cors from "cors"
import db from "./config/database.js"
// import Router from "./routers/veiculo_routes.js"
import bodyParser from "body-parser"
import dotenv from "dotenv-safe"
dotenv.config()

import http from "http"

import jwt from "jsonwebtoken"

const server = express()
server.use(express.json())
server.use(cors())
// Foi necessário adicionar o trecho abaixo, para receber o user e pwd, pois estavam vindo como undefined
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.post('/login', verifyJWT, (req, res) => {
    const user = req.body.user
    const pwd = req.body.pwd
    if ((user == "Gustavo") && (pwd == "123")){
        const id = 1
        const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: 300
        })
        return res.json({auth: true, token: token})
    }
    res.status(500).json({message: `Login inválido`})
})

function verifyJWT(req, res, next){
    // Da mesma forma para o user e pwd, foi necessário adicionar o 'jwt.sign' para autenticar
    var secret = req.headers.authorization
    const token = jwt.sign({foo: 'bar'}, secret)
    console.log(token)
    if (!token) return res.status(401).json({auth: false, message: "Não há Token!"})
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).json({auth: false, message: `Erro na autenticação do Token! ${err}`})
        
        req.userId = decoded.id
        next()
    })
}

try{
    await db.authenticate()
    console.log("Conexão com o MySQL estabelecida!")
} catch (err) {
    console.error("Conexão com o MySQL não estabelecida!")
}

// server.use(Router)
server.listen(5000, () => console.log("Server executando em http://localhost:5000!"))