const express = require('express')
const cookieParser = require('cookie-parser')

const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cookieParser())

// Enable CORS for frontend
const allowedOrigins = [
	'http://localhost:5173',
	process.env.CLIENT_URL,
	process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(null, true); // Allow during production testing
		}
	},
	credentials: true
}))

// require all the routes here
const authRouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes')


//using all the routes here
app.use('/api/auth',authRouter)
app.use('/api/interview',interviewRouter)

app.get('/api/health',(req,res)=>{
    return res.status(200).json({message:'OK'})
})


module.exports = app
