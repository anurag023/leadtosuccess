const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser=require("body-parser");
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dancecontact');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const port = process.env.PORT || 8000;

//define ,ongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
})

const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 

//ENDPOINT

//START THE SERVER
app.get(`/`,  (req,res)=>{ 
    const params= { }
     res.status(200).render(`home.pug`, params);
})
app.get(`/contact`,  (req,res)=>{ 
    const params= { }
     res.status(200).render(`contact.pug`, params);
})
app.post(`/contact`,  (req,res)=>{ 
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("this data is saved to database")
    }).catch(()=>{
        res.status(400).send("item not saved")
    })
    //  res.status(200).render(`contact.pug`);
})

  
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});