const appError = require("./appError");

class internalServerError extends appError{
    constructor(){
        super('its not you its our server where something went wrong',500)
    }
}
module.exports = {
    internalServerError
}