class FeedbackController {

    constructor(feedbackDao) {
        this.feedbackDao = feedbackDao;
    }

    // Retorna todos os feedbacks de um usuário
    async getFeedbacks(req, res) {
        const usuarioId = req.params.usuario_id;
        try {
            const feedbacks = await this.feedbackDao.getAllByUsuario(usuarioId);
            if (feedbacks && feedbacks.length > 0) {
                return res.status(200).json(feedbacks);
            } else {
                return res.status(404).json({ error: "Nenhum feedback encontrado para o usuário" });
            }
        } catch (error) {
            console.error("Erro ao buscar feedbacks:", error);
            return res.status(500).json({ error: "Erro ao buscar feedbacks" });
        }
    }

    // Retorna o feedback de um usuário em um nível específico
    async getFeedbackByNivel(req, res) {
        const usuarioId = req.params.usuario_id;
        const nivelId = req.params.nivel_id;
        try {
            const feedback = await this.feedbackDao.getByUsuarioAndNivel(usuarioId, nivelId);
            if (feedback) {
                return res.status(200).json(feedback);
            } else {
                return res.status(404).json({ error: "Feedback não encontrado para o usuário neste nível" });
            }
        } catch (error) {
            console.error("Erro ao buscar feedback:", error);
            return res.status(500).json({ error: "Erro ao buscar feedback" });
        }
    }

    // Cria um novo feedback
    async createFeedback(req, res) {
        const feedback = req.body;
        try {
            if (this.validaFeedback(feedback)) {
                const newFeedback = await this.feedbackDao.add(feedback);
                return res.status(201).json(newFeedback);
            } else {
                return res.status(400).json({ error: "Feedback inválido" });
            }
        } catch (error) {
            console.error("Erro ao criar feedback:", error);
            return res.status(500).json({ error: "Erro ao criar feedback" });
        }
    }

    // Atualiza um feedback
    async updateFeedback(req, res) {
        const id = req.params.id;
        const feedbackUpdates = req.body;
        try {
            const updatedFeedback = await this.feedbackDao.update(id, feedbackUpdates);
            if (updatedFeedback) {
                return res.status(200).json(updatedFeedback);
            } else {
                return res.status(404).json({ error: "Feedback não encontrado para atualização" });
            }
        } catch (error) {
            console.error("Erro ao atualizar feedback:", error);
            return res.status(500).json({ error: "Erro ao atualizar feedback" });
        }
    }

    // Deleta um feedback
    async deleteFeedback(req, res) {
        const id = req.params.id;
        try {
            const isDeleted = await this.feedbackDao.delete(id);
            if (isDeleted) {
                return res.status(204).send();  // No content, indicando sucesso na deleção
            } else {
                return res.status(404).json({ error: "Feedback não encontrado para deletar" });
            }
        } catch (error) {
            console.error("Erro ao deletar feedback:", error);
            return res.status(500).json({ error: "Erro ao deletar feedback" });
        }
    }

    // Função de validação do feedback
    validaFeedback(feedback) {
        return feedback && feedback.usuario_id && feedback.nivel_id && feedback.pontos_fortes && feedback.pontos_melhorar;
    }
}

module.exports = FeedbackController;