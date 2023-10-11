<template>
  <div class="app-store-button">
    <a
      icon
      :href="
        'https://play.google.com/store/apps/details?id=bo.com.bmsc.bancamovil'
      "
      target="_blank"
    >
      <v-img
        :src="require(`@/assets/images/google-store.png`)"
        class="cursor-pointer"
        alt="google-play"
      />
    </a>
  </div>
</template>
