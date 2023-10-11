<template>
  <div class="bm-card bm-card__blog">
    <div class="image-container"><v-img :src="cardImage" class="image" :alt="alt"></v-img></div>
    <div class="py-5 px-0">
      <span class="blog-type small">{{ blogType }}</span>
      <h5 class="mb-8">{{ blogTitle }}</h5>
      <span class="read-more regular-text" @click="readMore">
        Leer más<v-icon right class="read-more icon-btn-arrow"/>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogCard",
  components: {},
  props: {
    id: Number,
    blogType: String,
    blogTitle: String,
    blogContent: String,
    cardImage: String,
    alt: String,
    eventName: String,
  },
  data() {
    return {};
  },
  methods: {
    readMore() {
      let path = `/blogDetails?entryId=${this.id}`;
      this.$router.push({
        path
      });
    }
  }
};
</script>
