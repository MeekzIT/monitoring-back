const Users = require("../models").User
const Contry = require("../models").Country
const Owner = require("../models").Owner
const Box = require("../models").Box
const bcrypt = require("bcryptjs")
const { Op } = require("sequelize")

const create = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			phoneNumber,
			countryId,
			adminId,
		} = req.body
		const oldUser = await Users.findOne({
			where: { email, role: "user" },
		})
		if (oldUser) {
			return res.json({ message: "alredy exist" })
		} else {
			let encryptedPassword = await bcrypt.hash(password, 10)
			const newUser = await Users.create({
				firstName,
				lastName,
				email: email.toLowerCase(),
				phoneNumber,
				password: encryptedPassword,
				subscribe: false,
				lastPay: "",
				countryId,
				variant: "standart",
				role: "user",
				adminId,
			})
			const user = await Users.findOne({
				where: { id: newUser.id },
				include: [
					{
						model: Contry,
					},
				],
			})
			return res.json({ succes: true, data: user })
		}
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const edit = async (req, res) => {
	try {
		const {
			id,
			firstName,
			lastName,
			email,
			password,
			phoneNumber,
			countryId,
			adminId,
		} = req.body
		const user = await Users.findOne({
			where: { email, role: "user" },
		})
		let encryptedPassword = await bcrypt.hash(password, 10)
		user.firstName = firstName
		user.lastName = lastName
		user.email = email
		user.password = encryptedPassword
		user.phoneNumber = phoneNumber
		user.countryId = countryId
		user.adminId = adminId
		await user.save()
		return res.json({ succes: true, data: user })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const destroy = async (req, res) => {
	try {
		const { id } = req.body
		await Users.destroy({
			where: { id },
		})

		return res.json({ succes: true })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

//admin controllers

const getAll = async (req, res) => {
	const { search, adminId } = req.query
	const offset = Number.parseInt(req.query.offset) || 0
	const limit = Number.parseInt(req.query.limit) || 12
	const count = await Users.findAll()
	let queryObj = {}
	if (search) {
		queryObj["phoneNumber"] = {
			[Op.like]: "%" + String(search) + "%",
		}
	}

	if (adminId) {
		queryObj["adminId"] = {
			[Op.eq]: adminId,
		}
	}

	try {
		const allUsers = await Users.findAll({
			where: {
				...queryObj,
			},
			offset: offset * limit,
			limit,
			include: [
				{
					model: Contry,
				},
			],
		})
		return res.json({ paginateData: allUsers, count: count.length })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const getSingle = async (req, res) => {
	try {
		const { id } = req.query
		const user = await Users.findOne({
			where: { id },
			include: [
				{
					model: Owner,
					include: [
						{
							model: Contry,
						},
						{
							model: Box,
						},
					],
				},
			],
		})
		const activeOwners = await Owner.findAll({
			where: { userId: id, subscribe: true },
		})
		const pasiveveOwners = await Owner.findAll({
			where: { userId: id, subscribe: false },
		})
		return res.json({
			data: user,
			actives: {
				active: activeOwners,
				pasiveve: pasiveveOwners,
			},
		})
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const delateAccount = async (req, res) => {
	try {
		const { id } = req.body

		const user = await Users.findOne({ where: { id } })
		await user.destroy()
		return res.json({ succes: true })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const changePaymentStatus = async (req, res) => {
	try {
		const { variant } = req.body
		const { user_id } = req.user
		const user = await Users.findOne({ where: { id: user_id } })
		user.variant = variant
		user.subscribe = true
		user.lastPay = new Date()
		await user.save()
		return res.json({ succes: true })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

module.exports = {
	create,
	getAll,
	getSingle,
	delateAccount,
	changePaymentStatus,
	edit,
	destroy,
}
