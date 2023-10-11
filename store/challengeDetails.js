import executeRequest from "@/utils/httpUtil";

import {
  BMSC,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION,
} from "@/constants_actions";

import {
  CARDS_LISTS_ROUTE
} from "@/constants_routes";
import {encapsulatedUpdate, generateEmptyModels} from "@/utils/cardsUtil";
import {AWARDS,
  DATES, DESCRIPTION, DETAILS, DISCLAIMER, INTRODUCTION} from "~/cardListKeys/challengeDetails";
export const state = () => ({
  challengeDetailsLists: {
    [AWARDS]: generateEmptyModels(1),
    [DATES]: generateEmptyModels(1),
    [DESCRIPTION]: generateEmptyModels(1),
    [DETAILS]: generateEmptyModels(1),
    [DISCLAIMER]: generateEmptyModels(1),
    [INTRODUCTION]: generateEmptyModels(1)
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['challengeDetailsLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },[key,list_key, context]) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-challenge-details-${key}-${list_key}`
        // url: `http://3.233.183.218:3000/${CARDS_LISTS_ROUTE}/key/${BMSC}-challenge-details-${key}-${list_key}`
      }, true, context);
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',list_key);
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,[]));
      return []
      throw err;
    }
  }
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.challengeDetailsLists[res.list] = res.data;
  }
};
