import fs from "node:fs"
import { Buffer } from "node:buffer"
import { v4 as uuidv4 } from "uuid"
import moment from 'moment'



const makeLink = (resultPath) => {
  const myLink = "http://127.0.0.1/" + resultPath.slice(3)
  //const myLink = "http://iamtester.ru/" + resultPath
  return myLink
}
const reqBuf = (imgBuf, reqSize) => {
  const targetBuf = Buffer.alloc(reqSize, 0)
  imgBuf.copy(targetBuf)
  return targetBuf
}
const srcPath = (type) => {
  const path = "./res/min." + type
  return path
}
const resultPath = (type) => {
 // const path = "./result/" + uuidv4() + "." + type
 const path = "../files/" + uuidv4() + "." + type
 return path
}

const readAndGenerate = (type = "jpg", reqSize = 0) => {
  const k = ["jpg", "png", "bmp", "svg"]
  const date = new Date()
  try {
    //53000000 is for 50.5mb, 32000000 is for 30.5mb
    if (reqSize >= 999 && reqSize <= 32000000 && k.includes(type)) {
      //const resPath = '../'+ resultPath(type)
      const resPath = resultPath(type)
      fs.readFile(srcPath(type), (err, data) => {
        if (err) throw err
        fs.writeFile(resPath, reqBuf(data, Number(reqSize)), (err) => {
          if (err) throw err
          
          console.log(moment(date, "DD MM YYYY hh:mm:ss"),
            " The file has been saved! type: ",
            type,
            " size: ",
            reqSize
          )
        })
      })

      return {
        fileType: type,
        requiredSize: String(reqSize),
        downloadLink: makeLink(resPath),
      }
    } else {
      const errMes = { error: "Invalid required file size or file type" }

      return errMes
    }
  } catch (err) {
    console.log("rng: ", err)
  }
}

export default readAndGenerate
