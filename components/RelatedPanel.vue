<template>
  <v-container v-if="items.length > 0">
    <h4 class="text-center pb-10">Tambi&eacute;n podr&iacute;a interesarte</h4>
    <div :class="isBanx?`${ns} ${ns}--banx`:`${ns}`">
      <div class="card-carousel-wrapper">
        <div
          class="card-carousel--nav__left"
          @click="moveCarousel(-1)"
          :disabled="atHeadOfList"
        ></div>
        <div class="card-carousel">
          <div class="card-carousel--overflow-container">
            <div
              class="card-carousel-cards"
              :style="{
                transform: 'translateX' + '(' + currentOffset + 'px' + ')'
              }"
            >
              <router-link class="card-carousel--card" tag="span" :to="item.route" v-for="(item, index) in items" :key="index">
                <v-row align="start" style="height: 50%">
                  <v-col cols="12" style="overflow-wrap: anywhere; hyphens: auto;word-wrap: normal;">
                    <h3>{{ item.title }}</h3>
                  </v-col>
                </v-row>
                <v-row align="end" style="height: 50%">
                  <v-col cols="12">
                    <h6 class="pt-4 link" v-if="item.route">
                      {{ item.subTitle }}
                    </h6>
                  </v-col>
                </v-row>
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="card-carousel--nav__right"
          @click="moveCarousel(1)"
          :disabled="atEndOfList"
        ></div>
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      currentOffset: 0,
      windowSize: 4,
      paginationFactor: 260,
      ns: "related-panel"
    }
  },
  props: {
    items: Array,
    isBanx: Boolean
  },
  computed: {
    atEndOfList() {
      return (
        this.currentOffset <=
        this.paginationFactor * -1 * (this.items.length - this.windowSize)
      );
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
    mobile() {
      return this.$vuetify.breakpoint.md
    }
  },
  watch: {
    mobile:{immediate: true, handler(value){
      //console.log(value);
      if(value){
        this.windowSize = 3;
        this.paginationFactor = 260
      }else{
        this.windowSize = 4;
        this.paginationFactor = 260
      }

      this.moveCarousel();
    }
    }
  },
  methods: {
    moveCarousel(direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    }
  }
};
</script>
