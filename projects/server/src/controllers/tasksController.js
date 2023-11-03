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
                title,
                status_id
            } = req.query

            if(!page) {
                page = 0;
            }
            if(!size) {
                size = 6;
            }
            if(!sortby) {
                sortby = 'id';
            }
            if(!order) {
                order = 'ASC'
            }
            if(!title) {
                title = ''
            }
            if(!status_id) {
                status_id = 1
            }

            let offset = parseInt(page*size)
            if(title) {
                offset = 0;
            }

            const dataSortby = () => {
                if (sortby === 'title'){
                    return ['title', order]
                } else if (sortby === 'id') {
                    return ['id', order]
                } else {
                    return ['id', order]
                }
            }

            let getTasks = await model.tasks.findAndCountAll({
                attributes: ['id', 'title', 'date', 'description'],
                where: {
                    title: {[sequelize.Op.like]: `%${title}%`},
                    status_id: {[sequelize.Op.eq]: status_id},
                    isDeleted: {[sequelize.Op.eq]:false},
                },
                include: [
                    {
                        model: model.boards,
                        attributes: ['id', 'category'],
                        where: {
                            isDeleted: false
                        }
                    },
                    {
                        model: model.status,
                        attributes: ['status']
                    }
                ],
                order: [dataSortby()],
                offset: offset,
                limit: parseInt(size)
            })

            return res.status(200).send({
                success: true,
                datanum: getTasks.count,
                limit: parseInt(size),
                totalPages: Math.ceil(getTasks.count/size),
                data: getTasks.rows
                // data: formatedData
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            let createTask = await model.tasks.create({
                title: req.body.title,
                date: req.body.date,
                description: req.body.description,
                boards_id: req.body.boards_id,
                status_id: req.body.status_id,
                isDeleted: 0
            })
            return res.status(200).send({
                success: true,
                message: "Create Task success",
                data: createTask
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    edit: async (req, res, next) => {
        try {
            const {
                title,
                date,
                description,
                boards_id,
                status_id,
                isDeleted
            } = req.body;
            const tasksId = req.params.id;

            let checkTask = await model.tasks.findOne({
                where: {
                    id: tasksId
                }
            });

            if ( checkTask ) {
                await model.tasks.update({
                    title,
                    date,
                    description,
                    boards_id,
                    status_id,
                    isDeleted
                }, {
                    where: {
                        id: tasksId
                    }
                })

                let editTask = await model.tasks.findOne({
                    where: {
                        id: tasksId
                    },
                    attributes: ['id', 'title', 'date', 'description', 'boards_id', 'status_id', 'isDeleted']
                });
    
                return res.status(200).send({
                    success: true,
                    message: "Task change success",
                    data: editTask
                })
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Task not found"
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    deleteTask: async (req, res, next) => {
        try {
            let checkTask = await model.tasks.findAll({
                attributes: ['id', 'title', 'date', 'description', 'status_id', 'isDeleted'],
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: model.boards,
                        attributes: ['id', 'category']
                    },
                    {
                        model: model.status,
                        attributes: ['status']
                    }
                ]
            })

            if (checkTask[0].dataValues.isDeleted == false) {
                await model.tasks.update({isDeleted: 1}, {
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).send({
                    success: true,
                    message: "This Task is now disable",
                    data: checkTask
                })
            } else {
                await model.tasks.update({isDeleted: 0}, {
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).send({
                    success: true,
                    message: "This Task now Enable",
                    data: checkTask
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            let checkTask = await model.tasks.findOne({
                attributes: ['id', 'title', 'date', 'description', 'status_id', 'isDeleted'],
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: model.boards,
                        attributes: ['id', 'category']
                    },
                    {
                        model: model.status,
                        attributes: ['id','status']
                    }
                ]
            })

            if (checkTask) {
                if(checkTask.dataValues.status_id == 1) {
                   await model.tasks.update({status_id: 2}, {
                    where: {
                        id: req.params.id
                    }
                   }) 
                   return res.status(200).send({
                    success: true,
                    message: "This Task is now done",

                   })
                } else {
                    await model.tasks.update({status_id: 1}, {
                        where: {
                            id: req.params.id
                        }
                    })
                    return res.status(200).send({
                        success: true,
                        message: "This task has been reactivated again!"
                    })
                }
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Task not found"
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    notification: async (req, res, next) => {
        try {
            let {
                sortby,
                order
            } = req.query

            if (!sortby) {
                sortby = 'date'
            }
            if (!order) {
                order ='ASC';
            }

            const today = new Date();
            today.setDate(today.getDate() - 1);
            
            const nextThreeDays = new Date(new Date());
            nextThreeDays.setDate(today.getDate() + 3);

            let getTasks = await model.tasks.findAndCountAll({
                attributes: ['id', 'title', 'date', 'description', 'status_id', 'isDeleted'],
                where: {
                    status_id: 1,
                    isDeleted: false,
                    date: {
                        [sequelize.Op.between]: [today, nextThreeDays]
                    }
                },
                include: [{
                    model: model.boards,
                    attributes: ['category'],
                    where: {
                        isDeleted: false
                    }
                }],
                order: [[sortby, order]],
            })

            if (getTasks.rows.length > 0) {
                return res.status(200).send({
                    success: true,
                    datanum: getTasks.count,
                    data: getTasks.rows
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: "No Incoming Tasks Found"
                });
            }

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}