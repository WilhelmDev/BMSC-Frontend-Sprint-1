<template>
  <div class="bm-header d-none d-md-flex mb-16" :class="{ 'bm-header--hidden': !showNavbar }">
    <router-link :to="{ path: '/' }" class="header-logo-container">
      <img :src="require('@/assets/images/header-logo.svg')" class="header-logo" />
    </router-link>
    <v-tabs class="bm-tab-header" right v-model="activeTab">
      <v-tab v-for="item in headerItems" :key="item.id" :href="`#tab-${item.id}`" @click="changeBaseRoute(item.path)">{{
        item.category }}</v-tab>
      <v-tab-item v-for="item in headerItems" :key="item.id" :value="`tab-${item.id}`">
        <v-tabs class="bm-tab-subheader" right v-model="activeSubTab" optional>
          <v-tab v-for="itemSubheader in item.subCategories" :key="itemSubheader.id" :to="{ path: itemSubheader.path }">{{
            itemSubheader.title }}</v-tab>
        </v-tabs>
      </v-tab-item>
      <v-btn class="mx-4 my-auto header-button" color="bm-dark"
        href="/clientBenefitDetails?key=detalle-beneficio-dos">Migración Banco Fassil</v-btn>
      <v-btn class="mx-4 my-auto header-button" color="bm-dark" href="https://bnet.bmsc.com.bo/" target="_blank">Banca por
        Internet</v-btn>
    </v-tabs>
  </div>
</template>
<script>
import { headerItems } from '@/utils/shared';
export default {
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
      headerItems,
      activeTab: 0,
      activeSubTab: -1
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    this.updateRouterOnMount();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
    changeBaseRoute(path) {
      this.activeSubTab = undefined;
      this.$router.push(
        { path: path }
      );
    },
    updateRouterOnMount() {
      let tab = '/' + this.$route.path.split('/')[1];
      let subTab = this.$route.path.split('/')[2]
        ? this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[2] : undefined;
      let i = 1;
      for (const [key, value] of Object.entries(headerItems)) {
        if (tab.toLowerCase() === (value.path).toLowerCase()) {
          this.activeTab = 'tab-' + i;
          break;
        }
        i++;
      }
      if (subTab) {
        for (const [key, value] of Object.entries(headerItems)) {
          if (tab === value.path) {
            for (let j = 0; j < value.subCategories.length; j++) {
              if (value.subCategories[j].path === subTab) {
                this.activeSubTab = value.subCategories[j].id;
                break;
              }
            }
          }
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "index") {
        this.activeTab = undefined;
        this.activeSubTab = undefined;
      }
    }
  }
};
</script>


