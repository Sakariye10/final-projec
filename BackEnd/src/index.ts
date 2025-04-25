import express from 'express'
import UserRoute from './routes/UserRoute'
import cors from 'cors'
const app = express();
const port = 5000;

app.use(express.json())

app.use(
    cors({
        origin : 'http://localhost:5173'
    })
)

app.use('/api/user' , UserRoute)


app.listen(port , () => {
    console.log('server is running on ' , port)
})