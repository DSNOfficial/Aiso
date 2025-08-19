const servicelabornews_controller = require("../controller/servicelabornews.controller");
const { upload } = require("../config/helper");
const { CheckToken } = require("../controller/user.controller");

const servicelabornews = (app) => {
    app.get("/api/servicelabornews/getList", servicelabornews_controller.getList);
    app.post("/api/servicelabornews/getone", servicelabornews_controller.getOne);
    app.get("/api/tbservicelabornews_image/:tbservicelabornews_id",servicelabornews_controller.TrainImage);
    app.post(
        "/api/servicelabornews/create",
        CheckToken(),
        upload.fields([
            { name: 'upload_image', maxCount: 1 },
            { name: 'upload_image_optional', maxCount: 15 }
        ]),
        servicelabornews_controller.create
    );
    app.put(
        "/api/servicelabornews/update",
        CheckToken(),
        upload.fields([
            { name: 'upload_image', maxCount: 1 },
            { name: 'upload_image_optional', maxCount: 15 }
        ]),
        servicelabornews_controller.update
    );
    app.delete("/api/servicelabornews/delete", CheckToken(), servicelabornews_controller.remove);
};

module.exports = servicelabornews;

