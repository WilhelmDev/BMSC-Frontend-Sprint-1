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

export const state = () => ({
  footerLists: {
    [SOCIAL_NETWORKS]: [],
    [TIPOTRE]: {}
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
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-footer-${list_key}`
      });
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',list_key);
      throw err;
    }
  },
  [UPDATE_TIPOTRE_ACTION]: async ({ commit }, [context]) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_SERVICES_ROUTE}/${TIPOTRE}`
      },true, context);
      commit(UPDATE_STATE_MUTATION, simpleEncapsulatedUpdate(TIPOTRE,response));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',TIPOTRE);
      return {
        compra: '--',
        mvcc: '--',
        mvcv: '--',
        tre: '--',
        tremn: '--',
        tremv: '--',
        treufv: '--',
        ufvc: '--',
        ufvv: '--',
        venta: '--'
      };
    }
  }
  //TODO: Integrate money exchange service
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.footerLists[res.list] = res.data;
  }
};
