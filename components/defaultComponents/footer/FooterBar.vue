<template>
  <v-row align="center" class="footer-bar mr-0 ml-0">
    <v-col cols="11" sm="6" offset="1" offset-sm="1">
      <v-row>
        <v-col
          sm="11"
          md="12"
          lg="12"
          offset-sm="1"
          offset-md="0"
          offset-lg="0"
        >
          <v-row justify="start" no-gutters class="mb-2">
            <v-col class="white-text">
              Todos los Derechos Reservados {{ new Date().getFullYear() }} -
              Banco Mercantil Santa Cruz S.A.
            </v-col>
          </v-row>
          <v-row justify="start" no-gutters>
            <div class="white-text">Entidad supervisada por ASFI.</div>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="11" sm="4" offset="1" offset-sm="1">
      <v-row justify-sm="center" align="center" justify="start">
        <a href="https://www.facebook.com/BancoMercantilSantaCruz/" target="_blank" class="text-decoration-none">
          <v-icon
            class="icon-facebook px-2 cursor-pointer"
          ></v-icon>
          </a>
        <a href="https://www.instagram.com/bancomercantil/?hl=es-la" target="_blank" class="text-decoration-none">
          <v-icon
            class="icon-instagram px-2 cursor-pointer"
          ></v-icon>
          </a>
        <a href="https://www.youtube.com/user/BancoMercantilSC" target="_blank" class="text-decoration-none">
          <v-icon
            class="icon-play px-2 cursor-pointer"
          ></v-icon>
        </a>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {};
</script>
