import executeRequest from "@/utils/httpUtil";

import {
  BMSC, UPDATE_CARD_DATA_ACTION,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION, UPDATE_TIPOTRE_ACTION,
} from "@/constants_actions";

import {
  BMSC_SERVICES_ROUTE,
  CARDS_LISTS_ROUTE
} from "@/constants_routes";
import {encapsulatedUpdate, generateEmptyModels, simpleEncapsulatedUpdate} from "@/utils/cardsUtil";
import {MONEY_EXCHANGE, SOCIAL_NETWORKS, TIPOTRE} from "~/cardListKeys/footer";
import {BENEFITS, DESCRIPTION, IMAGE, INFORMATION_PANEL, INTERESTS_RATE, TITLE, COMPARE} from "~/cardListKeys/loanDetails";
export const state = () => ({
  loanDetailsLists: {
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
    let res = JSON.parse(JSON.stringify(state))['loanDetailsLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },[key,list_key,context]) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-loan-details-${key}-${list_key}`
      },true,context);
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
    state.loanDetailsLists[res.list] = res.data;
  }
};
