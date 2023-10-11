<template>
  <v-row v-if="detailsData" class="d-block d-md-flex align-center details-card mb-5" align="center">
    <div v-if="detailsData && detailsData.htmlString" class="py-6 px-16" v-html="detailsData.htmlString" />
    <v-col cols="12" sm="6" v-else class="left-container py-6 px-6 pl-md-8 px-lg-16">
      <BracketBanx v-if="detailsData.isBanx" :text1="detailsData.title" :text2="detailsData.subTitle"
        :bracketColor="'#A7D342'" :newLine="true" />
      <div v-else>
        <h1 v-html="detailsData.title" />
        <h3 v-html="detailsData.subTitle" />
      </div>
      <div class="big-text pr-md-16" style="text-align: justify">
        {{ detailsData.description }}
      </div>
      <!-- FORM CLIENTES FASSIL -->
      <div v-if="currentUrl === '?key=detalle-beneficio-dos'">
        <div class="white-box pa-4 my-2">
          <div>
            <h6 class="black-text mb-2">Selección el tipo de persona</h6>
            <v-radio-group v-model="radios" row>
              <v-radio label="Natural" value="natural"></v-radio>
              <v-radio label="Jurídico" value="juridico"></v-radio>
            </v-radio-group>
          </div>
          <div style="margin-bottom: -1rem" class="d-flex">
            <div class="mr-10">
              <h6 class="black-text mb-2">
                Ingresa tu carnet de identidad o NIT
              </h6>
              <v-text-field style="width: 200px" v-model="documentNumber" label="Ej.: 1234567LP" required solo
                class="bm-text-field"></v-text-field>
            </div>
            <div :hidden="!naturalPerson">
              <h6 class="black-text mb-2">Ingresa tu fecha de nacimiento</h6>
              <datepicker placeholder="DD/MM/YYYY" format="dd/MM/yyyy" v-model="date_today" :language="es"
                class="bm-text-field"></datepicker>
            </div>
          </div>
          <div>
            <recaptcha @error="captchaIsNotOk" @success="captchaIsSuccessfullyDone" @expired="captchaIsNotOk" />
          </div>
          <v-btn class="mt-3" color="bm-light" @click="getClients" :disabled="!formReady">Consultar <v-icon
              class="icon-btn-arrow"></v-icon></v-btn>
        </div>
        <v-dialog persistent class="modal-container" v-model="dialog" max-width="650" style="z-index: 1001">
          <v-card class="pb-8 pl-8 pr-8">
            <v-btn icon light @click="dialog = false" style="margin-left: 550px">
              <v-icon>mdi-close</v-icon>
            </v-btn>

            <p v-if="loading">Cargando...</p>
            <h2 v-if="getData[0].cliente_bmsc" class="mb-8 mt-2" style="text-align: center">
              ¡Bienvenido al Banco Mercantil Santa Cruz!
            </h2>
            <h2 v-if="getData[0].cliente_bmsc === null" class="mb-8 mt-2" style="text-align: center">
              Banco Mercantil Santa Cruz te informa
            </h2>
            <!-- NO SE ENCUENTRA ASIGNADO A BMSC -->
            <div v-if="error">
              <p>
                No te encontramos en nuestra lista. Sin embargo, nos encantaría
                tenerte como cliente, por lo que te invitamos a abrir una cuenta
                100% online en menos de 10 minutos
                <a href="https://cyco.bmsc.com.bo/" target="_blank">AQUÍ</a>
              </p>
              <p>¡Recibirás la Tarjeta de Débito GRATIS!</p>
              <p>
                Para mayor información puedes consultar en el portal web de
                <a href="https://www.asfi.gob.bo">ASFI</a>
              </p>
            </div>
            <!-- CLIENTE NUEVO -->
            <div v-if="getData[0].cliente_bmsc === 'NO'">
              <!--<p>
              <strong>{{ getData[0].nombre_persona }}</strong
              >, tenemos el gusto de informarte que fuiste asignado al Banco
              Mercantil Santa Cruz. Nos complace darte la bienvenida.
            </p>
            <p>¡Muy pronto nos pondremos en contacto contigo!</p>-->

              <p>
                <strong>{{ getData[0].nombre_persona }}</strong>, tenemos el gusto de informarte que fuiste asignado al
                Banco
                Mercantil Santa Cruz. Nos complace darte la
                bienvenida.
                Tienes registrados en el Banco los siguientes datos:
              </p>
              <p><strong>Teléfono: </strong>{{ getData[0].telefono_persona }}</p>
              <p><strong>Correo electrónico: </strong>{{ getData[0].email }}</p>

              <p>
                Puedes consultar el saldo de tu cuenta corriente o caja de ahorro migrada a través de nuestra Banca Móvil.
                Sigue el paso a paso para afiliarte <a target="_blank"
                  href="https://backportal.bmsc.com.bo:1443/api/bmsc-portal/reports/434/file">AQUÍ</a>(*)
              </p>
              <p>
                Realiza retiros de dinero en cajeros automáticos del BMSC sin tener una Tarjeta de Débito o ir a una
                agencia, a través de una transferencia a celular desde la Banca Móvil. Conoce el paso a paso <a
                  target="_blank" href="https://backportal.bmsc.com.bo:1443/api/bmsc-portal/reports/435/file">AQUÍ</a>(*)
              </p>
              <!-- MENSAJE PARA CLIENTE DE ALTO VALOR -->
              <p v-if="getData[0].alto_valor === 'SI'">
                Para consultar sobre tu crédito, comunícate con tu ejecutivo asignado
                <strong>{{ getData[0].nombre_ejecutivo }}</strong> con número de teléfono
                <strong>{{ getData[0].telefono_ejecutivo }}</strong>.
              </p>
              <!-- FIN DE MENSAJE PARA CLIENTE DE ALTO VALOR -->

              <p>
                Conoce las agencias habilitadas para la atención <a target="_blank"
                  href="https://backportal.bmsc.com.bo:1443/api/bmsc-portal/reports/441/file">AQUÍ</a>
              </p>

              <p>
                Si tienes dudas o consultas, comunícate con la línea gratuita <strong>800-17-0777</strong>
              </p>
              <p>
                * Aplica solo para Persona Natural.
              </p>
            </div>

            <!-- CLIENTE BMSC ANTIGUO -->
            <div v-if="getData[0].cliente_bmsc === 'SI'">
              <!-- <p>
             <strong>{{ getData[0].nombre_persona }}</strong>
              , tenemos el gusto de informarte que fuiste asignado al Banco
              Mercantil Santa Cruz.
            </p>
            <p>¡Muy pronto nos pondremos en contacto contigo!</p>-->

              <p>
                <strong>{{ getData[0].nombre_persona }}</strong>, tenemos el gusto de informarte que fuiste asignado al
                Banco Mercantil Santa Cruz y nos complace saber que ya eras parte de nuestra familia. Agradecemos la
                confianza depositada en nosotros. Tienes registrados en el Banco los siguientes datos:
              </p>
              <p><strong>Teléfono: </strong>{{ getData[0].telefono_persona }}</p>
              <p><strong>Correo electrónico: </strong>{{ getData[0].email }}</p>
              <p>
                Tu cuenta fue migrada a una nueva cuenta en el BMSC.
              </p>
              <p>
                Si tienes una Tarjeta de Débito en el BMSC activa, esta
                fue vinculada a tu nueva cuenta para que puedas realizar transacciones. Puedes consultar el saldo de tu
                cuenta corriente o caja de ahorro migrada a través de nuestra Banca Móvil.
                Sigue el paso a paso para afiliarte <a target="_blank"
                  href="https://backportal.bmsc.com.bo:1443/api/bmsc-portal/reports/434/file">AQUÍ</a>(*)
              </p>
              <p>
                Realiza retiros de dinero en cajeros automáticos del BMSC sin tener una Tarjeta de Débito o ir a una
                agencia, a través de una transferencia a celular desde la Banca Móvil. Conoce el paso a paso <a
                  target="_blank" href="https://backportal.bmsc.com.bo:1443/api/bmsc-portal/reports/435/file">AQUÍ</a>(*)
              </p>
              <!-- MENSAJE PARA CLIENTE DE ALTO VALOR -->
              <p v-if="getData[0].alto_valor === 'SI'">
                Para consultar sobre tu crédito, comunícate con tu ejecutivo asignado
                <strong>{{ getData[0].nombre_ejecutivo }}</strong> con número de teléfono
                <strong>{{ getData[0].telefono_ejecutivo }}</strong>.
              </p>
              <!-- FIN DE MENSAJE PARA CLIENTE DE ALTO VALOR -->
              <p>
                Puedes dirigirte a cualquier Agencia BMSC de tu ciudad, consulta la ubicación de nuestras agencias <a
                  target="_blank" href="https://www.bmsc.com.bo/help/agencies">AQUÍ</a>
              </p>
              <p>
                Si tienes dudas o consultas, comunícate con la línea gratuita <strong>800-17-0777</strong> o nuestra línea
                de WhatsApp <a target="_blank" href="https://wa.me/+59163770777"><strong>63770777</strong></a>
              </p>
              <p>
                * Aplica solo para Persona Natural.
              </p>
            </div>
          </v-card>
        </v-dialog>
      </div>
      <!-- FIN FORM CLIENTES FASSIL -->

      <div v-if="detailsData.buttonName" class="d-block d-lg-inline-flex mt-8">
        <v-btn depressed :color="normalizedOptions.buttonType" @click="executeClickLink(detailsData)">
          {{ detailsData.buttonName }}
          <v-icon right class="icon-btn-arrow"></v-icon>
        </v-btn>
        <div v-if="!detailsData.isBanx" class="mt-4 font-weight-bold pl-lg-5 my-lg-auto" width="50%">
          {{ detailsData.gradientText }}
        </div>
      </div>
    </v-col>
    <v-col cols="12" sm="6" class="px-6 pr-lg-16 image-container pb-3">
      <BoxAndImage v-if="detailsData.isBanx" :className="detailsData.gradient" :label="detailsData.gradientText"
        :image="detailsData.mainImageUrl" :alt="detailsData.imgAlt1" :direction="'bottom-left'" :xBox="'red'" />
      <div v-else style="min-height: 250px">
        <v-img style="max-height: 450px; max-width: 900px" :src="detailsData.mainImageUrl" :alt="detailsData.imgAlt1" />
      </div>
    </v-col>
  </v-row>
</template>
<script>
import BoxAndImage from '~/components/BoxAndImage';
import BracketBanx from '~/components/BracketBanx';
import { checkValidUrl } from '@/utils/urlUtil';
import axios from 'axios';
import { es } from 'vuejs-datepicker/dist/locale';

import * as CryptoJS from 'crypto-js';

const AES = require('crypto-js/aes');

export default {
  components: {
    BracketBanx,
    BoxAndImage,
    Datepicker: () =>
      process.client
        ? import('vuejs-datepicker')
        : Promise.resolve({ render: (h) => h('div') }),
  },
  data() {
    return {
      currentUrl: "",
      documentNumber: null,
      date_today: null,
      getData: [{ alto_valor: null, cliente_bmsc: null }],
      dialog: false,
      loading: false,
      requiredFieldsFilled: false,
      formReady: false,
      isCaptchaOk: false,
      error: false,
      es: es,
      radios: 'natural',
      naturalPerson: true,
    };
  },
  created() {
    this.currentUrl = window.location.search
  },
  props: {
    detailsData: {
      type: Object,
      default() {
        return {
          buttonMessage: '',
          buttonType: 'bm-light',
        };
      },
    },
  },
  watch: {
    currentUrl: function () {
      console.log("URL", this.currentUrl)
    },
    dialog: function () {
      if (this.dialog === false) {
        this.documentNumber = null;
        this.date_today = null;
        this.getData = [{ alto_valor: null, cliente_bmsc: null }];
        this.dialog = false;
        this.loading = false;
        this.requiredFieldsFilled = false;
        this.formReady = false;
        this.isCaptchaOk = false;
        this.radios = 'natural';
        this.naturalPerson = true;
        this.error = false;
      }
    },
    isCaptchaOk: function () {
      //console.log('Captch updated!');
      if (this.radios === 'natural') {
        if (this.isCaptchaOk && !(this.documentNumber && this.date_today)) {
          this.formReady = false;
        } else {
          this.formReady = true;
        }
      }

      if (this.radios === 'juridico') {
        if (this.isCaptchaOk && this.documentNumber) {
          this.formReady = true;
        } else {
          this.formReady = false;
        }
      }
    },
    radios: function () {
      if (this.radios === 'juridico') {
        this.naturalPerson = false;
      } else {
        this.naturalPerson = true;
      }
    },
    documentNumber: function () {
      if (this.radios === 'natural') {
        if (
          (this.documentNumber !== null || this.documentNumber !== '') &&
          this.date_today !== null &&
          this.isCaptchaOk
        ) {
          this.formReady = true;
        } else {
          this.formReady = false;
        }
      }

      if (this.radios === 'juridico') {
        if (
          (this.documentNumber !== null || this.documentNumber !== '') &&
          this.isCaptchaOk
        ) {
          this.formReady = true;
        } else {
          this.formReady = false;
        }
      }
    },
    date_today: function () {
      if (this.radios === 'natural') {
        if (
          this.documentNumber !== null &&
          this.date_today !== null &&
          this.isCaptchaOk
        ) {
          this.formReady = true;
        } else {
          this.formReady = false;
        }
      }
    },
  },
  computed: {
    normalizedOptions() {
      return Object.assign(
        {
          buttonMessage: '',
          buttonType: 'bm-light',
        },
        this.detailsData
      );
    },
  },
  methods: {
    executeClickLink(item) {
      if (checkValidUrl(item.buttonHref)) {
        window.open(item.buttonHref, '_blank');
      } else {
        this.$router.push({
          path: item.buttonHref,
        });
      }
    },
    async getClients() {
      try {
        this.dialog = true;
        this.loading = true;
        const fecha = new Date(this.date_today);
        let dia = fecha.getDate();
        dia = dia < 10 ? `0${dia}` : dia;
        let mes = fecha.getMonth() + 1;
        mes = mes < 10 ? `0${mes}` : mes;
        const anio = fecha.getFullYear();
        const fechaFormateada =
          this.radios === 'natural' ? `${dia}/${mes}/${anio}` : null;
        const body = {
          fecha_nac: fechaFormateada,
          docId: this.documentNumber
        }
        const response = await axios.post(
          `${process.env.SERVICES_BASE_URL}/api/bmscservices/cliente-fassil`, body,
          {
            headers: {
              'Content-Security-Policy': "default-src 'self'"
            }
          }
        );
        const decryptedData = await AES.decrypt(
          response.data,
          process.env.SECRET_KEY_FASSIL_FORM
        ).toString(CryptoJS.enc.Utf8);
        this.getData = JSON.parse(decryptedData);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = true;
        console.log(error);
      }
    },
    captchaIsNotOk() {
      this.isCaptchaOk = false;
    },
    captchaIsSuccessfullyDone() {
      this.isCaptchaOk = true;
    },
  },
};
</script>
