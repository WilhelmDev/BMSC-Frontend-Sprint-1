import executeRequest from "@/utils/httpUtil";

import {
  BMSC, UPDATE_CARD_DATA_ACTION,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION, UPDATE_TIPOTRE_ACTION,
} from "@/constants_actions";

import {
  BMSC_WINNERS_ROUTE,
  CARDS_LISTS_ROUTE
} from "@/constants_routes";
import {encapsulatedUpdate, generateEmptyModels, simpleEncapsulatedUpdate} from "@/utils/cardsUtil";
import {AD} from "~/cardListKeys/simulator";
import {PEOPLE} from "~/cardListKeys/accountWinners";

export const state = () => ({
  accountWinnersLists: {
    [PEOPLE]: {
      items: [],
      meta: {
        currentPage: 1,
        itemCount: 0,
        itemsPerPage: 0,
        totalItems: 0,
        totalPages: 0
      }
    }
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['accountWinnersLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },[pageNumber, limit, searchText, context]) => {
    let searchQueryString = searchText.length === 0 ? "" : "&search="+searchText;
    try {
      let response = await executeRequest({
        url: `${BMSC_WINNERS_ROUTE}/smc?page=${pageNumber}&limit=${limit}${searchQueryString}`
      }, true, context);
      commit(UPDATE_STATE_MUTATION, simpleEncapsulatedUpdate(PEOPLE,response));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',PEOPLE);
      throw err;
    }
  }
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.accountWinnersLists[res.list] = res.data;
  }
};
