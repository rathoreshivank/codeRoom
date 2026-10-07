import mongoose from "mongoose"

const connectDatabase = async (mongodbUri) => {
	try {
		await mongoose.connect(mongodbUri)
		console.log("MongoDB connected")
	} catch (error) {
		throw new Error(`MongoDB connection failed: ${error.message}`)
	}
}

export { connectDatabase }
