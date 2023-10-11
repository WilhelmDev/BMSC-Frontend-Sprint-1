<template>
    <div>
        <NotFoundModal :showModal="notFound" v-on:hideModal="notFound=false"/>
        <RestrictionModal :showModal="restriction" v-on:hideModal="closeModal()"/>
        <ValidationsModal :showModal="invalidData" v-on:hideModal="invalidData=false"/>
        <v-row justify="center" align="center" style="margin-bottom: 2%;" v-if="showForm">
          <v-col cols="8" md="5" lg="4">
            <div class="info-form pb-6">
              <div class="header py-4 px-4 px-md-6" style="margin-bottom: 2% ;"><h6>Consulta los miembros de tu grupo familiar </h6></div>
                <v-col>
                  <v-text-field outlined v-model="familyData.carnetIdentidad"  class="v-text-field" label="Carnet de Identidad*"
                    placeholder="Ej. 1234567890" maxlength="10" counter="10" type="number" 
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)"
                    :rules="[rules.required, rules.carnet]">
                  </v-text-field>
                    <!-- <div class="input-label">Carnet de identidad*</div>
                    <input type="text" class="w-100" v-model="familyData.carnetIdentidad" placeholder="Ej.789123"/> -->
                </v-col>
                <v-col>
                  <v-text-field outlined v-model="familyData.codigo_familia"  class="v-text-field" label="Código de familia*"
                    placeholder="Ej. 12345" maxlength="5" counter="5" type="number"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)"
                    :rules="[rules.required, rules.code]">
                  </v-text-field>
                    <!-- <div class="input-label">Código de familia*</div>
                    <input type="text" class="w-100" v-model="familyData.codigo_familia" placeholder="Ej.789123"/> -->
                </v-col>
                <v-col>
                    <div style="display: grid; align-items: center;">
                        <v-btn depressed color="bm-medium px-10" @click="checkFamily()" :disabled="!(familyData.codigo_familia.length === 5 && familyData.carnetIdentidad.length === 10)">
                            Enviar
                        </v-btn>
                    </div>
                </v-col>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center" align="center" style="margin-bottom: 2%;" v-if="showList">
          <v-col cols="12" md="8">
              <div>
                <FamilyList :people-data="family" :family-name="name"/>
              </div>
          </v-col>
        </v-row>
    </div>
  </template>
  <script>
  import NotFoundModal from "../FamilyComponents/NotFoundModal.vue";
  import RestrictionModal from "../FamilyComponents/RestrictionModal.vue";
  import FamilyList from "../FamilyComponents/FamilyList.vue";
  import ValidationsModal from "../FamilyComponents/ValidationsModal.vue";
  import axios from "axios";
  
  export default {
    
    components: {
        NotFoundModal,
        RestrictionModal,
        FamilyList,
        ValidationsModal
    },
    async mounted() {
  
    },
    data() {
      return {
        familyData:{
          carnetIdentidad:'',
          codigo_familia:''
        },
        family:[],
        name:'',
        notFound:false,
        restriction:false,
        showForm : true,
        showList: false,
        invalidData: false,
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
      };
    },
    methods: {
      emptyAllFields() {
        this.familyData = {
          carnetIdentidad:'',
          codigo_familia: ""
        }
      },
      async checkFamily() {
        if (Object.values(this.familyData).includes("")) {
          this.invalidData = true
          return
        }
        const {codigo_familia} = this.familyData
        try {
            const {data} = await axios(`${process.env.SERVICES_BASE_URL}/api/bmscfamily/family/consult/${codigo_familia}`)
            const {integrantes} = data
            const {carnetIdentidad} = this.familyData
            const isAdmin = integrantes.some((integrante) => integrante.carnetIdentidad === carnetIdentidad)
            if (!isAdmin) {
              return this.restriction = true
            }
            this.showForm = false
            this.name = data.nombre
            this.family = integrantes
            this.showList = true
            return
        } catch (error) {
          return this.notFound = true
        }
      },
      closeModal() {
        this.notFound = false,
        this.restriction = false
        this.$router.push(process.env.REDIRECT_FAMILY)
      }
    },
  };
  </script>
  