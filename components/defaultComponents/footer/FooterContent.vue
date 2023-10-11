<template>
  <div class="footer-content">
    <div class="d-flex justify-space-between">
      <div>
        <router-link :to="{ path: '/' }" class="text-decoration-none">
          <img :src="require('@/assets/images/bmsc-logo.svg')"/>
        </router-link>
        <div class="regular-text bold-font py-2">Aviso Legal</div>
        <a href="https://www.asfi.gob.bo/" target="_blank" class="text-decoration-none">
          <div class="regular-text py-2">Asfi</div>
        </a>
        <div class="regular-text py-2 cursor-pointer"
          @click="$router.push({path: '/AdditionalInfo'})">Reglamentos Normativos</div>
      </div>
      <div>
        <div class="regular-text bold-font">Sobre el Banco</div>
        <router-link :to="{ name: 'AboutUs' }" class="text-decoration-none">
          <small class="medium-font">Sobre Nosotros</small>
        </router-link>
        <a href="https://www.fundacionbmsc.com.bo" target="_blank" class="text-decoration-none">
          <small class="medium-font">Fundaci&oacute;n BMSC</small>
        </a>
        <a href="https://postulate.evaluar.com/" target="_blank" class="text-decoration-none">
          <small class="medium-font">Súmate a Nuestro Equipo</small>
        </a>
        <router-link :to="{ path: '/AboutUs/RSE' }" class="text-decoration-none">
          <small class="medium-font">RSE</small>
        </router-link>
        <router-link :to="{ path: '/Client/Blog' }" class="text-decoration-none">
          <small class="medium-font">Noticias Institucionales</small>
        </router-link>
        <div class="regular-text bold-font pt-4">Ayuda</div>
        <router-link :to="{ path: '/help/questions' }" class="text-decoration-none">
        <small class="medium-font">Preguntas Frecuentes</small>
        </router-link>
        <router-link :to="{ name: 'Help' }" class="text-decoration-none">
        <small class="medium-font">Punto de Reclamo</small>
        </router-link>
        <router-link :to="{ name: 'SiteMap' }" class="text-decoration-none">
          <small class="medium-font">Mapa de Sitio</small>
        </router-link>
      </div>
      <div>
        <div class="regular-text bold-font">Otra Informaci&oacute;n</div>
        <small
          class="medium-font cursor-pointer"
          @click="$router.push({path: '/AdditionalInfo'})"
        > Informaci&oacute;n Adicional
        </small>
        <small
          class="medium-font cursor-pointer"
          @click="$router.push({path: '/AdditionalInfo/tariffs'})"
        > Tasas y Tarifario
        </small>
        <small
          class="medium-font cursor-pointer"
          @click="$router.push({path: '/AdditionalInfo/estate'})"
        > Venta y Remate de Bienes
        </small>
        <small
          class="medium-font cursor-pointer"
          @click="$router.push({path: '/insuranceDetails?key=consejos-seguridad-detalle'})"
        > Consejos de Seguridad
        </small>
        <small
          class="medium-font cursor-pointer"
          @click="$router.push({path: '/insuranceDetails?key=licitaciones-publicas-detalle'})"
        > Licitaciones Públicas
        </small>
        <small
          class="medium-font cursor-pointer"
          style="display: none"
          @click="$router.push({path: '/AdditionalInfo'})">
          Registro de Proveedores
        </small>
        <div class="regular-text bold-font pt-4">Educaci&oacute;n</div>
        <router-link :to="{ path: '/AboutUs/RSE#tutorials' }" class="text-decoration-none">
          <small class="medium-font">Educaci&oacute;n Financiera</small>
        </router-link>
        <a href="https://www.descubre.bo/" target="_blank" class="text-decoration-none">
        <small class="medium-font">DESCUBRE</small>
        </a>
      </div>
      <div>
        <div>
          <a href="https://www.fundacionbmsc.com.bo/" target="_blank" class="text-decoration-none">
            <v-img :src="require('@/assets/images/fundacionmsc.svg')"></v-img>
          </a>
        </div>
        <div class="mt-12">
          <a href="https://www.descubre.bo/" target="_blank" class="text-decoration-none">
            <v-img :src="require('@/assets/images/descubre.svg')"></v-img>
          </a>
        </div>
        <div class="d-flex mt-10">
          <div class="px-2">
            <a href="https://www.visa.com.bo/pague-con-visa/tecnologias-presentadas/vf.html" target="_blank" class="text-decoration-none">
              <v-img :src="require('@/assets/images/visa_master_secure.png')"></v-img>
            </a>
          </div>
          <div class="px-2">
            <a href="https://www.mastercard.es/es-es/establecimientos/seguridad-y-proteccion/mastercard-securecode.html" target="_blank" class="text-decoration-none">
              <v-img :src="require('@/assets/images/master_secure.png')"></v-img>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
