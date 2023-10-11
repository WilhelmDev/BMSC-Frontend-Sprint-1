<template>
  <SiteMap/>
</template>
<script>

import {getHeader} from "~/utils/seo";

export default {
  data() {
    return {}
  },
  async asyncData(context) {
    const header = await getHeader(context);

    return header;
  },
  head () {return this.headData}
}
</script>
