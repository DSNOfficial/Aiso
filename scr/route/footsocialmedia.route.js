
const footsocialmedia_controller = require("../controller/footsocialmedia.controller");
const { CheckToken } = require("../controller/user.controller");
const footsocialmedia = (app) =>{   

   // Protected routes 
    app.get("/api/footsocialmedia/getList",footsocialmedia_controller.getList);
    app.post("/api/footsocialmedia/create",CheckToken(),footsocialmedia_controller.create);
    app.put("/api/footsocialmedia/update",CheckToken(),footsocialmedia_controller.update);
    app.delete("/api/footsocialmedia/delete",CheckToken(),footsocialmedia_controller.remove); 

}
module.exports = footsocialmedia;
