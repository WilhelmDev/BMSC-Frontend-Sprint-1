<template>
  <div class="estate-panel py-8">
    <div v-if="activeTab === 3" class="pa-8 mb-8 note">
      <div class="strong-regular-text green-text pb-4"> <span v-html="notificationData.items[0]['title']"/> </div>
      <div class="green-text">
        {{notificationData.items[0]['description']}}
      </div>
    </div>
    <div class="mx-md-2 mx-lg-16 pr-lg-10">
      <v-row>
        <v-col cols="3" class="pl-8 d-none d-md-block">
          <div class="small-text green-text pt-4"> {{totalItems}} resultados </div>
          <div class="strong-small-text pt-12 pb-4"> Filtros </div>
          <div class="search-input w-100">
            <v-icon class="icon-search"></v-icon>
            <input
              type="text"
              v-model="searchText"
              placeholder="Buscar"
              style="width: inherit;"
            />
          </div>
          <div>
            <div class="py-8">
              <div class="checkbox-group">
                <div class="big-text"> Departamentos </div>
                <v-checkbox
                  v-model="departmentsSelected"
                  v-for="(item, index) in cities"
                  :key="index"
                  :label="item"
                  color="md-green"
                  class="mt-2"
                  :value="item"
                  hide-details
                ></v-checkbox>
              </div>
            </div>
            <div class="pb-8">
              <div class="checkbox-group">
                <div class="big-text"> Ordenar por </div>
                <v-checkbox
                  v-model="orderBySelected"
                  v-for="(item, index) in orderBy"
                  :key="index"
                  :label="item"
                  color="md-green"
                  class="mt-2"
                  :value="item"
                  hide-details
                  :multiple="false"
                ></v-checkbox>
              </div>
            </div>
            <div class="pb-8">
              <div class="checkbox-group">
                <div class="big-text"> Bien </div>
                <v-checkbox
                  v-model="estateTypesSelected"
                  v-for="(item, index) in estateTypes"
                  :key="index"
                  :label="item"
                  color="md-green"
                  class="mt-2"
                  :value="item"
                  hide-details
                ></v-checkbox>
              </div>
            </div>
          </div>
          <div class="">
            <div class="big-text pb-2">Valor</div>
            <div class="d-lg-flex">
              <input
                type="text"
                v-model="initialRange"
                placeholder="Desde"
                class="w-100 outline-none"
              />
              <input
                type="text"
                v-model="finalRange"
                placeholder="Hasta"
                class="w-100 outline-none"
              />
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-tabs left show-arrows v-model="activeTab" class="tab-hide-disabled-arrows">
            <v-tab
              v-for="(header, index) in tabsHeader"
              :key="index"
              >{{ header }}</v-tab
            >
            <v-tab-item
              v-for="(tab, index) in tabsHeader"
              :key="index"
            >
              <v-row justify="start" align="center" no-gutters style="margin-top: 20px">
                <v-col cols="9">
                  <v-row justify="center">
                    <v-col cols="11">
                      <v-text-field
                        label="Buscar"
                        required
                        solo
                        class="bm-text-field mb-4 d-md-none"
                        hide-details
                        v-model="searchText"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="3" class="filter d-sm-none" @click="openModal">
                  <v-row no-gutters align="start" justify="center" style="margin-bottom: 15px">
                    <div>Filtros</div>
                  </v-row>
                </v-col>
              </v-row>
              <div style="padding-left: 5px; padding-right: 5px">
                <v-row class="pt-1">
                  <v-col
                    cols="6"
                    lg="4"
                    v-for="(estate, index) in itemsData"
                    :key="index"
                  >
                    <EstateCard :data="estate" />
                  </v-col>
                </v-row>
              </div>
              <v-row justify="center" align="center">
                <v-col cols="10">
                  <v-pagination
                    v-model="page"
                    :length="paginationData.length"
                    :total-visible="7"
                    color="transparent"
                    circle
                  ></v-pagination>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
      <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper">
          <div class="modal-container">
            <v-row justify="center" align="center" no-gutters style="margin-top: 20px">
              <v-col cols="3">
                <v-row align="center" justify="center">
                  <v-col cols="12"><img :src="require('@/assets/images/back-icon.svg')" @click="showModal=false"/></v-col>
                </v-row>
              </v-col>
              <v-col cols="6" class="filter">
                <v-row align="center" justify="center" no-gutters>
                  <v-col cols="4"><div>Filtros</div></v-col>
                </v-row>
              </v-col>
              <v-col cols="3">

              </v-col>
            </v-row>
            <div>
              <div class="py-8">
                <div class="checkbox-group">
                  <div class="big-text"> Departamentos </div>
                  <v-checkbox
                    v-model="departmentsSelected"
                    v-for="(item, index) in cities"
                    :key="index"
                    :label="item"
                    color="md-green"
                    class="mt-2"
                    :value="item"
                    hide-details
                  ></v-checkbox>
                </div>
              </div>
              <div class="pb-8">
                <div class="checkbox-group">
                  <div class="big-text"> Ordenar por </div>
                  <v-checkbox
                    v-model="orderBySelected"
                    v-for="(item, index) in orderBy"
                    :key="index"
                    :label="item"
                    color="md-green"
                    class="mt-2"
                    :value="item"
                    hide-details
                    :multiple="false"
                  ></v-checkbox>
                </div>
              </div>
              <div class="pb-8">
                <div class="checkbox-group">
                  <div class="big-text"> Bien </div>
                  <v-checkbox
                    v-model="estateTypesSelected"
                    v-for="(item, index) in estateTypes"
                    :key="index"
                    :label="item"
                    color="md-green"
                    class="mt-2"
                    :value="item"
                    hide-details
                  ></v-checkbox>
                </div>
              </div>
            </div>
            <div class="">
              <div class="big-text pb-2">Valor</div>
              <div class="d-lg-flex">
                <input
                  type="text"
                  v-model="initialRange"
                  placeholder="Desde"
                  class="w-100 outline-none"
                />
                <input
                  type="text"
                  v-model="finalRange"
                  placeholder="Hasta"
                  class="w-100 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EstateCard from "@/components/EstateCard.vue";
import CheckboxGroup from "@/components/CheckboxGroup.vue";
import {UPDATE_REAL_ESTATE_DATA, UPDATE_STATE_ACTION} from "~/constants_actions";
import {STATE_CAROUSEL, STATE_ITEMS, STATE_NOTIFICATION, STATE_TITLE} from "~/cardListKeys/additionalInfo";
import {generateEmptyModels} from "~/utils/cardsUtil";
import {BMSC_ESTATE_ROUTE} from "~/constants_routes";
import {getEstateCarouselImage} from "~/utils/imageUtil";

export default {
  components: {
    EstateCard,
    CheckboxGroup
  },
  props: {

  },
  data() {
    return {
      page: 1,
      limit: 6,
      activeTab: 0,
      searchText: "",
      initialRange: "",
      finalRange: "",
      departmentsSelected: [],
      orderBySelected: [],
      estateTypesSelected: [],
      showModal: false,
      cities: [
        'La Paz',
        'Beni',
        'Chuquisaca',
        'Cochabamba',
        'Oruro',
        'Pando',
        'Potosí',
        'Santa Cruz',
        'Tarija'
      ],
      estateTypes: [
        'Casa',
        'Departamento',
        'Especies',
        'Local comercial',
        'Maquinaria',
        'Terreno',
        'Vehículo',
        'Otros'
      ],
      orderBy: [
        'Relevantes',
        'Menor precio',
        'Mayor precio'
      ],
      tabsHeader: [
        'Todo',
        'Bienes adjudicados',
        'Bienes de uso',
        'Remate'
      ],
      estates: [
        {
          name: "Casa en Achumani",
          price: "85.000",
          code: "LPIUCAS4442",
          groundSurface: "690.00",
          buildedSurface: "594.00",
          location: "Sur, La Paz",
          image: "house1.png",
          id: "1"
        },
        {
          name: "Casa en Irpavi",
          price: "85.000",
          code: "LPIUCAS4442",
          groundSurface: "690.00",
          buildedSurface: "594.00",
          location: "Sur, La Paz",
          image: "house2.png",
          id: "2"
        },
        {
          name: "Departamento de Achumani",
          price: "85.000",
          code: "LPIUCAS4442",
          groundSurface: "390.00",
          buildedSurface: "590.00",
          location: "Sur, La Paz",
          image: "building.png",
          id: "3"
        },
        {
          name: "Casa en Irpavi",
          price: "85.000",
          code: "LPIUCAS4442",
          groundSurface: "690.00",
          buildedSurface: "594.00",
          location: "Sur, La Paz",
          image: "house2.png",
          id: "4"
        },
        {
          name: "Casa en Achumani",
          price: "85.000",
          code: "LPIUCAS4442",
          groundSurface: "690.00",
          buildedSurface: "594.00",
          location: "Sur, La Paz",
          image: "house1.png",
          id: "5"
        },
        {
          name: "Departamento de Achumani",
          price: "85.000",
          code: "LPIUCAS4442",
          groundSurface: "390.00",
          buildedSurface: "590.00",
          location: "Sur, La Paz",
          image: "building.png",
          id: "6"
        },
        {
          name: "Casa en Irpavi",
          price: "85.000",
          code: "LPIUCAS4442",
          groundSurface: "690.00",
          buildedSurface: "594.00",
          location: "Sur, La Paz",
          image: "house2.png",
          id: "7"
        },
        {
          name: "Departamento de Achumani",
          price: "85.000",
          code: "LPIUCAS4442",
          groundSurface: "390.00",
          buildedSurface: "590.00",
          location: "Sur, La Paz",
          image: "building.png",
          id: "8"
        },
        {
          name: "Casa en Achumani",
          price: "85.000",
          code: "LPIUCAS4442",
          groundSurface: "690.00",
          buildedSurface: "594.00",
          location: "Sur, La Paz",
          image: "house1.png",
          id: "9"
        }
      ]
    };
  },
  async mounted() {
    await this.$store.dispatch(`additionalInfo/${UPDATE_STATE_ACTION}`,STATE_CAROUSEL);
    await this.$store.dispatch(`additionalInfo/${UPDATE_STATE_ACTION}`,STATE_NOTIFICATION);
    await this.loadRealEstateData();
  },
  computed: {
    carouselData: function () {
      let res = {
        items: this.$store.getters["additionalInfo/getList"](STATE_CAROUSEL)
      }
      //console.log(STATE_CAROUSEL, res);
      return res;
    },
    notificationData: function () {
      let res = {
        items: this.$store.getters["additionalInfo/getList"](STATE_NOTIFICATION)
      }
      //console.log(STATE_NOTIFICATION, res);
      return res;
    },
    itemsData: function () {
      let sectionData = this.$store.getters["additionalInfo/getList"](STATE_ITEMS);
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
      //console.log(STATE_ITEMS, processedSectionList);
      return processedSectionList;
    },
    paginationData() {
      let sectionData = this.$store.getters["additionalInfo/getList"](STATE_ITEMS);
      if (!sectionData['meta'] || sectionData['meta']['itemCount'] === 0) {
        return [];
      }
      let res = [];
      let totalPages = sectionData['meta']['totalPages'];
      for (let i = 1; i <= totalPages; i++) {
        res.push({
          number: i
        });
      }
      return res;
    },
    totalItems() {
      let sectionData = this.$store.getters["additionalInfo/getList"](STATE_ITEMS);
      if (!sectionData['meta'] || sectionData['meta']['itemCount'] === 0) {
        return 0;
      }
      let res = [];
      let totalEstateItems = sectionData['meta']['totalItems'];
      return totalEstateItems;
    }
  },
  methods: {
    async loadRealEstateData() {
      await this.$store.dispatch
      (`additionalInfo/${UPDATE_REAL_ESTATE_DATA}`,[
        this.page,
        this.limit,
        this.searchText,
        this.departmentsSelected,
        this.estateTypesSelected,
        this.activeTabName(),
        this.orderBySelected,
        this.initialRange,
        this.finalRange
      ]);
    },
    activeTabName() {
      return this.tabsHeader[this.activeTab];
    },
    setPage(page) {
      this.page = page;
      this.loadRealEstateData();
    },
    generateImageUrlFromIdAndIdx(id, idx) {
      return getEstateCarouselImage(id, idx);
    },
    openModal: function () {
      this.showModal=true;
    }
  },
  watch: {
    activeTab() {
      this.loadRealEstateData();
    },
    searchText() {
      this.loadRealEstateData();
    },
    departmentsSelected() {
      this.loadRealEstateData();
    },
    orderBySelected() {
      this.loadRealEstateData();
    },
    estateTypesSelected() {
      this.loadRealEstateData();
    },
    initialRange() {
      this.loadRealEstateData();
    },
    finalRange() {
      this.loadRealEstateData();
    },
    page() {
      this.loadRealEstateData();
    }
  }
};
</script>
