import fs from "node:fs"
import { Buffer } from "node:buffer"
import { v4 as uuidv4 } from 'uuid';

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
  const path = "./result/"+uuidv4()+"." + type
  return path
}

const readAndGenerate = (type = "jpg", reqSize = 0) => {
  try {
    const link = "my_link_from_node"
    // console.log('Перед IF',reqSize)
    if (reqSize >= 999 && reqSize <= 9999999) {
      fs.readFile(srcPath(type), (err, data) => {
        if (err) throw err
        fs.writeFile(resultPath(type), reqBuf(data, Number(reqSize)), (err) => {
          if (err) throw err
          console.log("The file has been saved!")
        })
      })
      return {
        fileType: type,
        requiredSize: String(reqSize),
        resultPath: resultPath(type),
        downloadLink: link,
      }
    } else {
      const errMes = { error: "invalid required file size" }

      return errMes
    }
  } catch (err) {
    console.log("rng: ", err)
  }
}

export default readAndGenerate
