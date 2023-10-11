import executeRequest from "@/utils/httpUtil";

import {
  BMSC,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION,
} from "@/constants_actions";

import {
  CARDS_LISTS_ROUTE
} from "@/constants_routes";
import {encapsulatedUpdate} from "@/utils/cardsUtil";
import {BENEFITS, DESCRIPTION, IMAGE, INFORMATION_PANEL, INTERESTS_RATE, TITLE, COMPARE} from "~/cardListKeys/loanDetails";
export const state = () => ({
  loanDetailsBanxLists: {
    [TITLE]: [],
    [IMAGE]: [],
    [INTERESTS_RATE]: [],
    [DESCRIPTION]: [],
    [BENEFITS]: [],
    [INFORMATION_PANEL]: [],
    [COMPARE]: []
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['loanDetailsBanxLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },[key,list_key,context]) => {
    try {
      let response = await executeRequest({
        //url: `http://3.233.183.218:3000/${CARDS_LISTS_ROUTE}/key/${BMSC}-loan-details-banx-${key}-${list_key}`
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-loan-details-banx-${key}-${list_key}`
      },true,context);
      response['cards'].forEach(function (element) {
        element.isBanx = true;
      });
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
    state.loanDetailsBanxLists[res.list] = res.data;
  }
};
