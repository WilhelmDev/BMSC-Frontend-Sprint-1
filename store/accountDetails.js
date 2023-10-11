import executeRequest from "@/utils/httpUtil";

import {
  BMSC, UPDATE_CARD_DATA_ACTION, UPDATE_COUPONS_ERROR,
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
  BENEFITS, COUPONS,
  DESCRIPTION,
  DISPLAY_PANEL,
  FORM,
  IMAGE,
  INFORMATION_PANEL,
  TITLE,
  COMPARE
} from "~/cardListKeys/accountDetails";
export const state = () => ({
  accountDetailsLists: {
    [TITLE]: [],
    [IMAGE]: [],
    [DESCRIPTION]: [],
    [FORM]: [],
    [DISPLAY_PANEL]: [],
    [BENEFITS]: [],
    [INFORMATION_PANEL]: [],

    [COUPONS]: null,
    [COMPARE]: []
  },
  couponsError: false
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['accountDetailsLists'][list_key];
    return res;
  },
  getCouponsError: state => state.couponsError
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },[key,list_key,context]) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-account-details-${key}-${list_key}`
      },true,context);
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',list_key);
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,[]));
      return []
      throw err;
    }
  },
  ["updatePersonCoupons"]: async ({ commit },[type, passport, ci, city, account, context]) => {
    try {
      commit(UPDATE_COUPONS_ERROR, false);
      let response
      if (type === 'ci') {
        response = await executeRequest({
          url: `${BMSC_COUPONS_ROUTE}/${account}/ci/${ci}${city}`
        }, true, context);
      } else if (type === 'other') {
        response = await executeRequest({
          url: `${BMSC_COUPONS_ROUTE}/${account}/ci/${passport}`
        }, true, context);
      }
      commit(UPDATE_STATE_MUTATION, simpleEncapsulatedUpdate(COUPONS, response));
      return response;
    } catch (err) {
      /*
      commit(UPDATE_STATE_MUTATION, simpleEncapsulatedUpdate(COUPONS, {
        "nombre": "Juan Perez",
        "numero": 123456
      }));

       */
      commit(UPDATE_COUPONS_ERROR, true);
      console.error('Error trying to fetch cardList: ', COUPONS);
    }
  }
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.accountDetailsLists[res.list] = res.data;
  },
  [UPDATE_COUPONS_ERROR]: (state, res) => {
    state.couponsError = res;
  }
};
