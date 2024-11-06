class ConfigurationsController {
    constructor(configurationsDao) {
        this.configurationsDao = configurationsDao;
    }

    // Retorna todos os achievements
    async getConfiguration(req, res) {
        try {
            const configuration = await this.configurationsDao.getAll(); // Aguarda a resposta da consulta assíncrona
            if (configuration && configuration.length > 0) {
                return res.status(200).json(configuration);
            } else {
                return res.status(404).json({ error: "Nenhuma configuração encontrada" });
            }
        } catch (error) {
            console.error("Erro ao buscar configurações:", error);
            return res.status(500).json({ error: "Erro ao buscar configurações" });
        }
    }

    // Retorna todas as configurações de um usuário
    async getConfigurationByUser(req, res) {
        const usuarioId = req.params.usuario_id;
        try {
            const configurations = await this.configurationsDao.getAllByUsuario(usuarioId);  // Aguarda a resposta da consulta
            if (configurations && configurations.length > 0) {
                return res.status(200).json(configurations);
            } else {
                return res.status(404).json({ error: "Nenhuma configuração encontrada para o usuário" });
            }
        } catch (error) {
            console.error("Erro ao buscar configurações:", error);
            return res.status(500).json({ error: "Erro ao buscar configurações" });
        }
    }

    // Cria uma nova configuração
    async createConfiguration(req, res) {
        const configuration = req.body;
        try {
            if (this.validaConfiguration(configuration)) {
                const newConfig = await this.configurationsDao.add(configuration);  // Cria a configuração
                return res.status(201).json(newConfig);  // Retorna a configuração criada
            } else {
                return res.status(400).json({ error: "Configuração inválida" });
            }
        } catch (error) {
            console.error("Erro ao criar configuração:", error);
            return res.status(500).json({ error: "Erro ao criar configuração" });
        }
    }

    // Atualiza uma configuração
    async updateConfiguration(req, res) {
        const id = req.params.id;
        const configurationUpdates = req.body;

        try {
            const configAtual = await this.configurationsDao.getById(id);
            if (!configAtual) {
                return res.status(404).json({ error: "Configuração não encontrada para atualização" });
            }

            const updatedConfig = await this.configurationsDao.update(id, configurationUpdates);
            return res.status(200).json(updatedConfig);
        } catch (error) {
            console.error("Erro ao atualizar configuração:", error);
            return res.status(500).json({ error: "Erro ao atualizar configuração" });
        }
    }

    // Deleta uma configuração
    async deleteConfiguration(req, res) {
        const id = req.params.id;
        try {
            const isDeleted = await this.configurationsDao.delete(id);
            if (isDeleted) {
                return res.status(204).send();  // No Content, indica que a deleção foi bem-sucedida
            } else {
                return res.status(404).json({ error: "Configuração não encontrada para deletar" });
            }
        } catch (error) {
            console.error("Erro ao deletar configuração:", error);
            return res.status(500).json({ error: "Erro ao deletar configuração" });
        }
    }

    // Função de validação da configuração
    validaConfiguration(configuration) {
        return configuration && configuration.usuario_id && configuration.idioma && configuration.nivel_acessibilidade; // Verifica se os campos são válidos
    }
}

module.exports = ConfigurationsController;