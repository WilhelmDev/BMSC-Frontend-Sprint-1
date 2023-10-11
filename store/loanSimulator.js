import executeRequest from "@/utils/httpUtil";

import {
  GET_INFORMATION_INITIAL,
  GET_LOAN_SIMULATOR_CREDIT,
  GET_LOAN_SIMULATOR_CVS
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
  [GET_INFORMATION_INITIAL]: async ({ commit }) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_SERVICES_ROUTE}/simulador/informacion_inicial`
      });
      return response;
    } catch (err) {
      console.error('Error trying to fetch');
      throw err;
    }
  },
  [GET_LOAN_SIMULATOR_CVS]: async ({ commit }, payload) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_SERVICES_ROUTE}/simulador/credito_vivienda_social?cesantia=${payload.cesantia}&idPlazoTipoCredito=${payload.idPTC}&monto=${payload.monto}&valorComercial=${payload.vComercial}`
      });
      return response;
    } catch (err) {
      console.error('Error trying to fetch');
      throw err;
    }
  },
  [GET_LOAN_SIMULATOR_CREDIT]: async ({ commit }, payload) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_SERVICES_ROUTE}/simulador/credito?cesantia=${payload.cesantia}&idPlazoTipoCredito=${payload.idPTC}&monto=${payload.monto}`
      });
      return response;
    } catch (err) {
      console.error('Error trying to fetch');
      throw err;
    }
  }
};

export const mutations = {};
