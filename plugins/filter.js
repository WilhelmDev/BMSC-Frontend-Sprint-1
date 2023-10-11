import Vue from 'vue';

Vue.filter('formatDate', (value) => {
  const date = new Date(value);
  return date.toLocaleString(['es-BO'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
})
