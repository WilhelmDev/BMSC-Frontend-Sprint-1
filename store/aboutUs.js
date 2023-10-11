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
  INTRO,
  GOALS,
  VALUES,
  HISTORY,
  PRIZES,
  PARTNERS,
  PROGRAMS,
  MEMORIES,
  MEMORIES_RSE,
  INCOME_STATEMENTS,
  RISKS,
  RATINGS,
  VIDEO,
  BENEFITS,
  RISK_PILLS,
} from "~/cardListKeys/aboutUs";

export const state = () => ({
  aboutUsLists: {
    [INTRO]: generateEmptyModels(1),
    [GOALS]: generateEmptyModels(1),
    [VALUES]: generateEmptyModels(1),
    [HISTORY]: generateEmptyModels(1),
    [PRIZES]: generateEmptyModels(1),
    [PARTNERS]: generateEmptyModels(1),
    [PROGRAMS]: generateEmptyModels(1),
    [MEMORIES]: generateEmptyModels(1),
    [MEMORIES_RSE]: generateEmptyModels(1),
    [INCOME_STATEMENTS]: generateEmptyModels(1),
    [RISKS]: generateEmptyModels(1),
    [RATINGS]: generateEmptyModels(1),
    [VIDEO]: generateEmptyModels(1),
    [BENEFITS]: generateEmptyModels(1),
    [RISK_PILLS]: generateEmptyModels(1),
  }
})

export const getters = {
  getList: state => list_key => {
    return JSON.parse(JSON.stringify(state))['aboutUsLists'][list_key];
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit }, list_key) => {
    const key = `${BMSC}-about-us-${list_key}`;
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
    state.aboutUsLists[res.list] = res.data;
  }
};
