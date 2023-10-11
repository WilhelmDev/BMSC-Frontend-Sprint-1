import executeRequest from "@/utils/httpUtil";

import {
  BMSC,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION
} from "@/constants_actions";

import {
  CARDS_LISTS_ROUTE
} from "@/constants_routes";
import {encapsulatedUpdate} from "@/utils/cardsUtil";
import {BENEFITS, BENEFITS_2, INFORMATION_PANEL, PROGRAMS, TITLE, COMPARE} from "~/cardListKeys/creditCardDetails";
export const state = () => ({
  creditCardDetailsBanxLists: {
    [TITLE]: [],
    [BENEFITS]: [],
    [PROGRAMS]: [],
    [BENEFITS_2]: [],
    [INFORMATION_PANEL]: [],
    [COMPARE]: []
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['creditCardDetailsBanxLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },[key,list_key, context]) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-credit-card-details-banx-${key}-${list_key}`
       // url: `http://3.233.183.218:3000/${CARDS_LISTS_ROUTE}/key/${BMSC}-credit-card-details-banx-${key}-${list_key}`
      },true, context);
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
    state.creditCardDetailsBanxLists[res.list] = res.data;
  }
};
