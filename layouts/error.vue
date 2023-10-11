<template>
  <v-app>
    <div :class="`${ns}`">
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="11">
          <v-row justify="center" :class="`${ns}__logo`">
            <img
              :src="require('@/assets/images/logo-404.png')"
            />
          </v-row>
          <v-row justify="center" :class="`${ns}__title`" no-gutters>
            <v-col cols="4">
              <v-row justify="center" no-gutters>
                ¡UPS!
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center" :class="`${ns}__subtitle`" no-gutters>
            <v-col cols="6">
              <v-row justify="center" no-gutters>
                No podemos encontrar la página que
                estás buscando.
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center" :class="`${ns}__message`" no-gutters>
            <v-col cols="6">
              <v-row justify="center" no-gutters>
                Estos enlaces te podrían ser útiles
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center" no-gutters>
            <v-col cols="12">
              <SiteMap/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      ns: 'error-404',
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  methods: {
    goToPage(pageName) {
      this.$router.push({ path: '/'+pageName });
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
