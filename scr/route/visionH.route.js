
const visionH_controller = require("../controller/visionH.controller");
const {upload} = require("../config/helper");
const { CheckToken } = require("../controller/user.controller");
const visionH = (app) =>{
 
    app.get("/api/about-labor/getList",visionH_controller.getList);
    app.post("/api/about-labor/getone",visionH_controller.getOne);

    app.post("/api/about-labor/create",CheckToken(),upload.single("upload_image"),visionH_controller.create);
    app.put("/api/about-labor/update",CheckToken(),upload.single("upload_image"),visionH_controller.update);
    app.delete("/api/about-labor/delete",CheckToken(),visionH_controller.remove);    
}
module.exports = visionH;


