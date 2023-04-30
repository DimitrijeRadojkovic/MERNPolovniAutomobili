const express = require("express");
const {addOglas} = require("../controllers/oglasi");
const auth = require("../middleware/authentication");

const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
    destination: function(req, file, cb)  {
        cb(null, "./images")
    },
    filename: function(req, file, cb)  {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const upload = multer({storage: fileStorageEngine});

const router = express.Router();

router.route("/addoglas").post(auth, upload.array("images"), addOglas);

module.exports = router;