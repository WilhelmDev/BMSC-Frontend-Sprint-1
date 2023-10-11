<template>
  <div class="info-form pb-6">
    <div class="header py-4 px-4 px-md-6"><h6> Datos </h6></div>
    <div class="content py-4 px-4 px-md-6">
      <v-row>
        <v-col cols="12" md="6">
          <div class="input-label">Nombre y apellidos</div>
          <input type="text" v-model="inputData.nombreApellidos" placeholder="Ej.Mario Perez Ramos"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <div class="input-label">Celular</div>
          <input type="text" class="w-100" v-model="inputData.celular" placeholder="Ej.789-12345"/>
        </v-col>
        <v-col cols="12" md="6">
          <div class="input-label">Correo electr&oacute;nico</div>
          <input type="text" class="w-100" v-model="inputData.correoElectronico" placeholder="Ej. nombre@ejemplo.com"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <div class="input-label">Asunto</div>
          <input type="text" class="w-100 strong-regular-text" :value="data['matter']" readonly/>
        </v-col>
        <v-col cols="12" md="6">
          <div class="input-label">C&oacute;digo</div>
          <input type="text" class="w-100 strong-regular-text" :value="data['codigo']" readonly/>
        </v-col>
      </v-row>
      <v-row class="pb-4">
        <v-col>
          <div class="input-label">Mensaje</div>
          <textarea rows="6" class="w-100" v-model="inputData.mensaje">¡Hola! Estoy interesado en comprar este bien, por favor ponerse en contacto.</textarea>
        </v-col>
      </v-row>
      <div>
        <recaptcha
          @error="captchaIsNotOk"
          @success="captchaIsSuccessfullyDone"
          @expired="captchaIsNotOk"
        />
      </div>
      <div class="mb-4">
        {{formData['description']}}
      </div>
      <div class="text-center text-md-left">
      <v-btn depressed color="bm-medium px-8" @click="sendForm" :disabled="isEmailNotReadyToBeSend()">
        Enviar
        <v-icon right class="icon-check pl-4 pr-3"></v-icon>
      </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import {CONTACT_US_FORM_SEND} from "~/constants_actions";

export default {
  props: {
    data: Object,
    formData: Object
  },
  data() {
    return {
      inputData: {
        nombreApellidos: "",
        celular: "",
        correoElectronico: "",
        asunto: this.data['matter'],
        codigo: this.data['codigo'],
        mensaje: "¡Hola! Estoy interesado en comprar este bien, por favor ponerse en contacto."
      },
      isCaptchaOk: false
    }
  },
  computed: {

  },
  methods: {
    async sendForm() {
      const formData = {
        ...this.inputData,
        asunto: this.data['matter'],
        codigo: this.data['codigo']
      }
      let response = await this.$store.dispatch(`additionalInfo/${CONTACT_US_FORM_SEND}`, formData);
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
          asunto: this.data['matter'],
          codigo: this.data['codigo'],
          mensaje: "¡Hola! Estoy interesado en comprar este bien, por favor ponerse en contacto."
      };
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
  }
}
</script>
