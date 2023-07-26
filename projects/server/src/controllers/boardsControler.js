const sequelize = require("sequelize");
const model = require("../models");

module.exports = {
    create: async (req, res, next) => {
        try {
            let checkBoard = await model.boards.findAll({
                // where: {category: req.body.category}
            })
            console.log('check create boards :', checkBoard);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}