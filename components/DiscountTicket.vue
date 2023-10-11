<template>
  <div class="ticket-container pt-5">
    <div class="ticket" v-for="(item, index) in ticketsData" :key="index" @click="showInfoModal(item)">
      <div class="image-container">
        <v-img :src="getDiscountCommerceImageBridge(item,'main')" contain :alt="item.imgAlt1"></v-img>
      </div>
      <div class="details-section">
        <div>
          <div class="strong-regular-text green-dark-text">{{item.titulo}}</div>
          <div class="tiny-text green-text">{{item.categorias[0].nombre}}</div>
          <!-- <div class="small-text">{{item.descripcion}}</div> -->
        </div>
        <div class="d-flex justify-space-between align-end">
          <div class="small-text">{{item.beneficio}}</div>
          <v-img :src="getDiscountCommerceImageBridge(item, 'secondary')" :alt="item.imgAlt1" max-width="50px" contain></v-img>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="560"
    >
      <v-card class="pa-8 ticket-modal">
        <v-img :src="getDiscountCommerceImageBridge(selectedTicket,'main')" :alt="selectedTicket.imgAlt1" contain></v-img>
        <div class="strong-regular-textstrong-regular-text text-center green-dark-text pt-4">{{selectedTicket.titulo}}</div>
        <div class="small-text text-center green-text" v-if="selectedTicket.categorias">
          {{selectedTicket.categorias[0].nombre}}
        </div>
        <div class="small-text text-center pt-2">{{selectedTicket.beneficio}}</div>
        <!-- <div class="small-text text-center pt-2">{{selectedTicket.descripcion}}</div> -->
        <div class="small-text text-center pt-2">Para canjear el voucher dirigete a alguna de nuestras sucursales o llama a nuestro call center (311-4010)</div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { getDiscountCommerceImage } from "@/utils/imageUtil";

export default {
  props: {
    ticketsData: Array
  },
  data() {
    return {
      dialog: false,
      selectedTicket: {},
      servicesBaseUrl: this.$config.servicesBaseUrl
    }
  },
  methods: {
    showInfoModal(item){
      this.selectedTicket = item;
      this.dialog=true;
    },
    getDiscountCommerceImageBridge(selectedTicket, type) {
      return getDiscountCommerceImage(selectedTicket, type, this);
    }
  }
}
</script>
