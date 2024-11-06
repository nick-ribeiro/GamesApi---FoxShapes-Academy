const Feedback = require('./Feedback');
const User = require('./User');
const Level = require('./Level');

class FeedbackDAO {

    // Obtém todos os feedbacks de um usuário
    async getAllByUsuario(usuarioId) {
        try {
            return await Feedback.findAll({
                where: { usuario_id: usuarioId },
                include: [User, Level],  // Inclui dados do User e Level relacionados
            });
        } catch (error) {
            console.error("Erro ao buscar feedbacks do usuário:", error);
            throw error;
        }
    }

    // Obtém o feedback de um usuário em um nível específico
    async getByUsuarioAndNivel(usuarioId, nivelId) {
        try {
            return await Feedback.findOne({
                where: { usuario_id: usuarioId, nivel_id: nivelId },
                include: [User, Level],  // Inclui dados do User e Level relacionados
            });
        } catch (error) {
            console.error("Erro ao buscar feedback do usuário no nível:", error);
            throw error;
        }
    }

    // Cria um novo feedback
    async add(feedback) {
        try {
            return await Feedback.create(feedback);
        } catch (error) {
            console.error("Erro ao adicionar feedback:", error);
            throw error;
        }
    }

    // Atualiza um feedback
    async update(id, feedback) {
        try {
            const [updated] = await Feedback.update(feedback, { where: { id: id } });
            return updated ? await Feedback.findByPk(id) : null;
        } catch (error) {
            console.error("Erro ao atualizar feedback:", error);
            throw error;
        }
    }

    // Deleta um feedback
    async delete(id) {
        try {
            const deleted = await Feedback.destroy({ where: { id: id } });
            return deleted > 0;
        } catch (error) {
            console.error("Erro ao deletar feedback:", error);
            throw error;
        }
    }

    // Obtém um feedback por ID
    async getById(id) {
        try {
            return await Feedback.findByPk(id, {
                include: [User, Level],  // Inclui dados do User e Level relacionados
            });
        } catch (error) {
            console.error("Erro ao buscar feedback por ID:", error);
            throw error;
        }
    }
}

module.exports = FeedbackDAO;