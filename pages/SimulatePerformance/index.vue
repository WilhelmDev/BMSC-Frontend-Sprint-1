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
            <div class="pa-6">
              <v-row>
                <v-col cols="12" lg="9" md="8" sm="12">
                  <v-row>
                    <v-col cols="12" lg="5" md="7" sm="12" class="px-0 text-center">
                      <label class="input-label">Tipo de cuenta</label>
                      <v-select label="Selecciona una cuenta"
                                v-model="inputData.tipoCuenta" :items="itemsListA" dense solo></v-select>
                    </v-col>
                    <v-col cols="12" lg="3" md="5" sm="12" class="text-center">
                      <label class="input-label">Moneda</label>
                      <v-select label="Selecciona" v-model="inputData.moneda" :items="itemsListB[inputData.tipoCuenta]" dense solo></v-select>
                    </v-col>
                    <v-col cols="12" lg="4" md="6" sm="12" class="text-center">
                      <label class="input-label">Monto {{inputData.tipoCuenta==='Depósito a plazo fijo'|| inputData.tipoCuenta==='Depósito a plazo fijo incremental'?' a depositar ':''}} {{inputData.moneda==='USD'?'en $':'en Bs'}}</label>
                      <v-text-field solo class="bm-text-field number-right" placeholder="Ej.: 1000.00"
                                    v-model="inputData.monto" :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" md="6" sm="12" class="text-center">
                      <label class="input-label">Plazo {{inputData.tipoCuenta==='Depósito a plazo fijo'?' del depósito ':''}} en días</label>
                      <v-text-field solo class="bm-text-field number-right" placeholder="Ej.: 18"
                                    v-model="inputData.plazo" :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" lg="3" md="4" sm="12" class="d-flex flex-column justify-center align-end">
                  <Button :onClick="goToPerformance" text="Simular rendimiento" color="bm-medium" v-if="!stateBtn" :disabled="!inputData.tipoCuenta || !inputData.monto"/>
                  <v-btn depressed @click="goToClean" v-if="stateBtn">Borrar datos</v-btn>
                </v-col>
              </v-row>
              <v-divider v-if="stateBtn && (inputData.tipoCuenta==='Depósito a plazo fijo' || inputData.tipoCuenta==='Depósito a plazo fijo incremental')"> class="mb-4"></v-divider>
              <v-row>
                <v-col cols="12" lg="5" md="6" sm="12" v-if="stateBtn && inputData.tipoCuenta!=='Depósito a plazo fijo' && inputData.tipoCuenta!=='Depósito a plazo fijo incremental'">
                  <div class="input-label">Tu rendimiento sería de:</div>
                  <h3 class="bold-font green-text mb-6 mt-1">{{responseData.moneda==='BOB'?'Bs ':'$us '}} {{responseData.interes}}</h3>
                  <Button :onClick="goToInterest" text="Estoy interesado" color="bm-light" />
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" v-if="stateBtn && inputData.tipoCuenta==='Depósito a plazo fijo'">
                  <v-row v-if="responseData['SimularDPFResult']['MensajeResultado']==='OK'">
                    <v-col cols="12" lg="3" md="4" sm="6">
                      <div class="input-label">Tasa de interés anual:</div>
                      <span class="bold-font green-text">{{responseData['SimularDPFResult']['MontoInteresSinNit']}} %</span>
                    </v-col>
                    <v-col cols="12" lg="2" md="4" sm="6">
                      <div class="input-label">Interés ganado:</div>
                      <span class="bold-font green-text">{{inputData.moneda==='BOB'?'Bs ':'$us '}} {{responseData['SimularDPFResult']['MontoInteresConNit']}}</span>
                    </v-col>
                    <v-col cols="12" lg="2" md="4" sm="6">
                      <div class="input-label">RC-IVA:</div>
                      <span class="bold-font green-text">{{responseData['SimularDPFResult']['Iva']}}  %</span>
                    </v-col>
                    <v-col cols="12" lg="3" md="4" sm="6">
                      <div class="input-label">Monto retenido RC-IVA:</div>
                      <span class="bold-font green-text">{{inputData.moneda==='BOB'?'Bs ':'$us '}} {{responseData['SimularDPFResult']['MontoRetencionIva']}}</span>
                    </v-col>
                    <v-col cols="12" lg="2" md="4" sm="6">
                      <div class="input-label">Total interés:</div>
                      <span class="bold-font green-text">{{inputData.moneda==='BOB'?'Bs ':'$us '}} {{responseData['SimularDPFResult']['Interes']}}</span>
                    </v-col>
                    <v-col cols="12" lg="12" md="12" sm="12">
                      <label class="input-label"><strong>Nota:</strong> Si no presenta NIT se descontara el 13% correspondiente al RC-IVA</label>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" v-if="stateBtn && inputData.tipoCuenta==='Depósito a plazo fijo incremental'">
                  <v-row>
                    <v-col cols="12" lg="6" md="6" sm="6" class="text-center">
                      <span class="bold-font green-text">DPF</span>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="6" class="text-center">
                      <span class="bold-font green-text">INTERESES GENERADOS</span>
                    </v-col>
                  </v-row>
                  <v-row v-if="responseData['SimularDPFIncrementalResult']['MensajeResultado']==='OK'"
                         v-for="(item, index) in responseData['SimularDPFIncrementalResult']['Emisiones']['EmisionDPFIncrementalInfo']" :key="index">
                    <v-col cols="12" lg="6" md="6" sm="6" class="text-center">
                      <label class="input-label">{{item['NombreEmision']}}</label>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="6" class="text-center">
                      <span class="bold-font green-text">{{inputData.moneda==='BOB'?'Bs ':'$us '}} {{item['InteresGanado']}}</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" lg="12" md="12" sm="12">
                      <label class="input-label">Total de intereses ganados:</label>
                      <span class="bold-font green-text">{{inputData.moneda==='BOB'?'Bs ':'$us '}} {{responseData['SimularDPFIncrementalResult']['TotalInteresGanado']}}</span>
                    </v-col>
                    <v-col cols="12" lg="12" md="12" sm="12">
                      <label class="input-label"><strong>Nota:</strong> Si no presenta NIT se descontara el 13% correspondiente al RC-IVA</label>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar v-model="errorSnackbar" v-if="responseDataSms" top light style="z-index: 1100">
        {{ responseDataSms['MensajeResultado'] }}
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
import Button from "~/components/Button";
import {GET_LOAN_SIMULATOR_DPF, GET_LOAN_SIMULATOR_DPF_INC, GET_SIMULATOR_INTEREST} from "~/constants_actions";
import {CYCO_URL} from "~/constants_routes";
export default {
  name: "SimulatePerformance",
  components: {
    MoreInfo,
    Button
  },
  data: () => {
    return {
      title: "Simula tu rendimiento",
      subtitle: "Calcula el interés que puedes recibir con nuestras cuentas de ahorro.",
      itemsListA: ['Super Makro Cuenta', 'Rendimax Plus', 'Super Rendimax', 'Depósito a plazo fijo', 'Depósito a plazo fijo incremental'],
      itemsListB: {'Super Makro Cuenta': ['BOB', 'USD'], 'Rendimax Plus': ['BOB'], 'Super Rendimax': ['BOB'], 'Depósito a plazo fijo': ['BOB', 'USD'], 'Depósito a plazo fijo incremental': ['BOB', 'USD']},
      inputData: {
        tipoCuenta: '',
        moneda: '',
        monto: '',
        plazo: ''
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
      responseData: '',
      moreInfoConfig: {
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-chat",
        cardLabel2: "Central de consultas",
        cardIcon3: "icon-play",
        cardLabel3: "Tutoriales: Banca por internet"
      },
      responseDataSms: null,
      errorSnackbar: false
    }
  },
  async mounted() {
  },
  computed: {},
  methods: {
    goToInterest () {
      window.location.href = CYCO_URL;
    },
    async goToPerformance() {
      const formData = {
        tipoCuenta: '',
        moneda: this.inputData.moneda,
        monto: this.inputData.monto,
        plazo: this.inputData.plazo
      }
      switch (this.inputData.tipoCuenta) {
        case 'Super Makro Cuenta':
          formData.tipoCuenta = 'SUPER_MAKRO_CUENTA';
          formData.moneda = this.inputData.moneda;
          this.responseData = await this.$store.dispatch(`simulatePerformance/${GET_SIMULATOR_INTEREST}`, formData);
          this.responseDataSms = {MensajeResultado:'OK'}
          break;
        case 'Rendimax Plus':
          formData.tipoCuenta = 'RENDIMAX_PLUS';
          formData.moneda = this.inputData.moneda;
          this.responseData = await this.$store.dispatch(`simulatePerformance/${GET_SIMULATOR_INTEREST}`, formData);
          this.responseDataSms = {MensajeResultado:'OK'}
          break;
        case 'Super Rendimax':
          formData.tipoCuenta = 'SUPER_RENDIMAX'
          formData.moneda = this.inputData.moneda;
          this.responseData = await this.$store.dispatch(`simulatePerformance/${GET_SIMULATOR_INTEREST}`, formData);
          this.responseDataSms = {MensajeResultado:'OK'}
          break;
        case 'Depósito a plazo fijo':
          formData.moneda = this.inputData.moneda==='BOB'?0:1;
          this.responseData = await this.$store.dispatch(`simulatePerformance/${GET_LOAN_SIMULATOR_DPF}`, formData);
          this.responseDataSms = this.responseData['SimularDPFResult']
          break;
        case 'Depósito a plazo fijo incremental':
          formData.moneda = this.inputData.moneda==='BOB'?0:1;
          this.responseData = await this.$store.dispatch(`simulatePerformance/${GET_LOAN_SIMULATOR_DPF_INC}`, formData);
          this.responseDataSms = this.responseData['SimularDPFIncrementalResult']
          break;
        default:
          break;
      }
      if (this.responseDataSms['MensajeResultado']!=='OK') {
        this.errorSnackbar = true
      } else {
        this.stateBtn = true
      }
    },
    goToClean() {
      this.inputData = {
        tipoCuenta: '',
        moneda: '',
        monto: '',
        plazo: ''
      }
      this.stateBtn = false
    }
  },
  head () {return this.headData}
}
</script>
