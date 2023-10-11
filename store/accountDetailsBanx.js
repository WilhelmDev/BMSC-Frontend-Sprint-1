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
import {BENEFITS, DETAILS_PANEL, TITLE, TITLE_PANEL, COMPARE, DESCRIPTION} from "~/cardListKeys/accountDetailsBanx";
export const state = () => ({
  accountDetailsBanxLists: {
    [TITLE]: generateEmptyModels(1),
    [DESCRIPTION]: [],
    [BENEFITS]: generateEmptyModels(1),
    [TITLE_PANEL]: generateEmptyModels(1),
    [DETAILS_PANEL]: generateEmptyModels(1),
    [COMPARE]: []
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['accountDetailsBanxLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },[key,list_key, context]) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-account-details-banx-${key}-${list_key}`
      },true, context);
      response['cards'].forEach(function (element) {
        element.isBanx = true;
        element.hasBracket = false
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
    state.accountDetailsBanxLists[res.list] = res.data;
  }
};
