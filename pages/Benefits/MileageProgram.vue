<template>
  <div>
    <TitleSimple :titleData="titleData.items[0]"/>
    <v-row>
      <v-col v-for="(card, i) in cardsData.items"
        :key="i"
        cols="12"
        sm="6"
        class="pa-0 pa-sm-1 pa-md-3"
      >
        <Card
          :cardTitle="card.title"
          :cardContent="card.subTitle"
          :cardImage="card.mainImageUrl"
          :alt="card.imgAlt1"
          :message="card.description"
          :buttonLabel="card.buttonName"
          :buttonColor="card.buttonType"
          :onButtonClick="programDetails"
          :cardButtonHref="card.buttonHref"
          :cardId="card.id"
          :tags="card.tags"
          class="light-green-bg"
        />
      </v-col>
    </v-row>
    <div class="py-sm-4 py-md-16" style="display: none">
      <RelatedPanel :items="relatedItems.items" />
    </div>
  </div>
</template>
<script>
import TitleSimple from "@/components/TitleSimple.vue";
import Card from "@/components/Card.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import { UPDATE_STATE_ACTION } from "~/constants_actions";
import { PROGRAMS, TITLE } from "@/cardListKeys/benefitMileage";
import {getHeader} from "~/utils/seo";
export default {
  components: {
    TitleSimple,
    Card,
    RelatedPanel
  },
  async mounted() {

  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["benefitMileage/getList"](TITLE)
      }
      //console.log(TITLE, res);
      return res;
    },
    cardsData: function () {
      let res = {
        items: this.$store.getters["benefitMileage/getList"](PROGRAMS)
      }
      //console.log(PROGRAMS, res);
      return res;
    },
  },
  data() {
    return {
      // titleData: {
      //   items: [
      //     {
      //       title: "Programa de millas",
      //       description: "Por cada compra que realices con tarjetas de crédito Visa Lifemiles o Mastercard LATAM PASS del Banco Mercantil Santa Cruz, acumula millas que puedes canjear por pasajes aéreos, reserva de hoteles y mucho más."
      //     }
      //   ]
      // },
      relatedItems: {
        items: [
          {
            title: "Club de Puntos",
            subTitle: "Ver opciones",
            route: "/benefits/club"
          },
          {
            title: "Descuentos",
            subTitle: "Ver opciones",
            route: "/benefits/discounts"
          }
        ]
      }
    }
  },
  methods: {
    programDetails(card) {
      // this.$router.push({
      //   path: `/programDetails?key=${card['tags']}`,
      //   params: {detailsData: card}
      // });
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`benefitMileage/${UPDATE_STATE_ACTION}`, TITLE);
    await context.store.dispatch(`benefitMileage/${UPDATE_STATE_ACTION}`, PROGRAMS);
    return header;
  },
  head () {return this.headData}
}
</script>
