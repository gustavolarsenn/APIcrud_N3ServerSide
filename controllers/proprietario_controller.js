import {Proprietario} from "../models/veiculo_model.js";
import { Sequelize } from "sequelize"
const Op = Sequelize.Op;

// Busca todos os Proprietario registrados na tabela por meio do método findAll
export const getProprietario = async (req, res) => {
    try{
        const proprietario = await Proprietario.findAll()
        res.send(proprietario)
    } catch (err) {
        console.log("Erro ao acessar a tabela proprietario!", err)
    }
}

// Insere registros na tabela proprietario por meio do método 'create'
export const createProprietario = async (req, res) => {
    try {
        await Proprietario.create(req.body)
        res.json({
            "message":"Um novo registro de proprietario foi inserido no Banco de Dados!"
        })
    } catch(err) {
        console.log("Não foi possível inserir um novo registro!")
    }
}

// Deleta registro, conferir se não há forma melhor
export const deleteProprietario = async (req, res) => {
    try {
        await Proprietario.destroy({
            where: {
                cod_proprietario: req.params.cod_proprietario
            }
        })
        res.json({
            "message":"Registro apagado com sucesso!"
        })
    } catch (err) {
        console.log("Não foi possivel apagar o registro!", err)
    }
}

// Atualiza dados 
export const updateProprietario = async (req, res) => {
    try {
        await Proprietario.update(req.body, {
            where: {
                cod_proprietario: req.params.cod_proprietario
            }
        })
        res.json({
            "message":"Registro atualizado com sucesso!"
        })
    } catch (err) {
        console.log("Não foi possível atualizar o registro!", err)
    }
}