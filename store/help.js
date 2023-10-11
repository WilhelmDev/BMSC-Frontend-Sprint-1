import executeRequest from "@/utils/httpUtil";

import {
  BMSC, CONTACT_US_FORM_SEND, UPDATE_CARD_DATA_ACTION,
  UPDATE_STATE_ACTION, UPDATE_STATE_ACTION_2,
  UPDATE_STATE_MUTATION, UPDATE_TIPOTRE_ACTION,
} from "@/constants_actions";

import {
  BMSC_CLAIM_ROUTE,
  BMSC_PARAMETERS_ROUTE,
  BMSC_SERVICES_ROUTE,
  CARDS_LISTS_ROUTE
} from "@/constants_routes";
import {encapsulatedUpdate, generateEmptyModels, simpleEncapsulatedUpdate} from "@/utils/cardsUtil";
import {AGENCY, ATM, CLAIM_FORM} from "~/cardListKeys/help";

export const state = () => ({
  helpLists: {
    [AGENCY]: [],
    [ATM]: [],
    [CLAIM_FORM]: []
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['helpLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION_2]: async ({ commit },list_key) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/bmsc-help-${list_key}`
      });
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',list_key);
      throw err;
    }
  },
  [UPDATE_STATE_ACTION]: async ({ commit },[list_key, context]) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_PARAMETERS_ROUTE}/${list_key}`
      }, true, context);
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,response));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',list_key);
      throw err;
    }
  },
  [CONTACT_US_FORM_SEND]: async ({ commit },claimData) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_CLAIM_ROUTE}`,
        method: 'POST',
        data: claimData
      });
      return response;
    } catch (err) {
      return {
        success: false
      };
    }
  }
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.helpLists[res.list] = res.data;
  }
};
