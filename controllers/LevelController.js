class LevelController {

    constructor(levelDao) {
        this.levelDao = levelDao;
    }

    // Retorna todos os níveis
    async getLevel(req, res) {
        try {
            const levels = await this.levelDao.getAll(); // Aguarda a resposta da consulta assíncrona
            if (levels && levels.length > 0) {
                return res.status(200).json(levels);
            } else {
                return res.status(404).json({ error: "Nenhum nível encontrado" });
            }
        } catch (error) {
            console.error("Erro ao buscar níveis:", error);
            return res.status(500).json({ error: "Erro ao buscar níveis" });
        }
    }

    // Retorna um nível específico
    async getLevel(req, res) {
        const id = req.params.id;
        try {
            const level = await this.levelDao.getById(id); // Aguarda a resposta da consulta assíncrona
            if (level) {
                return res.status(200).json(level);
            } else {
                return res.status(404).header("Content-Type", "text/html").send("<HTML> <H1>Nível não encontrado</H1> </HTML>");
            }
        } catch (error) {
            console.error("Erro ao buscar nível:", error);
            return res.status(500).json({ error: "Erro ao buscar nível" });
        }
    }

    // Cria um novo nível
    async createLevel(req, res) {
        const level = req.body;
        try {
            if (this.validaLevel(level)) {
                const newLevel = await this.levelDao.add(level); // Aguarda a criação assíncrona
                return res.status(201).json(newLevel);  // Retorna o nível criado
            } else {
                return res.status(400).json({ error: "Nível inválido" });
            }
        } catch (error) {
            console.error("Erro ao criar nível:", error);
            return res.status(500).json({ error: "Erro ao criar nível" });
        }
    }

    // Atualiza um nível específico
    async updateLevel(req, res) {
        const id = req.params.id;
        const levelUpdates = req.body;

        try {
            const levelAtual = await this.levelDao.getById(id); // Aguarda a busca do nível para atualização
            if (!levelAtual) {
                return res.status(404).json({ error: "Nível não encontrado para atualização" });
            }

            const updatedLevel = await this.levelDao.update(id, levelUpdates); // Aguarda a atualização assíncrona
            return res.status(200).json(updatedLevel);
        } catch (error) {
            console.error("Erro ao atualizar nível:", error);
            return res.status(500).json({ error: "Erro ao atualizar nível" });
        }
    }

    // Deleta um nível específico
    async deleteLevel(req, res) {
        const id = req.params.id;
        try {
            const isDeleted = await this.levelDao.delete(id); // Aguarda a operação de deleção assíncrona
            if (isDeleted) {
                return res.status(204).send();  // No Content, indica que a deleção foi bem-sucedida
            } else {
                return res.status(404).json({ error: "Nível não encontrado para deletar" });
            }
        } catch (error) {
            console.error("Erro ao deletar nível:", error);
            return res.status(500).json({ error: "Erro ao deletar nível" });
        }
    }

    // Função de validação do nível
    validaLevel(level) {
        // Validação básica
        return level && level.name && level.descricao && level.dificuldade; // Valida os campos necessários
    }
}

module.exports = LevelController;