const handleSignin = (req,res,knex,bcrypt)=>{
    const {email,password}=req.body;
    knex.select('email','hash').from('login').where('email',email)
    .then(data=>{
        if(bcrypt.compareSync(password,data[0].hash)){
            return knex.select('*').from('users').where('email',email)
            .then(user=>res.json(user[0]))
            .catch(err=>res.status(400).json('unable to get user'));
        }else{res.status(400).json('wrong credentials')}
    }).catch(err=>res.status(400).json('wrong credentials'));
}
module.exports={handleSignin}