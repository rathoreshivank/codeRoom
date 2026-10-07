import "dotenv/config"

const getRequiredEnv = (name) => {
    const value = process.env[name]

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }

    return value
}

const env = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 8000,
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
    mongodbUri: () => getRequiredEnv("MONGODB_URI")
}

export { env }