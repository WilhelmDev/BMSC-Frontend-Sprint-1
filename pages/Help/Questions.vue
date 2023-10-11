<template>
  <div class="">
    <div class="px-16 light-green-bg py-16">
      <div class="px-lg-16">
        <h2 class="black-text"> Estamos aqu&iacute; para resolver tus dudas </h2>
        <div class="search-input pt-8 pb-2">
          <v-icon class="icon-search"></v-icon>
          <input
            type="text"
            v-model="searchText"
            class="w-50"
          />
          <v-btn color="bm-light"
            class="search-btn ml-4"
            height="42"
            @click="onSearchClick"
            >
              Buscar
          </v-btn>
        </div>
        <div class="small-text">
          B&uacute;squedas frecuentes:
          <span class="green-text strong-small-text"> Tarjeta de Crédito, pago de deudas, transferencias. </span>
        </div>
      </div>
    </div>
    <div class="px-16 pt-16">
      <div class="px-lg-16">
        <h4 class="pb-6"> Buscar por temas </h4>
        <v-row>
          <v-col
            v-for="(card, index) in questionsCategoriesData.items"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            class="px-4"
          >
            <ColorCard :cardData="card" :onClickFn="goToSubject" />
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="px-16 mx-16 pt-16 pb-12">
      <v-divider class="divider"></v-divider>
    </div>
    <div class="mx-4 px-md-16 mx-md-16" v-if="subject">
      <h3 class="text-center pb-8"> {{ categoryName }} </h3>
      <QuestionsPanel :data="subjectQuestions" />
    </div>
    <MoreInfo
      :moreInfoTitle="moreInfoConfig.moreInfoTitle"
      :cardIcon1="moreInfoConfig.cardIcon1"
      :cardLabel1="moreInfoConfig.cardLabel1"
      :cardIcon2="moreInfoConfig.cardIcon2"
      :cardLabel2="moreInfoConfig.cardLabel2"
      class="mb-16 pt-12"
    />
  </div>
</template>
<script>
import ColorCard from "@/components/ColorCard.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import QuestionsPanel from "@/components/QuestionsPanel.vue";
import { REQUEST_GET_CATEGORIES, REQUEST_GET_QUESTIONS } from "@/constants_actions";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    ColorCard,
    MoreInfo,
    QuestionsPanel
  },
  async mounted() {
    await this.loadQuestionsData();
  },
  computed: {
    subject() {
      return this.$route.query.key;
    },
    questionsCategoriesData() {
      let res = {
        items: this.$store.getters["questions/getCategories"]
      };
      res.items.forEach((item, idx) => {
        item.background = this.bgColor[idx%6];
      });
      //console.log('categories => ', res);
      return res;
    },
    questionsData() {
      let res = {
        items: this.$store.getters["questions/getQuestions"]
      };
      //console.log('questions => ', res);
      return res;
    },
    subjectQuestions() {
      return this.questionsData.items.filter(item => {
        return item.category.id == this.subject;
      });
    },
    categoryName() {
      let name = "";
      if (this.subject) {
        this.questionsCategoriesData.items.forEach(category => {
          if (category.id == this.subject) name = category.name
        })
      }
      return name;
    }
  },
  data() {
    return {
      searchText: "",
      bgColor: ['light-green', 'light-gold', 'grey', 'light-blue', 'green', 'light-red'],
      cardsData: {
        items: [
          {
            title: "Préstamos",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            icon: "creditos",
            background: "light-green",
            iconColor: "green",
            subject: "loans"
          },
          {
            title: "Cuentas",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            icon: "cuentas",
            background: "light-gold",
            iconColor: "gold",
            subject: "accounts"
          },
          {
            title: "Tarjetas de crédito",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
            icon: "tarjeta-credito",
            background: "grey",
            iconColor: "green",
            subject: "creditCard"
          },
          {
            title: "Ahorros",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
            icon: "ahorros",
            background: "light-blue",
            iconColor: "green-md",
            subject: "savings"
          },
          {
            title: "Banca móvil",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            icon: "cursor",
            background: "green",
            iconColor: "green-dark",
            subject: "mobileBank"
          },
          {
            title: "Seguros",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            icon: "shield",
            background: "light-red",
            iconColor: "dark-red",
            subject: "insurances"
          }
        ]
      },
      moreInfoConfig: {
        moreInfoTitle: "También podría interesarte",
        cardIcon1: "icon-bank",
        cardLabel1: "Agencias y cajeros",
        cardIcon2: "icon-play",
        cardLabel2: "Tutoriales: Banca por internet"
      }
    }
  },
  methods: {
    goToSubject(subject) {
      this.$router.push({
        path: `questions?key=${subject}`
      });
    },
    async loadQuestionsData() {
      await this.$store.dispatch(`questions/${REQUEST_GET_CATEGORIES}`);
      await this.$store.dispatch(`questions/${REQUEST_GET_QUESTIONS}`);
    },
    onSearchClick() {
      this.$router.push({
        path: `results`,
        query: { search: this.searchText }
      });
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`questions/${REQUEST_GET_CATEGORIES}`);
    await context.store.dispatch(`questions/${REQUEST_GET_QUESTIONS}`);
    return header;
  },
  head () {return this.headData}
}
</script>
