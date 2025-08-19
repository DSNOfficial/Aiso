
const servicelistpackagelabor_controller = require("../controller/servicelistpackagelabor.controller");
const { CheckToken } = require("../controller/user.controller");
const servicelistpackagelabor = (app) =>{   

   // Protected routes 
    app.get("/api/servicelistpackagelabor/getList",servicelistpackagelabor_controller.getList);
    app.post("/api/servicelistpackagelabor/create",CheckToken(),servicelistpackagelabor_controller.create);
    app.put("/api/servicelistpackagelabor/update",CheckToken(),servicelistpackagelabor_controller.update);
    app.delete("/api/servicelistpackagelabor/delete",CheckToken(),servicelistpackagelabor_controller.remove); 

}
module.exports = servicelistpackagelabor;



