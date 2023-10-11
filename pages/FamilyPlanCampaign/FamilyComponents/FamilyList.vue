<template>
    <div :class="`${ns} px-4 px-sm-16`">
      <h2 class="black-text">Integrantes del grupo familiar {{ familyName }}</h2>
      <v-data-table
        :headers="tableHeaders"
        :items="peopleData"
        hide-default-footer
        v-data-table
      >
        <template slot="no-data">
          No hay información
        </template>
        <template v-slot:[`item.name`]="{ item }">
          <span class="font-weight-bold">{{ item.name }}</span>
        </template>
      </v-data-table>
  
    </div>
  </template>
  <script>
  
  export default {
    name: "",
    components: {},
    props: {
      peopleData: Array,
      familyName: String
    },
    data() {
      return {
        ns:"accountWinners",
        tableHeaders: [
          {
            text: "Nombres",
            value: "nombres",
            sortable: false,
            class: "strong-regular-text font-weight-bold"
          },
          {
            text: "Apellido Paterno",
            value: "apellidoPaterno",
            sortable: false,
            class: "strong-regular-text font-weight-bold"
          },
          {
            text: "Apellido Materno",
            value: "apellidoMaterno",
            sortable: false,
            class: "strong-regular-text font-weight-bold"
          },
          {
            text: "Rol",
            value: "rol.nombre",
            sortable: false,
            class: "strong-regular-text font-weight-bold"
          }
        ]
      };
    },
  };
  </script>
  