import executeRequest from "@/utils/httpUtil";

import {
  GET_SIMULATOR_INTEREST,
  GET_LOAN_SIMULATOR_DPF,
  GET_LOAN_SIMULATOR_DPF_INC
} from "@/constants_actions";

import {
  BMSC_SERVICES_ROUTE
} from "@/constants_routes";

import {
  generateEmptyModels
} from "@/utils/cardsUtil";

import {
  INTRO
} from "~/cardListKeys/aboutUs";

export const state = () => ({
  aboutUsLists: {
    [INTRO]: generateEmptyModels(1)
  }
})

export const getters = {};

export const actions = {
  [GET_SIMULATOR_INTEREST]: async ({ commit }, payload) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_SERVICES_ROUTE}/simuladorpasivo?tipoCuenta=${payload.tipoCuenta}&moneda=${payload.moneda}&monto=${payload.monto}&plazo=${payload.plazo}`
      });
      return response;
    } catch (err) {
      console.error('Error trying to fetch');
      throw err;
    }
  },
  [GET_LOAN_SIMULATOR_DPF]: async ({ commit }, payload) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_SERVICES_ROUTE}/simulador/dpf?moneda=${payload.moneda}&monto=${payload.monto}&plazo=${payload.plazo}`
      });
      return response;
    } catch (err) {
      console.error('Error trying to fetch');
      throw err;
    }
  },
  [GET_LOAN_SIMULATOR_DPF_INC]: async ({ commit }, payload) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_SERVICES_ROUTE}/simulador/dpf_incremental?moneda=${payload.moneda}&monto=${payload.monto}`
      });
      return response;
    } catch (err) {
      console.error('Error trying to fetch');
      throw err;
    }
  }
};

export const mutations = {};
