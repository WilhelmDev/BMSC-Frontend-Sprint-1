<template>
  <div class="estate-details-panel">
    <v-row class="white-bg image-container">
      <v-col cols="12" md="9" class="my-auto">
        <v-img :src="itemDetailsData.imagesArray[0]" class="main-image"></v-img>
      </v-col>
      <v-col cols="3" class="pr-6 d-none d-md-block">
        <v-row
          class="pb-1"
          v-for="(imagesUrl,idx) in itemDetailsData.imagesArray.slice(1,Math.min(4,itemDetailsData.imagesArray.length+1))"
          :key="idx"
        >
          <v-img
            :src="imagesUrl"
            class="secondary-image"
          ></v-img>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="white-bg pb-6 info-container">
      <v-col cols="12" md="9" class="px-3 px-sm-6">
        <div class="strong-huge green-md-text pt-2 pb-4 px-2"> {{itemDetailsData['categoria']}} </div>
        <div class="strong-regular-text grey-md-text pb-2 px-2"> Valor del bien </div>
        <h2 class="black-text pb-6 px-2">
          {{getCurrencySymbol(itemDetailsData['monedaBien'])+" "
          +new Intl.NumberFormat('de-DE').format(itemDetailsData['precioBien'])}}
        </h2>
        <v-container class="d-md-none"><v-divider></v-divider></v-container>
        <div class="d-none d-md-block">
          <DataField label="Descripción" :text="itemDetailsData['descripcion']" class="pb-6"/>
          <div class="d-flex pb-6 justify-space-between" v-if="itemDetailsData['categoria'] !== 'Remate'">
            <DataField label="Tipo de bien" :text="itemDetailsData['tipoBien']" />
            <DataField label="Superficie Terreno" :text="groundArea" />
            <DataField label="Superficie Construcción" :text="constructionArea" />
            <DataField label="Código del bien" :text="itemDetailsData['codigo']" />
          </div>
          <div class="d-flex pb-6 justify-space-between" v-else>
            <DataField label="Departamento" :text="itemDetailsData['departamento']" />
            <DataField label="Juzgado" :text="itemDetailsData['juzgado']" />
            <DataField label="Fecha y hora de remate" :text="parsedDate" />
            <DataField label="Datos martillero" :text="itemDetailsData['datosMartillero']" />
          </div>
          <div class="d-flex" v-if="itemDetailsData['categoria'] !== 'Remate'">
            <DataField label="Ciudad de pertenencia" :text="itemDetailsData['ciudad']" class="pr-16 mr-lg-14" />
            <DataField label="Zona de la ciudad" :text="location " />
          </div>
          <div class="d-flex" v-else>
            <DataField label="Lugar de remate" :text="itemDetailsData['lugarRemate']"/>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="3" class="px-3 px-sm-6 pt-0 p-md-3">
        <div class="pt-4 pb-8 d-none d-md-block" v-if="itemDetailsData['categoria'] !== 'Remate'">
          <v-btn depressed color="bm-medium px-4" @click="goToContact(itemDetailsData.id)">
            Solicitar informaci&oacute;n
            <v-icon right class="icon-btn-arrow"></v-icon>
          </v-btn>
        </div>
        <div v-if="itemDetailsData['categoria'] !== 'Remate'">
          <div class="d-flex d-md-block">
            <DataField label="Contacto telefónico" :text="contactData['phoneContact']" class="pb-6" />
            <DataField label="Correo electrónico" :text="contactData['emailContact']" class="pb-6" />
          </div>
          <WhatsappLink :phone="contactData['phoneContact']" />
        </div>
        <div class="py-6 px-2 d-md-none" v-if="itemDetailsData['categoria'] !== 'Remate'">
          <v-btn depressed color="bm-medium px-4" @click="goToContact(itemDetailsData.id)">
            Solicitar informaci&oacute;n
            <v-icon right class="icon-btn-arrow"></v-icon>
          </v-btn>
        </div>
        <div class="d-md-none">
          <div v-if="showMore">
            <DataField label="Descripción" :text="itemDetailsData['descripcion']" class="pb-6"/>
            <div v-if="itemDetailsData['categoria'] !== 'Remate'" class="d-flex">
              <div class="d-flex flex-column">
                <DataField label="Tipo de bien" :text="itemDetailsData['tipoBien']" class="pb-6"/>
                <DataField label="Superficie Construcción" :text="`${itemDetailsData['superficieConstruccion']} m2`" class="pb-6"/>
                <DataField label="Ciudad de pertenencia" :text="itemDetailsData['ciudad']" class="pr-16 mr-lg-14" />
              </div>
              <div class="d-flex flex-column">
                <DataField label="Superficie Terreno" :text="`${itemDetailsData['superficieTerreno']} m2`" class="pb-6"/>
                <DataField label="Código del bien" :text="itemDetailsData['codigo']" class="pb-6"/>
                <DataField label="Zona de la ciudad" :text="itemDetailsData['zona']+', '+itemDetailsData['ciudad']" class="pb-6"/>
              </div>
            </div>
            <div v-else class="d-flex">
              <div class="d-flex flex-column">
                <DataField label="Departamento" :text="itemDetailsData['departamento']" class="pb-6"/>
                <DataField label="Fecha y hora de remate" :text="parsedDate" class="pb-6"/>
              </div>
              <div class="d-flex flex-column">
                <DataField label="Juzgado" :text="itemDetailsData['juzgado']" class="pb-6"/>
                <DataField label="Datos martillero" :text="itemDetailsData['datosMartillero']" class="pb-6"/>
              </div>
              <div class="d-flex flex-column">
                <DataField label="Lugar de remate" :text="itemDetailsData['lugarRemate']" class="pb-6"/>
              </div>
            </div>
          </div>
          <v-container><v-divider></v-divider></v-container>
          <div class="text-center">
            <span
              class="strong-small-text cursor-pointer green-md-text"
              @click="showMore=!showMore"
            >
              {{showMore ? "Ver menos": "Ver más"}}
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import DataField from "@/components/DataField.vue";
import WhatsappLink from "@/components/WhatsappLink.vue";
import moment from "moment";

export default {
  components: {
    DataField,
    WhatsappLink
  },
  props: {
    itemDetailsData: Object,
    contactData: Object
  },
  computed: {
    
    parsedDate() {
      //console.log(moment(this.itemDetailsData['fechaHoraRemate']).utcOffset(0, false).format("DD/MM/YY - HH:mm A"))
      return  moment(this.itemDetailsData['fechaHoraRemate']).utcOffset(0, false).format("DD/MM/YY - HH:mm A");
    },
    constructionArea() {
      if(this.itemDetailsData['superficieConstruccion'] < 0) {
        return '';
      }
      return `${this.itemDetailsData['superficieConstruccion']} m2`;
    },
    groundArea() {
      if(this.itemDetailsData['superficieTerreno'] < 0) {
        return '';
      }
      return `${this.itemDetailsData['superficieTerreno']} m2`;
    },
    location() {
      if(!this.itemDetailsData['zona']) return '';
      if(this.itemDetailsData['zona'].length === 0) {
        return '';
      }
      return this.itemDetailsData['zona'];
    }
  },
  data() {
    return {
      showMore: false
    }
  },
  methods: {
    goToContact(id) {
      this.$router.push({
        path: `/AdditionalInfo/Contact?estateId=${id}`
        // path: "Contact",
        // query: { estateId: id }
      });
    },
    getCurrencySymbol(currency) {
      return {
        "DÓLARES": "$us",
        "BOLIVIANOS": "Bs."
      }[currency]
    }
  }
}
</script>
