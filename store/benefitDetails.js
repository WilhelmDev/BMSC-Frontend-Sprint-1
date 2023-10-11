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
import {CAROUSEL, DESCRIPTION, DESCRIPTION_DETAILS, PROGRAMS, TITLE, CARDS} from "~/cardListKeys/benefitDetails";
export const state = () => ({
  benefitDetailsLists: {
    [TITLE]: generateEmptyModels(1),
    [DESCRIPTION]: generateEmptyModels(1),
    [DESCRIPTION_DETAILS]: generateEmptyModels(1),
    [CAROUSEL]: [],
    [PROGRAMS]: generateEmptyModels(1),
    [CARDS]:generateEmptyModels(1)
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['benefitDetailsLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },[key,list_key, context]) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-benefit-details-${key}-${list_key}`
      }, true, context);
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',list_key);
    }
  }
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.benefitDetailsLists[res.list] = res.data;
  }
};
