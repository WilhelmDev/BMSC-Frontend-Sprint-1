<template>
  <v-container class="py-10 mb-16">
    <h2 class="black-text py-2"><span v-html="formData.title"/>  </h2>
    <div class="big-text pb-8">
      <span v-html="formData['subTitle']"/>
    </div>
    <div class="info-form pb-6">
      <div class="header py-4 px-6"><h6> Datos del solicitante </h6></div>
      <div class="content py-4 px-6">
        <v-row>
          <v-col cols="6">
            <div class="input-label">Nombre y apellidos</div>
            <input type="text" v-model="inputData.nombreApellidos" placeholder="Ej. Mario Perez Ramos"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <div class="input-label">Celular</div>
            <input type="text" class="w-100" v-model="inputData.celular" placeholder="Ej. 789-12345"/>
          </v-col>
          <v-col cols="6">
            <div class="input-label">Correo electr&oacute;nico</div>
            <input type="text" class="w-100" v-model="inputData.correoElectronico" placeholder="Ej. nombre@ejemplo.com"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <div class="input-label">Nombre de la empresa</div>
            <input type="text" class="w-100" v-model="inputData.nombreEmpresa" placeholder="Ej. Nombre"/>
          </v-col>
        </v-row>
        <v-row class="pb-4">
          <v-col>
            <div class="input-label"> ¿Qu&eacute; quisieras saber? </div>
            <textarea
              rows="6" class="w-100" placeholder="Escribe a detalle"
              v-model="inputData.descripcion"
            ></textarea>
          </v-col>
        </v-row>
        <v-row no-gutters style="margin-bottom: 15px">
          <v-col>
            <recaptcha
              @error="captchaIsNotOk"
              @success="captchaIsSuccessfullyDone"
              @expired="captchaIsNotOk"
            />
          </v-col>
        </v-row>
        <div class="small-text pb-10">
          {{formData['description']}}
        </div>
        <v-btn depressed color="bm-medium px-8" :disabled="isEmailNotReadyToBeSend()" @click="sendClaim">
          Enviar
          <v-icon right class="icon-check pl-4 pr-3"></v-icon>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>
<script>
import {CONTACT_US_FORM_SEND, UPDATE_STATE_ACTION} from "~/constants_actions";
import {TECH_CONTACT_FORM} from "~/cardListKeys/tech";
import {getHeader} from "~/utils/seo";

export default {
  mounted() {

  },
  data() {
    return {
      inputData: {
        nombreApellidos: "",
        celular: "",
        correoElectronico: "",
        nombreEmpresa: "",
        descripcion: ""
      },
      isCaptchaOk: false
    }
  },
  computed: {
    formData: function () {
      let data = this.$store.getters["tech/getList"](TECH_CONTACT_FORM);
      //console.log(data[0]);
      return data[0];
    }
  },
  methods: {
    async sendClaim() {
      let response = await this.$store.dispatch(`tech/${CONTACT_US_FORM_SEND}`, this.inputData);
      if(response['success']) {
        this.emptyAllFields();
        //console.log('SUCCESS');
      } else {
        //console.log('ERROR');
      }
    },
    emptyAllFields() {
      this.inputData = {
        nombreApellidos: "",
        celular: "",
        correoElectronico: "",
        nombreEmpresa: "",
        descripcion: ""
      }
    },
    isEmailNotReadyToBeSend() {
      return !this.isCaptchaOk;
    },
    captchaIsNotOk() {
      this.isCaptchaOk = false;
    },
    captchaIsSuccessfullyDone() {
      this.isCaptchaOk = true;
    },
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`tech/${UPDATE_STATE_ACTION}`, TECH_CONTACT_FORM);
    return header;
  },
  head () {return this.headData}
}
</script>
