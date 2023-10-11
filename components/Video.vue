<template>
  <div>
    <div
      :class="`video d-flex justify-center align-center `"
      :style="`background-image: url(${getYoutubeVideoThumbnail()})`"
    >
      <div :class="`video__background`">
        <v-img :src="require(`@/assets/images/playIcon.png`)" :class="`video__play-icon`" @click="$emit('clicked', videoData.url)"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import { getRawHTMLText } from "@/utils/cardsUtil";

export default {
  name: "Video",
  components: {Button},
  props: {
    videoData: Object
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    getYoutubeVideoId() {
      const regex = this.videoData.url && this.videoData.url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/);
      return regex ? regex.pop() : undefined;
    },
    getYoutubeVideoLink() {
      const videoId = this.getYoutubeVideoId();
      if (videoId) {
        return `//youtube.com/embed/${videoId}`;
      }
      return undefined;
    },
    getYoutubeVideoThumbnail() {
      const videoId = this.getYoutubeVideoId();
      if (videoId) {
        return `//img.youtube.com/vi/${videoId}/0.jpg`;
      }
      return undefined;
    }
  },
};
</script>
