<template>
  <div class="px-8 px-sm-16">
    <v-row>
      <v-col
        class="text-center d-flex flex-column my-auto"
        cols="12"
        sm="3"
        order="3"
        order-sm="1"
      >
        <div v-for="(asset, i) in bankData.logos" :key="i">
          <Asset
            :img="asset.mainImageUrl"
            :label="asset.title"
            :route="asset.buttonHref.length > 1 ? asset.buttonHref : assetRoutes[i]"
            :alt="asset.imgAlt1"
            labelColor="green-md-text"
            class="py-4 py-sm-6"
          />
        </div>
        <v-row class="pt-6 d-sm-none mx-auto" no-gutters>
          <v-col cols="6" class="pr-1">
            <AppStoreButton />
          </v-col>
          <v-col cols="6" class="pl-1">
            <GooglePlayButton />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        class="my-auto text-left px-lg-16"
        cols="12"
        sm="4"
        order="2"
        order-sm="2"
      >
        <BracketBanx
          v-if="bankData.isBanx"
          :text1="'Banca'"
          :text2="'24/7'"
          :bracket-color="'#A7D342'"
        />
        <h3 v-else>Banca 24/7</h3>
        <div>
          <div cols="12">
            <div
              v-for="(subSection, idx) in bankData.subSections" :key="idx"
            >
              <BoxAndText
                v-if="subSection.isBanx"
                :label="subSection.title"
                :className="subSection.className + ' ml-3'"
                :content="subSection.description"
              />
              <div v-else>
                <h4 class="green-md-text mt-4"><span v-html="subSection.title"></span></h4>
                <div class="regular-text" style="text-align: justify">{{subSection.description}}</div>
              </div>
            </div>
          </div>
        </div>
        <v-row class="pt-10 d-none d-sm-block" no-gutters>
          <v-col cols="6" sm="12" class="pb-sm-1">
            <AppStoreButton />
          </v-col>
          <v-col cols="6" sm="12">
            <GooglePlayButton />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <!-- <v-col cols="6" sm="12">
            <GooglePlayButton />
          </v-col> -->
        </v-row>
      </v-col>
      <v-col
        class="my-auto px-8"
        cols="12"
        sm="5"
        order="1"
        order-sm="3"
      >
        <v-img
          :src="bankData.image[0].mainImageUrl" :alt="bankData.image[0].imgAlt1"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import BracketBanx from "@/components/BracketBanx";
import BoxAndText from "@/components/BoxAndText";
import AppStoreButton from "@/components/AppStoreButton";
import GooglePlayButton from "@/components/GooglePlayButton";

export default {
  name: "BankAd",
  components: {
    BoxAndText,
    BracketBanx,
    AppStoreButton,
    GooglePlayButton
  },
  props: {
    bankData: Object
  },

  data() {
    return {
      assetRoutes: [
        '/tech/internetBank/',
        '/tech/mobileBank/',
        '/tech/atms/'
      ]
    };
  }
};
</script>

