const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API
});
const handleAPI = (req,res)=>{
    app.models.predict("e466caa0619f444ab97497640cefc4dc", 
        req.body.input)
    .then(data=>{res.json(data)})
    .catch(err=>res.status(400).json('API call failed'));
}
const handleImage = (req,res,knex)=>{
    const {id} = req.body;
    knex('users').where('id','=',id).increment('entries',1)
    .returning('entries').then(entries=>{
        res.json(entries[0])}).catch(err=>{res.status(400).json('unable to get entries')});
}
module.exports={handleImage,handleAPI}
