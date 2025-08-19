const servicepartcontact_controller = require("../controller/servicepartcontact.controller");
const { upload } = require("../config/helper");
const { CheckToken } = require("../controller/user.controller");

const servicepartcontact = (app) => {
    app.get("/api/servicepartcontact/getList", servicepartcontact_controller.getList);
    app.post("/api/servicepartcontact/getone", servicepartcontact_controller.getOne);
    app.get("/api/tbservicepartcontact_image/:tbservicepartcontact_id",servicepartcontact_controller.TrainImage);
    app.post(
        "/api/servicepartcontact/create",
        CheckToken(),
        upload.fields([
            { name: 'upload_image', maxCount: 1 },
            { name: 'upload_image_optional', maxCount: 15 }
        ]),
        servicepartcontact_controller.create
    );
    app.put(
        "/api/servicepartcontact/update",
        CheckToken(),
        upload.fields([
            { name: 'upload_image', maxCount: 1 },
            { name: 'upload_image_optional', maxCount: 15 }
        ]),
        servicepartcontact_controller.update
    );
    app.delete("/api/servicepartcontact/delete", CheckToken(), servicepartcontact_controller.remove);
};

module.exports = servicepartcontact;
