import executeRequest from "@/utils/httpUtil";

import {
  BMSC,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION,
} from "@/constants_actions";
import {
  CARDS_LISTS_ROUTE
} from "@/constants_routes";
import {
  encapsulatedUpdate,
  generateEmptyModels
} from "@/utils/cardsUtil";
import {
  HOME_CAROUSEL,
  HOME_LISTED_PRODUCTS,
  HOME_CARDS,
  HOME_PROGRAMS,
  HOME_BANK,
  ACCOUNTS_TITLE,
  ACCOUNTS_CARDS,
  ACCOUNTS_BENEFITS,
  ACCOUNTS_PROGRAMS,
  ACCOUNTS_BENEFITS_2,
  ACCOUNTS_COMPARE,
  LOANS_TITLE,
  LOANS_CARDS,
  LOANS_BENEFITS,
  LOANS_PROGRAMS,
  LOANS_BENEFITS_2,
  LOANS_COMPARE,
  CREDIT_CARD_TITLE,
  CREDIT_CARD_CARDS,
  CREDIT_CARD_REVIEWS_CAROUSEL,
  CREDIT_CARD_BENEFITS,
  CREDIT_CARD_PROGRAMS,
  CREDIT_CARD_BENEFITS_2,
  CREDIT_CARD_COMPARE,
  INVESTMENT_TITLE,
  INVESTMENT_CARDS,
  INVESTMENT_BENEFITS,
  INVESTMENT_PROGRAMS,
  INVESTMENT_BENEFITS_2,
  INVESTMENT_COMPARE,
  TRANSFER_TITLE,
  INSURANCE_TITLE,
  INSURANCE_CARDS,
  INSURANCE_REVIEWS_CAROUSEL,
  INSURANCE_BENEFITS,
  INSURANCE_PROGRAMS,
  INSURANCE_BENEFITS_2,
  INSURANCE_COMPARE
} from "~/cardListKeys/client";

export const state = () => ({
  clientLists: {
    [HOME_CAROUSEL]: generateEmptyModels(1),
    [HOME_LISTED_PRODUCTS]: [],
    [HOME_CARDS]: [],
    [HOME_PROGRAMS]: [],
    [HOME_BANK]: [],

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

    [CREDIT_CARD_TITLE]: [],
    [CREDIT_CARD_CARDS]: [],
    [CREDIT_CARD_REVIEWS_CAROUSEL]: [],
    [CREDIT_CARD_BENEFITS]: [],
    [CREDIT_CARD_PROGRAMS]: [],
    [CREDIT_CARD_BENEFITS_2]: [],
    [CREDIT_CARD_COMPARE]: [],

    [INVESTMENT_TITLE]: [],
    [INVESTMENT_CARDS]: [],
    [INVESTMENT_BENEFITS]: [],
    [INVESTMENT_PROGRAMS]: [],
    [INVESTMENT_BENEFITS_2]: [],
    [INVESTMENT_COMPARE]: [],

    [TRANSFER_TITLE]: [],

    [INSURANCE_TITLE]: [],
    [INSURANCE_CARDS]: [],
    [INSURANCE_REVIEWS_CAROUSEL]: [],
    [INSURANCE_BENEFITS]: [],
    [INSURANCE_PROGRAMS]: [],
    [INSURANCE_BENEFITS_2]: [],
    [INSURANCE_COMPARE]: []
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['clientLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },list_key) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-client-${list_key}`
      });
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',list_key);
      throw err;
    }
  }
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.clientLists[res.list] = res.data;
  }
};
