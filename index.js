const express = require('express')
const app = express()
const logger = require('./loggerMiddleware')
const cors = require('cors')
const nodemailer = require('nodemailer')
const {generatePdf} = require ('./helpers/pdf/generatePdf')
const fs = require('fs').promises
const TelegramBot = require('node-telegram-bot-api')


//MAIL
async function sendMail(jurisdiccion, institucion, data, mail) {
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'manzanadeisaac@gmail.com', 
            pass: 'veesnffhycqikycg', 
        },
    })
    
    generatePdf(jurisdiccion, institucion, data)
   
    let info = await transporter.sendMail({
        attachments: [
            {
                filename: 'Boletin.pdf',
                path: __dirname + '/helpers/pdf/pdfs/pdfTest.pdf',
            },
        ],
        from: 'Boletín de lista de metas', 
        to: mail, 
        subject: 'Boletín', 
        text: 'Lista de metas', 
        html: `
      <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
          <tr>
              <td style="background-color: #ecf0f1">
                  <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                      <h2 style="color: #e67e22; margin: 0 0 7px">Hola !</h2>
                      <p style="margin: 2px; font-size: 15px">
                          Se le envía dicho mail ya que ha solicitado desde la aplicación de boletín poder obtener la lista de metas de la jurisdicción ${jurisdiccion} y la institución ${institucion}: </p>
      
                      
                      <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Boletín informativo, Laboratorio de Construcción de Software I</p>
                  </div>
              </td>
          </tr>
      </table>
          `
    })
    return info
}

async function sendTelegram (jurisdiccion, institucion, data, telegram) {
    const token = '5469916650:AAHjJZCpDDqAhdg6pcgI5rydWquaQ1qHl_4'
    const bot = new TelegramBot(token, { polling: true })
    

    generatePdf(jurisdiccion, institucion, data)

    

    try {
        async function loadMonoCounter() {
            const boletin = await fs.readFile(__dirname + '/helpers/pdf/pdfs/pdfTest.pdf')
            return Buffer.from(boletin)
        }
        
        const file = await loadMonoCounter()
        bot.sendDocument(telegram, file)

    } catch (TelegramResponseException) {
        return 'Error'
    }
}




app.use(cors())
app.use(express.json())

app.use(logger)



let metas = 
{
    'type': 'vigentes',
    'mails': ['asd123@gmail.com', 'psdfo@gmail.com', 'asdasad'],
    'dispositivo': 'Aire acondiconado',
    'meta': 'Consumir menos de 15235 Watts',
    'acciones': ['Dejar el aire en 24°', 'Apagar las luces al salir del aula', 'afn fgdngdn dfjgdj'],
    'fecha': '31/11/22'
}
           


app.get('/', (request, response) =>{
    response.send('<h1>Hello world<h1>')

})

//funcion para esperar por cada email enviado para evitar problemas de envios masivos en el servicio
function enviarMail(jurisdiccion, institucion, bodyRequest){
    
    function sleep(milliseconds) {  
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    async function fun() {
        for(let i = 0; i<JSON.stringify(bodyRequest.mails.length);i++) {          
            await sleep(4000)
            console.log('Enviando mail a ' + JSON.stringify(bodyRequest.mails[i]))
            sendMail(jurisdiccion, institucion, bodyRequest, JSON.stringify(bodyRequest.mails[i]))
        }
    }
    fun()
}

//funcion para esperar por cada telegram enviado para evitar problemas de envios masivos en el servicio
function enviarTelegram(jurisdiccion, institucion, bodyRequest){
    
    function sleep(milliseconds) {  
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    async function fun() {
        for(let i = 0; i<JSON.stringify(bodyRequest.telegrams.length);i++) {          
            await sleep(4000)
            console.log('Enviando telegram a ' + JSON.stringify(bodyRequest.telegrams[i]))
            sendTelegram(jurisdiccion, institucion, bodyRequest, JSON.stringify(bodyRequest.telegrams[i]))
        }
    }
    fun()
}


app.post('/api/metas/:jurisdiccion/:institucion', (request, response) => {
    //const note = request.body
    const jurisdiccion = request.params.jurisdiccion
    const institucion = request.params.institucion
    const bodyRequest = request.body
    
    if (!bodyRequest && !bodyRequest.type && (bodyRequest.mails || bodyRequest.telegrams) ){
        return response.status(400).json({
            error: 'listaDeMetas content is missing'
        })
    }


    const newMeta = {
        metas: bodyRequest.metas,
        date: new Date().toISOString()
    }
    // metas = metas.concat(newMeta)

    if(bodyRequest.mails){
        enviarMail(jurisdiccion, institucion, bodyRequest)
    }
    else{
        enviarTelegram(jurisdiccion, institucion, bodyRequest)
    }
    response.status(201).json(newMeta)
})

app.use((request, response) => {
    response.status(404).json({
        error: 'Not found'
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
