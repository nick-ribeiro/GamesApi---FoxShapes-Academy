const Configuration = require('./Configurations');
const User = require('./User'); // Importa o modelo User

class ConfigurationsDAO {

    // Obtém todas as configurações de um usuário
    async getAllByUsuario(usuarioId) {
        try {
            return await Configuration.findAll({
                where: { usuario_id: usuarioId },  // Filtra pela chave estrangeira
                include: User,  // Inclui as informações do usuário
            });
        } catch (error) {
            console.error("Erro ao buscar configurações do usuário:", error);
            throw error;
        }
    }

    // Cria uma nova configuração
    async add(configuration) {
        try {
            return await Configuration.create(configuration);  // Cria uma nova configuração no banco
        } catch (error) {
            console.error("Erro ao adicionar configuração:", error);
            throw error;
        }
    }

    // Atualiza uma configuração
    async update(id, configuration) {
        try {
            const [updated] = await Configuration.update(configuration, { where: { id: id } });
            return updated ? await Configuration.findByPk(id) : null;
        } catch (error) {
            console.error("Erro ao atualizar configuração:", error);
            throw error;
        }
    }

    // Deleta uma configuração
    async delete(id) {
        try {
            const deleted = await Configuration.destroy({ where: { id: id } });
            return deleted > 0;
        } catch (error) {
            console.error("Erro ao deletar configuração:", error);
            throw error;
        }
    }

    // Obtém uma configuração específica por ID
    async getById(id) {
        try {
            return await Configuration.findByPk(id);  // Busca a configuração pelo ID
        } catch (error) {
            console.error("Erro ao buscar configuração por ID:", error);
            throw error;
        }
    }
}

module.exports = ConfigurationsDAO;