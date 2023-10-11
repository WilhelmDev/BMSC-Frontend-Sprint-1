<template>
  <v-container class="d-flex">
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
      <div class="big-text">Categorías</div>
      <v-checkbox
        v-for="(category, index) in categories"
        :key="index"
        :label="category.nombre"
        :value="category.id"
        v-model="filter.category"
        color="bm-green"
      ></v-checkbox>
    </div>
    <div class="catalog-section w-100">
      <v-tabs left>
        <v-tab v-for="(city, index) in cities" :key="index" @change="filter.city = city.id"
          >{{ city.nombre }}</v-tab
        >
      </v-tabs>
      <v-text-field
        label="Buscar"
        required
        solo
        class="mx-4 bm-text-field mb-4 d-md-none"
        hide-details
        v-model="filter.search"
      ></v-text-field>
      <DiscountTicket :ticketsData="catalogsData.items"/>
    </div>
  </v-container>
</template>
<script>
import DiscountTicket from "@/components/DiscountTicket.vue";
export default {
  props: {
    catalogsData: Object,
    cities: Array,
    categories: Array
  },
  components: {
    DiscountTicket
  },
  data() {
    return {
      filter: {
        category: [],
        city: {},
        search: undefined,
      }
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
