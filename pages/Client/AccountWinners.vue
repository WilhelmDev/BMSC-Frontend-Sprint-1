<template>
  <div class="px-4 px-sm-16">
    <v-breadcrumbs
      :items="breadcrumbs"
      divider=">"
      class="px-0"
    ></v-breadcrumbs>
    <h2 class="black-text">Ganadores de la Súper Makro Cuenta</h2>
    <div class="search-input py-8">
      <v-icon class="icon-search"></v-icon>
      <input
        type="text"
        v-model="searchText"
        class="w-50"
        placeholder="Buscar"
      />
    </div>
    <v-data-table
      :headers="tableHeaders"
      :items="tableData"
      :search="search"
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
import {getHeader} from "~/utils/seo";

export default {
  data() {
    return {
      breadcrumbs: [
        {
          text: "Súper Makro Cuenta",
          disabled: false
        },
        {
          text: "Lista de ganadores",
          disabled: true
        }
      ],
      searchText: "",
      tableHeaders: [
        {
          text: "Fecha",
          value: "date",
          sortable: false,
          class: "strong-regular-text font-weight-bold"
        },
        {
          text: "Nombre del ganador",
          value: "name",
          sortable: false,
          class: "strong-regular-text font-weight-bold"
        },
        {
          text: "Cupón",
          value: "coupon",
          sortable: false,
          class: "strong-regular-text font-weight-bold"
        },
        {
          text: "Monto",
          value: "amount",
          sortable: false,
          class: "strong-regular-text font-weight-bold"
        }
      ],
      tableData: [
        {
          date: "16/10/2020",
          name: "Claudia Susana Gutierrez Cortez",
          coupon: "4882291",
          amount: "50.000,00 Bs"
        },
        {
          date: "12/10/2020",
          name: "Sergio Silva Baltazar",
          coupon: "3483591",
          amount: "20.000,00 Bs"
        },
        {
          date: "12/10/2020",
          name: "David Juan Coca Antezana",
          coupon: "3371595",
          amount: "20.000,00 Bs"
        },
        {
          date: "10/10/2020",
          name: "Alvaro Ismael Orozco Salas",
          coupon: "3283856",
          amount: "10.000,00 Bs"
        },
        {
          date: "01/10/2020",
          name: "Gonzalo Gaston Ramallo Diaz",
          coupon: "3048359",
          amount: "10.000,00 Bs"
        }
      ]
    };
  },
  async asyncData(context) {
    const header = await getHeader(context);

    return header;
  },
  head () {return this.headData}
};
</script>
