const crypto = require('crypto');
const { pool } = require('../conn/config');


class User{
    
    constructor(email,username,password){
        this.email = email;
        this.username = username;
        this.encryptPassword(password);
    }


    static async getAllUsers() 
    {
        try {
          const request = pool.request();
          const result = await request.query('SELECT * FROM users');
          return result.recordset.map(row => new User(row.id, row.username, row.email));
        } catch (err) {
          console.error('Greška pri dohvatanju korisnika:', err);
          throw err;
        }
    }

    static async login(email,password){
        try{
            const request = pool.request();
            const foundUser = (await request.query(`SELECT * FROM users WHERE email='${email}'`)).recordset[0];
            
            if(foundUser)
            {
                var hash = crypto.pbkdf2Sync(password,foundUser.salt,1000,64,"sha512").toString('hex');
                if(hash == foundUser.hash)
                {
                    return {user:foundUser};
                }
                else
                {
                    return undefined;
                }
            }
            else
                return undefined;
        }
        catch(err){
            console.error("Greska pri logovanju: ",err);
            throw err;
        }
    }

    async saveUser(){
        try{
            const request = pool.request();
            const find = (await request.query(`SELECT * FROM users WHERE email='${this.email}'`)).recordset[0];

            if(!find){
                const result = await request.query(`INSERT INTO users(email,username,hash,salt) VALUES ('${this.email}','${this.username}','${this.hash}','${this.salt}')`);
                const newUser = (await request.query(`SELECT * FROM users WHERE email='${this.email}'`)).recordset[0];

                if(newUser){
                    return {status:newUser};
                }
                else
                    return {status:"failed"};
            }else{
                return {status:"already exists"};
            }
        }
        catch(err){
            console.error('Greska pri upisivanju korisnika: ',err);
            throw err;
        }
    }

    encryptPassword = function(password){
        this.salt = crypto.randomBytes(16).toString("hex");
        this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64,"sha512").toString('hex');
    }

    validatePassword = function(password){
        var hash = crypto.pbkdf2Sync(password,this.salt,1000,64,"sha512").toString('hex');
        return hash === this.hash;
    }

}

module.exports = User