const servicecontact_controller = require("../controller/servicecontact.controller");
const { upload } = require("../config/helper");
const { CheckToken } = require("../controller/user.controller");

const servicecontact = (app) => {
    app.get("/api/servicecontact/getList", servicecontact_controller.getList);
    app.post("/api/servicecontact/getone", servicecontact_controller.getOne);
    app.get("/api/tbservicecontact_image/:tbservicecontact_id",servicecontact_controller.TrainImage);
    app.post(
        "/api/servicecontact/create",
        CheckToken(),
        upload.fields([
            { name: 'upload_image', maxCount: 1 },
            { name: 'upload_image_optional', maxCount: 15 }
        ]),
        servicecontact_controller.create
    );
    app.put(
        "/api/servicecontact/update",
        CheckToken(),
        upload.fields([
            { name: 'upload_image', maxCount: 1 },
            { name: 'upload_image_optional', maxCount: 15 }
        ]),
        servicecontact_controller.update
    );
    app.delete("/api/servicecontact/delete", CheckToken(), servicecontact_controller.remove);
};

module.exports = servicecontact;
