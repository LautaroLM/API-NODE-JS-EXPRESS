const express = require('express')
const app = express()
const logger = require('./loggerMiddleware')
const cors = require('cors')
const nodemailer = require('nodemailer')
const {generatePdf} = require ('./helpers/pdf/generatePdf')


//MAIL
async function sendMail(jurisdiccion, institucion, mail, data) {
    
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
    
    generatePdf(jurisdiccion, institucion, mail, data)
   
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


app.use(cors())
app.use(express.json())

app.use(logger)

// let notes = [
//     {
//         'id': 1,
//         'content': 'Tengo que suscribirme a Boca juniors',
//         'date': '2019-05-30T17:30:31.098Z',
//         'important': true
//     },
//     {
//         'id': 2,
//         'content': 'Tengo que suscribirme ya!',
//         'date': '2019-08-26T17:30:31.098Z',
//         'important': false
//     },
//     {
//         'id': 3,
//         'content': 'Tengo que suscribirme a ASD123',
//         'date': '2020-05-30T17:30:31.098Z',
//         'important': true
//     }
// ]


let metas = [
    {
        'id': 1,
        'listaDeMetas': [
            {
                'dispositivo': 'Aire acondiconado',
                'meta': 'Consumir menos de 15235 Watts',
                'fecha': '31/11/22'
            },
            {
                'dispositivo': 'Estufa electrica',
                'meta': 'Consumir menos de 500 pesos en gas',
                'fecha': '30/11/22'
            },
            {
                'dispositivo': 'Estufa electrica',
                'meta': 'Consumir menos de 500 pesos en gas',
                'fecha': '31/12/22'
            },
        ],
        'date': '2019-05-30T17:30:31.098Z',
    },
    {
        'id': 2,
        'listaDeMetas': [
            {
                'dispositivo': 'Aire acondiconado',
                'meta': 'Consumir menos de 15235 Watts',
                'fecha': '31/11/22'
            },
            {
                'dispositivo': 'Estufa electrica',
                'meta': 'Consumir menos de 500 pesos en gas',
                'fecha': '30/11/22'
            },
            {
                'dispositivo': 'Estufa electrica',
                'meta': 'Consumir menos de 500 pesos en gas',
                'fecha': '31/12/22'
            },
        ],
        'date': '2019-05-30T17:30:31.098Z',
    },
    {
        'id': 3,
        'listaDeMetas': [
            {
                'dispositivo': 'Aire acondiconado',
                'meta': 'Consumir menos de 15235 Watts',
                'fecha': '31/11/22'
            },
            {
                'dispositivo': 'Estufa electrica',
                'meta': 'Consumir menos de 500 pesos en gas',
                'fecha': '30/11/22'
            },
            {
                'dispositivo': 'Estufa electrica',
                'meta': 'Consumir menos de 500 pesos en gas',
                'fecha': '31/12/22'
            },
        ],
        'date': '2019-05-30T17:30:31.098Z',
    },
]



app.get('/', (request, response) =>{
    response.send('<h1>Hello world<h1>')

})



app.post('/api/metasVigentes/:jurisdiccion/:institucion/:mail', (request, response) => {
    //const note = request.body
    const jurisdiccion = request.params.jurisdiccion
    const institucion = request.params.institucion
    const mail = request.params.mail
    const meta = request.body
    
    if (!meta || !meta.listaDeMetas){
        return response.status(400).json({
            error: 'listaDeMetas content is missing'
        })
    }

    const ids = metas.map(meta => meta.id)
    const maxId = Math.max(...ids)

    const newMeta = {
        id: maxId +1,
        metas: meta.metas,
        date: new Date().toISOString()
    }

    metas = metas.concat(newMeta)
    sendMail(jurisdiccion, institucion, mail, meta)
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
