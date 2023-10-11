<template>
  <div class="news-card" v-if="news.items.length > 0">
    <v-img
      :src="require(`@/assets/images/blog-icon.png`)"
      class="centered-icon"
    ></v-img>
    <h2 class="green-text mb-4 text-center" v-html="news.title"></h2>
    <div class="regular-text mb-4 text-center" v-html="news.description"></div>
    <div class="news-container">
      <BlogCard
        v-for="(card, i) in news.items" :key="i"
        :id="card.id"
        :blogType="card['category']['name']"
        :blogTitle="card['title']"
        :blogContent="card['summary']"
        :cardImage="card['imageUrl']"
        :alt="card['imgAlt1']"
        :eventName="''"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    news: Object
  },
  data() {
    return {
      model: 0
    };
  }
};
</script>
