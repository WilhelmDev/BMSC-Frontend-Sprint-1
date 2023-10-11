import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

export default (context) => {
  const key = context.$config.googleMapsApiKey;
  Vue.use(VueGoogleMaps, {
    load: {
      key: key,
      libraries: "places"
    }
  });
}
