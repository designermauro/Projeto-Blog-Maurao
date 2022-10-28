const express = require ("express");
const router = express.Router();
const User = require("./User");
const bcrytp = require('bcryptjs');

router.get("/admin/users", (req, res)=>{
    User.findAll().then(users =>{
        res.render("admin/users/index", {users: users});
    });
});

router.get("/admin/users/create", (req, res)=>{
    res.render("admin/users/create");
});

router.post("/users/create",(req, res)=>{
     var nomeUsuario = req.body.nomeUsuario;
     var email = req.body.email;
     var password = req.body.password;


      User.findOne({where:{email: email}}).then(user =>{
        if(user == undefined){

            var salt = bcrytp.genSaltSync(10);
            var hash = bcrytp.hashSync(password, salt);       
            
            User.create({
               nomeUsuario: nomeUsuario,
               email: email,
               password: hash
            }).then(()=>{
               res.redirect("/");
            }).catch((erro)=>{
               res.redirect("/");
            });

        }else{
            res.redirect("/admin/users/create");
        }
    });      
});

router.get("/login", (req, res)=>{
    res.render("admin/users/login");
});

router.post("/authenticate", (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email: email}}).then(user =>{
        if(user != undefined){ // se existe um usuário com esse e-mail
            // validar a senha 
            var correct = bcrytp.compareSync(password,user.password);
            if(correct){
                req.session.user = {
                   id: user.id,
                   email: user.email
                }
                res.redirect("/admin/articles");
            }else{
                 res.redirect("/login");
            }
        }else{
            res.redirect("/login");
        }
    });
});
router.get("/logout", (req,res)=>{
    req.session.user = undefined;
    res.redirect("/");
});

module.exports = router;