<template>
  <div class="bm-product-comparison">
    <div class="compare--selector">
      <v-container fluid class="bm-compare-selector">
        <v-row>
          <v-col>
            <div class="d-flex flex-column justify-center align-center">
              <v-img
                :src="require('@/assets/images/compare.svg')"
                class="compare-selector-img"
              ></v-img>
              <h2 class="compare-title">{{ title }}</h2>
              <div class="huge-text">¿Qué quieres comparar?</div>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="6" style="margin-bottom: 10px">
            <v-row align="center" justify="center">
              <v-col cols="12">
                {{categoriesNameList ? categoriesNameList[0]: '' }}:
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="6" style="margin-bottom: 10px">
            <v-select
              v-model="selectB"
              :items="itemsList"
              multiple
              label="Opciones:"
              color="#FF0000"
              no-data-text="No hay datos disponibles"
            >
              <template v-slot:selection="{ item, index }">
                <span
                  v-if="index === 0"
                >
                  Seleccione una opción:
                </span>
              </template>
              <template v-slot:item="{ item, on, attrs }">
                <v-list-item v-on="on" v-bind="attrs" :ripple="false">
                  <v-list-item-icon>
                    <img :src="checkedIcon" v-if="selectB.includes(item)"/>
                    <img :src="unCheckedIcon" v-if="!selectB.includes(item)"/>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item" class="text-left"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="compare--main-section">
      <div class="compare--main-body">
        <v-slide-group
          show-arrows="always"
        >
          <v-slide-item
            v-for="i in itemsNamesList.length"
            :key="i"
            style="margin-left: 1px; margin-right: 1px"
          >
            <v-row justify="center">
              <v-col cols="12" style="width: 290px">
                <ItemsNameContainer
                  v-bind:productList="itemsNamesList"
                  v-bind:buttonLabel="buttonLabel"
                  v-bind:buttonColor="buttonColor"
                  v-bind:index="i"
                  v-bind:buttonUrl="buttonUrl"
                />
                <Section
                  v-for="(sectionData, id) in ItemsSubsectionMap"
                  :key="id"
                  v-bind:sectionItemsData="sectionData.items"
                  v-bind:sectionName="sectionData.name"
                  v-bind:index="i"
                />
                <ComparisonBottom
                  v-bind:itemsNamesList="itemsNamesList"
                  v-if="false"
                />
              </v-col>
            </v-row>
          </v-slide-item>
        </v-slide-group>
      </div>
    </div>
  </div>
</template>
<script>
import Section from "~/components/compare/Section.vue";
import ItemsNameContainer from "~/components/compare/ItemsNameContainer.vue";
import ComparisonBottom from "@/components/compare/ComparisonBottom.vue";
import {TITLE} from "~/cardListKeys/benefitDetails";

export default {
  components: {
    Section,
    ItemsNameContainer,
    ComparisonBottom
  },
  props: {
    categories: Array,
    sectionsData: Array,
    itemsData: Array,
    buttonLabel: String,
    buttonColor: String,
    title: String,
    buttonUrl: String
  },
  data: function() {
    return {
      selectA:this.categories.length>0 && this.categoriesNameList?this.categoriesNameList[0]:0,
      selectB: 0,
      checkedIcon: require('@/assets/images/activeCheckBox.svg'),
      unCheckedIcon: require('@/assets/images/inactiveCheckBox.svg'),
    };
  },
  computed: {
    categoriesNameList() {
      let res = this.categories.map(category => category['name']);
      return res;
    },
    itemsList() {
      let selectedItemA = this.categoriesNameList !== undefined ? this.categoriesNameList[0] : 0;
      let categorySelected = this.categories.filter(category => category['name']===selectedItemA).length > 0 ?
        this.categories.filter(category => category['name']===selectedItemA)[0] : null;
      if(categorySelected) {
        let itemsAvailable = categorySelected['items'].map(item=>item['name']);
        this.selectB = itemsAvailable;
        return itemsAvailable;
      }
      return [];
    },
    selectedItemsIdList() {
      if(typeof this.selectB === "object") return this.selectB.map(item => {
        for(let i in this.itemsData) {
          if(this.itemsData[i]['name'] === item) {
            let aux = this.itemsData[i]['id'];
            return aux;
          }
        }
        return null;
      });
      return [];
    },
    itemsNamesList() {
      if(typeof this.selectB === "object") {
        let names = this.selectB.sort((item1,item2) => {
          let item1Data = this.itemsData.find(item => item['name'] === item1);
          let item2Data = this.itemsData.find(item => item['name'] === item2);
          if(item1Data && item2Data && item1Data['id'] < item2Data['id']) {
            return -1;
          }
          return 1;
        });
        return this.selectB.map(item => {
          return {
            name:item
          }
        });
      }
      return [];
    },
    sectionNameArrayData() {
      return this.sectionsData.map(section => section['name']);
    },
    ItemsSubsectionMap() {
      let sectionsMap = {};
      for(let i = 0; i < this.sectionsData.length; i++) {
        sectionsMap[this.sectionsData[i]['id']]={
          name: this.sectionsData[i]['name'],
          items: {}
        };
      };
      for(let i = 0; i < this.itemsData.length; i++) {
        if(this.selectedItemsIdList.find(itemId => itemId === this.itemsData[i]['id']) !== undefined) {
          for(let j = 0; j < this.itemsData[i]['sections'].length; j++) {
            sectionsMap[this.itemsData[i]['sections'][j]['sectionId']]['items'][this.itemsData[i]['id']]
              = (this.itemsData[i]['sections'][j]['cells']);
          }
        }
      }
      return sectionsMap;
    }
  },
  watch: {
    selectA() {
      this.selectB = 0;
    }
  }
};
</script>
