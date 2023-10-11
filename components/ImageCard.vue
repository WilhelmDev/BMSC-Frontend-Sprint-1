S<template>
  <div>
    <v-card class="bm-image-card" @click="clickCard">
      <div class="image-container">
        <v-img v-if="cardData.mainImageUrl" :src="cardData.mainImageUrl" :alt="cardData.imgAlt1"></v-img>
      </div>
      <div class="card-content pa-6">
        <div class="strong-small-text white-text">
          <span v-html="cardData.subTitle"/>
        </div>
        <h5 class="pb-6 white-text">
          <span v-html="cardData.title"/>
        </h5>
        <div class="link">
        <span class="white-text cursor-pointer strong-regular-text" @click="onButtonClick(cardData)">
          {{ cardData.linkText }}<v-icon right class="white-text icon-btn-arrow"/>
        </span>
        </div>
      </div>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      color="#3a7652"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
          :timeout="5000"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: {
    cardData: Object,
    onButtonClick: Function,
    clickableImage: Boolean,
    downloadable: Boolean
  },
  data() {
    return {
      snackbar: false,
      text: 'El documento ha comenzado a descargarse.'
    }
  },
  methods: {
    clickCard() {
      if(this.clickableImage) {
        this.onButtonClick(this.cardData);
      }
      if(this.downloadable) {
        this.snackbar = true;
      }
    }
  }
}
</script>
