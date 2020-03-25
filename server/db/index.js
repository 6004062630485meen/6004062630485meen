const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://numer:wwmm9999@cluster0-pytlb.gcp.mongodb.net/cinema', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db