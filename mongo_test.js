let mongoose = require('mongoose');

let emailSchema = new mongoose.Schema({
    email: String
})

email_model = mongoose.model('Email', emailSchema)

let msg = new email_model({
    email: 'ada.lovelace@gmail.com'
})

const server = 'creepyfuck.tech:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'Test_DB';      // REPLACE WITH YOUR DB NAME

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log('Database connection successful')
                msg.save().then(doc => {
                    console.log(doc)
                    email_model
                        .find({
                            email: 'ada.lovelace@gmail.com'   // search query
                        }).then(doc => {
                            console.log("Received", doc)
                          })
                })


            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}

module.exports = new Database()