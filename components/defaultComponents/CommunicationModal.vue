<template>
  <div :class="`${ns}`" v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container height-communication">
            <v-row justify="space-between" no-gutters align="center">
              <v-col>
                <img
                  :src="require('@/assets/images/header-logo.svg')"
                  :class="`${ns}__bank-logo`"
                />
              </v-col>
              <v-col cols="1">
                <v-row justify="end" no-gutters align="center">
                  <v-col cols="10">
                    <img
                      :src="require('@/assets/images/close.svg')"
                      :class="`${ns}__close-icon`"
                      @click="closeModal"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
             <v-row align="center" justify="center">
               <v-col cols="11">
                 <v-row justify="start" no-gutters>
                   <v-col cols="10">
                     <h3>Comunicado</h3>
                   </v-col>
                 </v-row>
                 <v-row justify="center" no-gutters style="margin-top: 10px">
                   <v-col cols="12">
                     <p :class="`${ns}__text`">
                       El Banco Mercantil Santa Cruz nunca solicitará información confidencial (como usuarios, contraseñas o claves de tarjetas) ni validación de tu cuenta, a través de correos electrónicos, redes sociales o links externos.
                     </p>
                     <p :class="`${ns}__text`">
                       Si recibes alguna solicitud de este tipo, no ingreses al enlace y repórtalo en nuestras agencias o a través de la Central de Consultas.
                     </p>
                     <p :class="`${ns}__text`">
                       El número a través del cual el Banco Mercantil Santa Cruz se pondrá en contacto contigo es el <a :class="`${ns}__number`" style="color: black" href="tel:68244442">68244442</a>
                     </p>
                   </v-col>
                 </v-row>
               </v-col>
             </v-row>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {UPDATE_STATE_ACTION, UPDATE_TIPOTRE_ACTION} from "~/constants_actions";
import {FORMS, MODALS} from "~/cardListKeys/modals";
import {TIPOTRE} from "~/cardListKeys/footer";
import {generateEmptyModels, generateReportFileUrlFromId, getRawValueFromCardTitle} from "~/utils/cardsUtil";
import axios from "axios";

export default {
  name: "",
  components: {},
  props: {
    showModal: Boolean
  },
  data() {
    return {
      ns: 'comModal'
    };
  },
  async mounted() {
    //await this.$store.dispatch(`modal/${UPDATE_STATE_ACTION}`,[MODALS,this]);
    await this.$store.dispatch(`modal/${UPDATE_STATE_ACTION}`,[FORMS,this]);
  },
  computed: {
    modalsData: function () {
      let res = JSON.parse(JSON.stringify(this.$store.getters["modal/getList"](MODALS)));
      if(res.length === 0) res = generateEmptyModels(1);
      //console.log(MODALS, res);
      return res;
    },
    formsData: function () {
      let sectionList = JSON.parse(JSON.stringify(this.$store.getters["modal/getList"](FORMS)));
      if(sectionList.length === 0) sectionList = generateEmptyModels(1);
      //console.log(FORMS, sectionList);
      return sectionList;
    }
  },
  methods: {
    goToHref() {
      this.$router.push({
        path: "help/agencies"
      });
      this.closeModal()
    },
    closeModal() {
      this.$emit('hideModal');
    },
    goToDownloadPage(url) {
      window.open(url, '_blank');
    },
    processModalDescription(text) {
      const paragraphs = text.split('<br/>');
      res.push(paragraphs);

    },
    processFormLink(text) {
      const paragraphs = text.split('<form/>');
      res.push(paragraphs);
    },
    downloadItem () {
      //console.log('Forms data: ',this.formsData[0]);
      let url = generateReportFileUrlFromId(this.formsData[0].description);
      let title = this.formsData[0].title;
      let label = getRawValueFromCardTitle(title);
      //console.log(url);
      axios.get(url, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = label;
          link.click();
          URL.revokeObjectURL(link.href);
        }).catch(console.error);
    }
  }
};
</script>
