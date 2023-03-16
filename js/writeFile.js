import fs from 'node:fs'
import { Buffer } from 'node:buffer'
const requiredSize=1000000
const reqBuf = (imgBuf,reqSize) =>{
  const targetBuf= Buffer.alloc(reqSize,0)
  imgBuf.copy(targetBuf)
  return targetBuf
}
fs.readFile('C:/Users/tech/Desktop/TEmp/min/min.bmp', (err, data) => {
  if (err) throw err;
  fs.writeFile('C:/Users/tech/Desktop/TEmp/resize/resize.bmp', reqBuf(data,requiredSize), (err) => {
    if (err) throw err;
    console.log('The file has been saved!')
    fs.stat('new.jpg', (err, size) => {
      if (err) throw err;
      console.log(size)
    })
  })  
})
