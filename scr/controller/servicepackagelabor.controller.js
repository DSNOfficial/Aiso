const db = require("../config/db");
const { logError } = require("../config/helper");
const { isEmptyOrNull } = require("../config/helper");
const { removeFile } = require("../config/helper");

const getList = async (req, res) => {
    try {
        const { txt_search } = req.query;
        let sql = "SELECT * FROM tbservicepackagelabor WHERE 1=1";
        let sqlWhere = "";
        let param = {};

        if (!isEmptyOrNull(txt_search)) {
            sqlWhere += " AND (title LIKE :txt_search OR description LIKE :txt_search)";
            param["txt_search"] = `%${txt_search}%`;
        }

        sql = sql + sqlWhere + " ORDER BY id DESC";
        const [list] = await db.query(sql, param);
        

    
        res.json({
            list: list,
        });
    } catch (err) {
        logError("tbservicepackagelabor.getList", err, res);
    }
}

const getOne = async (req, res) => {
    try {
        const sql = "SELECT * FROM tbservicepackagelabor WHERE Id = :Id";
        const param = {
            Id: req.body.Id
        };
        const [list] = await db.query(sql, param);
        res.json({
            message: 'This is get one route.',
            data: Object.assign(...list)
        });
    } catch (err) {
        logError("tbservicepackagelabor.getOne", err, res);
    }
}

const create = async (req, res) => {
    try {
        const {  title,description } = req.body;
        let Image = null;
        if (req.file) {
            Image = req.file.filename;
        }
        const message = {}; // Empty object
        if (isEmptyOrNull(title)) {
            message.title = "title required!";
        }
        // if (isEmptyOrNull(content)) {
        //     message.content = "content required!";
        // }
        if (Object.keys(message).length > 0) {
            res.json({
                error: true,
                message: message
            });
            return false;
        }
        const sql = "INSERT INTO tbservicepackagelabor ( title,description, Image) VALUES ( :title, :description,:Image)";
        const param = {
           
            title,
            description,
            Image
        };
        const [data] = await db.query(sql, param);
        res.json({
             message: (data.affectedRows != 0 ? "បញ្ចូលទិន្នន័យបានជោគជ័យ" : "Not found"),
            data: data
        });
    } catch (err) {
        logError("tbservicepackagelabor.create", err, res);
    }
}





const update = async (req, res) => {
    try {
        const { id, title ,description} = req.body;
        let Image = null;
        if (req.file) {
            Image = req.file.filename; // Change image | new image
        } else {
            Image = req.body.PreImage; // Get old image
        }
        const message = {}; // Empty object
        if (isEmptyOrNull(id)) {
            message.id = "id required!";
        }
        if (isEmptyOrNull(title)) {
            message.title = "title required!";
        }
        if (isEmptyOrNull(description)) {
            message.description = "description required!";
        }
       
        if (Object.keys(message).length > 0) {
            res.json({
                error: true,
                message: message
            });
            return false;
        }
        const param = {
            id,
            title,
            description,
            Image
        };
        const [dataInfo] = await db.query("SELECT * FROM tbservicepackagelabor WHERE id=:id", { id: id });
        if (dataInfo.length > 0) {
            const sql = "UPDATE tbservicepackagelabor SET title=:title, Image=:Image,description=:description WHERE id = :id";
            const [data] = await db.query(sql, param);
            if (data.affectedRows) {
                if (req.file && !isEmptyOrNull(req.body.Image)) {
                    await removeFile(req.body.Image); // Remove old file
                }
            }
            res.json({
                message: (data.affectedRows != 0 ? "កែប្រែបានទិន្នន័យបានជោគជ័យ" : "Not found"),
                data: data
            });
        } else {
            res.json({
                message: "Not found",
                error: true
            });
        }
    } catch (err) {
        logError("tbservicepackagelabor.update", err, res);
    }
}



const remove = async (req, res) => {
    try {
        const param = {
            id: req.body.id
        };
        const [dataInfo] = await db.query("SELECT * FROM tbservicepackagelabor WHERE id=:id", param);
        if (dataInfo.length > 0) {
            const sql = "DELETE FROM tbservicepackagelabor WHERE id = :id";
            const [data] = await db.query(sql, param);
            if (data.affectedRows) {
                // If delete success then unlink | remove file
                await removeFile(dataInfo[0].Image); // Get image from
            }
            res.json({
                message: data.affectedRows != 0 ? "លុបជោគជ័យ" : "Not found",
                data: data
            });
        } else {
            res.json({
                message: "Not found",
                error: true
            });
        }
    } catch (err) {
        logError("tbservicepackagelabor.remove", err, res);
    }
}

module.exports = {
    getList,
    getOne,
    create,
    update,
    remove
};
