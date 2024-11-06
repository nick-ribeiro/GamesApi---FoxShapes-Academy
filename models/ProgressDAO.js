const Progress = require('../models/Progress'); // Importa o modelo Progress

class ProgressDAO {

    // Obtém todo o progresso de um usuário
    async getAllByUsuario(usuarioId) {
        try {
            return await Progress.findAll({ where: { usuario_id: usuarioId } });
        } catch (error) {
            console.error("Erro ao buscar progresso do usuário:", error);
        }
    }

    // Obtém o progresso de um usuário em um nível específico
    async getByUsuarioAndNivel(usuarioId, nivelId) {
        try {
            return await Progress.findOne({ where: { usuario_id: usuarioId, nivel_id: nivelId } });
        } catch (error) {
            console.error("Erro ao buscar progresso do usuário em nível específico:", error);
        }
    }

    // Adiciona um progresso
    async add(progress) {
        try {
            return await Progress.create(progress);
        } catch (error) {
            console.error("Erro ao adicionar progresso:", error);
        }
    }

    // Atualiza um progresso específico
    async update(id, progress) {
        try {
            const [updated] = await Progress.update(progress, { where: { id } });
            return updated ? await Progress.findByPk(id) : null;
        } catch (error) {
            console.error("Erro ao atualizar progresso:", error);
        }
    }

    // Deleta um progresso
    async delete(id) {
        try {
            const deleted = await Progress.destroy({ where: { id } });
            return deleted > 0;
        } catch (error) {
            console.error("Erro ao deletar progresso:", error);
        }
    }

    // Obtém um progresso por ID
    async getById(id) {
        try {
            return await Progress.findByPk(id);
        } catch (error) {
            console.error("Erro ao buscar progresso pelo ID:", error);
        }
    }
}

module.exports = ProgressDAO;