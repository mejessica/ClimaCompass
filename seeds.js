const Cidade = require('./models/cidade')

const cidade1 = new Cidade({
    cidadeName:'miami'
})
const cidade2 = new Cidade({
    cidadeName:'sao paulo'
})

Cidade.insertMany([cidade1, cidade2])
    .then(res => console.log(res))
    .catch(e => console.log(e))
