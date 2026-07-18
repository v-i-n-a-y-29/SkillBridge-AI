const multer = require('multer')




/**
 * @description Middleware to handle file uploads
 */


const upload = multer(
    {
        storage:multer.memoryStorage(),
        limits:{
            fileSize:3*1024*1024 //3 MB
        }

    }
)


module.exports = upload