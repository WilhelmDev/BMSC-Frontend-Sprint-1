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
  TITLE,
  CARDS,
  PROGRAMS,
} from "~/cardListKeys/guarantee";

export const state = () => ({
  guaranteeList: {
    [TITLE]: generateEmptyModels(1),
    [CARDS]: generateEmptyModels(1),
    [PROGRAMS]: generateEmptyModels(1),
  }
})

export const getters = {
  getList: state => list_key => {
    return JSON.parse(JSON.stringify(state))['guaranteeList'][list_key];
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit }, list_key) => {
    const key = `${BMSC}-guarantee-${list_key}`;
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${key}`
      });
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key, response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ', key);
      throw err;
    }
  }
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.guaranteeList[res.list] = res.data;
  }
};
