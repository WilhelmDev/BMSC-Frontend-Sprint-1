<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12">
      <div class="strong-regular-text group-name mb-3 ml-3">
        {{ sectionName }}
      </div>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card>
            <v-row no-gutters>
              <v-col>
                <v-row v-for="(itemSubsection, j) in arrayData[index-1]" :key="j" no-gutters>
                  <v-col cols="12">
                    <Feature
                      v-bind:feature="itemSubsection"
                      v-bind:disabled="itemSubsection['description'] === null"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import Feature from "@/components/compare/Feature.vue";

export default {
  components: {
    Feature
  },
  methods: {
    findFeature: function(product, groupName, fName) {
      let result;
      for (let i = 0; i < product.featureGroups.length; i++) {
        let group = product.featureGroups[i];
        if (group.groupName === groupName) {
          result = group.features.find(feature => {
            if (feature.name === fName) {
              return true;
            }
          });
          if (result) break;
        }
      }
      return result;
    },
    getFeature: function(product, groupName, fName) {
      let result = this.findFeature(product, groupName, fName);
      return result ? result : { name: fName };
    },
    getDisabled: function(product, groupName, fName) {
      let result = this.findFeature(product, groupName, fName);
      return Boolean(!result);
    }
  },
  data: function() {
    return {};
  },
  props: {
    sectionItemsData: Object,
    sectionName: String,
    index: Number
  },
  computed: {
    arrayData() {
      let arr = [];
      let sectionItemsData = this.sectionItemsData;
      Object.keys(sectionItemsData).forEach(
        key => arr.push(sectionItemsData[key])
      )
      return arr;
    }
  }
};
</script>
