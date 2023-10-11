<template>
  <v-app>
    <IEModal :showModal="showModal" v-on:hideModal="modalState=1"/>
    <Header />
    <HeaderMobile />
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
    <!--<div class="chat-icon">
      <v-icon class="icon-chat-text"></v-icon>
    </div>
    --->
    <div class="chat-icon">
      <img class="chat-icon image" src="~/assets/images/puntoDeReclamo.png" @click="$router.push({ path: '/Help?showForm=true'})"/>
    </div>
  </v-app>
</template>

<script>
import Header from "@/components/defaultComponents/Header.vue";
import HeaderMobile from "@/components/defaultComponents/HeaderMobile.vue";
import Footer from "@/components/defaultComponents/Footer.vue";
import IEModal from "@/components/defaultComponents/IEModal.vue";
import CommunicationModal from "@/components/defaultComponents/CommunicationModal.vue";
export default {
  data() {
    return {
      modalState: 0,
    };
  },
  components: {
    Header,
    Footer,
    HeaderMobile,
    IEModal,
    CommunicationModal
  },
  computed: {
    showModal() {
      if (this.modalState === 0) {
        if(this.isIE11()) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    isIE11() {
      if(!process.server) {
        if (navigator.userAgent.indexOf('MSIE') !== -1
          || navigator.appVersion.indexOf('Trident/') > -1) {
          /* Microsoft Internet Explorer detected in. */
          return true;
        }
      }
      return false;
    }
  }
};
</script>
<style lang="scss">
@import "assets/theme/_app.scss";
</style>
