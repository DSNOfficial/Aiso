const express = require("express");
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

// CORS Middleware
app.use(cors({ // origin 'http://localhost:3000' has been blocked by
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "allowedHeaders": "Content-Type,Authorization" // Allowed headers

}))


app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join('/app/uploads', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  const ext = path.extname(filename).toLowerCase();

  if (ext === '.jpg' || ext === '.jpeg') {
    res.setHeader('Content-Type', 'image/jpeg');
  } else if (ext === '.png') {
    res.setHeader('Content-Type', 'image/png');
  } else if (ext === '.gif') {
    res.setHeader('Content-Type', 'image/gif');
  } else if (ext === '.pdf') {
    res.setHeader('Content-Type', 'application/pdf');
  } else {
    // No extension, guess based on filename prefix
    if (filename.startsWith('image-') || filename.includes('upload_image')) {
      res.setHeader('Content-Type', 'image/jpeg');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
    }
  }

  fs.createReadStream(filePath).pipe(res);
});





//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Rate limiter middleware
// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 15 minutes
//   max: 2, // ⛔ Change to 5 for quick testing
//   message: '⛔ Too many requests from this IP, please try again later.',
// });


// app.use(limiter); // Apply to all routes







// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });


// test route
app.get("/test", (req, res) => {
  res.send("Hello IT!!");
})

// ======= App Route Service===

const user = require("./scr/route/user.route")
const department = require("./scr/route/department.route")
const category = require("./scr/route/category.route")
const post = require("./scr/route/post.route")
const postComment = require("./scr/route/postComment.route")
const postMeta = require("./scr/route/postMeta.route")
const role = require("./scr/route/role.route")
const book = require("./scr/route/book.route")
const slideShow = require("./scr/route/slideShow.route")
const multiImage = require("./scr/route/multiImage.route")
const massage = require('./scr/route/massage.route')
const leader = require('./scr/route/leader.route')
const tbpost = require("./scr/route/tbpost.route")
const showImage = require("./scr/route/showImage.route")
const tbmarquee = require("./scr/route/tbmarquee.route")
const history = require("./scr/route/history.route");
const account = require("./scr/route/tbaccount.route");
const administration = require("./scr/route/tbadministration.route");
const technical = require("./scr/route/tbtechnical.route");
const partner = require("./scr/route/partner.route");
const training = require("./scr/route/training.route");
const manyImages = require("./scr/route/manyImages.route");
const postnew = require("./scr/route/postnew.route");
const coder = require("./scr/route/coder.router");
const posts = require("./scr/route/posts.route");
const mission = require("./scr/route/mission.route");
const servicePackage = require("./scr/route/servicePackage.route");
const visionH = require("./scr/route/visionH.route");
const valueH = require("./scr/route/valueH.route");
const doscadmin = require("./scr/route/docsadmin.route");
// const person = require("./scr/route/person.route");
// const departmentP = require("./scr/route/departmentP.route");
// const modelMotor = require("./scr/route/modelMotor.route");
// const province = require("./scr/route/province.route");
// const exportExcel = require("./scr/route/exportExcel.route");


// ======= App Service===
// exportExcel(app);
// province(app);
// modelMotor(app);
// departmentP(app);
// person(app);


const servicecontact = require("./scr/route/servicecontact.route");
const servicepartcontact = require("./scr/route/servicepartcontact.route");
const servicelabornews = require("./scr/route/servicelabornews.route");
const servicepackagelabor = require("./scr/route/servicepackagelabor.route");
const servicelistpackagelabor = require("./scr/route/servicelistpackagelabor.route");
const footsocialmedia = require("./scr/route/footsocialmedia.route");




// ======= App Service===
footsocialmedia(app);
servicepackagelabor(app);
servicelabornews(app);
servicepartcontact(app);
servicecontact(app);
servicelistpackagelabor(app);



doscadmin(app);
valueH(app);
visionH(app);
servicePackage(app);
massage(app);
leader(app);
history(app);
mission(app);
posts(app);
coder(app);
postnew(app);
manyImages(app);
training(app);
partner(app);
account(app);
administration(app);
technical(app);
tbmarquee(app);
showImage(app);
tbpost(app);
multiImage(app);
department(app);
slideShow(app);
book(app);
role(app);
user(app);
category(app);
post(app);
postComment(app);
postMeta(app);




// Start Server API

const port =7777;
app.listen(port, '0.0.0.0', () => {
  console.log("http://localhost:" + port);
});


app.get('/mm', (req, res) => {
  res.send('✅ Hello! You are within the rate limit.');
});

app.get('/hello', (req, res) => {
  res.send('✅ Hello! You are within the rate limit.');
});