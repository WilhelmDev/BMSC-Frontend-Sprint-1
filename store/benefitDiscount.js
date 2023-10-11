import executeRequest from "@/utils/httpUtil";

import {
  BMSC,
  REQUEST_GET_BENEFIT_DISCOUNT_CATEGORIES,
  REQUEST_GET_BENEFIT_DISCOUNT_CITIES,
  REQUEST_GET_BENEFIT_DISCOUNT_COMMERCES,
  UPDATE_BENEFIT_DISCOUNT_CATEGORIES_LIST,
  UPDATE_BENEFIT_DISCOUNT_CITIES_LIST,
  UPDATE_BENEFIT_DISCOUNT_COMMERCES_LIST,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION,
} from "@/constants_actions";

import {
  BMSC_BENEFITS_DISCOUNTS_ROUTE,
  CARDS_LISTS_ROUTE
} from "@/constants_routes";

import {
  encapsulatedUpdate,
  generateEmptyModels
} from "@/utils/cardsUtil";

import {
  INTRO
} from "~/cardListKeys/benefitDiscount";

export const state = () => ({
  benefitDiscountLists: {
    [INTRO]: generateEmptyModels(1),
  },
  benefitDiscountPoints: {},
  benefitDiscountCities: [],
  benefitDiscountCategories: [],
  benefitDiscountCommerces: []
});

export const getters = {
  getList: state => list_key => {
    return JSON.parse(JSON.stringify(state))['benefitDiscountLists'][list_key];
  },
  getBenefitDiscountPoints: state => state.benefitDiscountPoints,
  getBenefitDiscountCities: state => state.benefitDiscountCities,
  getBenefitDiscountCategories: state => state.benefitDiscountCategories,
  getBenefitDiscountCommerces: state => state.benefitDiscountCommerces
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit }, [list_key, context]) => {
    const key = `${BMSC}-benefits-discount-${list_key}`;
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${key}`
      }, true, context);
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key, response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ', key);
      throw err;
    }
  },
  [REQUEST_GET_BENEFIT_DISCOUNT_CITIES]: async ({ commit },[context]) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_BENEFITS_DISCOUNTS_ROUTE}/ciudad`
      }, true, context);
      commit(UPDATE_BENEFIT_DISCOUNT_CITIES_LIST, response);
      return response;
    } catch (err) {
      commit(UPDATE_BENEFIT_DISCOUNT_CITIES_LIST, []);
      throw err;
    }
  },
  [REQUEST_GET_BENEFIT_DISCOUNT_CATEGORIES]: async ({ commit }, [context]) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_BENEFITS_DISCOUNTS_ROUTE}/categoria`
      }, true, context);
      commit(UPDATE_BENEFIT_DISCOUNT_CATEGORIES_LIST, response);
      return response;
    } catch (err) {
      commit(UPDATE_BENEFIT_DISCOUNT_CATEGORIES_LIST, []);
      throw err;
    }
  },
  [REQUEST_GET_BENEFIT_DISCOUNT_COMMERCES]: async ({ commit }, [data, context]) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_BENEFITS_DISCOUNTS_ROUTE}/comercio`,
        params: data
      }, true, context);
      commit(UPDATE_BENEFIT_DISCOUNT_COMMERCES_LIST, response);
      return response;
    } catch (err) {
      commit(UPDATE_BENEFIT_DISCOUNT_COMMERCES_LIST, []);
      throw err;
    }
  },
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.benefitDiscountLists[res.list] = res.data;
  },
  [UPDATE_BENEFIT_DISCOUNT_CITIES_LIST]: (state, data) => {
    state.benefitDiscountCities = data;
  },
  [UPDATE_BENEFIT_DISCOUNT_CATEGORIES_LIST]: (state, data) => {
    state.benefitDiscountCategories = data;
  },
  [UPDATE_BENEFIT_DISCOUNT_COMMERCES_LIST]: (state, data) => {
    state.benefitDiscountCommerces = data;
  },
};
