<template>
  <v-container class="column-view">
    <div v-for="(pageContent, i) in pages" :key="i" class="page-content">
      <div class="strong-huge pb-4 style-title">{{ pageContent.title }}
      </div>
      <div v-for="(pagesList, j) in pageContent.pagesList"
           :key="j"
           class="reguler-text green-text pb-3 cursor-pointer style-name"
           @click="changeBaseRoute(pagesList.links)">{{ pagesList.name }}
      </div>
    </div>
  </v-container>
</template>
<script>

import {checkValidUrl} from "~/utils/urlUtil";

export default {
  name: 'Sitemap',
  data() {
    return {
      pages: [
        {
          title: "Cuentas Personales", links: '/client/Accounts',
          pagesList: [
            {
              name: "Súper Makro Cuenta",
              links: '/accountDetails?key=super-mackrocuenta-detalle'
            }, {
              name: "Rendimax Plus",
              links: '/accountDetails?key=rendimax-plus-detalle'
            }, {
              name: "Súper Rendimax Plus",
              links: '/accountDetails?key=super-rendimax-plus-detalle'
            }, {
              name: "BANX para jóvenes",
              links: '/banx/AccountsBanx'
            },
            {
              name: "Comparador de cuentas",
              links: '/accountComparison/'
            },
            {
              name: "Beneficios",
              links: '/benefits'
            }
          ]
        },
        {
          title: "Préstamos", links: '/client/Loans',
          pagesList: [
            {
              name: 'Préstamo de vivienda',
              links: '/loanDetails?key=compra-vivienda-detalle'
            }, {
              name: 'Vivienda social',
              links: '/loanDetails?key=vivienda-social-detalle'
            }, {
              name: 'Préstamo de vehículo',
              links: '/loanDetails?key=compra-vehiculo-detalle'
            }, {
              name: 'Crédito de Consumo',
              links: '/loanDetails?key=prestamo-consumo-detalle'
            }, {
              name: 'Crédito de Consumo por planilla',
              links: '/loanDetails?key=consumo-planilla-detalle'
            }, {
              name: 'Comparador de préstamos',
              links: '/loanComparison/'
            }]
        },
        {
          title: "Tarjetas de crédito", links: '/client/CreditCard',
          pagesList: [
            {
              name: 'VISA Internacional',
              links: '/client/creditCardDetails?key=VISA-internacional-detalle'
            }, {
              name: 'VISA Oro',
              links: '/client/creditCardDetails?key=VISA-Oro-detalle'
            }, {
              name: 'VISA Signature',
              links: '/client/creditCardDetails?key=VISA-Signature-detalle'
            }, {
              name: 'VISA Infinite',
              links: '/client/creditCardDetails?key=VISA-Infinite-detalle'
            }, {
              name: 'Mastercard Internacional',
              links: '/client/creditCardDetails?key=Mastercard-Internacional-detalle'
            }, {
              name: 'Mastercard Gold',
              links: '/client/creditCardDetails?key=Mastercard-Gold-detalle'
            }, {
              name: 'Mastercard Platinum',
              links: '/client/creditCardDetails?key=Mastercard-Platinum-detalle'
            }, {
              name: 'Mastercard Black',
              links: '/client/creditCardDetails?key=Mastercard-Black-detalle'
            }, {
              name: 'Mastercard Black LATAM',
              links: '/client/creditCardDetails?key=Mastercard-Black-LATAM-detalle'
            }, {
              name: 'Mastercard Platinum LATAM',
              links: '/client/creditCardDetails?key=Mastercard-Platinum-LATAM-detalle'
            }, {
              name: 'Mastercard Gold LATAM',
              links: '/client/creditCardDetails?key=Mastercard-Gold-LATAM-detalle'
            }, {
              name: 'VISA Signature LifeMiles',
              links: '/client/creditCardDetails?key=VISA-Signature-LifeMiles-detalle'
            }, {
              name: 'VISA Oro LifeMiles',
              links: '/client/creditCardDetails?key=VISA-Oro-LifeMiles-detalle'
            }]
        },
        {
          title: 'Inversión', links: '/client/Investment',
          pagesList: [
            {
              name: 'DPF 4.20%',
              links: '/investmentDetails?key=DPF-4-2-detalle'
            }, {
              name: 'DPF Incremental 200',
              links: '/investmentDetails?key=DPF-Incremental-200-detalle'
            }, {
              name: 'DPF Promo',
              links: '/investmentDetails?key=DPF-Promo-detalle'
            }, {
              name: 'DPF normativo',
              links: '/investmentDetails?key=DPF-normativo-detalle'
            }, {
              name: 'DPF',
              links: '/investmentDetails?key=DPF-detalle'
            }
          ],
        },
        {
          title: 'Banca 24/7', links: '/tech',
          pagesList: [
            {
              name: 'Banca por Internet',
              links: '/tech/internetBank'
            }, {
              name: 'Banca Móvil',
              links: '/tech/mobileBank'
            }, {
              name: 'Cajeros automáticos',
              links: '/tech/atms'
            }, {
              name: 'Central de consultas',
              links: '/help'
            }
          ]
        },
        {
          title: "Seguros", links: '/client/Insurance',
          pagesList: [
            {
              name: 'Tarjeta de Débito',
              links: '/insuranceDetails?key=Tarjeta-Debito-detalle'
            }, {
              name: 'Tarjeta de Crédito',
              links: '/insuranceDetails?key=Tarjeta-Credito-detalle'
            }, {
              name: 'Desgravamen',
              links: '/insuranceDetails?key=Desgravamen-detalle'
            }, {
              name: 'Seguro de Cesantía',
              links: '/insuranceDetails?key=Seguro-Cesantia-detalle'
            }, {
              name: 'Seguro Todo Riesgo',
              links: '/insuranceDetails?key=Todo-Riesgo-detalle'
            }, {
              name: 'Comparador de seguros',
              links: '/insuranceComparison/'
            }
          ]
        },
        {
          title: 'PYME', links: '/Pyme',
          pagesList: [
            {
              name: 'Cuentas PYME',
              links: '/pyme/Accounts'
            }, {
              name: 'Préstamos',
              links: '34.196.220.174/pyme/Loans'
            }, {
              name: 'Comex',
              links: '34.196.220.174/pyme/Comex'
            }, {
              name: 'Servicios',
              links: '34.196.220.174/pyme/Services'
            }, {
              name: 'Boletas de Garantía',
              links: '34.196.220.174/pyme/Guarantee'
            }, {
              name: 'Banca 24/7',
              links: '/tech'
            }, {
              name: 'Seguros',
              links: '/pyme/Insurance'
            }
          ]
        },
        {
          title: 'Empresa', links: '/companies',
          pagesList: [
            {
              name: 'Cuentas para empresas',
              links: '/companies/Accounts'
            }, {
              name: 'Préstamos',
              links: '/companies/Loans'
            }, {
              name: 'Comex',
              links: '/companies/Comex'
            }, {
              name: 'Servicios',
              links: '/companies/Services'
            }, {
              name: 'Boletas de Garantía',
              links: '/companies/Guarantee'
            }, {
              name: 'Banca 24/7',
              links: '/tech'
            }, {
              name: 'Seguros',
              links: '/companies/Insurance'
            }
          ]
        },
        {
          title: 'Banx', links: '/Banx',
          pagesList: [
            {
              name: 'Cuentas Banx',
              links: '/banx/AccountsBanx'
            }, {
              name: 'Préstamos',
              links: '/banx/Loans'
            }, {
              name: 'Tarjetas de Crédito',
              links: '/banx/creditCard'
            }, {
              name: 'Promo BANX',
              links: '/banx/deal'
            }, {
              name: 'Banca 24/7',
              links: '/tech'
            }, {
              name: 'Ayuda',
              links: '/help'
            }
          ]
        },
        {
          title: "Sobre el Banco",
          pagesList: [
            {
              name: "Sobre nosotros",
              links: '/AboutUs'
            }, {
              name: "Fundación BMSC",
              links: 'https://www.fundacionbmsc.com.bo'
            }, {
              name: "Trabaja con nosotros",
              links: 'https://postulate.evaluar.com/'
            }, {
              name: "RSE",
              links: '/AboutUs/RSE'
            }
          ]
        },
        {
          title: "Aviso legal",
          pagesList: [
            {
              name: "Asfi",
              links: 'https://www.asfi.gob.bo/'
            }, {
              name: "Reglamentos normativos",
              links: '/AdditionalInfo'
            }
          ]
        },
        {
          title: 'Ayuda', links: '/help',
          pagesList: [
            {
              name: 'Preguntas frecuentes',
              links: '/help/questions'
            }, {
              name: 'Agencias y horarios de atención',
              links: '/help/agencies'
            }, {
              name: 'Punto de reclamo',
              links: 'https://www.fundacionbmsc.com.bo'
            }, {
              name: 'Mapa de sitio',
              links: 'https://postulate.evaluar.com/'
            },
          ]
        },
        {
          title: "Otra información",
          pagesList: [
            {
              name: "Preguntas frecuentes",
              links: '/AdditionalInfo'
            }, {
              name: "Tasas y tarifario",
              links: '/AdditionalInfo/tariffs'
            }, {
              name: "Venta y remates de bienes",
              links: '/AdditionalInfo/estate'
            }
          ]
        },
        {
          title: "Educación",
          pagesList: [
            {
              name: "Educación financiera",
              links: '/AboutUs/RSE'
            }, {
              name: "DESCUBRE",
              links: 'https://www.descubre.bo/'
            }
          ]
        },
      ]
    }
  },
  methods: {
    changeBaseRoute(path) {
      if (checkValidUrl(path)) {
        window.open(path, '_blank');
      } else {
        this.activeSubTab = undefined;
        this.$router.push(
          {path: path}
        );
      }
    }
  }
}
</script>
