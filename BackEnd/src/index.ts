import express from 'express'
import UserRoute from './routes/UserRoute'
const app = express();
const port = 5000;

app.use(express.json())

app.use('/api/user' , UserRoute)


app.listen(port , () => {
    console.log('server is running on ' , port)
})