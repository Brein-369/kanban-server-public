const {Task, User, Category} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class Controller {

    static register(req, res, next){
        let obj = {
            email : req.body.email,
            password : req.body.password
        }
        User.create(obj)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static login(req, res, next){
        User.findOne({
            where : {
                email : req.body.email
            }
        })
        .then(data=>{
            if(data && comparePassword(req.body.password, data.password)){
                let payload = {
                    id : data.id,
                    email : data.email
                }
                res.status(200).json({
                    id : data.id,
                    email : data.email,
                    access_token : generateToken(payload)
                })
            }
            else{
                next({name : "401" , message : "Invalid Email or Password"})
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static loginGoogle(req, res, next){

    }

    static getCategoryName(req,res,next){
        console.log('masuk get category');
        Category.findAll()
        .then(data=>{
            // console.log(data);
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static getAllTasks(req, res, next){
        Category.findAll({include : [Task, User]})
        .then(response=>{
            let data = response
            for(let i = 0 ; i< data.length; i++){
                for(let j = 0; j< data[i].Tasks.length; j++){

                    for(let k = 0; k< data[i].Users.length; k++){
                        if(data[i].Tasks[j].UserId === data[i].Users[k].id){
                            console.log(data[i].Tasks[j].UserId, data[i].Users[k].id, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,");
                            data[i].Tasks[j].email = data[i].Users[k].email
                            console.log(data[i].Tasks[j].email);
                            break
                        }
                    }
                }
            }
            data[0].tes = "tes aja <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
            console.log(data);
            res.status(200).json(data)

        })
        .catch(err=>{
            next(err)
        })
    }

    static addTask(req, res, next){
        let obj = {
            title : req.body.title,
            UserId : req.currentUser.id,
            CategoryId : req.body.CategoryId,
            due_date : req.due_date
        }
        Task.create(obj)
        .then(data=>{
            console.log(data);
            res.status(201).json({
                title : data.title,
                UserId : data.UserId,
                CategoryId : data.CategoryId,
                due_date : data.due_date
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static getTask(req, res, next){
        Task.findByPk(req.params.id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static editTask(req, res, next){
        let obj = {
            title : req.body.title,
            UserId : req.currentUser.id,
            CategoryId : req.body.CategoryId,
            due_date : req.due_date
        }
        Task.update(obj,{
            where : {
                id : Number(req.params.id)
            },
            returning : true
        })
        .then(data=>{
            res.status(200).json(data[0][1])
        })
        .catch(err=>{
            next(err)
        })
    }

    // static changeCategory(req, res, next){
        
    // }

    static deleteTask(req, res, next){ 
        Task.destroy({
            where : {
                id : Number(req.params.id)
            }
        })
        .then(data=>{
            res.status(200).json({message : "Task Deletion Success"})
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = Controller
