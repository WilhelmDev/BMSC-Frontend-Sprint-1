<template>
  <div>
    <v-carousel
      hide-delimiters
      show-arrows
      class="card-slider"
      height="600px"
      next-icon="icon-right-arrow"
      prev-icon="icon-left-arrow"
      light
    >
      <v-carousel-item
        v-for="(card, index) in cardsData"
        :key="index"
      >
        <v-row justify="center" align="center" no-gutters>
          <v-col cols="10">
            <div v-if="cardType === 'estate'" class="card-container ma-2">
              <EstateCard :data="card" />
            </div>
            <div v-else class="card-container ma-1">
              <Card
                :cardTitle="card.title"
                :cardContent="card.subTitle"
                :cardImage="card.mainImageUrl"
                :alt="card.imgAlt1"
                :message="card.description"
                :buttonLabel="card.buttonName"
                :buttonColor="card.buttonType"
                :onButtonClick="onButtonClick"
                :cardId="card.id"
                :tags="card.tags"
                :isBanx="isBanx"
                :className="card.gradient"
                :label="card.gradientText"
              />
            </div>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import Card from "@/components/Card.vue";
import EstateCard from "@/components/EstateCard.vue";

export default {
  components: {
    Card,
    EstateCard
  },
  props: {
    cardsData: Array,
    isBanx: Boolean,
    cardType: String,
    onButtonClick: Function
  }
};
</script>
