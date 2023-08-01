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
            } = req.query

            if(!page){
                page = 0;
            }
            if(!size){
                size = 6;
            }
            if(!sortby){
                sortby = 'id'
            }
            if(!order) {
                order = 'ASC'
            }
            if (!category){
                category=''
            }

            let offset = parseInt(page*size)
            if(category){
                offset = 0;
            }

            const dataSortby = () => {
                if (sortby === 'category') {
                    return ['category', order]
                } else if (sortby === 'id') {
                    return ['id', order]
                } else {
                    return ['id', order]
                }
            }

            let getBoards = await model.boards.findAndCountAll({
                attributes: ['id', 'category', 'isDeleted'],
                where: {
                    category: {[sequelize.Op.like]: `%${category}%`},
                    isDeleted:{[sequelize.Op.eq]:false},
                },
                include: [
                    {
                        model: model.tasks,
                        attributes: ['title']
                    }
                ],
                order: [dataSortby()],
                offset: offset,
                limit: parseInt(size)
            })
            
            // console.log('Data from get Board :', getBoards.rows);
            // getBoards.rows.forEach(board => {
            //     console.log(`id: ${board.id}, category: ${board.category}, isDeleted: ${board.isDeleted}`);
            // });

            return res.status(200).send({
                success: true,
                datanum: getBoards.count,
                limit: parseInt(size),
                totalPages: Math.ceil(getBoards.count/size),
                data: getBoards.rows
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            let checkBoard = await model.boards.findAll({
                where: {category: req.body.category}
            })
            console.log('Data from create :', checkBoard);

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
            })
            console.log("Data from Edit", checkBoard);

            if (checkBoard.length == 0) {
                const currentBoard = await model.boards.findByPk(boardId);

                if (currentBoard.category !== category) {
                    let editBoard = await model.boards.update(
                        {category}, 
                        {where: {
                            id: boardId
                        }}
                    )
                    console.log("Data from edit :", editBoard);
    
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
            })
            console.log('Data from deleteBoard :', checkBoard);
            // console.log('Data from deleteBoard value isDeleted :' , checkBoard[0].dataValues.isDeleted);

            if (checkBoard[0].dataValues.isDeleted == false) {
                await model.boards.update({isDeleted: 1}, {
                    where: {
                        id: req.params.id
                    }
                })
                // console.log('data update after delete :', deleteBoard);
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