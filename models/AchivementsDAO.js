const Achivement = require('./Achivements'); // Importa o modelo Achivement

class AchivementsDAO {

    async getAll() {
        try {
            return await Achivement.findAll(); // Retorna todos os achievements
        } catch (error) {
            console.error("Erro ao buscar todos os achievements:", error);
        }
    }

    async add(achivement) {
        try {
            return await Achivement.create(achivement); // Cria um novo achievement
        } catch (error) {
            console.error("Erro ao adicionar achievement:", error);
        }
    }

    async update(id, achivement) {
        try {
            const [updated] = await Achivement.update(achivement, { where: { id: id } }); // Atualiza o achievement
            return updated ? await Achivement.findByPk(id) : null; // Retorna o achievement atualizado
        } catch (error) {
            console.error("Erro ao atualizar achievement:", error);
        }
    }

    async delete(id) {
        try {
            const deleted = await Achivement.destroy({ where: { id: id } }); // Deleta o achievement
            return deleted > 0; // Retorna se a deleção foi bem-sucedida
        } catch (error) {
            console.error("Erro ao deletar achievement:", error);
        }
    }

    async getById(id) {
        try {
            return await Achivement.findByPk(id); // Retorna um achievement específico pelo ID
        } catch (error) {
            console.error("Erro ao buscar achievement pelo ID:", error);
        }
    }
}

module.exports = AchivementsDAO;