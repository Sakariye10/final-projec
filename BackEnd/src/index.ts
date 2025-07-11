import express from 'express'
import UserRoute from './routes/UserRoute'
import FloorRoute from './routes/FloorRoute'
import CustomerRoute from './routes/CustomerRoute'
import EmployeeRoute from './routes/EmployeeRoute'
import RoomRoute from './routes/RoomRoute'
import RoomTypeRoute from './routes/RoomtypeRoute'
import BookingRoute from './routes/BookingRoute'
import DebtsRoute from './routes/DebtsRoute'
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
app.use('/api/rooms' , RoomRoute)
app.use('/api/roomtype' , RoomTypeRoute)
app.use('/api/customer' , CustomerRoute)
app.use('/api/employee' , EmployeeRoute)
app.use('/api/floor' , FloorRoute)
app.use('/api/booking' , BookingRoute)
app.use('/api/debts' , DebtsRoute)


app.listen(port , () => {
    console.log('server is running on ' , port)
})