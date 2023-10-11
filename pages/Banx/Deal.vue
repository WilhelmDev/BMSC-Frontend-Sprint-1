<template>
  <div :class="`${ns} mt-8`">
    <BracketAndText
      :text1="introduction.title"
      :text2="introduction.subTitle"
      :bracket-color="'#A7D342'"
      :text="introduction.description"
    />
    <BoxAndImage
      :class="`${ns}__image mb-n16`"
      :image="introduction.mainImageUrl"
      :alt="introduction.imgAlt1"
      :label="introduction.gradientText"
      :className="introduction.gradient"
      :direction="'center-left'"
    />
    <div :class="`${ns}__challenge pt-16`">
      <v-row>
        <v-col class="d-flex justify-center">
          <Box
            class="mx-auto mt-13"
            :label="subTitle.gradientText"
            :className="subTitle.gradient"
          />
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col>
          <span class="big-text">
          {{subTitle.description }}
          </span>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center mb-sm-16 px-3">
        <ChallengeSteps
          v-for="(steps, i) in challengeSteps" :key="i"
          :text2="steps.title"
          :bracketColor="'#8FCF00'"
          :content="steps.subTitle"
        />
      </v-row>
      <v-row class="text-center" v-if="challenges.length > 0">
        <v-col>
          <BracketAndText
            :text1="challengeTitle.title"
            :text2="challengeTitle.subTitle"
            :bracket-color="'#A7D342'"
            :text="challengeTitle.description"
          />
        </v-col>
      </v-row>
        <Challenge
          v-for="(challenge, i) in challenges" :key="i"
          :image="challenge.mainImageUrl"
          :alt="challenge.imgAlt1"
          :textChallenge="challenge.description"
          :labelBox="challenge.gradientText"
          :className="challenge.gradient"
          :onButtonClick="goToChallenge"
          :id="challenge.id+''"
          :tags="challenge.tags"
        />
      <v-row class="text-center">
        <v-col class="pt-16 pb-5">
          <h4>Reglamentos</h4>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center pb-16 mx-10 mx-sm-3">
        <Regulation
          v-for="(regulation, i) in regulations" :key="i"
          :regulationTitle="regulation.title"
          :link="regulation.description"
        />
      </v-row>
    </div>
    <Chart/>
    <BlogCardBanx
      :labelBox="newsTitle.gradientText"
      :className="newsTitle.gradient"
      :text="newsTitle.description"
      :cardItems="newsData.items"
      v-if="newsTitleSwitch"
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

  import Box from "~/components/Box";
  import BracketAndText from "~/components/BracketAndText";
  import BlogCardBanx from "~/components/BlogCardBanx";
  import Question from "~/components/Question";
  import Chart from "~/components/Chart";
  import BracketBanx from "~/components/BracketBanx";
  import Challenge from "~/components/Challenge";
  import Regulation from "~/components/Regulation";
  import BoxAndImage from "~/components/BoxAndImage";
  import ChallengeSteps from "~/components/ChallengeSteps";
  import {UPDATE_STATE_ACTION, UPDATE_STATE_ACTION_RANKING_PROMO, UPDATE_STATE_NEWS_ACTION} from "@/constants_actions";
  import {
    HOME_NEWS_TITLE,
    PROMO_CHALLENGE_LIST,
    PROMO_CHALLENGE_TITLE, PROMO_FREQUENT_QUESTION, PROMO_NEWS, PROMO_RULES,
    PROMO_STEPS,
    PROMO_SUB_TITLE,
    PROMO_TITLE
  } from "@/cardListKeys/banx";
  import {generateEmptyModels, generateReportFileUrlFromId} from "~/utils/cardsUtil";
  import {NEWS_LIST} from "@/cardListKeys/companies";
  import {getHeader} from "~/utils/seo";

  export default {
    name: "Deal",
    components: {
      ChallengeSteps,
      BoxAndImage,
      Regulation,
      Challenge,
      BracketBanx,
      Chart,
      Question,
      BlogCardBanx,
      BracketAndText,
      Box
    },
    methods: {
      goToChallenge(card){
        this.$router.push({
          path: `ChallengeDetails?key=${card['tags']}`
        });
      }
    },
    async mounted() {

    },
    computed:{
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
      rankingPromo(){
        return this.$store.getters.getPromoRaking;
      },
      introduction: function () {
        let sectionList = this.$store.getters["banx/getList"](PROMO_TITLE);
        if(sectionList.length === 0) sectionList = generateEmptyModels(1);
        let res = {
          items: sectionList
        }
        //console.log(PROMO_TITLE, res.items);
        return res.items[0];
      },
      subTitle: function () {
        let sectionList = this.$store.getters["banx/getList"](PROMO_SUB_TITLE);
        if(sectionList.length === 0) sectionList = generateEmptyModels(1);
        let res = {
          items: sectionList
        }
        //console.log(PROMO_SUB_TITLE, res.items);
        return res.items[0];
      },
      challengeSteps: function () {
        let res = {
          items: this.$store.getters["banx/getList"](PROMO_STEPS)
        }
        //console.log(PROMO_STEPS, res.items);
        return res.items;
      },
      challengeTitle: function (){
        let sectionList = this.$store.getters["banx/getList"](PROMO_CHALLENGE_TITLE);
        if(sectionList.length === 0) sectionList = generateEmptyModels(1);
        let res = {
          items: sectionList
        }
        //console.log(PROMO_CHALLENGE_TITLE, res.items);
        return res.items[0];
      },
      challenges: function (){
        let res = {
          items: this.$store.getters["banx/getList"](PROMO_CHALLENGE_LIST)
        }
        //console.log(PROMO_CHALLENGE_LIST, res.items);
        return res.items;
      },
      regulations:function (){
        let res = {
          items: this.$store.getters["banx/getList"](PROMO_RULES).map(card => {
            return {
              ...card,
              description: generateReportFileUrlFromId(card['description'])
            }
          })
        }
        //console.log(PROMO_RULES, res.items);
        return res.items;
      },
      questions: function (){
        let res = {
          items: this.$store.getters["banx/getList"](PROMO_FREQUENT_QUESTION)
        }
        //console.log(PROMO_FREQUENT_QUESTION, res.items);
        return res.items;
      },
      newsTitleSwitch: function () {
        let sectionList = this.$store.getters["banx/getList"](HOME_NEWS_TITLE);
        return sectionList.length !== 0;
      }
    },
      data() {
      return {
        ns: "deal"
      };
    },
    async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, PROMO_TITLE);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, PROMO_SUB_TITLE);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, PROMO_STEPS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, PROMO_CHALLENGE_TITLE);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, PROMO_CHALLENGE_LIST);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, PROMO_RULES);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, PROMO_NEWS);
    await context.store.dispatch(`banx/${UPDATE_STATE_ACTION}`, PROMO_FREQUENT_QUESTION);
    await context.store.dispatch(`banx/${UPDATE_STATE_NEWS_ACTION}`);
    return header;
  },
    head () {return this.headData}
  };
</script>

<style scoped></style>
