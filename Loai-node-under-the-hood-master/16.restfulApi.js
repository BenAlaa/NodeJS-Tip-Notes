//rest is an architecture style for building apis
//http verbs and urls mean something
//for a full restful api implementation go to ../node on the run/3.RestWithNode.js
//we don't depend on specifying the method in the url, we get the one from the verbs in the header
const express = require('express');
const app = express();
const jsonParser = app.use(express.json());
app.listen(process.env.PORT || 3000);
app.get('/api/person/:id',(req,res)=>{
    res.json({firstName:"loai",lastName:"alaa"});

});
app.post('/api/person',jsonParser,(req,res)=>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    //save to the database
});

app.delete('/api/person/:id',(req,res)=>{
    //delete user from database
});
