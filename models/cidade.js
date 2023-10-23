const {mongoose} = require('../db')

const cidadeSchema = new mongoose.Schema({
   cidade: String
})

const Cidade = mongoose.model("Cidade", cidadeSchema)

module.exports = Cidade