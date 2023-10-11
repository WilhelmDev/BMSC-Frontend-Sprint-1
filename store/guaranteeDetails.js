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
import {BENEFITS, IMAGE, INFORMATION_PANEL, TITLE} from "~/cardListKeys/guaranteeDetails";
export const state = () => ({
  guaranteeDetailsLists: {
    [TITLE]: [],
    [IMAGE]: [],
    [BENEFITS]: [],
    [INFORMATION_PANEL]: []

  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['guaranteeDetailsLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },[key,list_key, context]) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-guarantee-details-${key}-${list_key}`
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
    state.guaranteeDetailsLists[res.list] = res.data;
  }
};
