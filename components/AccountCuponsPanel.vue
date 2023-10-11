<template>
  <div class="white-box pa-5 accountCupon">
    <div class="comModal" v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container pb-3 height-cupon" style="border-radius: 5px">
              <v-row justify="space-between" no-gutters align="center">
                <v-col>
                  <img :src="require('@/assets/images/header-logo.svg')" :class="`comModal__bank-logo`" />
                </v-col>
                <v-col cols="1">
                  <v-row justify="end" no-gutters align="center">
                    <v-col cols="10">
                      <img :src="require('@/assets/images/close.svg')" :class="`comModal__close-icon`"
                        @click="showModal = false" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row justify="space-between" no-gutters align="center" class="px-3">
                <h2 class="green-text strong-big-text mb-3 mb-sm-4">MIS CUPONES</h2>
              </v-row>
              <v-row class="mb-6 px-3">
                <v-col cols="12" lg="7" sm="6" class="py-">
                  <label class="grey-md-text">Nombre cliente </label>
                  <p class="mb-1 comModal__text">{{couponsData['nombre']}}</p>
                </v-col>
                <v-col cols="12" lg="5" sm="5" class="py-0 divider-col">
                  <label class="grey-md-text">Cantidad de cupones </label>
                  <p class="mb-1 comModal__text text-right pr-4">{{couponsData['numeroCupones']}}</p>
                </v-col>
              </v-row>
              <v-row class="px-3">
                <v-col cols="12" lg="8" md="8" sm="12" class="py-0 pr-lg-10 pr-md-10 pr-4 pt-2">
                  <v-text-field outlined v-model="searchCoupon" :rules="[rules.required]" class="text-field"
                    placeholder="Busca entre tus cupones" maxlength="50"></v-text-field>
                </v-col>
              </v-row>
              <p class="comModal__text-small green-text my-0 bold-font px-3">Cupones Asignados</p>
              <div id="coupon-scroll" v-if="couponList.length>0" class="my-3">
                <v-row class="px-3">
                  <v-col v-for="(item, index) in couponList"
                    v-if="index+1>(pages-1)*topItems && (index+1)<=pages*topItems" :key="index" cols="6" lg="4" md="4"
                    sm="6" class="py-2 border-row">
                    <div class="comModal__text-small text-right mx-auto" style="width: 100px" v-html="colorGreen(item)">
                    </div>
                  </v-col>
                </v-row>
              </div>
              <p class="comModal__text-small grey-md-text px-3" v-if="couponList.length===0">No encontramos cupones
                existentes con el número ingresado.</p>
              <v-row justify="center" align="center" class="px-3">
                <v-col cols="12" class="px-0 py-0">
                  <v-pagination class="mt-0 mb-2 pb-0 cupon" v-model="pages" :length="stateLength" :total-visible="7"
                    color="transparent" circle next-icon="icon-right-arrow" prev-icon="icon-left-arrow"></v-pagination>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <h6 class="black-text">{{ title }}</h6>
    <v-radio-group v-model="inputData.document" :mandatory="true" row>
      <v-radio label="Carnet de identidad" value="ci" class="small pr-3" color="bm-radio" @change="clear('ci')">
      </v-radio>
      <v-radio label="Otra identificación" value="other" @change="clear('ci')" color="bm-radio"></v-radio>
    </v-radio-group>
    <form class="pb-5">
      <v-row v-if="inputData.document === 'ci'">
        <v-col cols="12" sm="8">
          <div class="input-label">N&uacute;mero de CI</div>
          <v-text-field required solo class="bm-text-field" hide-details v-model="inputData.numberCI"></v-text-field>
        </v-col>
        <v-col class="pl-sm-0" cols="6" sm="4">
          <label>Expedici&oacute;n</label>
          <v-select class="border-select" v-model="inputData.city" :items="cities" attach solo></v-select>
        </v-col>
      </v-row>
      <v-row v-if="inputData.document === 'other'">
        <v-col cols="12" sm="8">
          <div class="input-label">N&uacute;mero de Pasaporte</div>
          <v-text-field required solo class="bm-text-field" hide-details v-model="inputData.numberPassport">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="8" class="pt-1 pt-sm-0">
          <div class="input-label">N&uacute;mero de cuenta</div>
          <v-text-field required solo class="bm-text-field" hide-details v-model="inputData.accountNumber">
          </v-text-field>
        </v-col>
      </v-row>
    </form>
    <v-row align="center">
      <v-col cols="5" sm="5" class="mx-3 mx-sm-3">
        <v-row justify="start" align="center">
          <Button :text="buttonClarification" :color="'bm-light'" :onClick="loadPersonCoupons" />
        </v-row>
      </v-col>
    </v-row>
    <v-snackbar v-model="errorSnackbar" top light>
      {{message}}
      <template v-slot:action="{ attrs }">
        <v-btn color="#3a7652" text v-bind="attrs" @click="errorSnackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import Button from "@/components/Button.vue";
import { COUPONS } from "~/cardListKeys/accountDetails";
import _ from 'lodash'

export default {
  components: {
    Button
  },
  data() {
    return {
      errorSnackbar: false,
      message: 'Los datos ingresados no son inexistentes, intente nuevamente.',
      inputData: {
        document: "ci",
        numberCI: "",
        accountNumber: "",
        city: null,
        numberPassport: ""
      },
      cities: ["BE", "CB", "CH", "LP", "OR", "PA", "PO", "SC", "TJ"],
      showModal: false,
      searchCoupon: '',
      rules: {
        required: value => {
          if (value) {
            const pattern = /^([0-9]{1,})$/
            return pattern.test(value) || 'El campo solo acepta caracteres numéricos, por favor intenta de nuevo.'
          } else {
            return value.length <= 20 || 'La búsqueda debe tener menos de 20 caracteres'
          }
        },
      },
      pages: 1,
      topItems: 15,
      listItems: []
    };
  },
  methods: {
    async loadPersonCoupons() {
      await this.$store.dispatch(`accountDetails/updatePersonCoupons`
        , [this.inputData.document, this.inputData.numberPassport, this.inputData.numberCI, this.inputData.city, this.inputData.accountNumber, this])

      let res = this.$store.getters["accountDetails/getList"](COUPONS);
      //console.log(res)
      if (res.success) {
        function formatData(data) {
          var data = data

          if (typeof (data) === "number") {
            data = data.toString()
          }

          if (data.length < 8) {
            data = data.padStart(8, "0")
          }

          return data

        }

        this.listItems = res.cupones.map((element) => {
          return formatData(element)
        }) || []
        // this.listItems = res.cupones || []
        if (this.listItems.length % 3 === 1) {
          this.listItems.push('')
          this.listItems.push('')
        }
        if (this.listItems.length % 3 === 2) {
          this.listItems.push('')
        }
        this.showModal = true
        this.clear(this.inputData.document)
      } else if (!res.success) {
        this.errorSnackbar = true
        this.message = res.mensaje
      }
    },
    colorGreen: function (item) {
      item = item + ''
      if (this.searchCoupon !== '') {
        const divisor = item.split(this.searchCoupon)
        return divisor.join(`<strong class="green-text">` + this.searchCoupon + `</strong>`)
      }
      return item
    },
    clear: function (data) {
      this.inputData = {
        document: data,
        numberCI: '',
        accountNumber: '',
        city: null,
        numberPassport: ''
      }
    }
  },
  computed: {
    couponList: function () {
      if (_.size(this.listItems)) {
        return this.listItems.filter((v) => {
          const tmpCoupon = v + ''
          if (this.searchCoupon !== '') {
            this.pages = 1
          }
          return tmpCoupon.includes(this.searchCoupon)
        })
      }
      return []
    },
    stateLength: function () {
      let tmp = Math.round(this.couponList.length / this.topItems)
      if (this.couponList.length > (tmp * this.topItems)) {
        tmp = tmp + 1
      }
      return tmp
    },
    couponsData: function () {
      let res = this.$store.getters["accountDetails/getList"](COUPONS);
      if (!res) res = { numero: "" }
      return res;
    },
    couponsErrorData: function () {
      let showError = this.$store.getters["accountDetails/getCouponsError"];
      return showError;
    },
  },
  watch: {
    couponsErrorData(value) {
      this.errorSnackbar = value;
    }
  },
  props: {
    title: String,
    buttonClarification: String,
  }
};
</script>
