<template>
  <v-container fluid class="bm-phone-list">
    <v-row class="d-flex justify-center align-center flex-column">
      <div class="text-center">
        <v-icon class="icon-phone"></v-icon>
        <h4 class="phone-list-title">{{ title }}</h4>
      </div>
    </v-row>
    <v-row justify="center" class="hidden-xs-only">
      <v-col v-for="(phone, c) in getCols(phones)" :key="c" cols="3">
        <v-container>
          <v-row
            v-for="p in getColPhones(phones, c)"
            :key="p.department"
            justify="center"
          >
            <v-col md="5" sm="12">
              <div class="phone-item">
                <div class="department regular-text">{{ p.department }}</div>
                <div class="phone">{{ p.phoneNumber }}</div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row justify="center" class="hidden-sm-and-up">
      <v-col v-for="(phone, c) in getColsMobile(phones)" :key="c" cols="5" offset="1">
        <v-container>
          <v-row
            v-for="p in getColPhonesMobile(phones, c)"
            :key="p.department"
            justify="center"
          >
            <v-col md="5" sm="12">
              <div class="phone-item">
                <div class="department regular-text">{{ p.department }}</div>
                <div class="phone">{{ p.phoneNumber }}</div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "PhoneList",
  methods: {
    getColPhones: function(phones, c) {
      const colPhones = [];
      for (let i = 0; i < 3; i++) {
        let idx = 3 * c + i;
        if (phones[idx]) {
          colPhones.push(phones[idx]);
        }
      }
      return colPhones;
    },
    getColPhonesMobile: function(phones, c) {
      const colPhones = [];
      for (let i = 0; i < 5; i++) {
        let idx = 5 * c + i;
        if (phones[idx]) {
          colPhones.push(phones[idx]);
        }
      }
      return colPhones;
    },
    getCols: function(phones) {
      return Math.ceil(phones.length / 3);
    },
    getColsMobile: function(phones) {
      return Math.ceil(phones.length / 2);
    }
  },
  props: {
    phones: Array,
    title: String
  }
};
</script>
