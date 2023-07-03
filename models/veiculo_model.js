import { INTEGER, Sequelize } from "sequelize"
import db from "../config/database.js"

const {DataTypes} = Sequelize

// Mapea tabela "departamento"
export const Veiculo = db.define("veiculo", {
    cod_veiculo: {
        type: DataTypes.INTEGER, // Declaração de tipo pode ser feito assim
        primaryKey: true
    },
    placa_veiculo: {
        type: Sequelize.STRING(10) // Ou ser declarada assim
    },
    preco_veiculo: {
        type: Sequelize.FLOAT
    },
    proprietario: {
        type: INTEGER,
    }, 
    tipo: {
        type: INTEGER,
    }
}, {
    timestamps: false,
    freezeTableName: true
})

export const Proprietario = db.define("proprietario", {
    cod_proprietario: {
        type: DataTypes.INTEGER, // Declaração de tipo pode ser feito assim
        primaryKey: true
    },
    cpf: {
        type: Sequelize.STRING(14) // Ou ser declarada assim
    },
    nome: {
        type: Sequelize.STRING(100)
    },
    telefone: {
        type: Sequelize.STRING(15)
    }
}, {
    timestamps: false,
    freezeTableName: true
})

export const tipoVeiculos = db.define("tipoVeiculo", {
    cod_tipo: {
        type: DataTypes.INTEGER, // Declaração de tipo pode ser feito assim
        primaryKey: true
    },
    descricao_tipo: {
        type: Sequelize.STRING(20) // Ou ser declarada assim
    }
}, {
    timestamps: false,
    freezeTableName: true
})

// Configurando as associações
Veiculo.belongsTo(Proprietario, { foreignKey: 'proprietario', as:'tb_proprietario'});
Proprietario.hasMany(Veiculo, { foreignKey: 'proprietario'});
Veiculo.belongsTo(tipoVeiculos, { foreignKey: 'tipo'});
tipoVeiculos.hasMany(Veiculo, { foreignKey: 'tipo'});
// Sincronizando os modelos com o banco de dados
db.sync({ force: false })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar as tabelas:', error);
  });

export default {Veiculo, Proprietario, tipoVeiculos}