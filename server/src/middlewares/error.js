import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const notFoundHandler = (req, res, next) => {
    next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}

const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500
    const message = statusCode === 500 ? "Internal server error" : error.message

    res.status(statusCode).json(new ApiResponse(statusCode, null, message))
}

export { errorHandler, notFoundHandler }