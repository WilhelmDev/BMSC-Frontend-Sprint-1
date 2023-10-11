<template>
  <div>
    <v-container class="bm-blog mx-auto">
      <v-breadcrumbs
        :items="breadcrumbs"
        class="bm-breadcrumb"
      >
        <template v-slot:divider>
          <div class="breadcrumb-circle-separator"></div>
        </template>
      </v-breadcrumbs>
      <div class="mx-auto">
        <v-img
          :src="newsEntry.cardImage"
          class="content-image"
        ></v-img>
      </div >
      <div class="d-sm-block d-md-flex">
        <div class="pr-16 flex-grow-1">
          <h3 class="my-4">
            {{ newsEntry.blogTitle }}
          </h3>
          <div class="small-text my-4">{{ newsEntry.entryDate | formatDate }}</div>
          <div class="regular-text my-4" v-html="newsEntry.blogExtendedContent"></div>
          <div class="strong-small-text">Comparte esta noticia</div>
          <!--<v-icon class="icon-twitter"></v-icon>-->
          <v-icon class="icon-facebook"></v-icon>
          <v-divider></v-divider>
        </div>
        <!--<div class="pl-sm-1 mt-sm-8 pl-md-16 mt-md-16">
          <RelatedNews :relatedNews= "relatedNews"/>
        </div>-->
      </div>
      <div class="py-sm-4 py-md-16">
        <RelatedPanel :items="relatedItems.items" />
      </div>
    </v-container>
  </div>
</template>

<script>
import {
  REQUEST_GET_NEWS_ENTRY
} from "@/constants_actions";
import _ from "lodash";
import BracketBanx from "@/components/BracketBanx";
import RelatedPanel from "@/components/RelatedPanel.vue";
//import RelatedNews from "@/components/RelatedNews.vue";
import { getURL } from "@/utils/urlUtil";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    BracketBanx,
    RelatedPanel,
    //RelatedNews
  },
  props:{
    isBanx: Boolean
  },
  data: () => ({
    newsEntry: {},
    breadcrumbs: [],
    relatedItems: {
      items: [
        {
          title: "Cuentas BANX para jóvenes",
          subtTitle: "Ver opciones",
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
    relatedNews: [
      {
        category: "Empresas",
        title: "Sed lorem gubergren dolore eos ut dolor stet nonumy, stet et amet dolor voluptua kasd amet at accusam aliquyam. Et.",
        entryDate: "10 de septiembre de 2020"
      },
      {
        category: "Empresas",
        title: "Sed lorem gubergren dolore eos ut dolor.",
        entryDate: "10 de septiembre de 2020"
      },
      {
        category: "Empresas",
        title: "Sed lorem gubergren dolore eos ut dolor stet nonumy, stet et amet dolor voluptua kasd.",
        entryDate: "10 de septiembre de 2020"
      }
    ]
  }),
  computed: {
    isBanxTrue(){
      const flag = this.$route.query
      return flag.isBanx
    },
    newsEntryId() {
      return this.$route.query.entryId;
    }
  },
  async mounted() {
    const news = await this.$store.dispatch(`news/${REQUEST_GET_NEWS_ENTRY}`, this.newsEntryId);
    this.newsEntry = this.parseRemoteData(news);
    this.updateBreadcrumb();
  },
  methods: {
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

    updateBreadcrumb() {
      this.breadcrumbs.push({
        text: this.newsEntry.blogType,
        active: true,
        to: { path: this.getOriginRoute() }
      });

      this.breadcrumbs.push({
        text: this.newsEntry.blogTitle,
        active: true
      });
    },
    getOriginRoute() {
      const originRoute = this.newsEntry.blogType.toLowerCase();
      if (originRoute === 'pyme') {
        return '/pyme';
      } else if (originRoute === 'empresas') {
        return '/companies';
      }
      return '';
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);

    return header;
  },
  head () {return this.headData}
};
</script>
