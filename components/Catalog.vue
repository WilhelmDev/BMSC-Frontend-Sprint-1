<template>
  <v-container class="d-flex" id="catalog">
    <div class="filter-section d-none d-md-block">
      <div class="strong-small-text">Filtros</div>
      <v-text-field
        label="Buscar"
        required
        solo
        class="mr-8 bm-text-field mb-4"
        hide-details
        v-model="filter.search"
      ></v-text-field>
      <v-checkbox
        v-for="(category, index) in categories"
        :key="index"
        :label="category.nombre"
        :value="category.id"
        v-model="filter.category"
        color="bm-green"
      ></v-checkbox>
      <div class="big-text">Cantidad de puntos</div>
      <div class="d-flex">
        <v-text-field
          label="Desde"
          required
          solo
          class="mr-8 bm-text-field mb-4"
          hide-details
          v-model="filter.range.min"
        ></v-text-field>
        <v-text-field
          label="Hasta"
          required
          solo
          class="mr-8 bm-text-field mb-4"
          hide-details
          v-model="filter.range.max"
        ></v-text-field>
      </div>
    </div>
    <div class="catalog-section w-100">
      <v-tabs left>
        <v-tab v-for="(city, index) in cities" :key="index" @change="filter.city = city.id"
          >{{ city.nombre }}</v-tab
        >
      </v-tabs>
      <v-row justify="start" align="center" no-gutters>
        <v-col cols="10">
          <v-text-field
            label="Buscar"
            required
            solo
            class="bm-text-field mb-4 d-md-none"
            hide-details
            v-model="filter.search"
          ></v-text-field>
        </v-col>
        <v-col cols="2" class="filter d-sm-none" @click="showModal=true">
          <v-row no-gutters align="start" justify="center">
            <div>Filtros</div>
          </v-row>
        </v-col>
      </v-row>
      <Ticket :ticketsData="catalogsData.items"/>
    </div>
      <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper">
          <div class="modal-container">
            <v-row justify="center" align="center" no-gutters>
              <v-col cols="3">
                <v-row align="center" justify="center">
                  <v-col cols="12"><img :src="require('@/assets/images/back-icon.svg')" @click="showModal=false"/></v-col>
                </v-row>
              </v-col>
              <v-col cols="6" class="filter">
                <v-row align="center" justify="center" no-gutters>
                  <v-col cols="4"><div>Filtros</div></v-col>
                </v-row>
              </v-col>
              <v-col cols="3">

              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="filter-section">
                  <div class="big-text">Categorías</div>
                  <v-checkbox
                    v-for="(category, index) in categories"
                    :key="index"
                    :label="category.nombre"
                    :value="category.id"
                    v-model="filter.category"
                    color="bm-green"
                  ></v-checkbox>
                  <div class="big-text">Cantidad de puntos</div>
                  <div class="d-flex">
                    <v-text-field
                      label="Desde"
                      required
                      solo
                      class="mr-8 bm-text-field mb-4"
                      hide-details
                      v-model="filter.range.min"
                    ></v-text-field>
                    <v-text-field
                      label="Hasta"
                      required
                      solo
                      class="mr-8 bm-text-field mb-4"
                      hide-details
                      v-model="filter.range.max"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
  </v-container>
</template>
<script>
import Ticket from "@/components/Ticket.vue";
export default {
  props: {
    catalogsData: Object,
    cities: Array,
    categories: Array
  },
  components: {
    Ticket
  },
  data() {
    return {
      filter: {
        category: [],
        city: {},
        search: undefined,
        range: {
          min: undefined,
          max: undefined
        }
      },
      showModal: false
    }
  },
  watch: {
    filter: {
      deep: true,
      handler(value) {
        this.$emit('updatedFilterSelection', value);
      }
    },
    cities: {
      immediate: true,
      handler(value) {
        if (value.length > 0) {
          this.filter.city = value[0].id
        }
      }
    }
  }
}
</script>
