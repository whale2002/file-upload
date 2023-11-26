import express from 'express'
import path from 'path'
import fs from 'fs'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    )
  },
})

const upload = multer({ storage: storage })

const router = express.Router()

// 二进制文件
router.post('/file', upload.single('file'), (req, res) => {
  res.json({
    code: 1,
    msg: '上传成功',
    data: {
      url: '/uploads/' + req.file.filename,
    },
  })
})

router.post('/file_base64', (req, res) => {
  try {
    const imgData = req.body.file // 从请求体中读取base64字符串数据
    const fileExt = imgData.split(';')[0].split('/').slice(-1)[0]
    const fileName = Date.now() + '.' + fileExt // 生成文件名
    const savePath = './public/uploads/' + fileName
    const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, '')
    fs.writeFileSync(savePath, base64Data, { encoding: 'base64' })
    res.json({
      code: 1,
      data: '/uploads/' + fileName,
    })
  } catch (error) {
    res.statusCode = 500
    res.json({
      code: 0,
      error,
    })
  }
})

export { router }
