import express from "express"
import {getVeiculo, createVeiculo, deleteVeiculo, updateVeiculo, getVeiculoByProprietario, getVeiculoByTipo} from "../controllers/veiculo_controller.js" // , getVeiculoByTipo
import {getProprietario, createProprietario, deleteProprietario, updateProprietario} from "../controllers/proprietario_controller.js"
import { getTipoVeiculo, createTipoVeiculo, deleteTipoVeiculo, updateTipoVeiculo } from "../controllers/tipoVeiculo_controller.js"

const router = express.Router()

router.get('/veiculo', getVeiculo)
router.get('/veiculo/proprietario/:nome', getVeiculoByProprietario)
router.get('/veiculo/descricao/:descricao_tipo', getVeiculoByTipo)
router.post('/veiculo', createVeiculo)
router.put('/veiculo/:cod_veiculo', updateVeiculo)
router.delete('/veiculo/:cod_veiculo', deleteVeiculo)

router.get('/proprietario', getProprietario)
router.post('/proprietario', createProprietario)
router.put('/proprietario/:cod_proprietario', updateProprietario)
router.delete('/proprietario/:cod_proprietario', deleteProprietario)

router.get('/tipoveiculo', getTipoVeiculo)
router.post('/tipoveiculo', createTipoVeiculo)
router.put('/tipoveiculo/:cod_tipo', updateTipoVeiculo)
router.delete('/tipoveiculo/:cod_tipo', deleteTipoVeiculo)

export default router