import executeRequest from "@/utils/httpUtil";

import {
  BMSC, UPDATE_CARD_DATA_ACTION,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION, UPDATE_STATE_NEWS_ACTION,
} from "@/constants_actions";

import {
  CARDS_LISTS_ROUTE, NEWS_ROUTE
} from "@/constants_routes";
import {encapsulatedNewsUpdate, encapsulatedUpdate, generateEmptyModels} from "@/utils/cardsUtil";
import {
  HOME_BENEFITS, HOME_BENEFITS_2,
  HOME_CAROUSEL,
  HOME_LISTED_PRODUCTS, HOME_NEWS,
  HOME_PROGRAMS,
  HOME_REVIEWS_CAROUSEL, INSURANCE_REVIEWS_CAROUSEL, SERVICES_BENEFITS, SERVICES_INFORMATION_PANEL, SERVICES_TITLE
} from "~/cardListKeys/pyme";
import {
  ACCOUNTS_BENEFITS,
  ACCOUNTS_BENEFITS_2,
  ACCOUNTS_CARDS,
  ACCOUNTS_PROGRAMS,
  ACCOUNTS_TITLE,
  ACCOUNTS_COMPARE,
  INSURANCE_BENEFITS, INSURANCE_BENEFITS_2,
  INSURANCE_CARDS,
  INSURANCE_PROGRAMS,
  INSURANCE_TITLE,
  INSURANCE_COMPARE,
  INVESTMENT_BENEFITS,
  INVESTMENT_BENEFITS_2,
  INVESTMENT_CARDS,
  INVESTMENT_PROGRAMS,
  INVESTMENT_TITLE,
  INVESTMENT_COMPARE,
  LOANS_BENEFITS,
  LOANS_BENEFITS_2,
  LOANS_CARDS,
  LOANS_PROGRAMS,
  LOANS_COMPARE,
  LOANS_TITLE,
  NEWS_LIST
} from "~/cardListKeys/pyme";

export const state = () => ({
  pymeLists: {
    [HOME_CAROUSEL]: [],
    [HOME_LISTED_PRODUCTS]: [],
    [HOME_REVIEWS_CAROUSEL]: [],
    [HOME_BENEFITS]: [],
    [HOME_PROGRAMS]: [],
    [HOME_BENEFITS_2]: [],
    [HOME_NEWS]: generateEmptyModels(1),

    [ACCOUNTS_TITLE]: generateEmptyModels(1),
    [ACCOUNTS_CARDS]: [],
    [ACCOUNTS_BENEFITS]: [],
    [ACCOUNTS_PROGRAMS]: [],
    [ACCOUNTS_BENEFITS_2]: [],
    [ACCOUNTS_COMPARE]: [],

    [LOANS_TITLE]: [],
    [LOANS_CARDS]: [],
    [LOANS_BENEFITS]: [],
    [LOANS_PROGRAMS]: [],
    [LOANS_BENEFITS_2]: [],
    [LOANS_COMPARE]: [],

    [SERVICES_TITLE]: [],
    [SERVICES_BENEFITS]: [],
    [SERVICES_INFORMATION_PANEL]: [],

    [INVESTMENT_TITLE]: [],
    [INVESTMENT_CARDS]: [],
    [INVESTMENT_BENEFITS]: [],
    [INVESTMENT_PROGRAMS]: [],
    [INVESTMENT_BENEFITS_2]: [],
    [INVESTMENT_COMPARE]: [],

    [INSURANCE_TITLE]: [],
    [INSURANCE_CARDS]: [],
    [INSURANCE_REVIEWS_CAROUSEL]: [],
    [INSURANCE_BENEFITS]: [],
    [INSURANCE_PROGRAMS]: [],
    [INSURANCE_BENEFITS_2]: [],
    [INSURANCE_COMPARE]: [],

    [NEWS_LIST]: []
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['pymeLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },list_key) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-pyme-${list_key}`
      });
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',list_key);
      throw err;
    }
  },
  [UPDATE_STATE_NEWS_ACTION]: async ({commit}) => {
    try {
      let pymeNewsCategory = 6;
      let response = await executeRequest({
        url: `${NEWS_ROUTE}/category/${pymeNewsCategory}`
      });
      commit(UPDATE_STATE_MUTATION, encapsulatedNewsUpdate(NEWS_LIST, response));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ', NEWS_LIST);
      throw err;
    }
  },
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.pymeLists[res.list] = res.data;
  }
};
