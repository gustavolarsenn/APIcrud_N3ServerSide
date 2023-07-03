import {Veiculo, Proprietario, tipoVeiculos} from "../models/veiculo_model.js";
import { Sequelize } from "sequelize"
const Op = Sequelize.Op;

// Busca todos os veiculos registrados na tabela por meio do método findAll
export const getVeiculo = async (req, res) => {
    try{
        const veiculo = await Veiculo.findAll() // método findAll "substitui" o SELECT * FROM tabela
        res.send(veiculo)
    } catch (err) {
        console.log("Erro ao acessar a tabela veiculo!", err)
    }
}

// Insere registros na tabela veiculo por meio do método 'create'
export const createVeiculo = async (req, res) => {
    try {
        let veiculo = req.body

        if (veiculo.preco_veiculo < 50000) veiculo.tipo = 2
        else if (veiculo.preco_veiculo < 100000) veiculo.tipo = 1 
        else if (veiculo.preco_veiculo > 100000) veiculo.tipo = 3 

        await Veiculo.create(veiculo)
        res.json({
            "message":"Um novo registro de veiculo foi inserido no Banco de Dados!"
        })
    } catch(err) {
        console.log("Não foi possível inserir um novo registro!")
    }
}

// Deleta registro, conferir se não há forma melhor
export const deleteVeiculo = async (req, res) => {
    try {
        await Veiculo.destroy({
            where: {
                cod_veiculo: req.params.cod_veiculo
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
export const updateVeiculo = async (req, res) => {
    try {
        let veiculo = req.body

        if (veiculo.preco_veiculo < 50000) veiculo.tipo = 2
        else if (veiculo.preco_veiculo < 100000) veiculo.tipo = 1 
        else if (veiculo.preco_veiculo > 100000) veiculo.tipo = 3 
        
        await Veiculo.update(veiculo, {
            where: {
                cod_veiculo: req.params.cod_veiculo
            }
        })
        res.json({
            "message":"Registro atualizado com sucesso!"
        })
    } catch (err) {
        console.log("Não foi possível atualizar o registro!", err)
    }
}

export const getVeiculoByProprietario = async (req, res) => {
    try {
        const proprietario = await req.params.nome
        const veiculo_name = await Veiculo.findAll({
            include: [{
                model: Proprietario,
                as: 'tb_proprietario',
                attributes: ['nome'],
                where: {
                    nome: {
                        [Op.like]:  `%${proprietario}%`
                    },
                }
            },
        ]
        }
    )
    res.send(veiculo_name)
    } catch (err) {
        console.log("Não foi possível resgatar veiculo pelo proprietário!", err)
    }
}

export const getVeiculoByTipo = async (req, res) => {
    try {
        const tipoVeiculo = await req.params.descricao_tipo
        const veiculo_name = await Veiculo.findAll({
            include: [{
                model: tipoVeiculos,
                as: 'tipoVeiculo',
                attributes: ['descricao_tipo'],
                where: {
                    descricao_tipo: {
                        [Op.like]:  `%${tipoVeiculo}%`
                    },
                }
            },
        ]
        }
    )
    res.send(veiculo_name)
    } catch (err) {
        console.log("Não foi possível resgatar veiculo pelo tipo!", err)
    }
}

// export const getVeiculoByTipo = async