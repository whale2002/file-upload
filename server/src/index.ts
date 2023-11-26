import express from 'express'
import cors from 'cors'
import { router } from './router/common'

const PORT = 3000

const app = express()
app.use(cors())
app.use(express.static('./public')) // 静态资源
app.use(express.urlencoded({ limit: '100mb', extended: true })) // 解析编码
app.use(express.json({ limit: '100mb'})) // 允许传json

app.use('/api/v1/common', router)

app.listen(PORT, () => {
  console.log('Server is running on port 3000')
})
