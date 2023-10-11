export function resultsInSite(text) {
    let results = []
    for (let key in siteRouteMapping) {
        //console.log(`key = ${key}`)
        if(key.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
            results.push({
                text: key,
                route: siteRouteMapping[key]
            })
        }
    }
    return results;
}

export const siteRouteMapping = {
    // Cuentas
    'Cuentas': '/client/Accounts',
    'Super Makro Cuenta': '/accountDetails?key=super-mackrocuenta-detalle',
    'Rendimax Plus': '/accountDetails?key=super-rendimax-plus-detalle',
    'Súper Rendimax Plus': '/accountDetails?key=super-rendimax-plus-detalle',
    'Solicitar cuenta': 'https://cyco.bmsc.com.bo',
    'Cuentas para BANX': '/Banx',
    'Comparador de cuentas': '/accountComparison',
    'Beneficios': '/Benefits',

    // Ahorro e inversión
    'Ahorro e inversión': '/client/Investment',
    'Comparador de productos': '/investmentComparison',

    // Seguros
    'Seguros': '/client/Insurance',

    // Acceso a Banca por Internet
    'Banca por Internet': '/tech/internetBank/',
    // 'Acceso a Banca por Internet': '',
    // 'Registro de usuario': '',
    // 'Recuperar contraseña': '',
    // 'Descarga de la aplicación': '',

    // Sobre nosotros
    'Sobre nosotros': '/aboutUs',
    'Préstamo de consumo': '/loanDetails?key=prestamo-consumo-detalle',
    'Préstamo de vehículo': '/loanDetails?key=compra-vehiculo-detalle',
    'Solicitar préstamo': 'https://cyco.bmsc.com.bo/',
    'Comparador de préstamos': '/LoanComparison',

    // BANX
    'Beneficios BANX': '/Banx',
    'Blog de contenidos BANX': '/Banx',
    'Promo BANX': '/banx/deal',

    // PYME
    'Cuentas para empresas': '/Pyme',
    'Préstamos para empresas': '/pyme/Loans',
    'Seguros para empresas': '/pyme/Insurance',
    'Productos para PYME': '/pyme/Services',
    // 'Beneficios para Planillas PYME': '',
    'Blog de noticias PYME y empresas': '/Pyme',

    // Tecnología
    'Tecnología': '/tech',
    'Tarjetas de crédito': '/client/CreditCard',
    'Mastercard Black': '/client/creditCardDetails?key=Mastercard-Black-detalle',
    'Mastercard Platinum': '/client/creditCardDetails?key=Mastercard-Platinum-detalle',
    'Mastercard Gold': '/client/creditCardDetails?key=Mastercard-Gold-detalle',
    'Comparador de tarjetas': '/client/cardsComparison',
    'Programas de fidelidad': '/benefits',

    // Giros de dinero
    'Giros de dinero': '/Transfer',

    // Banca empresas
    'Banca empresas': '/companies',
    'Cuentas para empresas': '/companies/Accounts',
    'Préstamos para empresas': '/companies/Loans',
    'Seguros para empresas': '/companies/Insurance',
    // 'Tarjetas de crédito para empresas': '',
    // 'Beneficios para Planillas PYME': '',
    'Blog de noticias PYME y empresas': '/companies',

    // Ayuda
    'Ayuda': '/help',
    'Puntos de reclamo': '/help',
    'Números de contacto': '/help',
    'Central de consultas': '/help',
    'Preguntas frecuentes': '/help/questions',
    'Contacta a un ejecutivo': '/additionalInfo/Contact/',
    'Punto de reclamo': '/help?showForm=true',
    'Agencias y horarios de atención': '/help/agencies',
    'Agencias y cajeros': '/help/agencies',
    'Tutoriales: Banca por internet': '/tech/internetBank',

    //Campaña Plan Familia
    'Plan Familia': '/familyplancampaign',
    'Afiliacion': '/familyplancampaign/affiliation'

}
