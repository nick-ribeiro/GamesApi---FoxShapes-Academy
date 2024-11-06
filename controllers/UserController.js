class UserController {
    constructor(userDao) {
        this.userDao = userDao;
    }

    // Retorna todos os usuários
    async getUsers(req, res) {
        try {
            const users = await this.userDao.getAll(); // Aguarda a resposta da consulta assíncrona
            if (users && users.length > 0) {
                return res.status(200).json(users);
            } else {
                return res.status(404).json({ error: "Nenhum usuário encontrado" });
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            return res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }

    // Retorna um usuário específico
    async getUser(req, res) {
        const id = req.params.id;
        try {
            const user = await this.userDao.getById(id); // Aguarda a resposta da consulta assíncrona
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).header("Content-Type", "text/html").send("<HTML> <H1>Usuário não encontrado</H1> </HTML>");
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            return res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }

    // Cria um novo usuário
    async createUser(req, res) {
        const user = req.body;
        try {
            if (this.validaUser(user)) {
                const newUser = await this.userDao.add(user); // Aguarda a criação assíncrona
                return res.status(201).json(newUser);  // Retorna o usuário criado
            } else {
                return res.status(400).json({ error: "Usuário inválido" });
            }
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return res.status(500).json({ error: "Erro ao criar usuário" });
        }
    }

    // Atualiza um usuário específico
    async updateUser(req, res) {
        const id = req.params.id;
        const userUpdates = req.body;

        try {
            const userAtual = await this.userDao.getById(id); // Aguarda a busca do usuário para atualização
            if (!userAtual) {
                return res.status(404).json({ error: "Usuário não encontrado para atualização" });
            }

            const updatedUser = await this.userDao.update(id, userUpdates); // Aguarda a atualização assíncrona
            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            return res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
    }

    // Deleta um usuário específico
    async deleteUser(req, res) {
        const id = req.params.id;
        try {
            const isDeleted = await this.userDao.delete(id); // Aguarda a operação de deleção assíncrona
            if (isDeleted) {
                return res.status(204).send();  // No Content, indica que a deleção foi bem-sucedida
            } else {
                return res.status(404).json({ error: "Usuário não encontrado para deletar" });
            }
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            return res.status(500).json({ error: "Erro ao deletar usuário" });
        }
    }

    // Função de validação do usuário (não está implementada por completo no código original)
    validaUser(user) {
        // A validação básica está ativa no momento. Pode ser expandida conforme necessário
        return user && user.name && user.email && user.password; // Valida os campos necessários
    }
}

module.exports = UserController;