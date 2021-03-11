const creditCardOfferSchema = require('../../../mongoDB/customers/models/creditCard')


const insertCreditCardOffer = async (req, res) => {
    try {
        console.log("hey try1");
    }
    catch(error)
    {
        console.log("hey catch1");
    }
}

const insertcreditCardOfferDetails = async (req, res) => {
    try {
        console.log("hey try2");
    }
    catch(error)
    { 
        console.log("hey catch1");
    }
}

module.exports = {
    insertCreditCardOffer ,
    insertcreditCardOfferDetails
}

