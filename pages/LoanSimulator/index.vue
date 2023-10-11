<template>
  <div>
    <v-container fluid class="mx-auto bm-loan-simulator">
      <v-row>
        <v-col cols="12">
          <div class="bm-title">
            <v-img :src="require('@/assets/images/loan.svg')" class="simulator-selector-img"></v-img>
            <h1 class="simulator-title">{{ title }}</h1>
            <div class="huge-text my-4">{{subtitle}}</div>
          </div>
        </v-col>
        <v-col cols="12" lg="10" md="10" sm="12" class="mx-auto">
          <v-card class="help-agencies">
            <div class="pa-6" id="idPdf">
              <v-row>
                <v-col cols="12" lg="9" md="8" sm="12" class="pr-0">
                  <v-row class="btn-pdf">
                    <v-col cols="12" lg="5" md="7" sm="12" class="pr-0 text-center">
                      <label class="input-label mx-auto">Tipo de crédito</label>
                      <v-select label="Selecciona un crédito" @change="changeOfTerm"
                                v-model="inputData.tipoCuenta" :items="initialData" dense solo></v-select>
                    </v-col>
                    <v-col cols="12" lg="4" md="4" sm="12" class="text-center">
                      <label class="input-label">Monto</label>
                      <v-text-field required solo class="bm-text-field number-right" label="Ej.: 500.00"
                                    v-model="inputData.monto" :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3" md="4" sm="12" class="px-0 text-center">
                      <label class="input-label">Plazo en meses</label>
                      <v-select v-model="inputData.plazo"
                                :items="itemsListPlazo" item-text="PlazoEnMeses" item-value="IdPlazoTipoCredito"
                                label="Seleccione un dato"
                                return-object single-line dense solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12" lg="4" md="4" sm="12" class="text-center" v-if="inputData.tipoCuenta==='Vivienda social'">
                      <label class="input-label">Valor comercial</label>
                      <v-text-field required solo class="bm-text-field number-right" label="Ej.: 1000.00"
                                    v-model="inputData.valorComercial" :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                  <!--
                <v-col cols="12" lg="3" md="4" sm="12" class="d-flex flex-column justify-center align-end btn-pdf">
                  <v-btn depressed color="bm-medium" @click="goToLoanSimulator" v-if="!stateBtn" :disabled="!inputData.tipoCuenta || !inputData.monto">
                    Simular préstamo<v-icon right class="icon-btn-arrow my-auto"> </v-icon>
                  </v-btn>
                  <v-btn depressed @click="goToClean" v-if="stateBtn">Borrar datos</v-btn>
                </v-col>
                  -->
              </v-row>
              <v-row class="btn-pdf">
                <v-col cols="12" lg="12" md="12" sm="12" class="d-flex flex-row justify-center align-center pt-0">
                  <label class="input-label">Seguro de cesantía</label>
                  <v-radio-group :mandatory="true" row v-model="inputData.cesantia">
                    <v-radio label="Si" :value="true" color="bm-radio" class="small px-4"></v-radio>
                    <v-radio label="No" :value="false" color="bm-radio"></v-radio>
                  </v-radio-group>
                </v-col>
                    <!--<v-col cols="12" lg="5" md="6" sm="12" class="d-flex flex-row justify-start align-center">
                      <label class="input-label">Pago de sueldo en el <strong>BMSC</strong></label>
                      <v-radio-group :mandatory="true" row>
                        <v-radio label="Si" value="yes" color="bm-radio" class="small px-4"></v-radio>
                        <v-radio label="No" value="no" color="bm-radio"></v-radio>
                      </v-radio-group>
                    </v-col>-->
              </v-row>
              <v-divider v-if="stateBtn"> class="mb-4"></v-divider>
              <v-row v-if="stateBtn" class="tsttc-pdf">
                <v-col cols="12" lg="2" md="2" sm="4">
                  <div class="input-label">Tasa fija</div>
                  <span class="bold-font green-text" v-if="inputData.plazo">{{ inputData.plazo['TasaFija'] }} %</span>
                </v-col>
                <v-col cols="12" lg="2" md="2" sm="4">
                  <div class="input-label">Spread</div>
                  <span class="bold-font green-text" v-if="inputData.plazo">{{ inputData.plazo['SpreadFijo'] }} %</span>
                </v-col>
                <v-col cols="12" lg="3" md="2" sm="4">
                  <div class="input-label">Tasa variable</div>
                  <span class="bold-font green-text" v-if="inputData.plazo">A partir del mes {{ inputData.plazo['TasaVariableAPartirDelMes'] }}</span>
                </v-col>
                <v-col cols="12" lg="2" md="2" sm="4">
                  <div class="input-label">Tre</div>
                  <span class="bold-font green-text" v-if="inputData.plazo">{{ inputData.plazo['TRE'] }} %</span>
                </v-col>
                <v-col cols="12" lg="3" md="2" sm="4" style="">
                  <div class="input-label">Cuota máxima</div>
                  <span class="bold-font green-text">{{ simulatorData.obj.CuotaMaxima }} Bs.</span>
                </v-col>
              </v-row>
              <v-divider v-if="stateBtn" class="mt-4 mb-6"></v-divider>
              <v-data-table v-if="stateBtn"
                            :headers="headers"
                            :items="simulatorData.data"
                            hide-default-footer
                            :items-per-page="pageIndex"
                            class="points-table" style="margin-bottom: 39px">
                <template slot="no-data">
                  <div><p>No hay datos disponibles.</p></div>
                </template>
              </v-data-table>
              <div class="d-flex flex-row justify-space-between btn-pdf">
                <v-btn depressed color="bm-light" @click="morePage" :disabled="pageIndex>=simulatorData.data.length">
                  Cargar más<v-icon right class="my-auto">mdi-restore</v-icon>
                </v-btn>
                <v-btn depressed @click="loadPDF" :disabled="simulatorData.data.length===0" color="bm-light">
                  Descargar PDF<v-icon right class="my-auto">mdi-arrow-down</v-icon>
                </v-btn>
              </div>
              <div class="w-50 mt-4" v-if="stateBtn">
                <span class="small-text d-block bold-font">Importante:</span>
                <span class="small-text"> Estimado Cliente, los resultados obtenidos son de carácter referencial. Las tasas pueden cambiar en función a las características del cliente. Para obtener datos oficiales, puedes acercarte a cualquiera de nuestras <span class="green-text bold-font">agencias</span>.</span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar v-model="errorSnackbar" v-if="simulatorData.obj" top light style="z-index: 1100">
        {{ simulatorData.obj['MensajeResultado'] }}
        <template v-slot:action="{ attrs }">
          <v-btn color="#3a7652" text v-bind="attrs" @click="errorSnackbar = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
    <MoreInfo
      v-bind="moreInfoConfig"
    />
  </div>
</template>

<script>
import MoreInfo from "@/components/MoreInfo.vue";
import {GET_INFORMATION_INITIAL, GET_LOAN_SIMULATOR_CREDIT, GET_LOAN_SIMULATOR_CVS} from "~/constants_actions";
export default {
  name: "simulator",
  components: {
    MoreInfo
  },
  data: () => {
    return {
      title: "Simula tu préstamo",
      subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      inputData: {
        tipoCuenta: '',
        moneda: '',
        monto: '',
        plazo: '',
        cesantia: false,
        valorComercial: ''
      },
      rules: {
        required: value => {
          if (value) {
            const pattern = /^[0-9]+([.][0-9]+)?$/
            return pattern.test(value) || 'El campo solo acepta caracteres numéricos, Ej.:100.00'
          } else {
            return value.length <= 50 || 'El campo debe tener menos de 50 caracteres'
          }
        },
      },
      stateBtn: false,
      itemsListPlazo: [],
      headers: [
        { text: 'Fecha', value: 'Fecha', align: 'start', groupable: false},
        { text: '# de cuota', value: 'NumeroCuota', align: 'start'},
        { text: 'Saldo capital', value: 'SaldoCapital', align: 'start'},
        { text: 'Saldo de amortización', value: 'AmortizacionCapital', align: 'start'},
        { text: 'Interés', value: 'Intereses', align: 'start'},
        { text: 'Cuota', value: 'ValorCuota', align: 'start'},
        { text: 'Seguro desgravamen', value: 'SeguroDesgravamen', align: 'start'},
        { text: 'Seguro de cesantía', value: 'SeguroCesantia', align: 'start'},
        { text: 'Cuota total', value: 'CuotaTotal', align: 'start'},
      ],
      pageIndex: 10,
      simulatorData: { data:[], obj: null },
      initialSimulatorData: {},
      moreInfoConfig: {
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-chat",
        cardLabel2: "Central de consultas",
        cardIcon3: "icon-play",
        cardLabel3: "Tutoriales: Banca por internet"
      },
      initialData: [],
      errorSnackbar: false
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData(){
      this.initialSimulatorData = await this.$store.dispatch(`loanSimulator/${GET_INFORMATION_INITIAL}`)
      if (this.initialSimulatorData['ObtenerInformacionInicialResult'] && this.initialSimulatorData['ObtenerInformacionInicialResult']['MensajeResultado']==='OK') {
        this.initialData = (this.initialSimulatorData['ObtenerInformacionInicialResult']['ListaTiposCredito']['TipoCreditoInfo']).map((v) => v.Nombre);
      } else {
        this.errorSnackbar = true
      }
    },
    changeOfTerm () {
      this.initialSimulatorData['ObtenerInformacionInicialResult']['ListaTiposCredito']['TipoCreditoInfo'].map((v) => {
        if (v.Nombre === this.inputData.tipoCuenta) {
          if (v['PlazosDisponibles']['PlazoTipoCreditoInfo'].length>1) {
            this.itemsListPlazo = v['PlazosDisponibles']['PlazoTipoCreditoInfo']
          } else {
            this.itemsListPlazo.push(v['PlazosDisponibles']['PlazoTipoCreditoInfo'])
          }
        }
      })
    },
    async goToLoanSimulator() {
      if (this.inputData.tipoCuenta==='Vivienda social') {
        const formDataCVS = {
          monto: this.inputData.monto,
          cesantia: this.inputData.cesantia,
          idPTC: this.inputData.plazo['IdPlazoTipoCredito'],
          vComercial: this.inputData.valorComercial
        }
        let response = await this.$store.dispatch(`loanSimulator/${GET_LOAN_SIMULATOR_CVS}`, formDataCVS);
        this.simulatorData.data = response['SimularCreditoViviendaSocialResult']['Cuotas']['CuotaInfo']
        this.simulatorData.obj = response['SimularCreditoViviendaSocialResult']
      } else {
        const formDataCredit = {
          cesantia: this.inputData.cesantia,
          monto: this.inputData.monto,
          idPTC: this.inputData.plazo['IdPlazoTipoCredito']
        }
        let responseCredit = await this.$store.dispatch(`loanSimulator/${GET_LOAN_SIMULATOR_CREDIT}`, formDataCredit);
        this.simulatorData.data = responseCredit['SimularCreditoResult']['Cuotas']['CuotaInfo']
        this.simulatorData.obj = responseCredit['SimularCreditoResult']
      }
      if (this.simulatorData.obj && this.simulatorData.obj['MensajeResultado']==='OK'){
        this.simulatorData.data.map((v) => {
          v.Fecha = new Date(v.Fecha).getDate()+'/'+ new Date(v.Fecha).getMonth()+'/'+ new Date(v.Fecha).getFullYear()
          return v
        })
        this.stateBtn = true
      } else {
        this.errorSnackbar = true
      }
    },
    goToClean(){
      this.inputData = {
        tipoCuenta: '',
        moneda: '',
        monto: '',
        plazo: '',
        cesantia: false,
        valorComercial: ''
      }
      this.simulatorData = { data:[], obj: null }
      this.stateBtn = false
    },
    morePage (){
      this.pageIndex = this.pageIndex+10;
    },
    loadPDF(){
      let sTable = document.getElementById('idPdf').innerHTML

      let style = "<style>";
      style = style + ".bg-light{background: #E0EBE2;}"
      style = style + ".header-logo{width: 350px;}"
      style = style + ".tmps-pdf {display: flex; flex-direction: row; justify-content: space-between;align-content: center;}"
      style = style + ".tsttc-pdf {display: flex; flex-direction: row; justify-content: space-between;align-content: center;}"
      style = style + ".tmps-pdf-pdf div {width: 20%;}"
      style = style + ".tsttc-pdf div {width: 20%;}"
      style = style + ".btn-pdf {display: none;}"
      style = style + ".input-label {font-weight: bold}"
      style = style + "table {width: 100%;font: 17px Calibri;}"
      style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;"
      style = style + "padding: 2px 3px;text-align: center;}"
      style = style + "</style>";

      let win = window.open('', '', 'height=700,width=700')

      win.document.write('<html><head>')
      win.document.write('<title>.</title>')
      win.document.write(style)
      win.document.write('</head>')
      win.document.write('<body class="bg-light">')
      win.document.write('<img src="/_nuxt/assets/images/header-logo.svg" class="header-logo"/>')
      win.document.write('<h1 style="color:#3C7854;text-align: center">Simula tu préstamo</h1>')
      win.document.write('<div class="tmps-pdf">')
      win.document.write('<div><div class="input-label">Tipo de crédito: </div><span>'+this.inputData.tipoCuenta+'</span></div>')
      win.document.write('<div><div class="input-label">Monto: </div><span>'+this.inputData.monto+'</span></div>')
      win.document.write('<div><div class="input-label">Plazo en meses: </div><span>'+this.inputData.plazo['PlazoEnMeses']+'</span></div>')
      win.document.write('<div><div class="input-label">Valor comercial: </div><span>'+this.inputData.valorComercial+'</span></div>')
      win.document.write('<div><div class="input-label">Seguro de cesantía: </div><span>'+(this.inputData.cesantia?'Si':'No')+'</span></div>')
      win.document.write('</div>')
      win.document.write(sTable)
      win.document.write('</body></html>')

      win.document.close()

      win.print();
    }
  },
  head () {return this.headData}
}
</script>
