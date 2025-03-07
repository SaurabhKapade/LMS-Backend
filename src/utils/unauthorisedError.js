const appError = require("./appError");

class unauthorisedError extends appError{
    constructor(){
        super('user is not authorised',404)
    }
}
module.exports = {
    unauthorisedError
}