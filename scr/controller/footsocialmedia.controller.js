const db = require("../config/db");
const { logError } = require("../config/helper");

const getList = async (req, res) => {
    try {
        const [list] = await db.query("SELECT * FROM tbfootsocialmedia WHERE 1=1 ORDER BY id DESC")
        res.json({
            message: 'This is listing route.',
            list,
            userThatRequested:req.user
        })
    } catch (err) {
        logError("tbfootsocialmedia.getList", err, res)
    }
}
//	id	parentId	title	metaTitle	slug	content
const create = async (req, res) => {

    try {
        var sql = `INSERT INTO tbfootsocialmedia
            (title1,title2,title3,title4,email,phone,facebookLink,googleLink,copyRight, description)
            VALUES (:title1,:title2,:title3,:title4,:email,:phone,:facebookLink,:googleLink,:copyRight, :description)`;
        var param = {
            title1: req.body.title1,
            title2: req.body.title2,
            title3: req.body.title3,
            title4: req.body.title4,
            email: req.body.email,
            phone: req.body.phone,
            facebookLink: req.body.facebookLink,
            googleLink: req.body.googleLink,
            copyRight: req.body.copyRight,
            description: req.body.description,          
            
        }
        const [data] = await db.query(sql, param);
        res.json({
            message: 'បង្កើតបានជោគជ័យ',
            data
        })
    } catch (err) {
        logError("tbfootsocialmedia.create", err, res)
    }
}

const update = async (req, res) => {
    try {
        var sql =`UPDATE tbfootsocialmedia SET
        title1 =:title1,title2=:title2,title3=:title3,title4=:title4,phone=:phone,facebookLink=:facebookLink,googleLink=:googleLink,copyRight=:copyRight,description =:description, email = :email
            WHERE id = :id`;
        var param = {
            id: req.body.id,
            title1: req.body.title1,
            title2: req.body.title2,
            title3: req.body.title3,
            title4: req.body.title4,
            email: req.body.email,
            phone: req.body.phone,
            facebookLink: req.body.facebookLink,
            googleLink: req.body.googleLink,
            copyRight: req.body.copyRight,
            description: req.body.description,
        }
        const [data] = await db.query(sql, param);
        res.json({
            message: (data.affectedRows != 0 ? "កែប្រែបានទទួលជោគជ័យ" : "Not found"),
            data
        })
    } catch (err) {
        logError("tbfootsocialmedia.update", err, res)
    }
}


const remove = async (req, res) => {
    try {
        var sql = "DELETE FROM tbfootsocialmedia WHERE id = :id"
        var param = {
            id: req.body.id
        
        }
        const [data] = await db.query(sql, param);
        res.json({
            message: data.affectedRows != 0 ? "លុបជោគជ័យ" : "Not found",
            data
        })
    } catch (err) {
        logError("tbfootsocialmedia.remove", err, res)
    }
}


module.exports = {
    getList,
    create,
    update,
    remove,

}