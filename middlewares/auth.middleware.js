import { ApiError } from "../utils/error.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import JWT from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from "../utils/constant.js"

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken
    if (!token) {
        throw new ApiError(400, "Please log in again")
    }
    const userDetails = await JWT.verify(token, ACCESS_TOKEN_SECRET)

    req.user = userDetails

    next()
})