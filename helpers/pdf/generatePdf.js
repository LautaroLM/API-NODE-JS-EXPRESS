const PdfPrinter = require('pdfmake')
const fs = require('fs')
const fonts = require('./fonts')
const styles = require('./styles')
const { llenarPdf } = require('./pdf-plantilla')
const {boletinMetasVigentes} = require ('E:/LAUTARO/CURSOS/cursito API NODE JS/API-NODE-JS-EXPRESS/helpers/plantillas/boletin-metas-vigentes.js')

const generatePdf = async (jurisdiccion, institucion, mail, data) => {
    const docDefinition = await boletinMetasVigentes(jurisdiccion, institucion, mail, data)
    const printer = new PdfPrinter(fonts)

    let pdfDoc = await printer.createPdfKitDocument(docDefinition)
    pdfDoc.pipe(fs.createWriteStream(__dirname + '/pdfs/pdfTest.pdf'))
    pdfDoc.end()
}

module.exports = {
    generatePdf,
}
