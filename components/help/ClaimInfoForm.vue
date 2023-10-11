<template>
  <div class="claimInfoForm">
    <div class="info-form pb-6">
      <div class="header py-4 px-6"><h6> Formulario </h6></div>
      <div class="content py-4 px-6">
        <v-row>
          <v-col cols="12" sm="6">
            <div class="input-label">Quiero enviar un(a)*:</div>
            <!-- .v-application .primary--text || v-select__selection v-select__selection--comma-->
            <v-select
              placeholder="Quiero enviar un(a):"
              :items="tipoReclamo"
              class="w-100"
              v-model="inputData.tipoReclamo"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="input-label">Nombre o Razón Social*:</div>
            <input type="text" v-model="inputData.nombreApellidos" placeholder="Ej. Mario Perez Ramos"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="input-label">Tipo de persona*:</div>
            <v-select
              placeholder="Quiero enviar un(a):"
              :items="tipoReclamante"
              class="w-100"
              v-model="inputData.tipoReclamante"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="5">
            <div class="input-label">Cedula de identidad*:</div>
            <input type="text" class="w-100" v-model="inputData.documentoIdentificacion" placeholder="Ej. 12345670"/>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="input-label">Extensión*:</div>
            <v-select
              placeholder=""
              :items="ciExtensions"
              class="w-100"
              v-model="inputData.documentoIdentificacionExtension"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <div class="input-label">Tipo de Documento*:</div>
            <v-select
              placeholder="Quiero enviar un(a):"
              :items="tipoDocumentoIdentificacion"
              class="w-100"
              v-model="inputData.tipoDocumentoIdentificacion"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="input-label">Nombre de representante legal o apoderado:</div>
            <input type="text" v-model="inputData.nombreRepresentanteLegalApoderado" placeholder="Ej. Mario Perez Ramos"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="input-label">Número de Testimonio o Poder:</div>
            <input type="text" v-model="inputData.numeroTestimonioPoder" placeholder="Ej. Mario Perez Ramos"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="input-label">Dirección (calle, zona)*:</div>
            <textarea
              rows="3" class="w-100" placeholder=""
              v-model="inputData.direccion"
            ></textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <div class="input-label">Celular*</div>
            <input type="text" class="w-100" v-model="inputData.celular" placeholder="Ej. 789-12345"/>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="input-label">Teléfono Fijo</div>
            <input type="text" class="w-100" v-model="inputData.telefonoFijo" placeholder="Ej. 289-12345"/>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="input-label">Teléfono Adicional</div>
            <input type="text" class="w-100" v-model="inputData.telefonoAdicional" placeholder="Ej. 289-12345"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="input-label">Correo electrónico*:</div>
            <input type="text" v-model="inputData.correoElectronico" placeholder="Ej. nombre@ejemplo.com"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="input-label">Fecha del hecho*:</div>
            <client-only>
              <datepicker v-model="inputData.fechaHecho" name="fecha" :language="es"></datepicker>
            </client-only>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="info-form pb-6 section">
      <div class="header py-4 px-6"><h6> Datos Adicionales </h6></div>
      <div class="content py-4 px-6">
        <v-row>
          <v-col cols="12" sm="6">
            <div class="input-label" style="width: 100%; display: flex">Soy cliente del banco:
            <v-checkbox v-model="inputData.soyClienteBanco" color="#296140" style="padding-left: 10px"/>
            </div>
          </v-col>
        </v-row>
        <v-row class="pb-4">
          <v-col>
            <div class="input-label"> Descripci&oacute;n*: </div>
            <textarea
              rows="6" class="w-100" placeholder="Escribe a detalle lo ocurrido"
              v-model="inputData.descripcion"
            ></textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="input-label">Monto comprometido:</div>
            <input type="number" v-model="inputData.montoComprometido" placeholder="Ej. 12345"/>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="input-label">Moneda:</div>
            <v-select
              placeholder=""
              :items="moneda"
              class="w-100"
              v-model="inputData.moneda"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="input-label">Departamento/Ciudad:*:</div>
            <v-select
              placeholder=""
              :items="departmento"
              class="w-100"
              v-model="inputData.departmento"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="input-label">Seleccione el medio de comunicación por el cual desea recibir su número de reclamo*:</div>
            <v-radio-group v-model="inputData.medioComunicacionParaRecibirNumeroReclamo" :mandatory="true" row>
              <v-radio
                label="Mensaje de texto SMS"
                value="sms"
                class="small pr-3"
                color="bm-radio"
              ></v-radio>
              <v-radio label="Correo Electrónico" value="email" color="bm-radio"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="input-label">Seleccione el medio de comunicación por el cual desea recibir su carta de respuesta*:</div>
            <v-radio-group v-model="inputData.medioComunicacionRespuestaReclamo" :mandatory="true" row>
              <v-radio
                label="Correo Electrónico"
                value="email"
                class="small pr-3"
                color="bm-radio"
              ></v-radio>
              <v-radio label="Agencia" value="agencia" color="bm-radio"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-if="inputData.medioComunicacionRespuestaReclamo === 'agencia'">
           <v-col>
             <div class="input-label">
               "Puedes recoger tu carta de respuesta en cualquier agencia a nivel nacional".
             </div>
             <!--
             <v-autocomplete
               :items="agenciesData"
               :filter="customFilter"
               v-model="inputData.sucursal"
               color="white"
               :item-text="textToShow"
               placeholder="Busca por barrio o nombre"
             ></v-autocomplete>
             -->
           </v-col>
        </v-row>
        <br>
        <br>
        <v-row no-gutters style="margin-bottom: 15px">
          <v-col>
            <recaptcha
              @error="captchaIsNotOk"
              @success="captchaIsSuccessfullyDone"
              @expired="captchaIsNotOk"
            />
          </v-col>
        </v-row>
        <div v-if="inputData.tipoReclamo === 'RECLAMO'" class="small-text pb-10">
          {{formData['description']}}
        </div>
        <v-btn depressed color="bm-medium px-8" :disabled="!formReady" @click="sendClaim">
          Enviar
          <v-icon right class="icon-check pl-4 pr-3"></v-icon>
        </v-btn>
      </div>
    </div>
    <v-snackbar
      v-model="errorSnackbar"
      top
      light
    >
      {{message}}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="#3a7652"
          text
          v-bind="attrs"
          @click="errorSnackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import {CONTACT_US_FORM_SEND, UPDATE_STATE_ACTION} from "~/constants_actions";
import {AGENCY} from "~/cardListKeys/help";
import { es } from 'vuejs-datepicker/dist/locale';
import Index from "~/pages";
import moment from "moment";

export default {
  components: {
    Index,
    Datepicker: () =>
      process.client ? import('vuejs-datepicker') : Promise.resolve({ render: (h) => h('div') }),
  },
  props: {
    formData: Object
  },
  mounted() {
    this.$store.dispatch(`help/${UPDATE_STATE_ACTION}`,[AGENCY, this]);
  },
  data() {
    return {
      errorSnackbar: false,
      message: '',
      inputData: {
        tipoReclamo:"",
        nombreApellidos: "",
        tipoReclamante: "",
        documentoIdentificacion: "",
        documentoIdentificacionExtension: "",
        tipoDocumentoIdentificacion: "",
        nombreRepresentanteLegalApoderado: "",
        numeroTestimonioPoder: "",
        direccion: "",
        celular: "",
        telefonoFijo: "",
        telefonoAdicional: "",
        correoElectronico: "",
        fechaHecho: "",
        descripcion: "",
        soyClienteBanco: true,
        montoComprometido: 0.0,
        moneda: "",
        departmento: "",
        sucursal: "",
        medioComunicacionParaRecibirNumeroReclamo: "sms",
        medioComunicacionRespuestaReclamo: "email"
      },
      tipoReclamo: ["CONSULTA","RECLAMO","MENSAJE A SU EJECUTIVO","SUGERENCIA"],
      tipoReclamante: ["JURÍDICA","NATURAL","APODERADO"],
      tipoDocumentoIdentificacion: ["CARNET DE EXTRANJERO","CARNET DE IDENTIDAD", "CARNET DE IDENTIDAD DUPLICADO","NIT","PASAPORTE"],
      moneda: ["BOLIVIANOS", "DÓLARES"],
      departmento: ["BENI", "CHUQUISACA", "COCHABAMBA", "LA PAZ", "ORURO", "PANDO", "POTOSÍ", "SANTA CRUZ", "TARIJA"],
      ciExtensions: ["BE","CB","CH","LP","OR","PA","PT","SC","TJ"],
      isCaptchaOk: false,
      es: es,
      requiredFieldsFilled: false,
      formReady: false,
    }
  },
  computed: {
    agenciesData: function () {
      let agencies = this.$store.getters["help/getList"](AGENCY);
      return agencies;
    }
  },
  methods: {
    async sendClaim() {
      let finalClaim = JSON.parse(JSON.stringify(this.inputData));
      let response = await this.$store.dispatch(`help/${CONTACT_US_FORM_SEND}`, finalClaim);
      if(response['success']) {
        this.emptyAllFields();
        this.errorSnackbar = true
        if (response['message'] === 'Email was send.') {
          this.message = 'Tu mensaje fue enviado exitosamente.'
        }
      } else {
        this.errorSnackbar = true
        this.message = 'Intente mas tarde.'
      }
    },
    emptyAllFields() {
      this.inputData = {
        tipoReclamo:"",
        nombreApellidos: "",
        tipoReclamante: "",
        documentoIdentificacion: "",
        documentoIdentificacionExtension: "",
        tipoDocumentoIdentificacion: "",
        nombreRepresentanteLegalApoderado: "",
        numeroTestimonioPoder: "",
        direccion: "",
        celular: "",
        telefonoFijo: "",
        telefonoAdicional: "",
        correoElectronico: "",
        fechaHecho: "",
        descripcion: "",
        soyClienteBanco: true,
        montoComprometido: 0.0,
        moneda: "",
        departmento: "",
        sucursal: "",
        medioComunicacionParaRecibirNumeroReclamo: "sms",
        medioComunicacionRespuestaReclamo: "email"
      };
      this.isCaptchaOk = false;
    },
    resetDate() {
      this.inputData = {
        ...this.inputData,
        fechaHecho: moment().toDate(),
      }
    },
    customFilter (item, queryText, itemText) {
      const zone = item['zona'].toLowerCase()
      const title = item['titulo'].toLowerCase()
      const searchText = queryText.toLowerCase()
      return zone.indexOf(searchText) > -1 ||
        title.indexOf(searchText) > -1
    },
    textToShow(item) {
      return item['zona'] + " - " + item['titulo'];
    },
    isEmailNotReadyToBeSend() {
      return !this.isCaptchaOk && this.requiredFieldsFilled;
    },
    captchaIsNotOk() {
      this.isCaptchaOk = false;
    },
    captchaIsSuccessfullyDone() {
      this.isCaptchaOk = true;
    },
    areRequiredFieldsFilled() {
      return (
        this.inputData.tipoReclamo.length > 0
        && this.inputData.nombreApellidos.length > 0
        && this.inputData.tipoReclamante.length > 0
        && this.inputData.documentoIdentificacion.length > 0
        && this.inputData.documentoIdentificacionExtension.length > 0
        && this.inputData.tipoDocumentoIdentificacion.length > 0
        && this.inputData.direccion.length > 0
        && this.inputData.celular.length > 0
        && this.inputData.correoElectronico.length > 0
        && this.inputData.fechaHecho.length != ""
        && this.inputData.descripcion.length > 0
        && this.inputData.departmento.length > 0
        && this.inputData.medioComunicacionParaRecibirNumeroReclamo.length > 0
        && this.inputData.medioComunicacionRespuestaReclamo.length > 0
      )
    }
  },
  watch: {
    inputData: {
      handler(val){
        //console.log('INPUT DATA CHANGED');
        let validate = val.fechaHecho ? val.fechaHecho : moment().toDate();
        if (moment(moment().toDate()).isAfter(validate)) {
         // console.log(moment().toDate())
        } else {
          this.resetDate();
        }
        this.requiredFieldsFilled = this.areRequiredFieldsFilled();
        this.formReady = this.requiredFieldsFilled && this.isCaptchaOk;
      },
      deep: true
    },
    isCaptchaOk: function () {
      //console.log('Captch updated!');
      this.formReady = this.requiredFieldsFilled && this.isCaptchaOk;
    }
  }
}
</script>
