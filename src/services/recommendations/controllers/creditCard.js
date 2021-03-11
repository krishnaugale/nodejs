const creditCardOfferSchema = require('../../../mongoDB/recomendations/models/creditCardOffer')
const creditCardOfferDetailsSchema = require('../../../mongoDB/recomendations/models/creditCardOfferDetails')



const insertCreditCardOffer = async (req, res) => {
        try {
          const offerData = await creditCardOfferSchema.creditCardOffer.create({
            customerCode: req.body.customerCode,
            parameter1: req.body.parameter1,
            parameter2: req.body.parameter2,
            parameter3: req.body.parameter3,
            parameter4: req.body.parameter4,
            parameter5: req.body.parameter5,
          })
      
          return res
            .status(200)
            .send({ code: 200, message: 'Data Inserted', offerData })
        } catch (error) {
          return res.status(500).send({ code: 500, message: 'Internal Server Error' })
        }
      }
  
      const insertCreditCardOfferDetails = async (req, res) => {
          try {
            const offerData = await creditCardOfferDetailsSchema.creditCardOfferDetails.create(
              {
                offerId: req.body.offerId,
                expiredOn: req.body.expiredOn,
                offerTitle: req.body.offerTitle,
                offerDescription: req.body.offerDescription,
                cardImage: req.body.cardImage,
                promoCode: req.body.promoCode,
              },
            )
        
            return res
              .status(200)
              .send({ code: 200, message: 'Data Inserted', offerData })
          } catch (error) {
            return res.status(500).send({ code: 500, message: 'Internal Server Error' })
          }
        }
        
        const getOfferDetails = async (req, res) => {
           try
            {
            const  userId  = req.params.customerCode
            //const userId = "1110"
            const offerData = await creditCardOfferSchema.creditCardOffer.findOne({
              customerCode: userId,
            })
        
            const offerDetails = await creditCardOfferDetailsSchema.creditCardOfferDetails.find(
              {
                offerId: {
                  $in: [
                    offerData.parameter1,
                    offerData.parameter2,
                    offerData.parameter3,
                    offerData.parameter4,
                    offerData.parameter5,
                  ],
                },
              },
            )
            return res
              .status(200)
              .send({ code: 200, message: 'Data Fetched', offerDetails})
          } catch (error) {
            return res.status(500).send({ code: 500, message: 'Internal Server Error' })
          }
        }
        

module.exports = {
    insertCreditCardOffer ,
    insertCreditCardOfferDetails,
    getOfferDetails,
}

