const User = require('./User'); // Importa o modelo User

class UserDao {

    async getAll() {
        try {
            return await User.findAll();
        } catch (error) {
            console.error("Erro ao buscar todos os usuários:", error);
        }
    }

    async add(user) {
        try {
            return await User.create(user);
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
        }
    }

    async update(id, user) {
        try {
            const [updated] = await User.update(user, { where: { id: id } });
            return updated ? await User.findByPk(id) : null;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    }

    async delete(id) {
        try {
            const deleted = await User.destroy({ where: { id: id } });
            return deleted > 0;
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
        }
    }

    async getById(id) {
        try {
            return await User.findByPk(id);
        } catch (error) {
            console.error("Erro ao buscar usuário pelo ID:", error);
        }
    }
}

module.exports = UserDao;