const appError = require("./appError");

class notFoundError extends appError{
    constructor(resource,statusCode){
        super(`not able to find ${resource}`,statusCode);
    }
}
module.exports={
    notFoundError
}