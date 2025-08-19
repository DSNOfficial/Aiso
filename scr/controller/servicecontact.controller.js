const bodyParser = require("body-parser");
const db = require("../config/db");
const { logError } = require("../config/helper");
const { isEmptyOrNull } = require("../config/helper");
const { removeFile } = require("../config/helper");

const getList = async (req, res) => {
    try {
        const { txt_search } = req.query;
        let sql = "SELECT * FROM tbservicecontact WHERE 1=1";
        let sqlWhere = "";
        let param = {};

        if (!isEmptyOrNull(txt_search)) {
            sqlWhere += " AND (title LIKE :txt_search OR description LIKE :txt_search OR Status LIKE :txt_search)";
            param["txt_search"] = `%${txt_search}%`;
        }

        sql = sql + sqlWhere + " ORDER BY id DESC";
        const [list] = await db.query(sql, param);



        res.json({
            list: list,
        });
    } catch (err) {
        logError("tbtraining.getList", err, res);
    }
}
// Route: GET /api/train/:id

const TrainImage = async (req, res) => {
    try {

        var sql = "SELECT * FROM tbservicecontact_image WHERE tbservicecontact_id =:tbservicecontact_id";

        var [list] = await db.query(sql, {
            tbservicecontact_id: req.params.tbservicecontact_id,
        });
        res.json({
            list,
        });

    } catch (err) {
        logError("tbservicecontact.TrainImage", err, res);
    }
};

const getOne = async (req, res) => {
    try {
        const id = req.body.id || req.params.id; // support both body and param

        // Validate ID
        if (!id) {
            return res.status(400).json({ message: 'Training ID is required' });
        }

        // Fetch main training record
        const sqlTraining = "SELECT * FROM tbservicecontact WHERE id = :id";
        const [trainingResult] = await db.query(sqlTraining, { id });

        if (!trainingResult || trainingResult.length === 0) {
            return res.status(404).json({ message: 'Training record not found' });
        }

        // Fetch related images
        const sqlImages = "SELECT image FROM tbservicecontact_image WHERE tbservicecontact_id = :id";
        const [imagesResult] = await db.query(sqlImages, { id });

        // Return full training data with images
        res.json({
            message: 'Training record fetched successfully',
            data: {
                ...trainingResult[0],
                images: imagesResult.map(img => img.image), // return only filenames
            }
        });
    } catch (err) {
        logError("tbservicecontact.getOne", err, res);
    }
};

const create = async (req, res) => {
    try {

        const sql = `
            INSERT INTO tbservicecontact (title,etitle,description,status,image)
            VALUES (:title,:etitle, :description, :status, :image)
        `;
        var [data] = await db.query(sql, {

            ...req.body,
          // image: req.files?.upload_image[0].filename 
            image:req.files?.upload_image?.[0]?.filename || null || "null" || "" || unlink && "unlink"
        });

        if (req.files && req.files?.upload_image_optional ) {
            var ParaImageTrain = [];
            req.files?.upload_image_optional.map((item, index) => {
                ParaImageTrain.push([data?.insertId, item.filename]);
            })
            var slqTrainImage = "INSERT INTO tbservicecontact_image (tbservicecontact_id,image) VALUES :data";
            var [dataImage] = await db.query(slqTrainImage, {
                data: ParaImageTrain,
            });

        }
   

        res.json({
            data,
            message: "ទទួលបានជោគជ័យ"


        });


    } catch (err) {
        logError("tbservicecontact.create", err, res);
    }
};

const update = async (req, res) => {
    try {

        var sql = "UPDATE tbservicecontact SET  title=:title,etitle=:etitle ,image=:image,description=:description,status=:status WHERE id = :id";
        var filename = req.body.image;
        /// new image
        if (req.files?.upload_image) {
            filename = req.files?.upload_image[0]?.filename;
        }
        //image change for single image
        if (
            req.body.image != "" &&
            req.body.image != null &&
            req.body.image != "null" &&

            req.files?.upload_image
        ) {
            removeFile(req.body.image); // remove old image
            filename = req.files?.upload_image[0]?.filename;
        }

        /// image remove
        if (req.body.image_remove == "1") {
            removeFile(req.body.image); // remove image
            filename = null;
        }



        var [data] = await db.query(sql, {
            ...req.body,
            image: filename,

        });

        //image optional 

        if (req.files && req.files?.upload_image_optional) {
            var ParaImageTrain = [];
            req.files?.upload_image_optional.map((item, index) => {
                ParaImageTrain.push([req.body.id, item.filename]);
            })
            var slqTrainImage = "INSERT INTO tbservicecontact_image (tbservicecontact_id,image) VALUES :data";
            var [dataImage] = await db.query(slqTrainImage, {
                data: ParaImageTrain,
            });

        }

        // multiple image

        // console.log(req.body.image_optional);

        if (req.body.image_optional && req.body.image_optional.length > 0) {

            //console.log(req.body.image_optional);
            if (typeof req.body.image_optional == "string") {
                req.body.image_optional = [req.body.image_optional];
            }
            req.body.image_optional.map(async (item, index) => {
                // remove database

                let [data] = await db.query("DELETE FROM tbservicecontact_image WHERE image =:image",
                    { image: item }
                );
                           

                // unlink from hard
               removeFile(item);

            });

            image_optional = [
                {
                    isFound: false, // true | false
                    name: "",
                    status: "removed",
                    uid: "",
                    url: ""
                },
            ];

        }

        res.json({
            message: (data.affectedRows != 0 ? "Update success" : "Not found"),
            data: data
        });

    } catch (err) {
        logError("tbservicecontact.update", err, res);
    }
};

const remove = async (req, res) => {
    try {
        const param = { id: req.body.id };

        const [dataInfo] = await db.query("SELECT * FROM tbservicecontact WHERE id=:id", param);

        if (dataInfo.length > 0) {
            // Delete associated optional images first
            const [imageRows] = await db.query("SELECT image FROM tbservicecontact_image WHERE tbservicecontact_id = :id", param);
            for (const img of imageRows) {
                await removeFile(img.image); // remove each optional image
            }

            // Then delete the records from tbtraining_image
            await db.query("DELETE FROM tbservicecontact_image WHERE tbservicecontact_id = :id", param);

            // Delete main training record
            const sql = "DELETE FROM tbservicecontact WHERE id = :id";
            const [data] = await db.query(sql, param);

            // Remove main image file if exists
            if (data.affectedRows) {
                await removeFile(dataInfo[0].image); // lowercase 'image'
            }

            res.json({
                message: data.affectedRows ? "Remove success" : "Not found",
                data: data
            });
        } else {
            res.json({
                message: "Not found",
                error: true
            });
        }
    } catch (err) {
        logError("tbservicecontact.remove", err, res);
    }
};


module.exports = {
    getList,
    getOne,
    create,
    update,
    TrainImage,
    remove
};


