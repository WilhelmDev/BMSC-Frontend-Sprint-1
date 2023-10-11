<template>
  <div class="text-center text-sm-left">
    <h4 class="py-8 font-weight-normal">Lista de agencias y ATMs por ciudades</h4>
    <v-row class="">
      <v-col v-for="(cities, department) in departmentMap" :key="department" class="pb-4" cols="12" sm="6" md="4">
        <div class="big-text pb-1"> {{department}} </div>
        <div v-for="(quantity, cityName) in cities" :key="cityName">
          <span
            class="strong-regular-text green-text cursor-pointer"
            @click="goToList(cityName)"
          >
            {{cityName}}
          </span>
          ({{quantity}})
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    departmentMap: Object
  },
  methods: {
    goToList(cityName) {
      this.$router.push({
        path: `locationAgencyList?city=${cityName}`
      });
    }
  }
};
</script>
