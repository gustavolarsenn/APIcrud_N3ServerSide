import {tipoVeiculos} from "../models/veiculo_model.js";
import { Sequelize } from "sequelize"
const Op = Sequelize.Op;

// Busca todos os tipoVeiculos registrados na tabela por meio do método findAll
export const getTipoVeiculo = async (req, res) => {
    try{
        const tipoVeiculo = await tipoVeiculos.findAll()
        res.send(tipoVeiculo)
    } catch (err) {
        console.log("Erro ao acessar a tabela tipoVeiculo!", err)
    }
}

// Insere registros na tabela tipoVeiculo por meio do método 'create'
export const createTipoVeiculo = async (req, res) => {
    try {
        await tipoVeiculos.create(req.body)
        res.json({
            "message":"Um novo registro de tipoVeiculo foi inserido no Banco de Dados!"
        })
    } catch(err) {
        console.log("Não foi possível inserir um novo registro!")
    }
}

// Deleta registro, conferir se não há forma melhor
export const deleteTipoVeiculo = async (req, res) => {
    try {
        await tipoVeiculos.destroy({
            where: {
                cod_tipo: req.params.cod_tipo
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
export const updateTipoVeiculo = async (req, res) => {
    try {
        await tipoVeiculos.update(req.body, {
            where: {
                cod_tipo: req.params.cod_tipo
            }
        })
        res.json({
            "message":"Registro atualizado com sucesso!"
        })
    } catch (err) {
        console.log("Não foi possível atualizar o registro!", err)
    }
}