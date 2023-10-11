<template>
  <div>
    <div class="px-4 px-sm-14 py-6 text-center" v-if="numberOfItems > 4">
      <h2>
        <span v-html="title"/>
      </h2>
      <div class="huge-text">
        {{ message }}
      </div>
    </div>
    <v-row class="px-4 px-sm-14 py-8 benefits-panel">
      <v-col cols="12" md="4" class="px-6" v-if="numberOfItems <= 4">
        <h2 class="green-dark-text">
          <span v-html="title"/>
        </h2>
        <div class="huge-text">
          {{ message }}
        </div>
      </v-col>
      <v-col class="py-0">
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
            :md="numberOfItems <= 4 ? 6 : 4"
            v-for="(item, index) in items"
            :key="index"
            class="px-6 benefit-ctn"
          >
            <div :class="`icon mb-3 ${item.icon}`"></div>
            <h6
              class="black-text pb-2"
              v-bind:data="{id: item.id}"
              v-html="item.title"
            />
            <div v-html="item.text" style="text-align: justify"/>
            <div
              style="cursor: pointer"
              class="green-md-text font-weight-bold pt-2"
              v-if="item.isBanx"
              @click="goToBenefit(item)"
              v-bind:data="{
                tags:item.tags
              }"
            >
              {{ item.link.text }}
            </div>
            <div
              style="cursor: pointer"
              v-else
              class="green-md-text font-weight-bold pt-2"
              @click="evaluateAddress($router, item.link.route)"
            >
              {{ item.link ? item.link.text : '' }}
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Button from "~/components/Button";
import { evaluateAddress } from '@/utils/cardsUtil';
export default {
  components: {Button},
  data() {
    return {
      evaluateAddress
    }
  },
  props: {
    title: String,
    message: String,
    items: Array,
    onButtonClick: Function,
    tags: String
  },
  computed: {
    numberOfItems() {
      return this.items.length;
    }
  },
  methods:{
    goToBenefit(card) {
      this.$router.push({
        path: `BenefitDetailsBanx?key=${card['tags']}`
      });
    },
  }
};
</script>
