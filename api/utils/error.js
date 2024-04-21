const errorHandler = (statusCode, message) => {
    const errror = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};

module.exports = errorHandler;