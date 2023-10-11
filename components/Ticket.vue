<template>
  <div class="ticket-container pt-5">
    <div :class="
      item.nuevo
        ? `ticket relevant`
        : 'ticket'
      " v-for="(item, index) in ticketsData" :key="index"
      @click="showInfoModal(item)">
      <div class="image-container">
        <v-img :src="getCommerceImageBridge(item,'main')" contain :alt="item.imgAlt1"></v-img>
      </div>
      <div class="details-section">
        <div>
          <div class="d-flex justify-space-between align-start">
            <div class="strong-regular-text green-dark-text ticket-title">{{item.titulo}}</div>
            <v-img :src='require("@/assets/images/star.png")' max-width="20px" v-if="item.destacado" contain></v-img>
          </div>
          <!-- <div class="small-text green-text">{{item.descripcion}}</div> -->
          <!-- <div class="small-text">{{item.beneficio}}</div> -->
        </div>
        <div class="d-flex justify-space-between align-end">
          <div class="strong-regular-text">{{item.puntos}} ptos.</div>
          <v-img :src="getCommerceImageBridge(item, 'secondary')" max-width="50px" contain :alt="item.imgAlt2"></v-img>
        </div>
      </div>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="560"
    >
      <v-card class="pa-8 ticket-modal">
        <v-img :src="getCommerceImageBridge(selectedTicket, 'main')" contain :alt="selectedTicket.imgAlt1"></v-img>
        <div class="strong-regular-textstrong-regular-text text-center green-dark-text pt-4">{{selectedTicket.titulo}}</div>
        <!-- <div class="small-text text-center green-text ">{{selectedTicket.descripcion}}</div> -->
        <div class="strong-regular-text text-center pt-4">{{selectedTicket.puntos}} ptos.</div>
        <!-- <div class="small-text text-center pt-2">{{selectedTicket.beneficio}}</div> -->
        <div class="small-text text-center pt-2">{{selectedTicket.descripcion}}</div>
        <div class="small-text text-center pt-2">Para canjear el voucher dirigete a alguna de nuestras sucursales o llama a nuestro call center (311-4010)</div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { getCommerceImage } from "@/utils/imageUtil";

export default {
  props: {
    ticketsData: Array
  },
  data() {
    return {
      dialog: false,
      selectedTicket: {},
      getCommerceImage: getCommerceImage,
      servicesBaseUrl: this.$config.servicesBaseUrl
    }
  },
  methods: {
    showInfoModal(item){
      this.selectedTicket = item;
      this.dialog=true;
    },
    getCommerceImageBridge(selectedTicket, type) {
      const baseUrl = this.$config.servicesBaseUrl;
      return getCommerceImage(selectedTicket, type, this);
    }
  }
}
</script>
