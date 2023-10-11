<template>
  <div>
    <v-container class="text-center">
      <OptionsPanel :data="titleData" />
    </v-container>
    <Benefits :benefitsData="benefitsData"/>
    <Programs
      v-for="(program, i) in programsData.items"
      :key="i+'-program-1'"
      :programTitle="program.title"
      :programContent="program.subTitle"
      :programLink="program.description"
      :programImage="program.mainImageUrl"
      :alt="program.imgAlt1"
      :background="i%2 !== 0 ? 'blurred' : ''"
      :isImageInLeft="i%2 === 0 && true"
      :programImage2="program.secondImageUrl"
      :onClickLink="program.buttonHref"
    />
    <Benefits :benefitsData="benefitsData2"/>
    <Programs
      v-for="(program, i) in programsData2.items"
      :key="i+'-program-2'"
      :programTitle="program.title"
      :programContent="program.subTitle"
      :programLink="program.description"
      :programImage="program.mainImageUrl"
      :alt="program.imgAlt1"
      :background="i%2 !== 0 ? 'blurred' : ''"
      :isImageInLeft="i%2 === 0 && true"
      :programImage2="program.secondImageUrl"
      :onClickLink="program.buttonHref"
    />
    <div class="py-sm-4 py-md-16" style="display: none">
      <RelatedPanel :items="relatedItems.items" />
    </div>
    <v-container>
      <v-divider></v-divider>
    </v-container>
    <MoreInfo
      v-bind="moreInfoConfig"
      class="py-16"
    />
  </div>
</template>
<script>
import OptionsPanel from "@/components/OptionsPanel.vue";
import Programs from "@/components/Programs.vue";
import Benefits from "@/components/Benefits.vue";
import RelatedPanel from "@/components/RelatedPanel.vue";
import MoreInfo from "@/components/MoreInfo.vue";
import {UPDATE_STATE_ACTION} from "@/constants_actions";
import {
  TITLE,
  BENEFITS,
  PROGRAMS,
  BENEFITS2,
  PROGRAMS2
} from "~/cardListKeys/benefit";
import {getHeader} from "~/utils/seo";

export default {
  components: {
    OptionsPanel,
    Programs,
    Benefits,
    RelatedPanel,
    MoreInfo
  },
  data() {
    return {
      // titleData: {
      //   items: [
      //     {
      //       title: "Benefecios con B",
      //       mainImageUrl: require("@/assets/images/account.svg"),
      //       subTitle: "Como cliente del Banco Mercantil Santa Cruz siempre tienes grandes beneficios. Te invitamos a descubrir todas las ventajas que te damos y la forma cómo premiamos tu fidelidad."
      //     }
      //   ]
      // },
      // benefitsData: {
      //   items: [
      //     {
      //       title: "Incluidos en tu cuenta",
      //       description: "Sin importar la que elijas"
      //     }
      //   ]
      // },
      // programsData: {
      //   items: [
      //     {
      //       title: "Club de puntos",
      //       subTitle:"",
      //       description: "",
      //       mainImageUrl: ""
      //     }
      //   ]
      // },
      // benefitsData2: {
      //   items: [
      //     {
      //       title: "Te atendemos 24/7",
      //       description: " Sabemos que tu vida continúa fuera del horario de oficina, por eso tenemos habilitados nuestros canales de atención las 24 horas del día, los 7 días de la semana."
      //     }
      //   ]
      // },
      // programsData2: {
      //   items: [
      //     {
      //       title: "Club de puntos",
      //       subTitle:"",
      //       description: "",
      //       mainImageUrl: ""
      //     }
      //   ]
      // },
      relatedItems: {
        items: [
          {
            title: "Cuentas BANX para jóvenes",
            subTitle: "Ver opciones",
            route: "/banx"
          },
          {
            title: "Cuentas para negocios PYME",
            subTitle: "Ver opciones",
            route: "/pyme"
          },
          {
            title: "Cuentas corporativas para tu empresa",
            subTitle: "Ver opciones",
            route: "/companies"
          },
          {
            title: "Prestamos para tu casa o vehículo",
            subTitle: "Ver préstamos",
            route: "/client/Loans"
          }
        ]
      },
      moreInfoConfig: {
        moreInfoTitle: "¿Necesitas más información?",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
        cardIcon2: "icon-chat",
        cardLabel2: "Central de consultas",
        cardIcon3: "icon-play",
        cardLabel3: "Tutoriales: Banca por internet"
      }
    }
  },
  async mounted() {

  },
  computed: {
    titleData: function () {
      let res = {
        items: this.$store.getters["benefit/getList"](TITLE)
      }
      //console.log(TITLE, res);
      return res;
    },
    benefitsData: function () {
      let res = {
        items: this.$store.getters["benefit/getList"](BENEFITS)
      }
      //console.log(BENEFITS, res);
      return res;
    },
    programsData: function () {
      let res = {
        items: this.$store.getters["benefit/getList"](PROGRAMS)
      }
      //console.log(PROGRAMS, res);
      return res;
    },
    benefitsData2: function () {
      let res = {
        items: this.$store.getters["benefit/getList"](BENEFITS2)
      }
      //console.log(BENEFITS2, res);
      return res;
    },
    programsData2: function () {
      let res = {
        items: this.$store.getters["benefit/getList"](PROGRAMS2)
      }
      //console.log(PROGRAMS2, res);
      return res;
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    await context.store.dispatch(`benefit/${UPDATE_STATE_ACTION}`, TITLE);
    await context.store.dispatch(`benefit/${UPDATE_STATE_ACTION}`, BENEFITS);
    await context.store.dispatch(`benefit/${UPDATE_STATE_ACTION}`, PROGRAMS);
    await context.store.dispatch(`benefit/${UPDATE_STATE_ACTION}`, BENEFITS2);
    await context.store.dispatch(`benefit/${UPDATE_STATE_ACTION}`, PROGRAMS2);
    return header;
  },
  head () {return this.headData}
}
</script>
