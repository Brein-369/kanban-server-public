const {User, Task} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authenticate = (req, res ,next) =>{

    try {
        let {id, email} = verifyToken(req.headers.access_token)
        User.findByPk(id)
        .then(data=>{
            if (data){
                req.currentUser = {
                    id : data.id,
                    email : data.email
                }
                next()
            }
            else {
                next({name : "401" , message : 'Auhthentication Error (token error)'})
            }
        })
        .catch(err=>{
            throw Error()
        })

    } catch (error) {
        next(error)        
    }

}

const authorize = (req, res, next) =>{

    Task.findByPk(req.params.id)
    .then(data=>{
        if(data === null){
            next({name : "404", message : 'Data Task not Found'})
        }
        else if(data.UserId === req.currentUser.id){
            next()
        }
        else{
            next({name : "401", message : "Data Task is not yours"})
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {
    authenticate,
    authorize
}