
//const { promedioPorAlumno, promedioAnualDirectivo, promedioInstitucionDirectivo } = require('../apis/api-analitica')


//TODO: Refaccionar. Funcion para sacar token. Adaptar funcion directivo anual para que se genere automaticamente


const llenarPdf = async (user) => {

    if (user.type === 'Alumno-promedio') {
        return true //await promedioPorAlumno(user)
    }

    else if (user.type === 'Directivo-anual') {
        return true //await promedioAnualDirectivo(user)
    }

    else if (user.type == 'Directivo-promedio') {
        return true //await promedioInstitucionDirectivo(user)
    }
}



module.exports = {
    llenarPdf,
}
