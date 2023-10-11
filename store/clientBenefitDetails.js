import executeRequest from "@/utils/httpUtil";

import {
  BMSC, UPDATE_CARD_DATA_ACTION,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION, UPDATE_TIPOTRE_ACTION,
} from "@/constants_actions";

import {
  BMSC_COUPONS_ROUTE,
  BMSC_SERVICES_ROUTE,
  CARDS_LISTS_ROUTE
} from "@/constants_routes";
import {encapsulatedUpdate, generateEmptyModels, simpleEncapsulatedUpdate} from "@/utils/cardsUtil";
import {
  TITLE,
  CAR0USEL,
  CARDS,
  INCOME_STATEMENTS,
  INFORMATION_PANEL,
  LISTED_PRODUCTS, PROGRAMS
} from "~/cardListKeys/clientBenefitDetails";

export const state = () => ({
  accountDetailsLists: {
    [TITLE]: [],
    [CAR0USEL]: [],
    [LISTED_PRODUCTS]: [],
    [CARDS]: [],
    [PROGRAMS]: [],
    [INCOME_STATEMENTS]: [],
    [INFORMATION_PANEL]: []
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['accountDetailsLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },[key,list_key, context]) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-client-benefit-details-${key}-${list_key}`
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
    state.accountDetailsLists[res.list] = res.data;
  }
};
