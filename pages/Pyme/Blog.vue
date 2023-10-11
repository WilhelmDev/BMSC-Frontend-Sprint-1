<template>
  <div>
    <v-container class="bm-blog mx-auto px-10">
      <v-row>
        <v-col>
          <BracketBanx
            v-if="isBanxTrue"
            :text1="'Noticias'"
            :text2="'BANX'"
            :bracket-color="'#A7D342'"
          />
          <h2
            v-else
            class="blog-title">
            Noticias PyME
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-tabs
            class="bm-tab-header"
            v-model="activeTab"
            @change="updateSelectedFilter"
          >
            <v-tab v-for="(item, index) in filterItems" :key="index">
              {{ item.title }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row class="align-center">
        <v-col cols="6" class="program-image2">
          <v-img
            :src="highlightedNewsItem.cardImage"
            class="program-content-image2"
          ></v-img>
        </v-col>
        <v-col cols="5" class="ml-8">
          <v-row class="mb-4">
            <span class="blog-type small">
              {{ highlightedNewsItem.blogType }}
            </span>
          </v-row>
          <v-row class="mb-6">
            <h5>
              {{ highlightedNewsItem.blogTitle }}
            </h5>
          </v-row>
          <v-row class="mb-6">
            <span class="regular-text">
              {{ highlightedNewsItem.blogContent }}
            </span>
          </v-row>
          <v-row class="read-more regular-text">
            <span @click="readMore(highlightedNewsItem)">
              Leer más<v-icon right class="read-more icon-btn-arrow"
            /></span>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(card, i) in cardItems.slice(filterRange.min, filterRange.max)"
          :key="i"
        >
          <BlogCard
            :blogType="card.blogType"
            :blogTitle="card.blogTitle"
            :blogContent="card.blogContent"
            :cardImage="card.cardImage"
            :alt="card.imgAlt1"
            :eventName="''"
          />
        </v-col>
      </v-row>
      <v-row class="py-16" justify="center">
        <v-btn
          class="btn-load-more py-3"
          depressed
          :color="'grey'"
          @click="increaseFilterRange"
          v-show="filterRange.max < cardItems.length"
        >
          Cargar más
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BlogCard from "@/components/BlogCard.vue";
import BracketBanx from "@/components/BracketBanx";
import {
  REQUEST_GET_NEWS,
  REQUEST_GET_FILTERED_NEWS,
  REQUEST_GET_NEWS_CATEGORIES
} from "@/constants_actions";
import _ from "lodash";
import {getURL} from "@/utils/urlUtil";
import {getHeader} from "~/utils/seo";

export default {
  name: "Blog",
  components: {
    BracketBanx,
    BlogCard
  },
  props:{
    isBanx: Boolean
  },
  data: () => ({
    filterIndex: 0,
    newsItems: [],
    highlightedNewsItem: {},
    cardItems: [],
    filterItems: [],
    defaultCategoryFilter: {
      title: "Todas",
      id: 0
    },
    filterRange: {
      min: 0,
      max: 12,
      step: 12
    },
    activeTab: 0
  }),
  async mounted() {
    await this.$store.dispatch(`news/${REQUEST_GET_NEWS_CATEGORIES}`,[this]);
  },
  computed: {
    isBanxTrue(){
      const flag = this.$route.query
      //console.log(flag.isBanx)
      return flag.isBanx
    },
    newsCategoryListRemote() {
      return this.$store.getters["news/getNewsCategoryList"];
    },
    newsListRemote() {
      return this.$store.getters["news/getNewsList"];
    }
  },
  watch: {
    async newsCategoryListRemote(value) {
      this.filterItems = this.parseRemoteNewsCategoryList(value);
      await this.updateSelectedFilter(0);
    },
    newsListRemote: {
      immediate: true,
      handler(value) {
        this.filterRange.max = this.filterRange.step;
        this.newsItems = this.parseRemoteList(value);
        this.highlightedNewsItem = this.newsItems[0] || {};
        this.cardItems = this.newsItems.slice(1, this.newsItems.length);
      }
    }
  },
  methods: {
    parseRemoteList(list) {
      return _.map(list, item => this.parseRemoteData(item));
    },
    parseRemoteData(record) {
      return {
        id: _.get(record, ["id"]),
        blogType: _.get(record, ["category", "name"]),
        blogTitle: _.get(record, ["title"]),
        blogContent: _.get(record, ["summary"]),
        blogExtendedContent: _.get(record, ["content"]),
        cardImage: _.get(record, ["image"]) ? getURL(`api/bmscnews/news/${_.get(record, ["id"])}/image`, this.$config.servicesBaseUrl) : undefined,
        entryDate: _.get(record, ["dateNews"])
      };
    },
    parseRemoteNewsCategoryList(list) {
      return [].concat(
        this.defaultCategoryFilter,
        _.map(list, item => this.parseRemoteNewsCategoryData(item))
      );
    },
    parseRemoteNewsCategoryData(record) {
      return {
        id: _.get(record, ["id"]),
        title: _.get(record, ["name"])
      };
    },
    async updateSelectedFilter(index) {
      this.filterIndex = index;
      await this.getNewsItems();
    },
    async getNewsItems() {
      if (this.filterIndex === 0) {
        await this.$store.dispatch(`news/${REQUEST_GET_NEWS}`);
      } else {
        await this.$store.dispatch(
          `news/${REQUEST_GET_FILTERED_NEWS}`,
          this.filterItems[this.filterIndex]
        );
      }
    },
    increaseFilterRange() {
      this.filterRange.max = this.filterRange.max + this.filterRange.step;
    },
    readMore(item) {
      this.$router.push({
        path: `/blogDetails?entryId=${item.id}`
      });
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);

    return header;
  },
  head () {return this.headData}
};
</script>
