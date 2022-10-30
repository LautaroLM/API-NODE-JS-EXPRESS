const express = require('express')
const app = express()
const logger = require('./loggerMiddleware')
const cors = require('cors')

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

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) =>{
    response.send('<h1>Hello world<h1>')

})

app.get('/api/notes', (request, response, next) =>{
    response.json(notes)
    next()
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find( note => note.id === id)

    if(note){
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter( note => note.id != id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if (!note || !note.content){
        return response.status(400).json({
            error: 'Note content is missing'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId +1,
        content: note.content,
        important: typeof note.important != 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    //notes = [... notes, newNote]
    notes = notes.concat(newNote)

    response.statusCode(201).json(newNote)
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
