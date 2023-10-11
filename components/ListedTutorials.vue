<template>
  <div class="listed-tutorials pa-0 pa-md-4">
   <v-row justify="center">
     <v-col cols="10">
       <v-row justify="center">
         <v-slide-group multiple show-arrows class="pa-0 pa-md-8" next-icon="icon-right-arrow" prev-icon="icon-left-arrow">
           <v-slide-item v-for="(tutorial, index) in tutorialsList.items" :key="index">
             <v-card class="product-card m4">
               <Video :videoData="getVideoFields(tutorial)" @clicked="selectVideo"/>
               <h5 class="mt-5" v-html="tutorial.title"/>
             </v-card>
           </v-slide-item>
         </v-slide-group>
       </v-row>
     </v-col>
   </v-row>
    <modal v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <v-btn class="modal-default-button mb-1" :color="'bm-light'" @click="showModal = false">
                Cerrar
              </v-btn>
              <iframe :src="getYoutubeVideoLink()"/>
            </div>
          </div>
        </div>
      </transition>
    </modal>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  props: {
    tutorialsList: Object
  },
  data() {
    return {
      showModal: false,
      videoUrl: ""
    };
  },
  methods: {
    getVideoFields(tutorial) {
      return {
        url: _.get(tutorial, ['subTitle']),
        title: _.get(tutorial, ['title'])
      }
    },
    getYoutubeVideoId() {
      const regex = this.videoUrl && this.videoUrl.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/);
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
    },
    selectVideo(videoUrl) {
      //console.log('sET VIDEO URL TO: ',videoUrl);
      this.videoUrl = videoUrl;
      this.showModal = true;
    }
  }
};
</script>
