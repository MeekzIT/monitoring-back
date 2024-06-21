var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
require("dotenv").config()
const cors = require("cors")
var cron = require("node-cron")

var indexRouter = require("./routes/index")

var app = express()
app.use(cors())
const adminRouter = require("./routes/admin")
const usersRouter = require("./routes/users")
const countryRouter = require("./routes/country")
const superStatisticsRouter = require("./routes/superStatistics")
const categoryRouter = require("./routes/categories")
const OwnerRouter = require("./routes/owner")
const boxRouter = require("./routes/box")
const orderRouter = require("./routes/order")
const { getAll } = require("./services/item")

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/users", usersRouter)
app.use("/api/v1/country", countryRouter)
app.use("/api/v1/superStatistics", superStatisticsRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/owner", OwnerRouter)
app.use("/api/v1/box", boxRouter)
app.use("/api/v1/order", orderRouter)

cron.schedule("0 0 * * *", () => {
	console.log("Running a task every day at 00:00")
	getAll(true)
})

// cron.schedule("0 * * * *", () => {
// 	console.log("Logging every hour:", new Date().toLocaleString())
// 	getAll(false)
// })


app.use(function (req, res, next) {
	next(createError(404))
})

app.use(function (err, req, res, next) {
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}
	res.status(err.status || 500)
	res.render("error")
})

module.exports = app
