<template>
  <v-card
          :class="{
            'bm-card': true,
            'square-images': squareImages
         }"
  >
    <BoxAndImage
      class="card-box-and-image"
      v-if="isBanx"
      :image="cardImage"
      :alt="alt"
      :label="label"
      :className="className"
      :direction="'bottom-left2'"
      :isCard="true"
    />
    <div v-else
         :class="{
            'image-container': true,
            'square-images': squareImages
         }"
    >
      <v-img
        v-if="squareImages"
        class="image"
        :src="cardImage"
        :alt="alt"
        height="auto"
        width="100%"
      ></v-img>
      <v-img
        v-else
        class="image"
        :src="cardImage"
        :alt="alt"
      ></v-img>
    </div>
    <div class="card-general">
        <h3 v-html="cardTitle" class="mb-0 card-title"/>
        <div class="regular-text mb-4" v-html="cardContent" style="text-align: justify"/>
        <div v-if="message" class="mb-6 small black-text" style="text-align: justify">
          {{ message }}
        </div>

        <Button class="card-button"
          v-bind:text="buttonLabel"
          v-bind:color="buttonColor"
          v-bind:onClick="executeClickLink"
          v-bind:data="{
            title: cardTitle,
            content: cardContent,
            image: cardImage,
            buttonLabel: buttonConfig ? buttonConfig.label : '',
            buttonMessage: buttonConfig ? buttonConfig.message : '',
            id: cardId,
            tags: $data._.isString(tags) ? tags.split(',')[0] : tags,
            buttonHref: cardButtonHref
          }"
        />
    </div>
  </v-card>
</template>

<script>
import Button from "@/components/Button.vue";
import BoxAndImage from "~/components/BoxAndImage";
import {checkValidUrl} from "@/utils/urlUtil";
import _ from 'lodash';

export default {
  name: "Card",
  components: {
    BoxAndImage,
    Button
  },
  props: {
    cardTitle: String,
    cardContent: String,
    cardImage: String,
    alt: String,
    message: String,
    onButtonClick: Function,
    buttonConfig: Object,
    cardId: Number,
    buttonLabel: String,
    buttonColor: String,
    tags: String,
    // BoxAndImage
    isBanx: Boolean,
    label:String,
    className: String,
    image:String,
    direction:String,
    x:String,
    y:String,
    cardButtonHref: String,
    squareImages: Boolean
  },

  data() {
    return {
      _,
      ns: "accounts-banx",
    };
  },
  methods: {
    executeClickLink(card) {
      if(card.tags === "" && this.cardButtonHref !== "") {
        this.$router.push({
          path: this.cardButtonHref
        });
        return;
      }
      if (this.onButtonClick && !checkValidUrl(this.cardButtonHref)) {
        this.onButtonClick(card);
      }
      else if (checkValidUrl(this.cardButtonHref)) {
        window.open(this.cardButtonHref, '_blank');
      } else {
        this.$router.push({
          path: this.cardButtonHref
        });
      }
    }
  }
};
</script>
