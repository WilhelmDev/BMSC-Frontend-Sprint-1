<template>
  <v-expansion-panels flat class="bm-expansion-panel">
    <v-expansion-panel @click="onExpandedChange">
      <v-expansion-panel-header class="pl-0">
        <div class="d-block">
          <div class="small-text">
            {{data.titulo}}
            <span v-if="data.esPrincipal" class="strong-small-text">- Oficina principal</span>
          </div>
          <div class="strong-regular-text">{{data.direccion}}</div>
          <div>
            <span :class="{
                'strong-small-text green-md-text': data.state !== 'Cerrado',
                'strong-small-text error-red-text': data.state === 'Cerrado'
              }">{{data.state}}: </span>
            <span class="small-text">{{data.hour}}</span>
          </div>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="d-flex">
          <div class="icon-time gold-text pr-2"></div>
          <div class="d-flex flex-column">
            <div v-for="(horario, index) in data.horarios" :key="`horario-${index}`" class="pb-2">
              <div class="small-text"> {{ horario.split(",")[0] }} </div>
              <div> {{ (horario.split(",")[1]).replace("00:00 a 23:59", "24 horas") }} </div>
            </div>
          </div>
        </div>
        <div class="d-flex pt-4" v-if="data.telefono">
          <div class="icon-phone gold-text pr-2"></div>
          <div> {{ data.telefono }} </div>
        </div>
        <div class="d-flex pt-4" v-if="data.telefonoEmergencia">
          <div class="icon-phone gold-text pr-2"></div>
          <div> {{ data.telefonoEmergencia }} </div>
        </div>
        <div class="small-text more-info pt-6" v-if="data.type === 'oficinas'">
          <div>
            <div class="strong-small-text"> Servicios ofertados </div>
            <div> {{ data.serviciosOfertados }} </div>
          </div>
          <div class="pt-2">
            <span class="strong-small-text"> Autobanco: </span>
            <span> {{ data.esAutoBanco ? 'Si' : 'No' }} </span>
          </div>
          <div class="pt-2">
            <span class="strong-small-text"> POS: </span>
            <span> {{ data.pos && data.pos.toLowerCase() === 'si' ? 'Si' : 'No' }} </span>
          </div>
        </div>
        <div class="small-text more-info pt-6" v-if="data.type === 'cajeros'">
          <div>
            <div class="strong-small-text"> Servicios ofertados </div>
            <div> {{ data.serviciosOfertados }} </div>
          </div>
          <div class="pt-2">
            <div class="strong-small-text"> Monedas disponibles </div>
            <div> {{ data.monedasDisponibles }} </div>
          </div>
          <div class="pt-2">
            <span class="strong-small-text"> Dep&oacute;sito en efectivo: </span>
            <span> {{ data.depositoEfectivo ? 'Si' : 'No' }} </span>
          </div>
          <div class="pt-2">
            <span class="strong-small-text"> Dep&oacute;sito en cheque: </span>
            <span> {{ data.depositoCheque ? 'Si' : 'No' }} </span>
          </div>
          <div class="pt-2">
            <span class="strong-small-text"> Para personas con discapacidades: </span>
            <span> {{ data.discapacitados ? 'Si' : 'No' }} </span>
          </div>
        </div>
      </v-expansion-panel-content>
      <v-divider></v-divider>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  props: {
    data: Object,
    onExpandedChange: Function
  }
};
</script>