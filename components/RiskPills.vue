<template>
  <div class="text-center my-8" v-if="riskPills">
    <div class="d-flex justify-center">
      <div
        v-for="(document, index) in riskPills.items"
        :key="index"
        class="download-badge d-flex cursor-pointer"
        @click="document.onClick(document)"
      >
        <v-icon class="icon-book green-md-text pr-4"></v-icon>
        <div class="my-auto">
          <div class="strong-regular-text green-text" v-html="document.title"></div>
          <div v-html="document.subTitle"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    riskPills: Object
  }
}
</script>
