function errorHandler(err, req, res, next) {
    let status = 500
    let message = err.name
    let error;
    console.log(err, "<<< errors");
    switch (message) {
        case "SequelizeValidationError":
            error = err.errors.map(e => {
                return e.message
            }).join(", ")
            status = 400
            break;
        case "wrong email/password":
            error = "wrong email/password",
                status = 401
            break;
        case "Not authorize" : 
            error = "Not authorize", 
            status = 401
            break;
        case "Authentication failed":
            error = "Authentication failed",
                status = 400
            break;
        case 'email already registered': 
            error = 'email already registered',
            status = 401
            break;
        default:
            error = "internal server error",
                status = 500
            break;
    }
    res.status(status).json({ message: error })


}

module.exports = errorHandler