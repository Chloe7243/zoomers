const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log({file});
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

module.exports = multer({ storage });
