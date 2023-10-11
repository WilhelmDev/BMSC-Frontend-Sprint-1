<template>
  <div :class="`${ns}`">
    <div :class="`${ns}__card-info py-10`">
      <v-row :class="`${ns} mx-0 mx-sm-16`">
        <v-col class="text-sm-center">
          <v-img :class="`${ns}__img mb-5`" :src="titleLoans.mainImageUrl" :alt="titleLoans.imgAlt1"></v-img>
          <BracketBanx
            :text1="titleLoans.title"
            :text2="titleLoans.subTitle"
            :bracket-color="'#A7D342'"
            :newLine="true"
          />
          <div class="my-6">
            {{titleLoans.description}}
          </div>
        </v-col>
      </v-row>
      <v-row :class="`${ns}__white-background mx-16 d-none d-sm-flex`">
        <v-col v-for="(card, i) in cardItems.items" :key="i" cols="6" lg="4" xl="3">
          <Card
            :cardTitle="card.title"
            :cardContent="card.subTitle"
            :message="card.description"
            :isBanx="true"
            :cardImage="card.mainImageUrl"
            :alt="card.imgAlt1"
            :className="card.gradient"
            :label="card.gradientText"
            :onButtonClick="loanDetails"
            :cardId="card.id"
            :buttonLabel="card.buttonName"
            :buttonColor="card.buttonType"
            :tags="card.tags"
          />
        </v-col>
      </v-row>
      <CardSliderMobile
        :cardsData="cardItems.items"
        :onButtonClick="loanDetails"
        :isBanx="true"
        class="d-sm-none my-8"
      />
      <v-row :class="`${ns}__white-background mx-sm-16 mt-8 bm-compare__banx`" v-if="compareLoansSwitch">
        <v-col class="text-center">
          <BracketBanx
            :text1="compareLoans.title"
            :text2="compareLoans.subTitle"
            :bracket-color="'#56C1FF'"
            :newLine="true"
          />
          <div class="my-5 px-5">
            {{ compareLoans.description }}
          </div>
          <Button
            :text="compareLoans.buttonName"
            :color="compareLoans.buttonType"
            :onClick="loanComparison"
          />
        </v-col>
      </v-row>
    </div>
    <Programs
      v-for="(program, i) in programs.items"
      :key="i"
      :programContent="program.description"
      :programLink="program.buttonName"
      :isImageInLeft="i%2===0"
      :isBanx="true"

      :text1="program.title"
      :text2="program.subTitle"
      :bracketColor="'#56C1FF'"
      :newLine="true"

      :className="program.gradient"
      :xBox="'blue'"
      :label="program.gradientText"
      :image="program.mainImageUrl"
      :alt="program.imgAlt1"
      :direction="directionBoxOnPrograms(i)"
      :onClickLink="program.buttonHref"
    />
    <RelatedPanel :items="relatedItems.items" :isBanx="true" style="display: none"/>
    <MoreInfo
      v-bind="moreInfoConfig"
    />
  </div>
</template>

<script>
import Box from "@/components/Box";
import RelatedPanel from "@/components/RelatedPanel.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import BlogCard from "@/components/BlogCard.vue";
import BoxAndText from "@/components/BoxAndText";
import BracketBanx from "@/components/BracketBanx";
import BoxAndImage from "@/components/BoxAndImage";
import Programs from "~/components/Programs";
import AdBanx from "~/components/adBanx";
import ListedProducts from "~/components/ListedProducts";
import DescriptionCardCarousel from "~/components/DescriptionCardCarousel";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardSliderMobile from "@/components/CardSliderMobile.vue";

import {UPDATE_STATE_ACTION} from "@/constants_actions";
import {
  LOANS_CARDS, LOANS_COMPARE, LOANS_MORE_INFO, LOANS_PROGRAMS, LOANS_RELATED_PANEL, LOANS_TITLE
} from "@/cardListKeys/banx";
import {directionBoxOnPrograms, generateEmptyModels} from "@/utils/cardsUtil";
import {getHeader} from "~/utils/seo";

export default {
  name: "Loans",
  components: {
    Card,
    Button,
    DescriptionCardCarousel,
    ListedProducts,
    AdBanx,
    Programs,
    BoxAndImage,
    BracketBanx,
    BoxAndText,
    Box,
    RelatedPanel,
    MoreInfo,
    BlogCard,
    CardSliderMobile
  },
  async mounted() {

  },
  computed: {
   titleLoans: function () {
      let res = {
        items: this.$store.getters["banx/getList"](LOANS_TITLE)
      }
      //console.log(LOANS_TITLE, res.items);
      return res.items[0];
    },
    cardItems:function () {
      let res = {
        items: this.$store.getters["banx/getList"](LOANS_CARDS)
      }
      //console.log(LOANS_CARDS, res.items);
      return res;
    },
    compareLoans:function () {
      let res = {
        items: this.$store.getters["banx/getList"](LOANS_COMPARE)
      }
      //console.log(LOANS_COMPARE, res.items);
      return res.items[0] ? res.items[0] : {title:'', description: ''};
    },
    programs:function () {
      let res = {
        items: this.$store.getters["banx/getList"](LOANS_PROGRAMS)
      }
      //console.log(LOANS_PROGRAMS, res.items);
      return res;
    },
    compareLoansSwitch() {
      let sectionList = this.$store.getters["banx/getList"](LOANS_COMPARE);
      return sectionList.length !== 0;
    }
  },
  data() {
    return {
      //todo: change the correct namespace, e.g. loans-banx
      directionBoxOnPrograms: directionBoxOnPrograms,
      ns: "accounts-banx",
      relatedItems: {
        items: [
          {
            title: "Cuentas BANX para jóvenes",
            subTitle: "Ver opciones",
            route: "/banx"
          },
          {
            title: "Cuentas para negocios PYME",
            subTitle: "Ver opciones",
            route: "/pyme"
          },
          {
            title: "Cuentas corporativas para tu empresa",
            subTitle: "Ver opciones",
            route: "/companies"
          },
          {
            title: "Prestamos para tu casa o vehículo",
            subTitle: "Ver préstamos",
            route: "/client/Loans"
          }
        ]
      },
      moreInfoConfig: {
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-chat",
        cardLabel2: "Central de consultas",
        cardIcon3: "icon-play",
        cardLabel3: "Tutoriales: Banca por internet"
      }
    };
  },
  methods: {
    loanComparison() {
      this.$router.push({
        path: "/LoanComparisonBanx"
      });
    },
    loanDetails(card) {
      this.$router.push({
        path: `/loanDetailsBanx?key=${card['tags']}`
      });
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,LOANS_TITLE);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,LOANS_CARDS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,LOANS_COMPARE);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,LOANS_PROGRAMS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,LOANS_RELATED_PANEL);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`,LOANS_MORE_INFO);
    return header;
  },
  head () {return this.headData}
};
</script>
