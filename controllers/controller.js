const {Task, User, Category} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');


class Controller {

    static register(req, res, next){
        let obj = {
            email : req.body.email,
            password : req.body.password
        }
        User.create(obj)
        .then(data=>{
            let display = {
                id : data.id,
                email : data.email
            }
            res.status(200).json(display)
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
        const googleToken = req.body.googleToken
        console.log(process.env.GOOGLE_CLIENT_ID, "env google client");
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        async function verify(){
            const ticket = await client.verifyIdToken({
                idToken : googleToken,
                audience : process.env.GOOGLE_CLIENT_ID
            })
            const googlePayload = ticket.getPayload()
            

            User.findOrCreate({
                where : {
                    email : googlePayload.email
                },
                defaults : {
                    //email tidak perlu dimasukkan defaults lagi karena sudah ke detect dari where
                    //password dibuat unique manual hanya agar tidak kena validation(space dihilangkan karena alhpanumeric)
                    password : (new Date()).toDateString().split(' ').join('')
                }
            })
            .then(data=>{
                //hasil data findOrCreate dalam bentuk array
                let payload = {
                    //payload ga boleh ada password
                    id : data[0].id,
                    email : data[0].email
                }
            
                res.status(200).json({
                    ...payload,
                    //generate token tetap dari jwt server
                    access_token : generateToken(payload)
                })
            })
        }
        verify().catch(console.error);

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
        
        Category.findAll({include : [
            {
                model: Task, 
                include : User
            }
        ]})
        .then(response=>{
            let data = response
            
            //atau bisa pakai Category.findAll({include : [Task, include: User]})
            // // CARA MANUAL MASUKIN EMAIL KE DALAM ARRAY TASK KALAU PAKAI Category.findAll({include : Task, User})   >>>(task dan user array terpisah)
            // for(let i = 0 ; i< data.length; i++){
            //     for(let j = 0; j< data[i].Tasks.length; j++){

            //         for(let k = 0; k< data[i].Users.length; k++){
            //             if(data[i].Tasks[j].UserId === data[i].Users[k].id){
            //                 console.log(data[i].Tasks[j].UserId, data[i].Users[k].id);
            //                 //asign value ke hasil response sequelize harus pakai setDataValue
            //                 data[i].Tasks[j].setDataValue("email", data[i].Users[k].email)
            //                 console.log(data[i].Tasks[j].email);
            //                 break
            //             }
            //         }
            //     }
            // }

            console.log(JSON.stringify(data,null,2));
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
            due_date : req.body.due_date
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
            due_date : req.body.due_date
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

    static changeCategory(req,res,next){
        let obj ={
            CategoryId : req.body.CategoryId
        }
        Task.update(obj,{
            where : {
                id : Number(req.params.id)
            },
            returning :true
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = Controller
