<template>
  <div class="d-md-flex d-sm-block" v-if="storeCard">
    <div class="mx-8 py-6">
      <h2 v-html="storeCard.title"></h2>
      <div class="big-text my-4">{{storeCard.description}}</div>
      <div >
        <v-img v-for="(item, index) in storeCard.brandIcons" :key="index" :url="item" ></v-img>
      </div>
      <Button
        text="Conoce las Brisas"
        color="bm-light"
        v-bind:onClick="executeClickLink"
      />
    </div>
    <v-img
      :src="storeCard.mainImageUrl"
      :alt="storeCard.imgAlt1"
    />

  </div>
</template>
<script>
import Button from "@/components/Button.vue";
import {checkValidUrl} from "@/utils/urlUtil";

export default {
  components: {
    Button
  },
  props: {
    storeCard: Object
  },
  methods: {
    executeClickLink(card) {
      const storeCard = this.storeCard;
      if (this.onButtonClick && !checkValidUrl(storeCard.buttonHref)) {
        this.onButtonClick(card);
      }
      else if (checkValidUrl(storeCard.buttonHref)) {
        window.open(storeCard.buttonHref, '_blank');
      } else {
        this.$router.push({
          path: storeCard.buttonHref
        });
      }
    }
  }
}
</script>
