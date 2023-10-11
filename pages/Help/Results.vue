<template>
  <div class="questions-result">
    <v-container>
      <v-row>
        <v-col>
          <v-breadcrumbs
            :items="breadcrumbs"
            divider=">"
            class="px-0"
          ></v-breadcrumbs>
          <h2>Resultados</h2>
          <div class="d-flex">
            <div class="search-input py-8">
              <v-icon class="icon-search"></v-icon>
              <input
                type="text"
                v-model="searchText"
                class="search-input"
              />
            </div>
            <v-btn color="bm-light"
              class="search-btn"
              height="42"
              @click="onSearchClick(searchText)"
              >
                Buscar
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
          <v-col>
              <div class="pb-6">Resultados en preguntas frecuentes</div>
              <QuestionsPanel :data="questionResults" />
          </v-col>
      </v-row>
      <v-row>
          <v-col>
              <div class="py-6">Resultados en páginas del sitio</div>
              <div v-for="(result, idx) in siteResults" :key="`search-result-pages-${idx}`">
                <router-link tag="div" :to="result.route" class="strong-big-text site-result">
                  {{result.text}}
                </router-link>
                <v-divider></v-divider>
              </div>
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { resultsInSite } from '@/utils/siteUtils';
import { UPDATE_SEARCH_RESULTS } from '@/constants_actions';
import {getHeader} from "~/utils/seo";

export default {
  data() {
    return {
      breadcrumbs: [
        {
          text: "Preguntas frecuentes",
          disabled: false,
        },
        {
          text: "Resultado de búsqueda",
          disabled: true,
        },
      ],
      searchText: "",
      siteResults: [],
      questionResults: [],

    };
  },
  computed: {
    prevSearchText() {
      return this.$route.query.search;
    }
  },
  async mounted() {
    if (Boolean(this.prevSearchText)) {
      this.onSearchClick(this.prevSearchText);
    }
  },
  methods: {
    async onSearchClick(st) {
      const searchText = st || this.searchText;
      this.siteResults = resultsInSite(searchText);
      this.questionResults = await this.$store.dispatch(`questions/${UPDATE_SEARCH_RESULTS}`, searchText);
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);

    return header;
  },
  head () {return this.headData}
};
</script>
