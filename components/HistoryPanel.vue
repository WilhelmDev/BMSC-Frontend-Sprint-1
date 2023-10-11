<template>
  <div class="history-panel my-12">
    <h2 class="text-center" v-html="historyData.title"></h2>
    <v-container>
      <v-timeline align-top dense>
        <v-timeline-item
          v-for="(event, i) in historyData.items"
          :key="i"
          small
          right
        >
          <template v-slot:icon>
            <h5 class="green-md-text" v-html="event.title"></h5>
          </template>
          <div class="text-justify" v-html="event.description"></div>
        </v-timeline-item>
      </v-timeline>
      <Video v-if="historyVideo" :videoData="historyVideo" />
      <div class="justify-center d-flex">
        <v-img v-for="(item, i) in prizesData.items"
          :key="i"
          :src="getCardImage(item)"
          max-width="120"
          :alt="item.imgAlt1"
        ></v-img>
      </div>
    </v-container>
  </div>
</template>
<script>

import { getCardImage } from "@/utils/imageUtil";

export default {
  props: {
    historyData: Object,
    historyVideo: Object,
    prizesData: Object
  },
  data() {
    return {
      getCardImage,
    }
  }
}
</script>
