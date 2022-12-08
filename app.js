const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mogoose=require('mongoose');

const errorController = require('./controllers/error');

const mongoConnect=require('./util/database').mongoConnect;


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const User=require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("63916d320b2598ed32211b42")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mogoose.connect('mongodb+srv://Harsh:Harsh1005@cluster0.bubrebl.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{
  User.findOne().then(user=>{
    if(!user){
      const user=new User({
        name:'Harsh',
        email:'test@gmail.com',
        cart:{
          items:[]
        }
      })
      user.save();
    }
   
  })
  
  app.listen(3000);
}).catch(err=>console.log(err));

