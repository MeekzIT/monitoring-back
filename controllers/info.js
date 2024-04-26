const { map } = require("../app")
const {
	getBenefit,
	getExpenses,
	getBenefitByDays,
	getBenefitsByMode,
	getExpensesByModes,
	transformData,
} = require("../services/graphics")
const { Op } = require("sequelize")
const { getModeName, getInfoItemValues } = require("../services/item")

const Info = require("../models").Info
const Info2 = require("../models").Info2
const Items = require("../models").Item
const Items2 = require("../models").Item2
const ItemValues = require("../models").ItemValues

const create = async (req, res) => {
	try {
		const { ownerID, mode, functionId } = req.body

		await Info.create({
			ownerID,
			mode,
			functionId,
		})
		return res.json({ succes: true })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const destroyInfo = async (req, res) => {
	try {
		const { id } = req.body

		await Info.destroy({
			where: { id },
		})
		return res.json({ succes: true })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const edit = async (req, res) => {
	try {
		const { data } = req.body
		if (data.active == 1) {
			const item = await Info.findOne({
				where: { ownerID: data.ownerID, functionId: data.functionId },
			})
			await item.update(data)
			const allItem = await Info.findAll({ where: { ownerID: data.ownerID } })

			return res.json({ succes: true, info: allItem })
		} else if (data.active == 2) {
			const item = await Info2.findOne({
				where: { ownerID: data.ownerID },
			})
			await item.update(data)
			return res.json({ succes: true, info: item })
		}
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const destroy = async (req, res) => {
	try {
		const { id } = req.body
		await ItemValues.destroy({ where: { id } })
		return res.json({ succes: true })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const createInfo = async (req, res) => {
	try {
		const data = req.body
		await ItemValues.create(data)
		return res.json({ succes: true })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const getValues = async (req, res) => {
	try {
		const { ownerId } = req.query
		const all = await ItemValues.findAll({ where: { p2: ownerId } })
		return res.json({ succes: true, data: all })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const getInfo = async (req, res) => {
	try {
		const { id, active } = req.query
		if (active == 1) {
			const item = await Info.findAll({ where: { ownerID: id } })
			return res.json({ succes: true, info: item })
		} else if (active == 2) {
			const item = await Info2.findAll({ where: { ownerID: id } })
			return res.json({ succes: true, info: item })
		}
	} catch (e) {
		console.log("something went wrong", e)
	}
}

function getPreviousDayDate(inputDate) {
	try {
		// Parse the input date string into a Date object
		const date = new Date(inputDate)

		// Check if the inputDate is a valid date
		if (isNaN(date.getTime())) {
			return "Invalid input. Please provide a valid date in the format 'YYYY-MM-DD'."
		}

		// Subtract one day from the date
		date.setDate(date.getDate() - 1)

		// Get the year, month, and day components of the previous day
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, "0") // Months are zero-indexed
		const day = String(date.getDate()).padStart(2, "0")

		// Assemble the previous day date string in 'YYYY-MM-DD' format
		const previousDayDate = `${year}-${month}-${day}`

		return previousDayDate
	} catch (error) {
		return "An error occurred. Please try again with a valid date in the format 'YYYY-MM-DD'."
	}
}

const clacData = async (req, res) => {
	try {
		const { ownerID, date } = req.query
		const info = await Info.findAll({ where: { ownerID } })
		const day = await ItemValues.findOne({
			where: {
				p2: ownerID,
				datatime: {
					[Op.like]: date + "%",
				},
			},
		})
		const item = !date ? await Items.findOne({ where: { p2: ownerID } }) : day

		const prevDay = await ItemValues.findOne({
			where: {
				p2: ownerID,
				datatime: {
					[Op.like]: getPreviousDayDate(item.datatime) + "%",
				},
			},
		})

		const modeUsedTime1 = prevDay
			? Number(item.p44) - Number(prevDay.p44)
			: Number(item.p44)
		const modeUsedTime2 = prevDay
			? Number(item.p45) - Number(prevDay.p45)
			: Number(item.p45)
		const modeUsedTime3 = prevDay
			? Number(item.p46) - Number(prevDay.p46)
			: Number(item.p46)
		const modeUsedTime4 = prevDay
			? Number(item.p47) - Number(prevDay.p47)
			: Number(item.p47)
		const modeUsedTime5 = prevDay
			? Number(item.p48) - Number(prevDay.p48)
			: Number(item.p48)
		const modeUsedTime6 = prevDay
			? Number(item.p49) - Number(prevDay.p49)
			: Number(item.p49)
		const getModeTimer = mode => {
			if (mode == 1) {
				return modeUsedTime1
			} else if (mode == 2) {
				return modeUsedTime2
			} else if (mode == 3) {
				return modeUsedTime3
			} else if (mode == 4) {
				return modeUsedTime4
			} else if (mode == 5) {
				return modeUsedTime5
			} else if (mode == 6) {
				return modeUsedTime6
			}
		}
		const getModeNominal = mode => {
			if (mode == 1) {
				return item.p20
			} else if (mode == 2) {
				return item.p21
			} else if (mode == 3) {
				return item.p22
			} else if (mode == 4) {
				return item.p23
			} else if (mode == 5) {
				return item.p24
			} else if (mode == 6) {
				return item.p25
			}
		}
		const data = []
		await info.map(async (i, idx) => {
			const itemValues = await getInfoItemValues(
				i.enginePower,
				i.electricPrice,
				i.waterPrice,
				i.waterPerMinute,
				i.modeValuePerLitre,
				i.PrcentOfRegulator,
				i.PrcetOfModeValueFirst,
				i.PrcetOfModeValueSecond,
				getModeTimer(i.mode)
			)
			data.push({
				...itemValues,
				functionId: i.functionId,
				modeName: getModeName(i.functionId),
				seconds: getModeTimer(i.mode),
				used:
					Math.round((getModeTimer(i.mode) * 60) / getModeNominal(i.mode)) *
					item.p10,
				order: i.mode,
			})
		})
		return res.json({ succes: true, data })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const expensesBenefitPrcent = async (req, res) => {
	try {
		const { ownerID } = req.query

		let benefits = await getBenefit(ownerID)
		let expenses = await getExpenses(ownerID)
		let prcent = (expenses / benefits) * 100
		return res.json({
			succes: true,
			data: {
				benefit: 100 - prcent,
				expenses: prcent,
			},
		})
	} catch (e) {
		console.log(e, "Somethig went wrong")
	}
}

const getBenefitsByDate = async (req, res) => {
	try {
		const { ownerID } = req.query
		const owners = JSON.parse(ownerID)

		let data = []
		owners.map(async i => {
			let newData = await getBenefitByDays(i)
			data.push(newData)
		})

		return res.json({
			succes: true,
			data,
		})
	} catch (e) {
		console.log(e, "Somethig went wrong")
	}
}

const getBenefitsByModes = async (req, res) => {
	try {
		const { ownerID } = req.query
		const data = []
		const items = await ItemValues.findAll({
			where: {
				p2: ownerID,
			},
		})
		await items.map(async i => {
			let newData = await getExpensesByModes(i, ownerID)
			data.push(newData)
		})
		await res.json({
			succes: true,
			data: transformData(data),
		})
	} catch (e) {
		console.log(e, "Somethig went wrong")
	}
}

const clacData2 = async (req, res) => {
	try {
		const { ownerID } = req.query
		const info = await Info2.findOne({ where: { ownerID } })
		const item = await Items2.findOne({ where: { p2: ownerID } })
		const firstValue =
			(Number(item.p22) * Number(info.value1)) / Number(info.time1)
		const secondValue =
			(Number(info.time2) * Number(info.value2)) / Number(info.time2)
		const firstPrice = Number(info.first) / 1000
		const secondPrice = Number(info.second) / 1000
		return res.json({
			succes: true,
			data: {
				firstValue: firstValue * item.p53 * firstPrice,
				secondValue: secondValue * item.p54 * secondPrice,
				firstUsed: Math.round(item.p53 * item.p26),
				secondUsed: Math.round(item.p54 * item.p27),
			},
		})
	} catch (e) {
		console.log("something went wrong", e)
	}
}

module.exports = {
	edit,
	getInfo,
	clacData,
	expensesBenefitPrcent,
	getBenefitsByDate,
	getBenefitsByModes,
	clacData2,
	destroy,
	createInfo,
	getValues,
	create,
	destroyInfo,
}
