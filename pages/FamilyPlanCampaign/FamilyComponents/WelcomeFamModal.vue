<template>
    <div :class="`${ns}`" v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container height-communication">
              <v-row justify="space-between" no-gutters align="center">
                <v-col>
                  <img
                    :src="require('@/assets/images/header-logo.svg')"
                    :class="`${ns}__bank-logo`"
                  />
                </v-col>
                <v-col cols="1">
                  <v-row justify="end" no-gutters align="center">
                    <v-col cols="10">
                      <img
                        :src="require('@/assets/images/close.svg')"
                        :class="`${ns}__close-icon`"
                        @click="closeModal"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
               <v-row align="center" justify="center">
                 <v-col cols="11">
                   <v-row justify="start" no-gutters>
                     <v-col cols="10">
                       <h2>Bienvenido a Familia {{ name }}</h2>
                     </v-col>
                   </v-row>
                   <v-row justify="center" no-gutters style="margin-top: 10px">
                     <v-col cols="12">
                       <p :class="`${ns}__text`">
                         {{ message }}
                       </p>
                     </v-col>
                   </v-row>
                 </v-col>
               </v-row>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </template>

<script>
import axios from 'axios';
    export default {
        name: "",
        components: {},
        props: {
            showModal: Boolean,
            name: String
        },
        mounted() {
            this.inicialize()
        },
        data() {
            return {
            message: '',
            ns: 'comModal'
            };
        },
        methods: {
            async inicialize() {
                const {data} = await axios(`${process.env.SERVICES_BASE_URL}/api/bmscfamily/family/parameters/6`)
                const { valor } = data
                this.message = valor
            },
            closeModal() {
                this.$emit('hideModal');
                },
        }
    }
</script>