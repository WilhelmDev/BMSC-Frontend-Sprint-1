<template>
  <v-container
    class="bm-benefits text-center pb-10 mt-7 mx-auto"
    max-height="200"
    v-if="benefits2Data && benefits2Data.items && benefits2Data.items.length > 0"
  >
    <div class="pb-8" v-if="benefits2Data.items[0].mainImageUrl">
      <img
        :src="benefits2Data.items[0].mainImageUrl"
        :alt="benefits2Data.items[0].imgAlt1"
        class="mx-auto"
        style="height: 200px"
      />
    </div>
    <h2 class="benefits-v2-title">
      <span v-html="benefits2Data.items[0].title"></span>
      <span class="subtitle" v-html="benefits2Data.items[0].subTitle"></span>
    </h2>
    <span class="big-text">
      {{ benefits2Data.items[0].description }}
    </span>
    <h6
      @click="goToUrl(benefits2Data.items[0])"
      class="cursor-pointer pt-4"
    >{{ benefits2Data.items[0].buttonName }}
    </h6>
  </v-container>
</template>

<script>
import {checkValidUrl} from "@/utils/urlUtil";

export default {
  name: "Benefits2",
  props: {
    benefits2Data: Object
  },
  methods: {
    goToUrl(data) {
      if (data.linkUrl) {
        this.$router.push({path: data.linkUrl});
      } else if (data.buttonHref) {
        this.executeClickLink(data.buttonHref);
      }
    },
    executeClickLink(buttonHref) {
      if (checkValidUrl(buttonHref)) {
        window.open(buttonHref, '_blank');
      } else {
        this.$router.push({
          path: buttonHref
        });
      }
    }
  }
};
</script>
