<template>
    <div>
        <FamilyInactiveModal :showModal="inactiveModal" v-on:hideModal="inactiveModal=false"/>
        <LimitMembersModal :showModal="limitModal" v-on:hideModal="closeModal()"/>
        <AgeModal :showModal="ageRestrition" v-on:hideModal="closeModal()"/>
        <WelcomeFamModal :showModal="welcomeTrigger" v-on:hideModal="closeModal()" :name="nameFamily.toUpperCase()"/>
        <ValidationsModal :showModal="invalidData" v-on:hideModal="invalidData=false"/>
        <JoinToMoreFamilysModal :showModal="JoinRestrition" v-on:hideModal="closeModal()"/>
        <v-row justify="center" align="center" style="margin-bottom: 2%;" v-if="stepOne">
          <v-col cols="8" lg="3">
            <div class="info-form pb-6">
              <div class="header py-4 px-4 px-md-6" style="margin-bottom: 2% ;"><h6>Afiliación a grupo familiar </h6></div>
                <v-col>
                    <!-- <div class="input-label">Código de familia</div>
                    <input type="text" class="w-100" v-model="familyData.codigo_familia" placeholder="Ej.789123"/> -->
                    <v-text-field outlined v-model="familyData.codigo_familia"  class="v-text-field" label="Código de familia*"
                    placeholder="Ej. 12345" maxlength="5" counter="5" type="number"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)"
                    :rules="[rules.required, rules.code]"></v-text-field>
                    <div style="display: grid; align-items: center; justify-content: center; margin-top: 2%;">
                        <v-btn depressed color="bm-medium px-5" @click="checkFamily()" :disabled="familyData.codigo_familia.length !== 5">
                            Enviar
                            <v-icon right class="icon-check pl-4 pr-3"></v-icon>
                        </v-btn>
                    </div>
                </v-col>
            </div>
          </v-col>
        </v-row>
        
        <v-container class="mx-auto" v-if="stepTwo">
            <div class="info-form-v2 pb-6">
            <div class="header py-4 px-4 px-md-6"><h6>Datos del miembro del grupo familiar {{ nameFamily }}</h6></div>
            <div class="content py-4 px-4 px-md-6">
            <v-row>
                <v-col cols="12" md="6">
                <!-- <div class="input-label">Nombres*</div>
                <input type="text" v-model="inputData.nombres" placeholder="Ej.Mario José" maxlength="50"/> -->
                <v-text-field outlined v-model="inputData.nombres"  class="v-text-field" label="Nombres*"
                  placeholder="Ej.Mario José" maxlength="50" counter
                  :rules="[rules.required, rules.counter, rules.minField]"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                <!-- <div class="input-label">Apellido Paterno*</div>
                <input type="text" v-model="inputData.apellidoPaterno" placeholder="Ej. Flores" maxlength="50"/> -->
                <v-text-field outlined v-model="inputData.apellidoPaterno"  class="v-text-field" label="Apellido Paterno*"
                  placeholder="Ej. Flores" maxlength="50" counter 
                  :rules="[rules.required, rules.counter, rules.minField]"></v-text-field>
                </v-col>
            </v-row>
            <v-row >
                <v-col cols="12" md="4">
                <!-- <div class="input-label">Apellido Materno*</div>
                <input type="text" v-model="inputData.apellidoMaterno" placeholder="Ej. Cruz" maxlength="50"/> -->
                <v-text-field outlined v-model="inputData.apellidoMaterno"  class="v-text-field" label="Apellido Materno*"
                  placeholder="Ej. Cruz" maxlength="50" counter 
                  :rules="[rules.required, rules.counter, rules.minField]"></v-text-field>
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
                  <v-select v-model="aditionalData.extension" variant="outlined"  class="fam"
                    :items="extensionOptions" label="Extensión" item-text="Text" item-value="value">
                  </v-select>
                    <!-- <div class="input-label">Extensión</div> -->
                    <!-- <select v-model="aditionalData.extension" class="w-100 text-center" 
                    style="height: 42px; border: 2px solid #DDE9DF; border-radius: 6px;">
                        <option v-for="options in extensionOptions" v-bind="options.value">
                        {{ options.Text }}
                        </option>
                    </select> -->
                </v-col>
                <v-col cols="4" md="2">
                  <v-text-field outlined v-model="aditionalData.complemento"  class="v-text-field" label="Complemento"
                  placeholder="Ej. 1234" maxlength="4" counter="4" type="text"
                  :rules="[rules.complemento]"></v-text-field>
                    <!-- <div class="input-label">Complemento</div>
                    <input type="text" v-model="aditionalData.complemento" placeholder="Ej. 2834" maxlength="4"/> -->
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field outlined v-model="aditionalData.correoElectronico"  class="v-text-field" label="Correo electrónico"
                    placeholder="Ej. nombre@ejemplo.com" maxlength="50" counter="50" type="text"
                    :rules="[rules.email]">
                  </v-text-field>
                    <!-- <div class="input-label">Correo electr&oacute;nico</div>
                    <input type="text" class="w-100" v-model="aditionalData.correoElectronico" placeholder="Ej. nombre@ejemplo.com" maxlength="50"/> -->
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field outlined v-model="inputData.telefono"  class="v-text-field" label="Celular"
                    placeholder="Ej. 12346578" maxlength="8" counter="8" type="number"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)"
                    :rules="[rules.required, rules.telefono]">
                  </v-text-field>
                    <!-- <div class="input-label">Celular*</div>
                    <input type="text" class="w-100" v-model="inputData.telefono" placeholder="Ej.12345678"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="8"/> -->
                </v-col>
                <v-col cols="12" md="3">
                    <!-- <div class="input-label">Fecha de Nacimiento*</div>
                    <input type="date" class="w-100" v-model="inputData.fechaNacimiento"/> -->
                    <v-text-field outlined v-model="inputData.fechaNacimiento"  class="v-text-field" label="Fecha de nacimiento*"
                    type="date"
                    :rules="[rules.required]"></v-text-field>
                </v-col>
                <v-col cols="4" md="4">
                  <v-text-field outlined class="v-text-field" label="Codigo de familia"
                    :value="familyData.codigo_familia" readonly>
                  </v-text-field>
                    <!-- <div class="input-label" >Código de familia</div>
                    <input type="number" class="w-100" :value="familyData.codigo_familia" :disabled=true placeholder="Ej. 25365"/> -->
                </v-col>
                <v-col cols="4" md="2">
                  <v-select v-model="inputData.parentesco" variant="outlined"  class="fam"
                    :items="parentescoOptions" label="Parentesco" item-text="text" item-value="value">
                  </v-select>
                    <!-- <div class="input-label">Parentesco*</div>
                    <select v-model="inputData.parentesco" class="w-100 text-center" 
                    style="height: 42px; border: 2px solid #DDE9DF; border-radius: 6px;">
                        <option v-for="options in parentescoOptions" v-bind="options.value">
                        {{ options.text }}
                        </option>
                    </select> -->
                </v-col>
            </v-row>

            <v-row >
                <v-col cols="12" md="8">
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <input type="checkbox" name="terms" id="terms" v-model="terms" style="width: 20px;">
                        <label for="terms" >
                              <a href="https://backportal.bmsc.com.bo:1443/api/bmsc-portal/reports/464/file"
                              style="color: #296140;" target="_blank"
                              >He leído y acepto los términos y condiciones </a>
                              {{ '' }}
                              y
                              {{ '' }}
                              <a href="https://backportal.bmsc.com.bo:1443/api/bmsc-portal/reports/472/file"
                              style="color: #296140;"  target="_blank"
                              > La declaración jurada de parentesco</a>*
                          </label>
                    </div>
                </v-col>
            </v-row>
            <div class="text-center text-md-left" style="margin-top: 2%;">
            <v-btn depressed color="bm-medium px-8" @click="sendForm" :disabled="isNotReady()">
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
import axios from "axios";
import FamilyInactiveModal from "../FamilyComponents/FamilyInactiveModal.vue"
import ValidationsModal from "../FamilyComponents/ValidationsModal.vue";
import AgeModal from "../FamilyComponents/AgeModal.vue";
import WelcomeFamModal from "../FamilyComponents/WelcomeFamModal.vue";
import LimitMembersModal from "../FamilyComponents/LimitMembersModal.vue";
import JoinToMoreFamilysModal from "../FamilyComponents/JoinToMoreFamilysModal.vue";
    export default {
        components:{
            FamilyInactiveModal,
            WelcomeFamModal,
            ValidationsModal,
            AgeModal,
            LimitMembersModal,
            JoinToMoreFamilysModal
        },
        data() {
            return {
                inputData: {
                nombres: "",
                apellidoPaterno:'',
                apellidoMaterno:'',
                carnetIdentidad:'',
                telefono: "",
                fechaNacimiento: "",
                parentesco:"",
                },
                terms:false,
                aditionalData: {
                    correoElectronico: "",
                    extension:'',
                    complemento:'',
                },
                familyData: {
                    codigo_familia:'',
                },
                nameFamily:'',
                welcomeTrigger: false,
                ageRestrition: false,
                JoinRestrition: false,
                limitModal:false,
                inactiveModal:false,
                invalidData:false,
                stepOne:true,
                stepTwo:false,
                // Validations
                rules: {
                    required: value => !!value || 'Campo obligatorio',
                    minField: value => value.length >= 4 || 'Demasiado corto',
                    complemento: value => value.length >= 1 ? value.length >= 4 || 'Demasiado corto' : true,
                    carnet: value => value.length >= 10 || 'Ci debe tener 10 digitos',
                    telefono: value => value.length >= 8 || 'Demasiado corto',
                    code: value => value.length >= 5 || 'El codigo de familia debe contener 5 digitos',
                    counter: value => value.length <= 50 || 'Maximo 50 caracteres',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return value.length > 3 ? pattern.test(value) || 'Email no válido' : true
                    },
                    },
                // Validations
                patt: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
                parentescoOptions: [
                    {
                        text:"Padre",
                        value:"padre"
                    },
                    {
                        text:"Madre",
                        value:"madre"
                    },
                    {
                        text:"Hijo(a)",
                        value:"hijo(a)"
                    },
                    {
                        text:"Cónyuge",
                        value:"conyuge"
                    },
                    {
                        text:"Hermano(a)",
                        value:"hermano(a)"
                    },
                ],
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
                }
            },
            methods:{
                async checkFamily() {
                    const {codigo_familia} = this.familyData
                    if (Object.values(this.familyData).includes('')) {
                      this.invalidData = true
                      return
                    }
                    try {
                        const {data} = await axios(`${process.env.SERVICES_BASE_URL}/api/bmscfamily/family/consult/${codigo_familia}`)
                        if (data.activo === false) {
                          return this.inactiveModal = true
                        }
                        const {data:limit} = await axios(`${process.env.SERVICES_BASE_URL}/api/bmscfamily/family/parameters/2`)
                        if (data.integrantes.length >= Number(limit.valor)) {
                          return this.limitModal = true
                        }
                        this.nameFamily = data.nombre
                        this.stepOne=false
                        this.stepTwo=true
                    } catch (error) {
                        return this.inactiveModal = true
                    }
                },
                async sendForm() {
                if(Object.values(this.inputData).includes('')) {
                  return this.invalidData=true
                }
                const {data} = await axios(`${process.env.SERVICES_BASE_URL}/api/bmscfamily/family/parameters/13`)
                const allowMinors = data.valor !== 'no' ? true : false
                if (!allowMinors) {
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
                }
                
                if (!this.terms) {
                    return this.invalidData=true
                }
                const affiliate = {...this.inputData, ...this.aditionalData}
                const { codigo_familia} = this.familyData
                // check
                try {
                  const {data} = await axios.post(`${process.env.SERVICES_BASE_URL}/api/bmscfamily/family/member/check`, affiliate)
                  const isEQ = data.filter((arr) => arr.extension === this.aditionalData.extension)
                  if (isEQ.length !== 0) {
                    this.JoinRestrition = true
                    return
                }
                } catch (error) {
                  console.log(error)
                  this.JoinRestrition = true
                  return
                }
                // affiliate
                try {
                    const res = await axios.post(`${process.env.SERVICES_BASE_URL}/api/bmscfamily/family/affiliate/${codigo_familia}`, affiliate)
                    this.clearForm()
                    console.log(res)
                    this.welcomeTrigger = true
                    return 
                } catch (error) {
                    console.log(error);
                    return
                }
                },
                isNotReady() {
                  return !(
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
                  this.inputData.parentesco !== ''
                  &&
                  (this.aditionalData.correoElectronico.length > 0 ? this.patt.test(this.aditionalData.correoElectronico) : true)
                  );
                },
                clearForm() {
                    this.inputData.nombres = "",
                    this.inputData.apellidoPaterno ='',
                    this.inputData.apellidoMaterno ='',
                    this.inputData.carnetIdentidad ='',
                    this.inputData.telefono = "",
                    this.inputData.fechaNacimiento = "",
                    this.inputData.parentesco ="",
                    this.aditionalData.correoElectronico = "",
                    this.aditionalData.extension = '',
                    this.aditionalData.complemento = '',
                    this.terms = false
                },
                closeModal() {
                    this.welcomeTrigger = false,
                    this.JoinRestrition = false
                    this.limitModal = false
                    this.ageRestrition = false
                    this.inactiveModal = false
                    this.$router.push(process.env.REDIRECT_FAMILY)
                }
            }
    }
</script>