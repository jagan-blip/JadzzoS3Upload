const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
var path = require("path");
dotenv.config({ path: path.join(__dirname + "/../../.env") });
/* dotenv.config({ path: __dirname + "/../.env" }); */
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const filefilter = (req, file, callback) => {
  console.log(file);
};
const generateRandomId = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
exports.upload = multer({
  filefilter,
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { data: "Testing metadata" });
    },
    contentType: function (req, file, cb) {
      cb(null, file.mimetype);
    },
    key: function (req, file, cb) {
      cb(
        null,

        `${generateRandomId()}${path.basename(file.originalname)}`
      );
    },
  }),
});
