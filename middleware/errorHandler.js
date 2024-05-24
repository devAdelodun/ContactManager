import { constants } from "../constants.js";

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;

    const errorResponse = {
        title: "",
        message: err.message,
        stackTrace: err.stack
    };

    switch (statusCode) {
        case constants.BAD_REQUEST:
            errorResponse.title = "Bad Request";
            break;
        case constants.NOT_FOUND:
            errorResponse.title = "Not Found";
            break;
        case constants.FORBIDDEN:
            errorResponse.title = "Forbidden";
            break;
        case constants.SERVER_ERROR:
            errorResponse.title = "Server Error";
            break;
        default:
            console.log("All good, no error.");
            return res.end();
    }

    res.json(errorResponse);
};
