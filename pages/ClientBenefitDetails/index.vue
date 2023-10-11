<template>
  <div>
    <!-- <DetailsCard v-if="titleSwitch" :detailsData="titleData.items[0]"/> DESCOMENTAR AL FINALIZAR EL PROCESO FASSIL -->
    <FassilMigration v-if="titleSwitch" :detailsData="titleData.items[0]" />
    <DescriptionCardCarousel v-if="carouselSwitch" :carouselData="carouselData.items" class="pb-16" />
    <ListedProducts :productList="listedProductsData.items" class="d-sm-none" :showTitle="false" />
    <v-container class="mx-auto">
      <div class="w-100 text-center">
        <v-btn depressed @click="gotoRegister()" color="bm-medium"
        style="margin-bottom: 3%;padding-left: 4%; padding-right: 4%; padding-top: 2%; padding-bottom: 2%;">
          Registra tu grupo familiar aquí<v-icon right class="icon-btn-arrow my-auto"> </v-icon>
        </v-btn>
      </div>
      <div class="w-100 text-center">
        <v-btn depressed @click="goToAffiliation()" color="bm-medium"
        style="margin-bottom: 3%;padding-left: 4%; padding-right: 4%; padding-top: 2%; padding-bottom: 2%;">
          Afíliate a un grupo familiar aquí<v-icon right class="icon-btn-arrow my-auto"> </v-icon>
        </v-btn>
      </div>
      <div class="w-100 text-center">
        <v-btn depressed @click="goToConsultation()" color="bm-medium"
        style="margin-bottom: 3%;padding-left: 4%; padding-right: 4%; padding-top: 2%; padding-bottom: 2%;">
          Consulta los integrantes de tu grupo familiar aquí<v-icon right class="icon-btn-arrow my-auto"> </v-icon>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>
<script>
import MoreInfo from "@/components/MoreInfo.vue";
import ListedProducts from "@/components/ListedProducts.vue";
import Card from "@/components/Card.vue";
import Programs from "@/components/Programs.vue";
import Assets from "@/components/Asset.vue";
import DescriptionCardCarousel from "@/components/DescriptionCardCarousel.vue";
import _ from "lodash"

import { UPDATE_STATE_ACTION } from "~/constants_actions";
import BankAd from "~/components/BankAd";
import { generateEmptyModels, generateReportFileUrlFromId, processInformationPanelData } from "~/utils/cardsUtil";
import { checkValidUrl } from "@/utils/urlUtil";
import { getHeader } from "~/utils/seo";
import { CAR0USEL, CARDS, INCOME_STATEMENTS, LISTED_PRODUCTS, PROGRAMS, TITLE, INFORMATION_PANEL } from "~/cardListKeys/clientBenefitDetails";
import FassilMigration from "~/components/FassilMigration.vue";

export default {
  name: "benefitDetails",
  components: {
    BankAd,
    DescriptionCardCarousel,
    MoreInfo,
    Card,
    Programs,
    ListedProducts,
    Assets,
    FassilMigration
  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["clientBenefitDetails/getList"](TITLE)
      }

      if (res.items.length > 0) {
        res.items[0].onCardClick = () => this.$router.push("/")
      }
      //console.log(TITLE, res);
      return res;
    },
    carouselData: function () {
      let res = {
        items: this.$store.getters["clientBenefitDetails/getList"](CAR0USEL)
      }
      //console.log(CAR0USEL, res);
      return res;
    },
    listedProductsData: function () {
      let res = {
        items: this.$store.getters["clientBenefitDetails/getList"](LISTED_PRODUCTS)
      }
      //console.log(LISTED_PRODUCTS, res);
      return res;
    },
    cardsData: function () {
      let sectionList = this.$store.getters["clientBenefitDetails/getList"](CARDS);
      let items = _.map(sectionList, (item) => {
        return {
          title: _.get(item, 'title'),
          subTitle: _.get(item, 'subTitle'),
          description: _.get(item, 'description'),
          mainImageUrl: _.get(item, 'mainImageUrl'),
          buttonName: _.get(item, 'buttonName'),
          buttonType: _.get(item, 'buttonType'),
          buttonHref: _.get(item, 'buttonHref')
        }
      });
      let res = {
        items: items
      }
      //console.log(CARDS, res);
      return res;
    },
    programsData: function () {
      let sectionList = this.$store.getters["clientBenefitDetails/getList"](PROGRAMS);
      let items = _.map(sectionList, (item) => {
        return {
          title: _.get(item, 'title'),
          subTitle: _.get(item, 'subTitle'),
          description: _.get(item, 'description'),
          mainImageUrl: _.get(item, 'mainImageUrl'),
          secondImageUrl: _.get(item, 'secondImageUrl'),
          buttonHref: _.get(item, 'buttonHref')
        }
      });
      let res = {
        items: items
      }
      //console.log(PROGRAMS, res);
      return res;
    },
    balanceData: function () {
      let sectionList = this.parseMemoriesData(this.$store.getters["clientBenefitDetails/getList"](INCOME_STATEMENTS));
      if (sectionList.length === 0) return { items: [] };
      sectionList[0].items.forEach(item => {
        item.onClick = this.downloadDocument;
        item.fileUrl = generateReportFileUrlFromId(item['description'])
      });
      let res = { items: sectionList }
      //console.log(INCOME_STATEMENTS, res);
      return res;
    },
    informationPanelData: function () {
      let sectionList = this.$store.getters["clientBenefitDetails/getList"](INFORMATION_PANEL);
      let res = {
        items: sectionList
      }
      // needed fallback
      if (res.items.length === 0) res = { items: [] }
      return processInformationPanelData(res);
    },
    carouselSwitch: function () {
      let sectionList = this.$store.getters["clientBenefitDetails/getList"](CAR0USEL);
      return (sectionList.length !== 0);
    },
    informationPanelSwitch: function () {
      let sectionList = this.$store.getters["clientBenefitDetails/getList"](INFORMATION_PANEL);
      return (sectionList.length !== 0);
    },
    titleSwitch: function () {
      let sectionList = this.$store.getters["clientBenefitDetails/getList"](TITLE);
      return sectionList.length !== 0;
    },
    balanceSwitch: function () {
      let sectionList = this.parseMemoriesData(this.$store.getters["clientBenefitDetails/getList"](INCOME_STATEMENTS));
      return sectionList.length !== 0;
    },
  },
  data() {
    return {
      key: '',
      moreInfoConfig: {
        moreInfoTitle: "¿Cómo podemos ayudarte?",
        cardIcon1: "icon-bank",
        cardLabel1: "Agencias y cajeros",
        cardIcon2: "icon-help",
        cardLabel2: "Preguntas frecuentes",
        cardIcon3: "icon-reclamo",
        cardLabel3: "Punto de reclamo"
      },
    };
  },
  created() {
    this.key = this.$route.query.key;
    //console.log('Loading account: ',this.accountKey);
  },
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      //console.log('an error occurred when trying to fetch cards information');
    }

  },
  methods: {
    goToAffiliation() {
        this.$router.push("/familyplancampaign/affiliation")
      },
      goToConsultation() {
        this.$router.push("/familyplancampaign/consultation")
      },
      gotoRegister() {
        this.$router.push("/familyplancampaign/register")
      },
    async loadData() {
      await this.$store.dispatch(`clientBenefitDetails/${UPDATE_STATE_ACTION}`, [this.key, TITLE, this]);
      await this.$store.dispatch(`clientBenefitDetails/${UPDATE_STATE_ACTION}`, [this.key, CAR0USEL, this]);
      await this.$store.dispatch(`clientBenefitDetails/${UPDATE_STATE_ACTION}`, [this.key, LISTED_PRODUCTS, this]);
      await this.$store.dispatch(`clientBenefitDetails/${UPDATE_STATE_ACTION}`, [this.key, CARDS, this]);
      await this.$store.dispatch(`clientBenefitDetails/${UPDATE_STATE_ACTION}`, [this.key, PROGRAMS, this]);
      await this.$store.dispatch(`clientBenefitDetails/${UPDATE_STATE_ACTION}`, [this.key, INCOME_STATEMENTS, this]);
      await this.$store.dispatch(`clientBenefitDetails/${UPDATE_STATE_ACTION}`, [this.key, INFORMATION_PANEL, this]);
    },
    parseMemoriesData(dataArray) {
      return this.parseArrayAsFirstChildItems(dataArray);
    },
    parseArrayAsFirstChildItems(dataArray) {
      if (dataArray && dataArray.length > 0) {
        return [{
          ...dataArray[0],
          items: dataArray.slice(1)
        }]
      }
      return dataArray;
    },
  },
  async asyncData(context) {
    const header = await getHeader(context);

    return header;
  },
  head() { return this.headData }
};
</script>
