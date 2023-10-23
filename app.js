const express = require("express")
const request = require("request")
const app = express()
const path = require("path")
const methodOverride = require('method-override')
const Cidade = require('./models/cidade')

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, "public")))


app.get('/', (req, res) => {
    res.render('busca')
})

app.get('/busca', (req, res) => {
    let { cidadeName } = req.query

    let resposta = {}
    
    request(`https://api.hgbrasil.com/weather?key=be407141&city_name=` + cidadeName, async (error, response, body) => {
        if (!error && response.statusCode == 200) {
            resposta = JSON.parse(body)

           //verificação no banco
        const dateCidade = new Cidade({ cidade: cidadeName })
        await dateCidade.save(cidadeName)
        }
       
        res.render('resultadoBusca', { resposta })
    })
})


app.get('/resultadoHistorico', async (req, res) => {
    const cidade = await Cidade.find({})
    res.render('historico',{cidade})
})


app.listen(3000, () => {
    console.log("Servidor ligado na porta 3000!")
})