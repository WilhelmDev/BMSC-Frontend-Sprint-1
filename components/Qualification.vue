<template>
  <div class="risk-qualifications my-8" v-if="qualificationsData">
    <h2 class="text-center my-4 title" v-html="qualificationsData.title"></h2>
    <div class="big-text text-center" v-html="qualificationsData.subTitle"></div>
    <v-data-table
      :headers="qualificationsData.headers"
      :items="qualificationsData.items"
      :hide-default-header="true"
      hide-default-footer
      class="my-6"
    >
      <template v-slot:header="data">
        <thead class="v-data-table-header">
          <tr>
            <th v-for="(header, headerIndex) in data.props.headers"
                :key="headerIndex"
                v-html="header.text"
                class="text-start"
                role="columnheader">
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:body="props">
        <tbody>
          <tr v-for="(item, index) in props.items" :key="index">
            <td v-for="(header, headerIndex) in props.headers"
                :key="headerIndex"
                v-html="item[header.value]"
                class="text-start">
            </td>
          </tr>
        </tbody>
      </template>

      <template slot="no-data">
        No hay información
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props:{
    qualificationsData: Object
  }
}
</script>
