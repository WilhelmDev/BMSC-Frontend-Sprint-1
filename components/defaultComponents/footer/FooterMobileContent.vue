<template>
  <div class="bm-footer-mobile">
    <div class="bm-footer-mobile__content">
    <v-container>
      <v-row class="justify-center">
        <router-link :to="{ path: '/' }" class="text-decoration-none">
          <div class="pb-5">
            <img
              height="57"
              width="250"
              :src="require('@/assets/images/bmsc-logo.svg')"
            />
          </div>
        </router-link>
      </v-row>
      <v-row class="justify-center">
        <div>
          <v-expansion-panels flat tile dark v-model="aboutPanel">
            <v-expansion-panel class="expansion-card">
              <v-expansion-panel-header
                color="#1D3D2C"
                class="expansion-card__header"
              >
                <div class="d-inline-flex cls-div-eh">
                  <span class="mobile-regular-text">Sobre el Banco</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content
                color="#1D3D2C"
                class="expansion-card__content"
              >
                <router-link :to="{ name: 'AboutUs' }" class="text-decoration-none text-center">
                  <small class="heavy-font">Sobre Nosotros</small>
                </router-link>
                <a href="https://www.fundacionbmsc.com.bo" target="_blank" class="text-decoration-none text-center">
                  <small class="heavy-font">Fundaci&oacute;n BMSC</small>
                </a>
                <a href="https://postulate.evaluar.com/" class="text-decoration-none text-center">
                  <small class="heavy-font">Súmate a Nuestro Equipo</small>
                </a>
                <router-link :to="{ path: 'AboutUs/RSE' }" class="text-decoration-none text-center">
                  <small class="heavy-font">RSE</small>
                </router-link>
                <router-link :to="{ path: '/Client/Blog' }" class="text-decoration-none text-center">
                  <small class="heavy-font">Noticias Institucionales</small>
                </router-link>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-row>
      <v-row class="justify-center">
        <div>
          <v-expansion-panels flat tile dark v-model="helpPanel">
            <v-expansion-panel class="expansion-card">
              <v-expansion-panel-header
                color="#1D3D2C"
                class="expansion-card__header"
              >
                <div class="d-inline-flex cls-div-eh">
                  <span class="mobile-regular-text">Ayuda</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content
                color="#1D3D2C"
                class="expansion-card__content"
              >
                <router-link :to="{ path: '/help/questions' }" class="text-decoration-none text-center">
                  <small class="heavy-font">Preguntas Frecuentes</small>
                </router-link>
                <router-link :to="{ name: 'Help' }" class="text-decoration-none text-center">
                  <small class="heavy-font">Punto de Reclamo</small>
                </router-link>
                <router-link :to="{ name: 'SiteMap' }" class="text-decoration-none text-center">
                  <small class="heavy-font">Mapa de Sitio</small>
                </router-link>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-row>
      <v-row class="justify-center">
        <div>
          <v-expansion-panels flat tile dark v-model="othersPanel">
            <v-expansion-panel class="expansion-card">
              <v-expansion-panel-header
                color="#1D3D2C"
                class="expansion-card__header"
              >
                <div class="d-inline-flex cls-div-eh">
                  <span class="mobile-regular-text">Otra Informaci&oacute;n</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content
                color="#1D3D2C"
                class="expansion-card__content"
              >
                <div class="text-center">
                  <small
                    class="heavy-font cursor-pointer"
                    @click="$router.push({path: '/AdditionalInfo'})"
                  > Informaci&oacute;n Adicional
                  </small>
                  <small
                    class="heavy-font cursor-pointer"
                    @click="$router.push({path: '/AdditionalInfo/tariffs'})"
                  > Tasas y Tarifario
                  </small>
                  <small
                    class="heavy-font cursor-pointer"
                    @click="$router.push({path: '/AdditionalInfo/estate'})"
                  > Venta y Remate de Bienes
                  </small>
                  <small
                    class="heavy-font cursor-pointer"
                    @click="$router.push({path: '/insuranceDetails?key=consejos-seguridad-detalle'})"
                  > Consejos de Seguridad
                  </small>
                  <small
                    class="heavy-font cursor-pointer"
                    @click="$router.push({path: '/insuranceDetails?key=licitaciones-publicas-detalle'})"
                  > Licitaciones p&uacute;blicas
                  </small>
                  <small class="heavy-font" style="display: none"
                    @click="$router.push({path: '/AdditionalInfo'})"
                  >
                    Registro de proveedores
                  </small>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-row>
      <v-row class="justify-center">
        <div>
          <v-expansion-panels flat tile dark v-model="educationPanel">
            <v-expansion-panel class="expansion-card">
              <v-expansion-panel-header
                color="#1D3D2C"
                class="expansion-card__header"
              >
                <div class="d-inline-flex cls-div-eh">
                  <span class="mobile-regular-text">Educaci&oacute;n</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content
                color="#1D3D2C"
                class="expansion-card__content"
              >
                <router-link :to="{ path: '/AboutUs/RSE#tutorials' }" class="text-decoration-none">
                  <div class="text-decoration-none text-center">
                    <small class="heavy-font">Educaci&oacute;n financiera</small>
                  </div>
                </router-link>
                <a href="https://www.descubre.bo/" target="blank" class="text-decoration-none text-center">
                  <small class="heavy-font">DESCUBRE</small>
                </a>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-row>
      <v-row class="justify-center">
        <div class="pt-5">
          <a href="https://www.fundacionbmsc.com.bo/" target="_blank" class="text-decoration-none">
            <v-img
              :src="require('@/assets/images/fundacionmsc.svg')"
            ></v-img>
          </a>
        </div>
      </v-row>
      <v-row class="justify-center">
        <div class="pt-7">
          <a href="https://www.descubre.bo/" target="_blank" class="text-decoration-none">
            <v-img
              :src="require('@/assets/images/descubre.svg')"
            ></v-img>
          </a>
        </div>
      </v-row>
      <v-row class="justify-center">
        <div class="d-flex pt-4 pb-7">
          <div class="px-1">
            <a href="https://www.visa.com.bo/pague-con-visa/tecnologias-presentadas/vf.html" target="_blank" class="text-decoration-none">
              <v-img :src="require('@/assets/images/visa_master_secure.png')"></v-img>
            </a>
          </div>
          <div class="px-1">
            <a href="https://www.mastercard.es/es-es/establecimientos/seguridad-y-proteccion/mastercard-securecode.html" target="_blank" class="text-decoration-none">
              <v-img :src="require('@/assets/images/master_secure.png')"></v-img>
            </a>
          </div>
        </div>
      </v-row>
    </v-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aboutPanel: null,
      helpPanel: null,
      othersPanel: null,
      educationPanel: null
    };
  },
  methods: {
    closeAllPanels() {
      this.aboutPanel = null;
      this.helpPanel = null;
      this.othersPanel = null;
      this.educationPanel = null;
    }
  }
};
</script>
