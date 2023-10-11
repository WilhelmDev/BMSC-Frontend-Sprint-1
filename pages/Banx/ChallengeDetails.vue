<template>
  <div :class="`${ns}`">
    <v-row class="d-flex justify-center mt-8">
      <Box
        :class="`${ns}__box`"
        :label="introductionData.gradientText"
        :className="introductionData.gradient"
      />
    </v-row>
    <v-row class="d-flex justify-center py-4 py-sm-12">
      <BracketBanx
        :class="`${ns}__introductionData-subTitle`"
        v-if="introductionData.subTitle"
        :text1="introductionData.subTitle"
        :bracket-color="'#D21E84'"
      />
    </v-row>
    <BoxAndImage
      :class="`${ns}__box-and-image`"
      :image="descriptionData.mainImageUrl"
      :alt="descriptionData.imgAlt1"
      :class-name="descriptionData.gradient"
      :label="descriptionData.gradientText"
      :direction="'center-left'"
    />
    <div
      :class="`${ns}__description-title strong-huge pt-12 px-4`"
      v-html="descriptionData.title"
    />
    <div
      :class="`${ns}__description-subTitle small-text px4`"
      v-html="descriptionData.subTitle"
    />
    <v-row class="d-flex justify-center py-10">
    <Box
      :class="`${ns}__date-box`"
      :label="datesDataFormatted(datesData.title,datesData.subTitle)"
      :className="datesData.gradient"
    />
    </v-row>
    <ChallengeSteps
      :class="`${ns}__challenge-steps`"
      v-for="(steps, i) in detailsData" :key="i"
      :text1="steps.title"
      :bracketColor="'#A7D342'"
      :content="steps.subTitle"
    />
    <v-row class="d-flex justify-center">
      <BracketBanx
        :text1="disclaimerData.title"
        :bracket-color="'#A7D342'"
      />
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col v-for="(award, i) in awardsData" :key="i" :class="`${ns}__award col-auto py-0`">
        <Award
          :medal="award.title"
          :place="award.subTitle"
          :note="award.description"
          :labelBox="award.gradientText"
          :className="award.gradient"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center my-8">
      <v-col
        class="text-center mb-16 px-6"
        style="width: 100%; max-width: 600px"
        v-html="disclaimerData.subTitle"/>
    </v-row>
    <BlogCardBanx
      :labelBox="newsTitle.gradientText"
      :className="newsTitle.gradient"
      :text="newsTitle.description"
      :cardItems="newsData.items"
    />
    <v-container class="pa-0">
      <v-row>
        <v-col>
          <v-divider class="my-16"></v-divider>
        </v-col>
      </v-row>
    </v-container>
    <Question :questions="questions"/>
  </div>
</template>

<script>
  import BlogCardBanx from "~/components/BlogCardBanx";
  import Question from "~/components/Question";
  import Box from "~/components/Box";
  import BracketBanx from "~/components/BracketBanx";
  import BoxAndImage from "~/components/BoxAndImage";
  import ChallengeSteps from "~/components/ChallengeSteps";
  import Award from "~/components/Award";
  import {UPDATE_STATE_ACTION, UPDATE_STATE_NEWS_ACTION} from "@/constants_actions";
  import {
    AWARDS,
    DATES, DESCRIPTION, DETAILS, DISCLAIMER, INTRODUCTION
  } from "@/cardListKeys/challengeDetails";
  import {HOME_NEWS_TITLE, PROMO_FREQUENT_QUESTION} from "~/cardListKeys/banx";
  import {NEWS_LIST} from "@/cardListKeys/companies";
  import {generateEmptyModels} from "@/utils/cardsUtil";
  import {getHeader} from "~/utils/seo";

  export default {
    name: "ChallengeDetails",
    components: {Award, ChallengeSteps, BoxAndImage, BracketBanx, Box, Question, BlogCardBanx},
    computed: {
      newsTitle: function () {
        let sectionList = this.$store.getters["banx/getList"](HOME_NEWS_TITLE);
        if(sectionList.length === 0) sectionList = generateEmptyModels(1);
        let res = {
          items: sectionList
        }
        //console.log(HOME_NEWS_TITLE, res.items);
        return res.items[0];
      },
      newsData: function () {
        let res = {
          items: this.$store.getters["banx/getList"](NEWS_LIST)
        }
        //console.log(NEWS_LIST, res);
        return res;
      },
      questions: function () {
        let res = {
          items: this.$store.getters["banx/getList"](PROMO_FREQUENT_QUESTION)
        }
        //console.log(PROMO_FREQUENT_QUESTION, res.items);
        return res.items;
      },
      introductionData: function () {
        let res = {
          items: this.$store.getters["challengeDetails/getList"](INTRODUCTION)
        }
        //console.log(INTRODUCTION, res);
        return res.items[0];
      },
      datesData: function () {
        let res = {
          items: this.$store.getters["challengeDetails/getList"](DATES)
        }
        //console.log(DATES, res);
        return res.items[0];
      },
      descriptionData: function () {
        let res = {
          items: this.$store.getters["challengeDetails/getList"](DESCRIPTION)
        }
        //console.log(DESCRIPTION, res);
        return res.items[0];
      },
      detailsData: function () {
        let res = {
          items: this.$store.getters["challengeDetails/getList"](DETAILS)
        }
        //console.log(DETAILS, res);
        return res.items;
      },
      awardsData: function () {
        let res = {
          items: this.$store.getters["challengeDetails/getList"](AWARDS)
        }
        //console.log(AWARDS, res);
        return res.items;
      },
      disclaimerData: function () {
        let res = {
          items: this.$store.getters["challengeDetails/getList"](DISCLAIMER)
        }
        //console.log(DISCLAIMER, res);
        return res.items[0];
      }
    },
    created() {
      this.challengeKey = this.$route.query.key;
    },
    async mounted() {
      await this.loadChallengeDetailsData();
    },
    methods: {
      datesDataFormatted(startDate,endDate){
        return '<div style="display: inline-block; margin-right: 15px">'+startDate+'</div><div style="display: inline-block; margin-left: 15px">'+endDate+'</div>';
      },
      getListSectionKey(section) {
        return this.challengeKey + '-' + section;
      },
      async loadChallengeDetailsData() {
        await this.$store.dispatch(`challengeDetails/${UPDATE_STATE_ACTION}`,[this.challengeKey,INTRODUCTION, this]);
        await this.$store.dispatch(`challengeDetails/${UPDATE_STATE_ACTION}`,[this.challengeKey,DATES, this]);
        await this.$store.dispatch(`challengeDetails/${UPDATE_STATE_ACTION}`,[this.challengeKey,DESCRIPTION, this]);
        await this.$store.dispatch(`challengeDetails/${UPDATE_STATE_ACTION}`,[this.challengeKey,DETAILS, this]);
        await this.$store.dispatch(`challengeDetails/${UPDATE_STATE_ACTION}`,[this.challengeKey,AWARDS, this]);
        await this.$store.dispatch(`challengeDetails/${UPDATE_STATE_ACTION}`,[this.challengeKey,DISCLAIMER, this]);
      }
    },
      data() {
      return {
        ns: "challenge-details",
        challengeKey: "", //DO NOT ERASE THIS KEY
      }
    },
    async asyncData(context) {
    const header = await getHeader(context);
      await context.store.dispatch(`banx/${UPDATE_STATE_NEWS_ACTION}`);
    return header;
  },
    head () {return this.headData}
  };
</script>
