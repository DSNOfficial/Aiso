const db = require("../config/db");
const { logError } = require("../config/helper");

const getList = async (req, res) => {
    try {
        const [list] = await db.query("SELECT * FROM servicelistpackagelabor WHERE 1=1 ORDER BY id DESC")
        res.json({
            message: 'This is listing route.',
            list,
            userThatRequested:req.user
        })
    } catch (err) {
        logError("servicelistpackagelabor.getList", err, res)
    }
}
//	id	parentId	title	metaTitle	slug	content
const create = async (req, res) => {
    try {
        var sql = `INSERT INTO servicelistpackagelabor
            (title, description, status)
            VALUES (:title, :description,:status)`;
        var param = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
            
        }
        const [data] = await db.query(sql, param);
        res.json({
            message: 'Create successfully',
            data
        })
    } catch (err) {
        logError("servicelistpackagelabor.create", err, res)
    }
}

const update = async (req, res) => {
    try {
        var sql =`UPDATE servicelistpackagelabor SET
        title = :title,description =:description, status = :status
            WHERE id = :id`;
        var param = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        }
        const [data] = await db.query(sql, param);
        res.json({
            message: (data.affectedRows != 0 ? "Update successfully" : "Not found"),
            data
        })
    } catch (err) {
        logError("servicelistpackagelabor.update", err, res)
    }
}


const remove = async (req, res) => {
    try {
        var sql = "DELETE FROM servicelistpackagelabor WHERE id = :id"
        var param = {
            id: req.body.id
        
        }
        const [data] = await db.query(sql, param);
        res.json({
            message: data.affectedRows != 0 ? "Delete successfully" : "Not found",
            data
        })
    } catch (err) {
        logError("servicelistpackagelabor.remove", err, res)
    }
}


module.exports = {
    getList,
    create,
    update,
    remove,

}