import executeRequest from "@/utils/httpUtil";

import {
  BMSC, UPDATE_CARD_DATA_ACTION,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION, UPDATE_TIPOTRE_ACTION,
  CONTACT_US_FORM_SEND
} from "@/constants_actions";

import {
  BMSC_SERVICES_ROUTE,
  CARDS_LISTS_ROUTE
} from "@/constants_routes";
import {encapsulatedUpdate, generateEmptyModels, simpleEncapsulatedUpdate} from "@/utils/cardsUtil";
import {
  TECH_API_MARKET,
  TECH_BANNER,
  TECH_PROGRAMS,
  TECH_MOBILE_BANK_TITLE,
  TECH_MOBILE_BANK_PROGRAMS,
  TECH_MOBILE_BANK_BENEFITS_2,
  TECH_MOBILE_BANK_VIDEO_HEADER,
  TECH_MOBILE_BANK_VIDEO_CARDS,
  TECH_MOBILE_BANK_INFORMATION_PANEL,
  TECH_MOBILE_BANK_COMPARE,
  TECH_MOBILE_BANK_DOCUMENTS,
  TECH_INTERNET_BANK_TITLE,
  TECH_INTERNET_BANK_PROGRAMS,
  TECH_INTERNET_BANK_BENEFITS_2,
  TECH_INTERNET_BANK_VIDEO_HEADER,
  TECH_INTERNET_BANK_VIDEO_CARDS,
  TECH_INTERNET_BANK_INFORMATION_PANEL,
  TECH_INTERNET_BANK_DOCUMENTS,
  TECH_ATMS_TITLE,
  TECH_ATMS_PROGRAMS,
  TECH_ATMS_VIDEO_HEADER,
  TECH_ATMS_VIDEO_CARDS,
  TECH_AUTOSERVICE_TITLE,
  TECH_AUTOSERVICE_PROGRAMS,
  TECH_AUTOSERVICE_BENEFITS_2,
  TECH_API_MARKET_TITLE,
  TECH_API_MARKET_CARDS,
  TECH_API_MARKET_SANDBOX,
  TECH_API_MARKET_COMPARE,
  TECH_CONTACT_FORM
} from "~/cardListKeys/tech";

export const state = () => ({
  techLists: {
    [TECH_BANNER]: generateEmptyModels(1),
    [TECH_PROGRAMS]: [],
    [TECH_API_MARKET]: [],

    [TECH_MOBILE_BANK_TITLE]: generateEmptyModels(1),
    [TECH_MOBILE_BANK_PROGRAMS]: [],
    [TECH_MOBILE_BANK_BENEFITS_2]: [],
    [TECH_MOBILE_BANK_VIDEO_HEADER]: [],
    [TECH_MOBILE_BANK_VIDEO_CARDS]: [],
    [TECH_MOBILE_BANK_INFORMATION_PANEL]: [],
    [TECH_MOBILE_BANK_COMPARE]: [],
    [TECH_MOBILE_BANK_DOCUMENTS]: [],

    [TECH_INTERNET_BANK_TITLE]: generateEmptyModels(1),
    [TECH_INTERNET_BANK_PROGRAMS]: [],
    [TECH_INTERNET_BANK_BENEFITS_2]: [],
    [TECH_INTERNET_BANK_VIDEO_HEADER]: [],
    [TECH_INTERNET_BANK_VIDEO_CARDS]: [],
    [TECH_INTERNET_BANK_INFORMATION_PANEL]: [],
    [TECH_INTERNET_BANK_DOCUMENTS]: [],

    [TECH_ATMS_TITLE]: generateEmptyModels(1),
    [TECH_ATMS_PROGRAMS]: [],
    [TECH_ATMS_VIDEO_HEADER]: [],
    [TECH_ATMS_VIDEO_CARDS]: [],

    [TECH_AUTOSERVICE_TITLE]: generateEmptyModels(1),
    [TECH_AUTOSERVICE_PROGRAMS]: [],
    [TECH_AUTOSERVICE_BENEFITS_2]: [],

    [TECH_API_MARKET_TITLE]: generateEmptyModels(1),
    [TECH_API_MARKET_CARDS]: [],
    [TECH_API_MARKET_SANDBOX]: [],
    [TECH_API_MARKET_COMPARE]: [],

    [TECH_CONTACT_FORM]: generateEmptyModels(1)
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['techLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },list_key) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-${list_key}`
      });
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',list_key);
      throw err;
    }
  },
  [CONTACT_US_FORM_SEND]: async ({ commit },formData) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_INFORMATION_ROUTE}`, // TODO: change to correct route
        method: 'POST',
        data: formData
      });
      return response;
    } catch (err) {
      return {
        success: false
      };
    }
  }
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.techLists[res.list] = res.data;
  }
};
