const handleRegister = (req,res,knex,bcrypt)=>{
    const {name,email,password} = req.body;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password,saltRounds);
    knex.transaction(trx=>{
        console.log('here1')
        return trx.insert({email:email,hash:hash},'email').into('login')
        .transacting(trx)
        .then(email=>{
            console.log('here2')
            return trx('users').returning('*').insert(
            {
                name:name,
                email:email[0],
                joined: new Date()
            } 
        ).then(resp=>{
            res.json(resp[0]);
            console.log('end here')
            })    
        }).then(trx.commit).catch(trx.rollback)
    })
    .catch(err=>res.status(400).json('unable to register'));
}
module.exports = {handleRegister}