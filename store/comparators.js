import executeRequest from "@/utils/httpUtil";

import {
  BMSC, UPDATE_CARD_DATA_ACTION,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION, UPDATE_TIPOTRE_ACTION,
} from "@/constants_actions";

import {
  BMSC_COMPARATORS_ROUTE,
  BMSC_SERVICES_ROUTE,
  CARDS_LISTS_ROUTE
} from "@/constants_routes";
import {encapsulatedUpdate, generateEmptyModels, simpleEncapsulatedUpdate} from "@/utils/cardsUtil";
import {MONEY_EXCHANGE, SOCIAL_NETWORKS, TIPOTRE} from "~/cardListKeys/footer";
import {CATEGORIES, ITEMS, SECTIONS} from "~/cardListKeys/comparators";

export const state = () => ({
  comparatorsLists: {
    [CATEGORIES]: [],
    [SECTIONS]: [],
    [ITEMS]: []
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['comparatorsLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit }, comparatorKey) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_COMPARATORS_ROUTE}/comparator/${comparatorKey}`
      });
      commit(UPDATE_STATE_MUTATION, simpleEncapsulatedUpdate(CATEGORIES,response["categories"]));
      commit(UPDATE_STATE_MUTATION, simpleEncapsulatedUpdate(SECTIONS,response["sections"]));
      commit(UPDATE_STATE_MUTATION, simpleEncapsulatedUpdate(ITEMS,response["items"]));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',comparatorKey);
      throw err;
    }
  }
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.comparatorsLists[res.list] = res.data;
  }
};
