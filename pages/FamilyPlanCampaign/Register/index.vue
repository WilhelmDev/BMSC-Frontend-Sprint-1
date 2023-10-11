<template>
  <div>
      <AgeRestrictionReg :showModal="ageRestrition" v-on:hideModal="closeModal()"/>
      <WelcomeModal :showModal="welcomeTrigger" v-on:hideModal="closeModal()" :family-id="id" :name-fam="name"/>
      <JoinToMoreFamilysModal :showModal="JoinRestrition" v-on:hideModal="closeModal()"/>
      <ValidationsModal :showModal="invalidData" v-on:hideModal="invalidData=false"/>
      <v-container class="mx-auto">
        <div class="info-form-v2 pb-6">
        <div class="header py-4 px-4 px-md-6"><h6> Datos del representante del grupo familiar</h6></div>
        <div class="content py-4 px-4 px-md-6">
          <v-row>
              <v-col cols="12" md="6">
                <v-text-field outlined v-model="inputData.nombres"  class="v-text-field" label="Nombres*"
                  placeholder="Ej.Mario José" maxlength="50" counter
                  :rules="[rules.required, rules.counter, rules.minField]"></v-text-field>
                <!-- <div class="input-label" id="lab">Nombres*</div> -->
              <!-- <div class="input-label">Nombres*</div>
              <input type="text" v-model="inputData.nombres" placeholder="Ej.Mario José" maxlength="50"/> -->
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field outlined v-model="inputData.apellidoPaterno"  class="v-text-field" label="Apellido Paterno*"
                  placeholder="Ej. Flores" maxlength="50" counter 
                  :rules="[rules.required, rules.counter, rules.minField]"></v-text-field>
              <!-- <div class="input-label">Apellido Paterno*</div>
              <input type="text" v-model="inputData.apellidoPaterno" placeholder="Ej. Flores" maxlength="50"/> -->
              </v-col>
          </v-row>
          <v-row >
              <v-col cols="12" md="4">
                <v-text-field outlined v-model="inputData.apellidoMaterno"  class="v-text-field" label="Apellido Materno*"
                  placeholder="Ej. Cruz" maxlength="50" counter 
                  :rules="[rules.required, rules.counter, rules.minField]"></v-text-field>
                <!-- <div class="input-label">Apellido Materno*</div>
                <input type="text" v-model="inputData.apellidoMaterno" placeholder="Ej. Cruz" maxlength="50"/> -->
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field outlined v-model="inputData.carnetIdentidad"  class="v-text-field" label="Carnet de Identidad*"
                  placeholder="Ej. 1234567890" maxlength="10" counter="10" type="number" 
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)"
                  :rules="[rules.required, rules.carnet]"></v-text-field>
                  <!-- <div class="input-label">Carnet de Identidad*</div>
                  <input type="number" v-model="inputData.carnetIdentidad" placeholder="Ej. 2835721" 
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="10"/> -->
              </v-col>
              <v-col cols="4" md="2">
                  <!-- <div class="input-label">Extensión</div> -->
                  <v-select v-model="aditionalData.extension" variant="outlined"  class="fam"
                  :items="extensionOptions" label="Extensión" item-text="Text" item-value="value">
                </v-select>
              </v-col>
              <v-col cols="4" md="2">
                  <!-- <div class="input-label">Complemento</div>
                  <input type="text" v-model="aditionalData.complemento" placeholder="Ej. 2832" maxlength="4"/> -->
                  <v-text-field outlined v-model="aditionalData.complemento"  class="v-text-field" label="Complemento"
                  placeholder="Ej. 1234" maxlength="4" counter="4" type="text"
                  :rules="[rules.complemento]"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field outlined v-model="aditionalData.correoElectronico"  class="v-text-field" label="Correo electrónico"
                  placeholder="Ej. nombre@ejemplo.com" maxlength="50" counter="50" type="text"
                  :rules="[rules.email]"></v-text-field>
                  <!-- <div class="input-label">Correo electr&oacute;nico</div>
                  <input type="text" class="w-100" v-model="aditionalData.correoElectronico" placeholder="Ej. nombre@ejemplo.com" maxlength="50"/> -->
              </v-col>
              <v-col cols="12" md="4">
                  <!-- <div class="input-label">Celular*</div>
                  <input type="tel" class="w-100" v-model="inputData.telefono" placeholder="Ej.12345678" maxlength="8"/> -->
                  <v-text-field outlined v-model="inputData.telefono"  class="v-text-field" label="Celular*"
                  placeholder="Ej. 12346578" maxlength="8" counter="8" type="number"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)"
                  :rules="[rules.required, rules.telefono]"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                  <!-- <div class="input-label">Fecha de Nacimiento*</div>
                  <input type="date" class="w-100" v-model="inputData.fechaNacimiento"/> -->
                  <v-text-field outlined v-model="inputData.fechaNacimiento"  class="v-text-field" label="Fecha de nacimiento*"
                  type="date"
                  :rules="[rules.required]"></v-text-field>
              </v-col>
          </v-row>
          <v-row>
            <v-col>
              <recaptcha
              @error="captchaIsNotOk"
              @success="captchaIsSuccessfullyDone"
              @expired="captchaIsNotOk"
            />
            </v-col>
          </v-row>
          <v-row >
                <v-col cols="12" md="8">
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <input type="checkbox" name="terms" id="terms" style="width: 20px;" v-model="terms">
                        <label for="terms" >
                            <a href="https://backportal.bmsc.com.bo:1443/api/bmsc-portal/reports/464/file"
                            style="color: #296140;" target="_blank"
                            >He leído y acepto los términos y condiciones </a>
                            {{ '' }}
                            *
                        </label>
                    </div>
                </v-col>
            </v-row>
          <div class="mb-4">
          </div>
          <div class="text-center text-md-left">
          <v-btn depressed color="bm-medium px-8" @click="sendForm" :disabled="isEmailNotReadyToBeSend()">
            Enviar
            <v-icon right class="icon-check pl-4 pr-3"></v-icon>
          </v-btn>
          </div>
        </div>
      </div>
      </v-container>
      
  </div>
</template>
<style scoped>
 .info-form-v2 {
  background: white;
  box-shadow: 0px 5px 20px rgba(41, 97, 64, 0.1);
  border-radius: 6px;
  &.section {
    margin-top: -5px;
    .header {
      border-radius: 0;
    }
  }
  .header {
    height: 56px;
    background-color: #296140;
    border-radius: 6px 6px 0 0;
    
    h6 {
      color: white;
    }
  }
  .content {
    .input-label {
      margin: 4px 0;
    }
    input, textarea {
      margin: 4px 0;
      width: 100%;
      outline: none;
      border: 2px solid #DDE9DF;
      &[readonly]
      {
        background-color: #ECF2ED;
        color: #296140;
        border: 2px solid #DDE9DF
      }
    }
  }
  .strong-small-text {
    line-height: 19.6px;
  }
}

</style>
<script>
import WelcomeModal from "../FamilyComponents/WelcomeModal.vue";
import JoinToMoreFamilysModal from "../FamilyComponents/JoinToMoreFamilysModal.vue";
import ValidationsModal from "../FamilyComponents/ValidationsModal.vue";
import AgeRestrictionReg from "../FamilyComponents/AgeRestrictionReg.vue";
import axios from "axios";

export default {
  components: {
  WelcomeModal,
  JoinToMoreFamilysModal,
  ValidationsModal,
  AgeRestrictionReg
  },
  data() {
    return {
      name: '',
      inputData: {
      nombres: "",
      apellidoPaterno:'',
      apellidoMaterno:'',
      carnetIdentidad:'',
      telefono: "",
      fechaNacimiento: "",
      },
      aditionalData: {
        correoElectronico: "",
        extension:'',
        complemento:'',
      },
      terms: false,
      isCaptchaOk: false,
      welcomeTrigger: false,
      ageRestrition: false,
      JoinRestrition: false,
      invalidData: false,
      id:'',
      // Validations
      rules: {
          required: value => !!value || 'Campo obligatorio',
          minField: value => value.length >= 4 || 'Demasiado corto',
          carnet: value => value.length >= 10 || 'Ci debe tener 10 digitos',
          telefono: value => value.length >= 8 || 'Demasiado corto',
          complemento: value => value.length >= 1 ? value.length >= 4 || 'Demasiado corto' : true,
          counter: value => value.length <= 50 || 'Maximo 50 caracteres',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return value.length > 3 ? pattern.test(value) || 'Email no válido' : true
          },
        },
      // Validations
      patt: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      extensionOptions: [
        {
          Text: 'LP',
          value: 'lp'
        },
        {
          Text: 'OR',
          value: 'or'
        },
        {
          Text: 'PT',
          value: 'pt'
        },
        {
          Text: 'CB',
          value: 'cb'
        },
        {
          Text: 'SC',
          value: 'BN'
        },
        {
          Text: 'BN',
          value: 'bn'
        },
        {
          Text: 'PA',
          value: 'pa'
        },
        {
          Text: 'TJ',
          value: 'tj'
        },
        {
          Text: 'CH',
          value: 'ch'
        },
      ],
    };
  },
  methods: {
    emptyAllFields() {
      this.inputData = {
        nombres:'',
        apellidoPaterno:'',
        apellidoMaterno:'',
        carnetIdentidad:'',
        fechaNacimiento:'',
        telefono:''
      },
      this.aditionalData ={
        extension:'',
        correoElectronico:'',
        complemento:''
      }
    },
    async sendForm() {
      if(Object.values(this.inputData).includes('')) {
        return this.invalidData=true
      }
      const {fechaNacimiento} = this.inputData
      function isAdult() {
        const hoy = new Date();
        const birtday = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - birtday.getFullYear();
        const m = hoy.getMonth() - birtday.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < birtday.getDate())) {
            edad--;
        }
        return edad
      }
      if (isAdult() < 18) {
        return this.ageRestrition = true
      }
      if (!this.terms) {
        return this.invalidData=true
      }
      const register = {...this.inputData, ...this.aditionalData}
      // check
      try {
        await axios.post(`${process.env.SERVICES_BASE_URL}/api/bmscfamily/family/member/check`, register)
      } catch (error) {
        this.JoinRestrition = true
        return
      }
      // register
      const {data} = await axios.post(`${process.env.SERVICES_BASE_URL}/api/bmscfamily/family/register`, register)
      this.id = data.codigo_familia
      this.name = data.nombre
      this.welcomeTrigger = true
    },
    isEmailNotReadyToBeSend() {
      return !(this.isCaptchaOk && (
      this.inputData.carnetIdentidad.length === 10
      &&
      this.inputData.apellidoMaterno.length > 3
      &&
      this.inputData.apellidoPaterno.length > 3
      &&
      this.inputData.nombres.length > 3
      &&
      this.inputData.telefono.length === 8
      &&
      (this.aditionalData.correoElectronico.length > 0 ? this.patt.test(this.aditionalData.correoElectronico) : true)
      ));
    },
    captchaIsNotOk() {
      this.isCaptchaOk = false;
    },
    captchaIsSuccessfullyDone() {
      this.isCaptchaOk = true;
    },
    closeModal() {
      this.welcomeTrigger = false,
      this.JoinRestrition = false
      this.$router.push(process.env.REDIRECT_FAMILY)
    }
  },
};
</script>
