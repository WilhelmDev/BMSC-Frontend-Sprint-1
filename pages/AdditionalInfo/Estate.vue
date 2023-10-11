<template>
  <div style="background: linear-gradient(180deg, #FFFFFF 0%, #EFF5F0 36.98%, #EFF5F0 66.15%);">
    <v-row justify="center" align="center">
      <v-col cols="10" sm="11">
        <h2 class="black-text pb-4" v-html="titleData.items[0].title"/>
        <span v-html="titleData.items[0].description"/>
      </v-col>
    </v-row>

    <EstateDescriptionCardCarousel
      :carouselData="carouselItemsData"
      :cardType="'estate'"
      class="pb-12"
    />
    <EstateItemsPanel/>
  </div>
</template>
<script>
import DescriptionCardCarousel from "@/components/DescriptionCardCarousel.vue";
import EstateDetailsCard from "@/components/EstateDetailsCard.vue";
import EstateItemsPanel from "@/components/EstateItemsPanel.vue";
import {
  UPDATE_CAROUSEL_REAL_ESTATE_DATA,
  UPDATE_RELATED_ESTATE_ITEM_DETAILS,
  UPDATE_STATE_ACTION
} from "~/constants_actions";
import {STATE_CAROUSEL, STATE_NOTIFICATION, STATE_RELATED_ITEMS, STATE_TITLE} from "~/cardListKeys/additionalInfo";
import {generateEmptyModels} from "~/utils/cardsUtil";
import {BMSC_ESTATE_ROUTE} from "~/constants_routes";
import {getHeader} from "~/utils/seo";
import {getEstateCarouselImage} from "~/utils/imageUtil";
export default {
  components: {
    DescriptionCardCarousel,
    EstateDetailsCard,
    EstateItemsPanel
  },
  data() {
    return {
      timer: null,
      carouselData: [
        {
          title: "Departamento",
          price: "$60.000",
          groundSurface: "690.00",
          buildedSurface: "594.00",
          location: "La Paz, La Merced",
          image: "edificio.png",
          id: "1"
        },
        {
          title: "Departamento",
          price: "$80.000",
          groundSurface: "690.00",
          buildedSurface: "594.00",
          location: "La Paz, La Merced",
          image: "edificio.png",
          id: "2"
        }
      ]
    }
  },
  async mounted() {
    await this.loadCarouselEstateData();
    this.timer = setInterval(() => {
      this.loadCarouselEstateData()
    }, 15000)
  },
  computed: {
    titleData: function () {
      let sectionList = this.$store.getters["additionalInfo/getList"](STATE_TITLE);
      if (sectionList.length === 0) sectionList = generateEmptyModels(1);
      let res = {
        items: sectionList
      }
      //console.log(STATE_TITLE, res);
      return res;
    },
    carouselItemsData: function () {
      let sectionData = this.$store.getters["additionalInfo/getList"](STATE_CAROUSEL);
      if(!sectionData['meta'] || sectionData['meta']['itemCount'] === 0) {
        return [];
      }
      let sectionList = sectionData['items'];
      let processedSectionList = sectionList.map(item => {
        let mainImageUrl = "";
        if(item['numberImages'] === 0) {
          mainImageUrl = "";
        } else {
          mainImageUrl = this.generateImageUrlFromIdAndIdx(item['id'],0);
        }
        return {
          ...item,
          mainImageUrl: mainImageUrl
        }
      });
      //console.log(STATE_CAROUSEL, processedSectionList);
      return processedSectionList;
    }
  },
  methods: {
    async loadCarouselEstateData() {
      await this.$store.dispatch
      (`additionalInfo/${UPDATE_CAROUSEL_REAL_ESTATE_DATA}`,[
        1,
        4,
        "",
        [this.getRandomArbitrary(0,8)],
        "",
        "Todo",
        "",
        "",
        "",
        this
      ]);
    },
    generateImageUrlFromIdAndIdx(id, idx) {
      return getEstateCarouselImage(id, idx);
    },
    getRandomArbitrary(min, max) {
      let departments = [
          'La Paz',
          'Beni',
          'Chuquisaca',
          'Cochabamba',
          'Oruro',
          'Pando',
          'Potosí',
          'Santa Cruz',
          'Tarija'
      ];
      let option = departments[parseInt(Math.random() * (max - min) + min)];
      return option;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`additionalInfo/${UPDATE_STATE_ACTION}`,STATE_TITLE);
    return header;
  },
  head () {return this.headData}
}
</script>
