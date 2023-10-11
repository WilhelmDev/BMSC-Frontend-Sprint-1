<template>
    <div class="bm-header-mobile d-flex d-md-none justify-space-between align-center">
      <img :src="require('@/assets/images/header-logo.svg')" class="header-logo cursor-pointer" @click="goToHome" />
      <div class="mr-4">
        <v-img @click="dialog = true" :src="require('@/assets/images/toolbar-icon.svg')" height="50%" />
      </div>
      <v-dialog v-model="dialog" hide-overlay fullscreen transition="dialog-top-transition" light
        content-class="bm-header-mobile">
        <v-container class="tabs-modal">
          <v-row justify="end">
            <v-col cols="2" class="close-icon-ctn">
              <v-row justify="center">
                <v-icon @click="dialog = false">mdi-close</v-icon>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mb-7">
            <v-expansion-panels flat>
              <v-expansion-panel v-for="(item, i) in headerMobileItems" :key="i">
                <v-expansion-panel-header class="strong-big-text py-6" @click="onItemClick(item)">
                  <div v-html="item.category"></div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list dense width="100%">
                    <v-list-item-group v-model="selectedItem" color="primary">
                      <v-list-item v-for="(subItem, j) in item.subCategories" :key="j">
                        <v-list-item-content>
                          <v-list-item-title v-text="subItem.title" @click="onSubItemClick(subItem)"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-expansion-panel-content>
                <v-divider></v-divider>
              </v-expansion-panel>
              <v-expansion-panel v-for="(item, i) in additionalHeaderItems" :key="i + 4">
                <v-expansion-panel-header class="green-md-text" @click="onSubItemClick(item)" hide-actions>
                  <div v-html="item.category"></div>
                </v-expansion-panel-header>
  
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
          <v-row class="mx-1 mb-2">
            <v-btn block color="bm-dark" href="/clientBenefitDetails?key=detalle-beneficio-dos">Migración Banco
              Fassil</v-btn>
          </v-row>
          <v-row class="mx-1">
            <v-btn block color="bm-dark" href="https://bnet.bmsc.com.bo/" target="_blank">
              Banca por Internet
            </v-btn>
          </v-row>
        </v-container>
      </v-dialog>
    </div>
  </template>
  <script>
  import { headerMobileItems, additionalHeaderItems } from "@/utils/shared";
  export default {
    data() {
      return {
        dialog: false,
        headerMobileItems,
        additionalHeaderItems,
        selectedItem: null,
      };
    },
    methods: {
      onItemClick(item) {
        this.$router.push(item.path);
      },
      onSubItemClick(subItem) {
        this.dialog = false;
        this.$router.push(subItem.path);
      },
      goToHome() {
        this.dialog = false;
        this.$router.push({ path: "/" });
      }
    }
  };
  </script>
  