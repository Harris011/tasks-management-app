const sequelize = require("sequelize");
const model = require("../models");

module.exports = {
    get: async (req, res, next) => {
        try {
            let {
                page,
                size,
                sortby,
                order,
                category
            } = req.query;
    
            page = page || 0;
            size = size || 6;
            sortby = sortby || 'id';
            order = order || 'ASC';
            category = category || '';
    
            let offset = parseInt(page) * parseInt(size);
    
            const dataSortby = () => {
                if (sortby === 'category') {
                    return ['category', order];
                } else {
                    return ['id', order];
                }
            };
    
            const getBoards = await model.boards.findAndCountAll({
                attributes: ['id', 'category', 'isDeleted'],
                where: {
                    category: { [sequelize.Op.like]: `%${category}%` },
                    isDeleted: { [sequelize.Op.eq]: false },
                },
                include: [
                    {
                        model: model.tasks,
                        attributes: ['title', 'status_id'],
                        required: false,
                        where: {
                            status_id: 1,
                            isDeleted: false,
                        },
                        include: [
                            {
                                model: model.status,
                                attributes: ['status'],
                            },
                        ],
                    },
                ],
                order: [dataSortby()],
                offset: offset,
                limit: parseInt(size),
            });
    
            return res.status(200).send({
                success: true,
                datanum: getBoards.count,
                limit: parseInt(size),
                totalPages: Math.ceil(getBoards.count / size),
                data: getBoards.rows,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            let checkBoard = await model.boards.findAll({
                where: {category: req.body.category}
            });

            if(checkBoard.length == 0) {
                const {category} = req.body

                let createBoard = await model.boards.create({
                    category,
                    isDelete: 0
                });
                return res.status(200).send({
                    success: true,
                    message: "Create Board Success",
                    data: createBoard
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: "Board already exist, Please enter different tittle"
                })
            }

        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    edit: async (req, res, next) => {
        try {
            const { category } = req.body;
            const boardId = req.params.id;

            let checkBoard = await model.boards.findAll({
                where: {
                    category,
                    id: {[sequelize.Op.ne]: boardId}
                }
            });

            if (checkBoard.length == 0) {
                const currentBoard = await model.boards.findByPk(boardId);

                if (currentBoard.category !== category) {
                    let editBoard = await model.boards.update(
                        {category}, 
                        {where: {
                            id: boardId
                        }}
                    )
    
                    res.status(200).send({
                        success: true,
                        message: "Board change success",
                        data: editBoard
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        message: 'You entered the same category as before, please enter another name.'
                    })
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: 'Board Already Exist, change canceled'
                })
            }
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    deleteBoard: async (req, res, next) => {
        try {
            let checkBoard = await model.boards.findAll({
                attributes: ['id', 'category', 'isDeleted'],
                where: {
                    id: req.params.id
                }
            });

            if (checkBoard[0].dataValues.isDeleted == false) {
                await model.boards.update({isDeleted: 1}, {
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).send({
                    success: true,
                    message: "This Board is now disable",
                    data: checkBoard
                })
            } else {
                await model.boards.update({isDeleted: 0}, {
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).send({
                    success: true,
                    message: "This Board now Enable",
                    data: checkBoard
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}