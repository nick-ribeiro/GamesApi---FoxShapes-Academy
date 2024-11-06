class ProgressController {

    constructor(progressDao) {
        this.progressDao = progressDao;
    }

    // Retorna todo o progresso de um usuário
    async getProgress(req, res) {
        const usuarioId = req.params.usuarioId;
        try {
            const progress = await this.progressDao.getAllByUsuario(usuarioId);
            if (progress && progress.length > 0) {
                return res.status(200).json(progress);
            } else {
                return res.status(404).json({ error: "Nenhum progresso encontrado para este usuário" });
            }
        } catch (error) {
            console.error("Erro ao buscar progresso:", error);
            return res.status(500).json({ error: "Erro ao buscar progresso" });
        }
    }

    // Retorna o progresso de um usuário em um nível específico
    async getProgressByLevel(req, res) {
        const usuarioId = req.params.usuarioId;
        const nivelId = req.params.nivelId;
        try {
            const progress = await this.progressDao.getByUsuarioAndNivel(usuarioId, nivelId);
            if (progress) {
                return res.status(200).json(progress);
            } else {
                return res.status(404).json({ error: "Nenhum progresso encontrado para este usuário e nível" });
            }
        } catch (error) {
            console.error("Erro ao buscar progresso:", error);
            return res.status(500).json({ error: "Erro ao buscar progresso" });
        }
    }

    // Cria um novo progresso
    async createProgress(req, res) {
        const progress = req.body;
        try {
            const newProgress = await this.progressDao.add(progress);
            return res.status(201).json(newProgress);
        } catch (error) {
            console.error("Erro ao criar progresso:", error);
            return res.status(500).json({ error: "Erro ao criar progresso" });
        }
    }

    // Atualiza um progresso específico
    async updateProgress(req, res) {
        const id = req.params.id;
        const progressUpdates = req.body;
        try {
            const updatedProgress = await this.progressDao.update(id, progressUpdates);
            if (updatedProgress) {
                return res.status(200).json(updatedProgress);
            } else {
                return res.status(404).json({ error: "Progresso não encontrado para atualização" });
            }
        } catch (error) {
            console.error("Erro ao atualizar progresso:", error);
            return res.status(500).json({ error: "Erro ao atualizar progresso" });
        }
    }

    // Deleta um progresso específico
    async deleteProgress(req, res) {
        const id = req.params.id;
        try {
            const isDeleted = await this.progressDao.delete(id);
            if (isDeleted) {
                return res.status(204).send(); // No Content
            } else {
                return res.status(404).json({ error: "Progresso não encontrado para deletar" });
            }
        } catch (error) {
            console.error("Erro ao deletar progresso:", error);
            return res.status(500).json({ error: "Erro ao deletar progresso" });
        }
    }
}

module.exports = ProgressController;