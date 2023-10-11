<template>
  <v-container class="bm-loans mx-auto">
    <v-row>
      <v-col cols="12" sm="5" class="pl-0 pr-6">
        <v-autocomplete
          v-model="autocompleteId"
          clearable
          item-text="text"
          item-value="id"
          :items="searchItems"
          @change="onSearchResultClick"
          @click:clear="onSearchResultClick"
          class="raw-input mb-2 px-3 px-sm-0"
          filled
          prepend-icon="mdi-magnify"
          background-color="white"
          placeholder="Buscar"
        >
          <template v-slot:item="data">
            <div>
              <span class="small-text" v-text="data.item.text"></span>
              <span :class="{
                'strong-small-text green-md-text': data.item.state !== 'Cerrado',
                'strong-small-text error-red-text': data.item.state === 'Cerrado'
              }">{{ data.item.state }}</span>
            </div>
          </template>
        </v-autocomplete>
        <v-btn class="mb-2" plain depressed @click="onUseMyLocationClick">
          <v-icon color="green">mdi-crosshairs</v-icon>
          <span>Usar mi ubicación</span>
        </v-btn>
        <div class="d-none d-sm-block" style="height: 55vh; overflow-y: scroll">
          <div class="mb-2">
            Resultados
          </div>
          <div>
            <v-btn
              v-for="(button,index) in buttonConfig"
              :key="`help-search-location-${index}`"
              @click="button.onClick(button)"
              :color="button.pressed ? 'amber accent-4' : 'grey'"
              class="mr-1 mb-3 white-text"
              depressed
              height="40"
              :outlined="!button.pressed"
            >
              {{button.name}}
            </v-btn>
          </div>
          <ExpandableRow
            v-for="(agency, index) in data"
            :key="index"
            :data="agency"
            :onExpandedChange="onExpandedChange.bind(this, agency)"
          />
        </div>
      </v-col>
      <v-col class="px-0 pl-sm-8 pr-sm-3" cols="12" sm="7">
        <div id="map-container-google">
          <GmapMap
            :center="getCenter()"
            :zoom="15"
            style="width: 100%; height: 100%"
            ref="mapRef"
          >
            <GmapMarker
              v-for="(p,index) in searchItems"
              :key="`place-${index}`"
              :position="getPosition(p)"
              :clickable="true"
              :draggable="false"
              :icon="iconMap[index]"
            />
          </GmapMap>
        </div>
        <!-- <div class="d-sm-none mt-12 px-2" style="height: 55vh; overflow-y: scroll">
          <div class="mb-2">
            Resultados
          </div>
          <div>
            <v-btn v-for="(button,index) in buttonConfig"
              :key="`help-search-location-${index}`"
              @click="button.onClick(button)"
              :color="button.pressed ? 'amber accent-4' : 'grey'"
              class="mr-2 white-text"
              depressed
              height="40"
              :outlined="!button.pressed"
            >
              {{button.name}}
            </v-btn>
          </div>
          <ExpandableRow
            v-for="(agency, index) in data"
            :key="index"
            :data="agency"
            :onExpandedChange="onExpandedChange.bind(this, agency)"
          />
        </div> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ExpandableRow from "@/components/ExpandableRow.vue";
import { AGENCY, ATM } from "~/cardListKeys/help";
export default {
  data() {
    return {
      items: [
        {
          text: 'Agencia Riberalta',
          id: 1,
          state: 'Abierto'
        },
        {
          text: 'Agencia La Paz',
          id: 4,
          state: 'Cerrado'
        }
      ],
      autocompleteId: undefined,
      browserCoordinates: null,
      selectedLocation: null,
      iconMap: [],
      center: null,
      map: null
    }
  },
  created() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.browserCoordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        //console.log(this.browserCoordinates);
      },
      error => {
        console.error(error.message);
      },
    );
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => this.map = map);
  },
  watch: {
    selectedId(newVal) {
      this.autocompleteId = newVal;
    },
    selectedLocation(newVal) {
      this.updateIcons();
    },
    searchItems(newVal) {
      this.updateIcons();
    }
  },
  props: {
    data: Array,
    buttonConfig: Array,
    onSearchResultClick: Function,
    searchItems: Array,
    selectedId: Number,
  },
  methods: {
    getIcon(p) {
      let icon;
      //console.log(p)
      if (this.selectedLocation) {
        if (p.lng === this.selectedLocation.lng && p.lat === this.selectedLocation.lat) {
          icon = `${p.type === AGENCY ? 'ag' : 'atm'}-active.svg`;
        } 
      else {
          icon = `${p.type === AGENCY ? 'ag' : 'atm'}-inactive.svg`;
        }
      } else {
        icon = `${p.type === AGENCY ? 'ag' : 'atm'}-active.svg`;
      }
      //console.log(`@/assets/images/pin-${icon}`);
      return {
        url: require(`@/assets/images/pin-${icon}`)
      }
    },
    getCenter() {
      if (this.center) {
        return this.center;
      } else {
        const firstLat = this.searchItems && this.searchItems[0] && this.searchItems[0].lat || -16.49568;
        const firstLng = this.searchItems && this.searchItems[0] && this.searchItems[0].lng || -68.13342;
        return {
          lat: firstLat,
          lng: firstLng
        }
      }
    },
    onUseMyLocationClick() {
      this.center = this.browserCoordinates;
    },
    getPosition(p) {
      //console.log("positioooon", p)
      return {
        lat: parseFloat(p.lat),
        lng: parseFloat(p.lng)
      }
    },
    updateIcons() {
      for(let i in this.searchItems) {
        this.iconMap[i] = this.getIcon(this.searchItems[i]);
      };
      //console.log(this.iconMap);
    },
    onExpandedChange(agency) {
      this.center = {
        lat: agency.latitud,
        lng: agency.longitud
      }
      this.selectedLocation = this.center;
    }
  }
}
</script>
