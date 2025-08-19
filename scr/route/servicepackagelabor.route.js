
const servicepackagelabor_controller = require("../controller/servicepackagelabor.controller");
const {upload} = require("../config/helper");
const { CheckToken } = require("../controller/user.controller");
const servicepackagelabor = (app) =>{

    app.get("/api/servicepackagelabor/getList",servicepackagelabor_controller.getList);
    app.get("/api/servicepackagelabor/getone/:id",servicepackagelabor_controller.getOne);

    //middleware check Token
    app.post("/api/servicepackagelabor/create",CheckToken(),upload.single("image"),servicepackagelabor_controller.create);
    app.put("/api/servicepackagelabor/update",CheckToken(),upload.single("image"),servicepackagelabor_controller.update);
    app.delete("/api/servicepackagelabor/delete",CheckToken(),servicepackagelabor_controller.remove);    
}
module.exports = servicepackagelabor;


