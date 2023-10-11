<template>
  <div :class="`${ns}`" v-if="notEmpty">
    <h2 :class="`${ns}__bracket`" :style="'color: ' + bracketColor">[</h2>
    {{ " " }}
    <span :class="`${ns}__text1`" v-html="text1"/>
    <br v-if="newLine" />{{ " " }}
    <span :class="`${ns}__text2`" v-html="text2"/>
    {{ " " }}
    <h2 :class="`${ns}__bracket`" :style="'color: ' + bracketColor">]</h2>
  </div>
</template>

<script>
export default {
  name: "BracketBanx",
  props: {
    text1: String,
    text2: String,
    bracketColor: String,
    newLine: Boolean
  },
  data() {
    return {
      ns: "bracket-banx"
    };
  },
  computed: {
    notEmpty() {
      let t1 = this.text1 && this.text1.length > 0;
      let t2 = this.text2 && this.text2.length > 0;
      return t1 || t2;
    }
  }
};
</script>
