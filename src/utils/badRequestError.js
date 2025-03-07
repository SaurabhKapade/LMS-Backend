const appError = require("./appError");

class badRequestError extends appError{
    constructor(invalidParams){
        // console.log('invalidparamsss',invalidParams)
        let message=''
        invalidParams.forEach((param) => {
            message+=`${param}\n`
        });
        console.log('error:',message)
        super(`${message}`,400)
        // super(`Not able to find properties ${notFoundProperties} for the resource ${resourcre}` , 404)
    }
}
module.exports = {
    badRequestError
}