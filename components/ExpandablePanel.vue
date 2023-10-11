<template>
  <v-container class="expandable-panel" v-model="config">
    <div v-for="(element, idx) in config" :key="`expandable-${idx}`" class="my-4 px-2 pt-4 card">
      <v-row class="pb-8">
        <v-col cols="12" md="3">
          <div class="pl-3">
            <v-img :src="element.mainImageUrl"></v-img>
          </div>
        </v-col>
        <v-col class="pl-6 pr-16">
          <h3 class="pb-2" v-html="element.title"></h3>
          <div v-html="element.subTitle" class="regular-text pb-2"></div>
          <div>
            <div class="pt-2 pb-1 strong-regular-text">{{element.gradientText}}</div>
            <ul style="list-style-type:'- '" class="px-4">
              <li v-for="(item, k) in element.description" :key="k" v-html="item"></li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="element.expandableConfig && element.expandableConfig.items" class="expandable-container">
        <v-col cols="12" md="4" v-for="(item, index) in element.expandableConfig.items" :key="`expandable-item-${index}`">
          <div class="text-center">
            <span
              @click="onExpandableItemClick(idx, index, item)"
              class="cursor-pointer strong-regular-text green-md-text"
            >
              {{item.gradientText}}
              <v-icon
                v-if="!getExpanded(idx, index) && !item.isDownload"
                class="icon-down-arrow green-md-text strong-regular-text"
              ></v-icon>
              <v-icon
                v-if="getExpanded(idx, index) && !item.isDownload"
                class="icon-up-arrow green-md-text"
              ></v-icon>
            </span>
          </div>
          <div
            v-if="getExpanded(idx, index) && !item.isDownload"
            class="expanded-container pa-4 mx-auto"
            :class="{'one-item': element.expandableConfig.items.length === 1}"
          >
            <h6 class="black-text pb-1">{{item.title}}</h6>
            <div class="small-text">{{item.description}}</div>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      aka: {}
    }
  },
  watch: {
    config(newVal) {
      const m = {};
      newVal.forEach((element, idx) => {
        element.expandableConfig.items.forEach((item, index) => {
          if (!m[idx]) m[idx] = {};
          m[idx][index] = false;
        });
      });
      this.aka = m;
    }
  },
  methods: {
    onExpandableItemClick(idx, index, item) {
      if (!item.isDownload) {
        this.aka[idx][index] = !this.aka[idx][index];
      } else {
        window.open(item.fileUrl, '_blank');
      }
    },
    getExpanded(idx, index) {
      if (this.aka[idx]) {
        return this.aka[idx][index];
      }
      return false;
    }
  },
  props: {
    config: Array
  }
};
</script>
