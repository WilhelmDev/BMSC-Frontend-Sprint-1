<template>
  <v-tabs class="open-account-info pl-0 pl-md-16 pr-0 pr-md-14 panel-overlaped" :show-arrows="false">
    <v-tab
      v-for="(t,idx) in data.tabNames" :key="idx"
      class="strong-regular-text"
    >
      <div v-if="hasTab[idx]">{{ t }}</div>
    </v-tab>
    <v-tab-item v-for="(d, index) in data.tabs" :key="index">
      <v-row>
        <v-col md="6" cols="12">
          <CheckedList :items="data.tabs[index].requirements" />
        </v-col>
        <v-col cols="12" md="6" class="pl-0 pl-md-14 py-8 py-md-12">
          <LinksList :items="data.tabs[index].links" />
        </v-col>
      </v-row>
    </v-tab-item>
  </v-tabs>
</template>
<script>
import CheckedList from "@/components/CheckedList";
import LinksList from "@/components/LinksList";

export default {
  components: {
    CheckedList,
    LinksList
  },
  props: {
    data: Object
  },
  computed: {
    hasTab() {
      return this.data.tabs.map(tab => tab.requirements.length > 0 || tab.links.length > 0);
    }
  }
};
</script>
