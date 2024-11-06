const Level = require('./Level'); // Importa o modelo Level

class LevelDao {

    async getAll() {
        try {
            return await Level.findAll();
        } catch (error) {
            console.error("Erro ao buscar todos os níveis:", error);
        }
    }

    async add(level) {
        try {
            return await Level.create(level);
        } catch (error) {
            console.error("Erro ao adicionar um nível:", error);
        }
    }

    async update(id, level) {
        try {
            const [updated] = await Level.update(level, { where: { id: id } });
            return updated ? await Level.findByPk(id) : null;
        } catch (error) {
            console.error("Erro ao atualizar um nível:", error);
        }
    }

    async delete(id) {
        try {
            const deleted = await Level.destroy({ where: { id: id } });
            return deleted > 0;
        } catch (error) {
            console.error("Erro ao deletar um nível:", error);
        }
    }

    async getById(id) {
        try {
            return await Level.findByPk(id);
        } catch (error) {
            console.error("Erro ao buscar um nível pelo ID:", error);
        }
    }
}

module.exports = LevelDao;