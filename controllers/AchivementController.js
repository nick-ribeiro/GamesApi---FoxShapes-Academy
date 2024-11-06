class AchivementController {

    constructor(achivementDao) {
        this.achivementDao = achivementDao;
    }

    // Retorna todos os achievements
    async getAchivements(req, res) {
        try {
            const achivements = await this.achivementDao.getAll(); // Aguarda a resposta da consulta assíncrona
            if (achivements && achivements.length > 0) {
                return res.status(200).json(achivements);
            } else {
                return res.status(404).json({ error: "Nenhum achievement encontrado" });
            }
        } catch (error) {
            console.error("Erro ao buscar achievements:", error);
            return res.status(500).json({ error: "Erro ao buscar achievements" });
        }
    }

    // Retorna um achievement específico
    async getAchivement(req, res) {
        const id = req.params.id;
        try {
            const achivement = await this.achivementDao.getById(id); // Aguarda a resposta da consulta assíncrona
            if (achivement) {
                return res.status(200).json(achivement);
            } else {
                return res.status(404).header("Content-Type", "text/html").send("<HTML> <H1>Achievement não encontrado</H1> </HTML>");
            }
        } catch (error) {
            console.error("Erro ao buscar achievement:", error);
            return res.status(500).json({ error: "Erro ao buscar achievement" });
        }
    }

    // Cria um novo achievement
    async createAchivement(req, res) {
        const achivement = req.body;
        try {
            if (this.validaAchivement(achivement)) {
                await this.achivementDao.add(achivement); // Aguarda a criação assíncrona
                return res.status(201).json(achivement);  // Retorna o achievement criado
            } else {
                return res.status(400).json({ error: "Achievement inválido" });
            }
        } catch (error) {
            console.error("Erro ao criar achievement:", error);
            return res.status(500).json({ error: "Erro ao criar achievement" });
        }
    }

    // Atualiza um achievement específico
    async updateAchivement(req, res) {
        const id = req.params.id;
        const achivementUpdates = req.body;

        try {
            const achivementAtual = await this.achivementDao.getById(id); // Aguarda a busca do achievement para atualização
            if (!achivementAtual) {
                return res.status(404).json({ error: "Achievement não encontrado para atualização" });
            }

            await this.achivementDao.update(id, achivementUpdates); // Aguarda a atualização assíncrona
            return res.status(200).json(await this.achivementDao.getById(id));  // Retorna o achievement atualizado
        } catch (error) {
            console.error("Erro ao atualizar achievement:", error);
            return res.status(500).json({ error: "Erro ao atualizar achievement" });
        }
    }

    // Deleta um achievement específico
    async deleteAchivement(req, res) {
        const id = req.params.id;
        try {
            const isDeleted = await this.achivementDao.delete(id); // Aguarda a operação de deleção assíncrona
            if (isDeleted) {
                return res.status(204).send();  // No Content, indica que a deleção foi bem-sucedida
            } else {
                return res.status(404).json({ error: "Achievement não encontrado para deletar" });
            }
        } catch (error) {
            console.error("Erro ao deletar achievement:", error);
            return res.status(500).json({ error: "Erro ao deletar achievement" });
        }
    }

    // Função de validação do achievement
    validaAchivement(achivement) {
        // Validação básica
        return achivement && achivement.name && achivement.descricao && achivement.requisitos; // Valida os campos necessários
    }
}

module.exports = AchivementController;