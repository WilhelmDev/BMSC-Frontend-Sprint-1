<template>
  <div>
    <v-carousel cycle height="58" hide-delimiters :show-arrows="false" show hide-delimiter-background interval="4400" class="slider sheet-carousel-lg">
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <div class="slide w-230">
                <strong class="bold-font">D&oacute;lar: </strong>
                <span class="px-slider">Compra: {{tipotre['compra']}}</span>
              </div>
              <v-badge color="#A7D342" dot offset-y="4"></v-badge>
              <div class="slide w-170">
                <span class="px-slider">Venta: {{tipotre['venta']}}</span>
              </div>
              <v-badge color="#A7D342" dot offset-y="4"></v-badge>
              <div class="slide w-200">
                <span class="px-slider">Oficial: {{tipotre['oficial']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <div class="slide w-255">
                <strong class="bold-font">UFV: </strong>
                <span class="px-slider">Compra: {{tipotre['ufvc']}}</span>
              </div>
              <v-badge color="#A7D342" dot offset-y="4"></v-badge>
              <div class="slide w-190">
                <span class="px-slider">Venta: {{tipotre['ufvv']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <div class="slide w-230">
                <strong class="bold-font">TRe: </strong>
                <span class="px-slider">ME: {{tipotre['tre']}}</span>
              </div>
              <v-badge color="#A7D342" dot offset-y="4" class="pb-1"></v-badge>
              <div class="slide w-230">
                <span class="px-slider">MN: {{tipotre['tremn']}}</span>
              </div>
              <v-badge color="#A7D342" dot offset-y="4" class="pb-1"></v-badge>
              <div class="slide w-155">
                <span class="px-slider">MV: {{tipotre['tremv']}}</span>
              </div>
              <v-badge color="#A7D342" dot offset-y="4" class="pb-1"></v-badge>
              <div class="slide w-155">
                <span class="px-slider">UFV: {{tipotre['treufv']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <div class="slide w-255">
                <strong class="bold-font pl-8">CMV: </strong>
                <span class="px-slider">Compra: {{tipotre['mvcc']}}</span>
              </div>
              <v-badge color="#A7D342" dot offset-y="4" class="pb-1"></v-badge>
              <div class="slide w-170">
                <span class="px-slider">Venta: {{tipotre['mvcv']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-carousel cycle height="58" hide-delimiters :show-arrows="false" hide-delimiter-background interval="4400" class="slider sheet-carousel-sm">
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <div class="slide w-230">
                <strong class="bold-font">D&oacute;lar: </strong>
                <span class="px-slider">Compra: {{tipotre['compra']}}</span>
              </div>
              <v-badge color="#A7D342" dot offset-y="4"></v-badge>
              <div class="slide w-170">
                <span class="px-slider">Venta: {{tipotre['venta']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <v-badge color="#A7D342" dot offset-y="4"></v-badge>
              <div class="slide w-200">
                <span class="px-slider">Oficial: {{tipotre['oficial']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <div class="slide w-235">
                <strong class="bold-font">UFV: </strong>
                <span class="px-slider">Compra: {{tipotre['ufvc']}}</span>
              </div>
              <v-badge color="#A7D342" dot offset-y="4"></v-badge>
              <div class="slide w-190">
                <span class="px-slider">Venta: {{tipotre['ufvv']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <div class="slide w-185">
                <strong class="bold-font">TRe: </strong>
                <span class="px-slider">ME: {{tipotre['tre']}}</span>
              </div>
              <v-badge color="#A7D342" dot offset-y="4" class="pb-1"></v-badge>
              <div class="slide w-155">
                <span class="px-slider">MN: {{tipotre['tremn']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <v-badge color="#A7D342" dot offset-y="4" class="pb-1"></v-badge>
              <div class="slide w-155">
                <span class="px-slider">MV: {{tipotre['tremv']}}</span>
              </div>
              <v-badge color="#A7D342" dot offset-y="4" class="pb-1"></v-badge>
              <div class="slide w-155">
                <span class="px-slider">UFV: {{tipotre['treufv']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <v-badge color="#A7D342" dot offset-y="4"></v-badge>
              <div class="slide w-255">
                <strong class="bold-font pl-8">CMV: </strong>
                <span class="px-slider">Compra: {{tipotre['mvcc']}}</span>
              </div>
              <v-badge color="#A7D342" dot offset-y="4" class="pb-1"></v-badge>
              <div class="slide w-170">
                <span class="px-slider">Venta: {{tipotre['mvcv']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-carousel cycle height="58" hide-delimiters :show-arrows="false" hide-delimiter-background interval="3600" class="slider sheet-carousel-movil">
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <div class="slide w-230">
                <strong class="bold-font">D&oacute;lar: </strong>
                <span class="px-slider">Compra: {{tipotre['compra']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <v-badge color="#A7D342" dot offset-y="4"></v-badge>
              <div class="slide w-170">
                <span class="px-slider">Venta: {{tipotre['venta']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <v-badge color="#A7D342" dot offset-y="4"></v-badge>
              <div class="slide w-200">
                <span class="px-slider">Oficial: {{tipotre['oficial']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <div class="slide w-235">
                <strong class="bold-font">UFV: </strong>
                <span class="px-slider">Compra: {{tipotre['ufvc']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <v-badge color="#A7D342" dot offset-y="4"></v-badge>
              <div class="slide w-190">
                <span class="px-slider">Venta: {{tipotre['ufvv']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <div class="slide w-185">
                <strong class="bold-font">TRe: </strong>
                <span class="px-slider">ME: {{tipotre['tre']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <v-badge color="#A7D342" dot offset-y="4" class="pb-1"></v-badge>
              <div class="slide w-155">
                <span class="px-slider">MN: {{tipotre['tremn']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <v-badge color="#A7D342" dot offset-y="4" class="pb-1"></v-badge>
              <div class="slide w-155">
                <span class="px-slider">MV: {{tipotre['tremv']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <v-badge color="#A7D342" dot offset-y="4" class="pb-1"></v-badge>
              <div class="slide w-155">
                <span class="px-slider">UFV: {{tipotre['treufv']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <v-badge color="#A7D342" dot offset-y="4"></v-badge>
              <div class="slide w-255">
                <strong class="bold-font pl-8">CMV: </strong>
                <span class="px-slider">Compra: {{tipotre['mvcc']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet height="100%" color="#F1F1F1" style="color: black">
          <v-row class="fill-height" align="center" justify="center">
            <div class="d-flex flex-row justify-center align-center" style="width: 100%">
              <v-badge color="#A7D342" dot offset-y="4" class="pb-1"></v-badge>
              <div class="slide w-170">
                <span class="px-slider">Venta: {{tipotre['mvcv']}}</span>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  props: {
    tipotre: Object
  }
};
</script>
