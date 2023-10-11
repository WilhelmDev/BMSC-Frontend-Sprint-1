<template>
  <div :class="`${ns}`" v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
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
           <v-row align="center">
             <v-col cols="6">
               <v-row justify="start">
                 <v-col cols="10" offset="1">
                   <h3>Queremos brindarte la mejor experiencia digital.</h3>
                 </v-col>
               </v-row>
               <v-row justify="start">
                 <v-col cols="11" offset="1">
                   <span :class="`${ns}__text`">Hemos notado que estás <span :class="`${ns}__bold`">utilizando Internet Explorer.</span></span>
                 </v-col>
               </v-row>
               <v-row justify="start">
                 <v-col cols="11" offset="1">
                   <span :class="`${ns}__text`">Con el objetivo de potenciar tu experiencia en nuestra web, te sugerimos utilizar los siguientes navegadores: Chrome, Firefox o Safari.</span>
                 </v-col>
               </v-row>
               <v-row justify="start">
                 <v-col cols="11" offset="1">
                   <span :class="`${ns}__text-green`">¿No tienes otro navegador? Te recomendamos estos:</span>
                 </v-col>
               </v-row>
               <v-row justify="start" no-gutters>
                 <v-col cols="2" offset="1">
                   <img
                     :src="require('@/assets/images/google.svg')"
                     :class="`${ns}__logo`"
                     @click="goToDownloadPage('https://www.google.com/chrome/')"
                   />
                 </v-col>
                 <v-col cols="2">
                   <img
                     :src="require('@/assets/images/firefox.svg')"
                     :class="`${ns}__logo`"
                     @click="goToDownloadPage('https://www.mozilla.org/es-ES/firefox/new/')"
                   />
                 </v-col>
                 <v-col cols="2">
                   <img
                     :src="require('@/assets/images/safari.svg')"
                     :class="`${ns}__logo`"
                     @click="goToDownloadPage('https://support.apple.com/downloads/safari')"
                   />
                 </v-col>
               </v-row>
             </v-col>
             <v-col cols="6">
               <v-row justify="center" align="center">
                 <v-col cols="6">
                   <img
                     :src="require('@/assets/images/computerError.svg')"
                     :class="`${ns}__computer`"
                   />
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
export default {
  name: "",
  components: {},
  props: {
    showModal: Boolean,

  },
  data() {
    return {
      ns: 'IEModal'
    };
  },
  methods: {
    closeModal() {
      this.$emit('hideModal');
    },
    goToDownloadPage(url) {
      window.open(url, '_blank');
    }
  }
};
</script>
