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
  CAROUSEL,
  BENEFITS2,
  BENEFITS,
  BENEFITS3,
  TUTORIALS,
  PROGRAMS,
  QUALIFICATIONS,
  REPORTS,
  DOCUMENTS
} from "~/cardListKeys/rse";

export const state = () => ({
  rseLists: {
    [CAROUSEL]: generateEmptyModels(1),
    [BENEFITS2]: generateEmptyModels(1),
    [BENEFITS]: generateEmptyModels(1),
    [BENEFITS3]: generateEmptyModels(1),
    [TUTORIALS]: generateEmptyModels(1),
    [DOCUMENTS]: [],
    [PROGRAMS]: generateEmptyModels(1),
    [QUALIFICATIONS]: generateEmptyModels(1),
    [REPORTS]: generateEmptyModels(0),
  }
})

export const getters = {
  getList: state => list_key => {
    return JSON.parse(JSON.stringify(state))['rseLists'][list_key];
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit }, list_key) => {
    const key = `${BMSC}-about-us-rse-${list_key}`;
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
    state.rseLists[res.list] = res.data;
  }
};
