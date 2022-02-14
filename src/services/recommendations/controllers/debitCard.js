const debitCardOfferDetailsSchema = require('../../../mongoDB/recomendations/models/debitCardOfferDetails')
const debitCardOfferSchema = require('../../../mongoDB/recomendations/models/debitCardOffer')

const insertDebitCardOffer = async (req, res) => {
  try {
    const offerData = await debitCardOfferSchema.debitCardOffer.create({
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

const insertDebitCardOfferDetails = async (req, res) => {
  try {
    const offerData = await debitCardOfferDetailsSchema.debitCardOfferDetails.create(
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
  try {
    const { userID } = req.query

    const offerData = await debitCardOfferSchema.debitCardOffer.findOne({
      customerCode: userID,
    })

    const offerDetails = await debitCardOfferDetailsSchema.debitCardOfferDetails.find(
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
      .send({ code: 200, message: 'Data Inserted', offerDetails })
  } catch (error) {
    return res.status(500).send({ code: 500, message: 'Internal Server Error' })
  }
}

module.exports = {
  insertDebitCardOffer,
  insertDebitCardOfferDetails,
  getOfferDetails,
}
