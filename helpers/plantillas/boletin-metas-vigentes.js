//* Aca se crea la tabla *//
async function table(data, columns) {
    // console.log(data,columns);
    return {
        table: {
            style: ['tableExample'],
            headerRows: 1,
            body: await buildTableBody(data, columns),
        },
    }
} 

function buildTableBody(data, columns) {
    var body = []

    body.push(columns)

    data.forEach(function (row) {
        var dataRow = []

        columns.forEach(function (column) {
            dataRow.push(row[column])
        })

        body.push(dataRow)
    })
    console.log(body)
    return body
}

const boletinMetasVigentes = async (jurisdiccion, institucion, mail, data) => {
    var boletinPromedioNumerico = {
        content: [
            {
                text: '',
                style: [],
            },
  
            {
                style: ['header', 'fuenteBanner', 'banner', 'anotherStyle'],
                table: {
                    widths: '*',
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                fillColor: '#1b9752',
                                color: 'white',
                                text: 'LA MANZANA DE ISAAC ',
                            },
                        ],
                    ],
                },
            },
  
            {
                nodeName: 'DIV',
                stack: [
                    {
                        text: '',
                        style: ['html-div', 'colo'],
                    },
                    {
                        text: '',
                        width: '80%',
                        style: ['html-div'],
                    },
                    {
                        nodeName: 'DIV',
                        id: 'encabezado',
                        stack: [
                            {
                                text: ' ',
                                style: ['html-div'],
                            },
                            {
                                nodeName: 'DIV',
                                stack: [
                                    {
                                        text: ' ',
                                        background: 'white',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        style: ['html-div', 'banner'],
                                    },
                                    {
                                        text: ' ',
                                        background: 'white',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        style: ['html-div', 'banner'],
                                    },
  
                                    {
                                        text: ' ',
                                        background: 'white',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        style: ['html-div', 'banner'],
                                    },
                                    {
                                        text: 'LISTA DE METAS VIGENTES',
                                        nodeName: 'P',
                                        background: 'white',
                                        display: 'flex',
                                        fontSize: 25,
  
                                        justifyContent: 'space-around',
                                        margin: [0, 5, 0, 10],
                                        style: [
                                            'anotherStyle',
                                            'fuente',
                                            'html-p',
                                            'html-div',
                                            'banner',
                                            'encabezado-titulo',
                                        ],
                                    },
                                    {
                                        text: ' ',
                                        background: 'white',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        style: ['html-div', 'banner'],
                                    },
                                ],
                            },
                            {
                                text: ' ',
                                style: ['html-div'],
                            },
                        ],
                    },
                    {
                        text: ' ',
                        width: '80%',
                        style: ['html-div'],
                    },
                    {
                        nodeName: 'DIV',
                        stack: [
                            {
                                text: ' ',
                                style: ['html-div', 'informacion'],
                            },
                            {
                                text: `Instituto: ${institucion}`,
                                nodeName: 'P',
                                margin: [0, 5, 0, 0],
                                style: [
                                    'textoInformativo',
                                    'html-p',
                                    'html-div',
                                    'informacion',
                                ],
                            },
                            {
                                text: `Juridiscción: ${jurisdiccion}`,
                                nodeName: 'P',
                                margin: [0, 5, 0, 0],
                                style: [
                                    'textoInformativo',
                                    'html-p',
                                    'html-div',
                                    'informacion',
                                ],
                            },
                            {
                                text: ' ',
                                style: ['html-div', 'informacion'],
                            },
                            {
                                text: `Fecha y Hora de envío: ${new Date().toISOString()}` ,
                                nodeName: 'P',
                                margin: [0, 5, 0, 0],
                                style: [
                                    'html-p',
                                    'html-div',
                                    'informacion',
                                    'textoInformativo',
                                ],
                            },
                            {
                                text: 'Generado automáticamente ',
                                nodeName: 'P',
                                margin: [0, 5, 0, 60],
                                style: [
                                    'textoInformativo',
                                    'html-p',
                                    'html-div',
                                    'informacion',
                                ],
                            },
                            {
                                text: `Dispositivo: ${ JSON.stringify(data.listaDeMetas[0].dispositivo) }
                                meta: ${ JSON.stringify(data.listaDeMetas[0].meta) }
                                fecha: ${ JSON.stringify(data.listaDeMetas[0].fecha) }`,
    
                                nodeName: 'P',
                                margin: [0, 5, 0, 60],
                                style: [
                                    'textoInformativo',
                                    'html-p',
                                    'html-div',
                                    'informacion',
                                ],
                            },
                            {
                                text: `Dispositivo: ${ JSON.stringify(data.listaDeMetas[1].dispositivo) }
                                meta: ${ JSON.stringify(data.listaDeMetas[1].meta) }
                                fecha: ${ JSON.stringify(data.listaDeMetas[1].fecha) }`,
                                nodeName: 'P',
                                margin: [0, 5, 0, 60],
                                style: [
                                    'textoInformativo',
                                    'html-p',
                                    'html-div',
                                    'informacion',
                                ],
                            },
                            {
                                text: `Dispositivo: ${ JSON.stringify(data.listaDeMetas[2].dispositivo) }
                                meta: ${ JSON.stringify(data.listaDeMetas[2].meta) }
                                fecha: ${ JSON.stringify(data.listaDeMetas[2].fecha) }`,
                                nodeName: 'P',
                                margin: [0, 5, 0, 60],
                                style: [
                                    'textoInformativo',
                                    'html-p',
                                    'html-div',
                                    'informacion',
                                ],
                            },
                            {
                                text: ' ',
                                style: ['html-div', 'informacion'],
                            },
                            {
                                text: ' ',
                                style: ['html-div', 'informacion'],
                            },
                        ],
                    },
                    
                    {
                        text: ' ',
                        width: '80%',
                        style: ['html-div'],
                    },
                ],
            },
        ],
        styles: {
            banner: {
                margin: [0, 100, 0, 0],
                alignment: 'center',
            },
            fuenteBanner: {
                fontSize: 55,
                bold: true,
            },
            fuente: {
                fontSize: 20,
                bold: true,
            },
            textoInformativo: {
                // italics: true,
                fontSize: 16,
            },
            centrar: {
                width: '80%',
            },
            tableExample: {
                fontSize: 17,
                bold: true,
                fillColor: '#1b9752',
                color: 'white',
                margin: [0, 0, 0, 0],
            },
            tableHeader: {
                // bold: true,
                fontSize: 13,
                color: 'black',
            },
            bodyTable: {
                color: 'black',
                fillColor: 'white',
            },
            anotherStyle: {
                // italics: true,
                alignment: 'center',
            },
        },
    }
    return boletinPromedioNumerico
}

module.exports = {
    boletinMetasVigentes
}
  