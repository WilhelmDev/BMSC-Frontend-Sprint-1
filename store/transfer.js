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
import {TRANSFER_CARDS, TRANSFER_LINKS, TRANSFER_SUBMENU, TRANSFER_TITLE} from "~/cardListKeys/transfer";
export const state = () => ({
  footerLists: {
    [TRANSFER_TITLE]: [],
    [TRANSFER_CARDS]: [],
    [TRANSFER_SUBMENU]: [],
    [TRANSFER_LINKS]: []
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['footerLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },list_key) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-${list_key}`
      });
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',list_key);
      throw err;
    }
  }
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.footerLists[res.list] = res.data;
  }
};
