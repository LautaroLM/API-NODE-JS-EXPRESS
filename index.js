const express = require('express')
const app = express()
const logger = require('./loggerMiddleware')
const cors = require('cors')
const nodemailer = require('nodemailer')



async function sendMail(jurisdiccion, institucion, mail) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount()
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'manzanadeisaac@gmail.com', // generated ethereal user
            pass: 'veesnffhycqikycg', // generated ethereal password
        },
    })
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'Boletín de lista de metas', // sender address
        to: mail, // list of receivers
        subject: 'Boletín', // Subject line
        text: 'Lista de metas', // plain text body
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
  
    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
    {
        'id': 1,
        'content': 'Tengo que suscribirme a Boca juniors',
        'date': '2019-05-30T17:30:31.098Z',
        'important': true
    },
    {
        'id': 2,
        'content': 'Tengo que suscribirme ya!',
        'date': '2019-08-26T17:30:31.098Z',
        'important': false
    },
    {
        'id': 3,
        'content': 'Tengo que suscribirme a ASD123',
        'date': '2020-05-30T17:30:31.098Z',
        'important': true
    }
]


let metas = [
    {
        'id': 1,
        'metas': ['meta1', 'meta2', 'meta3'],
        'date': '2019-05-30T17:30:31.098Z',
    },
    {
        'id': 2,
        'metas': ['meta1', 'meta2', 'meta3'],
        'date': '2019-05-30T17:30:31.098Z',
    },
    {
        'id': 3,
        'metas': ['meta1', 'meta2', 'meta3'],
        'date': '2019-05-30T17:30:31.098Z',
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) =>{
    response.send('<h1>Hello world<h1>')

})

// app.get('/api/notes', (request, response, next) =>{
//     response.json(notes)
//     next()
// })

// app.get('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const note = notes.find( note => note.id === id)

//     if(note){
//         response.json(note)
//     } else {
//         response.status(404).end()
//     }
// })

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter( note => note.id != id)
//     response.status(204).end()
// })

app.post('/api/metasvigentes/:jurisdiccion/:institucion/:mail', (request, response) => {
    //const note = request.body
    const jurisdiccion = request.params.jurisdiccion
    const institucion = request.params.institucion
    const mail = request.params.mail


    const meta = request.body


    if (!meta || !meta.metas){
        return response.status(400).json({
            error: 'Meta content is missing'
        })
    }

    const ids = metas.map(meta => meta.id)
    const maxId = Math.max(...ids)

    const newMeta = {
        id: maxId +1,
        content: meta.metas,
        date: new Date().toISOString()
    }

    //notes = [... notes, newNote]
    metas = metas.concat(newMeta)
    sendMail(jurisdiccion, institucion, mail)
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
