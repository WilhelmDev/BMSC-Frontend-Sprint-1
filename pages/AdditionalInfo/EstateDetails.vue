<template>
  <div class="light-green-gradient-bg">
    <div class="mx-2 mx-lg-16 px-lg-16">
      <div class="strong-small-text green-text pb-6">
        <span @click="returnToEstateList()" class="cursor-pointer">
          Volver al listado
        </span>
      </div>
      <div class="mb-16">
        
        <EstateDetailsPanel v-bind:contactData="contactData" v-bind:itemDetailsData="itemDetailsData"/>
      </div>
      <div v-if="relatedItemsData.length">
        <h4 class="pb-4 mt-8"> Inmuebles similares </h4>
        <v-row class="pb-16 d-none d-sm-flex">
          <v-col
            cols="4"
            md="3"
            v-for="(estate, index) in relatedItemsData"
            :key="index"
            class="px-2"
          >
            <EstateCard :data="estate" />
          </v-col>
        </v-row>
        <CardSliderMobile
          :cardsData="relatedItemsData"
          cardType="estate"
          class="d-sm-none my-8"
        />
      </div>
    </div>
  </div>
</template>
<script>
import EstateCard from "@/components/EstateCard.vue";
import EstateDetailsPanel from "@/components/EstateDetailsPanel.vue";
import CardSliderMobile from "@/components/CardSliderMobile.vue";

import _ from "lodash";
import {
  UPDATE_ESTATE_ITEM_DETAILS, UPDATE_ITEM_DETAILS_CONTACT,
  UPDATE_REAL_ESTATE_DATA,
  UPDATE_RELATED_ESTATE_ITEM_DETAILS,
  UPDATE_STATE_ACTION
} from "~/constants_actions";
import {
  STATE_ITEM_DETAILS, STATE_ITEM_DETAILS_CONTACT,
  STATE_ITEMS,
  STATE_RELATED_ITEMS,
  TARIFFS_DOCUMENTS,
  TARIFFS_TITLE
} from "~/cardListKeys/additionalInfo";
import {BMSC_ESTATE_ROUTE, CARD_IMAGE_PREFIX_ROUTE, CARD_IMAGE_SECONDARY_SUFFIX_ROUTE} from "~/constants_routes";
import {getHeader} from "~/utils/seo";
import {getEstateCarouselImage} from "~/utils/imageUtil";

export default {
  components: {
    EstateCard,
    EstateDetailsPanel,
    CardSliderMobile
  },
  data() {
    return {};
  },
  async mounted() {
    await this.loadEstateItemDetails();
    await this.loadRelatedEstateData();
    await this.loadContactDetails();
  },
  computed: {
    estateId: function () {
      return this.$route.query.estateId;
    },
    itemDetailsData: function () {
      let res = this.$store.getters["additionalInfo/getList"](STATE_ITEM_DETAILS);
      let imagesArray = [];
      if(res.length === 0) {
        return {
          imagesArray: []
        }
      };
      if(res['numberImages'] === 0) {
        imagesArray.push("");
      }
      for(let i = 0; i < res['numberImages']; i++) {
        imagesArray.push(this.generateImageUrlFromIdAndIdx(res['id'],i));
      }
      res['imagesArray'] = imagesArray;
      // console.log(STATE_ITEM_DETAILS, res);
      return res;
    },
    relatedItemsData: function () {
      let sectionData = this.$store.getters["additionalInfo/getList"](STATE_RELATED_ITEMS);
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
      processedSectionList = processedSectionList.filter(item => item.id !==  this.itemDetailsData['id']);
      // console.log(STATE_RELATED_ITEMS, processedSectionList);
      return processedSectionList;
    },
    itemDetailsScope() {
      let categorias = ["Remate", "Bienes adjudicados", "Bienes de uso"]
      let res = this.$store.getters["additionalInfo/getList"](STATE_ITEM_DETAILS);
      if(!categorias.includes(res.categoria)) {
        return;
      }
      return res['categoria'];
    },
    contactData() {
      let sectionList = this.$store.getters["additionalInfo/getList"](STATE_ITEM_DETAILS_CONTACT);
      if(sectionList.length === 0) {
        return {
          scope: "",
          phoneContact: "",
          emailContact: "",
          description: ""
        }
      }
      // console.log(STATE_ITEM_DETAILS_CONTACT,sectionList);
      return sectionList;
    }
  },
  watch: {
    async estateId() {
      await this.loadEstateItemDetails();
      window.scroll({
        top: 0
      });
    }
  },
  methods: {
    async loadEstateItemDetails() {
      await this.$store.dispatch(`additionalInfo/${UPDATE_ESTATE_ITEM_DETAILS}`,[this.estateId, this]);
    },
    async loadContactDetails() {
      await this.$store.dispatch(`additionalInfo/${UPDATE_ITEM_DETAILS_CONTACT}`,[this.itemDetailsScope, this]);
      // await this.$store.dispatch(`additionalInfo/${UPDATE_ITEM_DETAILS_CONTACT}`,["nuevo", this]);
    },
    async loadRelatedEstateData() {
      await this.$store.dispatch
      (`additionalInfo/${UPDATE_RELATED_ESTATE_ITEM_DETAILS}`,[
        1,
        4,
        "",
        "",
        "",
        "Todo",
        "",
        "",
        "",
        this
      ]);
    },
    returnToEstateList() {
      this.$router.push({
        path: "Estate"
      });
    },
    generateImageUrlFromIdAndIdx(id, idx) {
      return getEstateCarouselImage(id, idx);
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
   
    return header;
  },
  head () {return this.headData}
};
</script>
