const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp")

module.exports = {
  directory: tmpFolder,
  limits: {
    fileSize: 2 * 1024 * 1024 //2 MB
  },
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback){
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}`
      return callback(null, fileName)
    }
  })
}
