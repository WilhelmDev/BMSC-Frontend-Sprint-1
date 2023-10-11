<template>
  <div>
    <v-icon class="icon-chat green-md-text"></v-icon>
    <a
      icon
      :href="
        `https://api.whatsapp.com/send?phone=${phone}&text=%20`
      "
      target="_blank"
      class="green-md-text"
    >
      Whatsapp
    </a>
  </div>
</template>
<script>
export default {
  props: {
    phone: String
  }
}
</script>