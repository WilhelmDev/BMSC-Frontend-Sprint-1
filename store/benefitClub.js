import executeRequest from "@/utils/httpUtil";
import executeRequestWithHandler from "@/utils/httpUtilWithHandlers";

import {
  BMSC,
  REQUEST_GET_BENEFIT_CLUB_CATEGORIES,
  REQUEST_GET_BENEFIT_CLUB_CITIES,
  REQUEST_GET_BENEFIT_CLUB_COMMERCES,
  REQUEST_GET_BENEFIT_CLUB_POINTS,
  UPDATE_BENEFIT_CLUB_CATEGORIES_LIST,
  UPDATE_BENEFIT_CLUB_CITIES_LIST,
  UPDATE_BENEFIT_CLUB_COMMERCES_LIST,
  UPDATE_BENEFIT_CLUB_POINTS_CONTENT, UPDATE_BENEFIT_CLUB_POINTS_ERROR,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION,
} from "@/constants_actions";

import {
  BMSC_BENEFITS_POINTS_ROUTE,
  BMSC_POINTS_ROUTE,
  CARDS_LISTS_ROUTE
} from "@/constants_routes";

import {
  encapsulatedUpdate,
  generateEmptyModels
} from "@/utils/cardsUtil";

import {
  POINTS,
  DETAILS,
  CATALOG,
  COMMERCES,
  INFO
} from "~/cardListKeys/benefitClub";

export const state = () => ({
  benefitClubLists: {
    [POINTS]: generateEmptyModels(1),
    [DETAILS]: generateEmptyModels(1),
    [CATALOG]: generateEmptyModels(1),
    [COMMERCES]: generateEmptyModels(1),
    [INFO]: generateEmptyModels(1)
  },
  benefitClubPoints: [],
  benefitClubCities: [],
  benefitClubCategories: [],
  benefitClubCommerces: [],
  benefitClubPointsError: false
});

export const getters = {
  getList: state => list_key => {
    return JSON.parse(JSON.stringify(state))['benefitClubLists'][list_key];
  },
  getBenefitClubPoints: state => state.benefitClubPoints,
  getBenefitClubPointsError: state => state.benefitClubPointsError,
  getBenefitClubCities: state => state.benefitClubCities,
  getBenefitClubCategories: state => state.benefitClubCategories,
  getBenefitClubCommerces: state => state.benefitClubCommerces
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit }, [list_key, context]) => {
    const key = `${BMSC}-benefits-club-${list_key}`;
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/${key}`
      }, true, context);
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key, response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ', key);
      throw err;
    }
  },
  [REQUEST_GET_BENEFIT_CLUB_POINTS]: async ({ commit }, [data, context]) => {
    try {
      commit(UPDATE_BENEFIT_CLUB_POINTS_ERROR, false);
      let response = await executeRequest({
        url: `${BMSC_POINTS_ROUTE}/ci/${data.documentNumber}`
      }, true, context);
      commit(UPDATE_BENEFIT_CLUB_POINTS_CONTENT, response);
      return response;
    } catch (err) {
      commit(UPDATE_BENEFIT_CLUB_POINTS_ERROR, true);
      /*
      commit(UPDATE_BENEFIT_CLUB_POINTS_CONTENT, [
        {
          "documentoId":"5131005PO",
          "nombre":"PATERNO MATERNO/NOMBRE1",
          "grupo":"BANCO",
          "secuencia":1,
          "categoria":"PTOS. ACUM. AL PERIODO ANTERIOR:",
          "accion":"2020/10",
          "puntos":282
        },
        {
          "documentoId":"5131005PO",
          "nombre":"PATERNO MATERNO/NOMBRE1",
          "grupo":"BANCO",
          "secuencia":2,
          "categoria":"TARJETA DE DEBITO",
          "accion":"CONSUMO COMPRAS NACIONALES",
          "puntos":8
        },
        {
          "documentoId":"5131005PO",
          "nombre":"PATERNO MATERNO/NOMBRE1",
          "grupo":"BANCO",
          "secuencia":3,
          "categoria":"MANUAL DECISION DEL BANCO",
          "accion":"BONIFICACION",
          "puntos":10
        },
        {
          "documentoId":"5131005PO",
          "nombre":"PATERNO MATERNO/NOMBRE1",
          "grupo":"BANCO",
          "secuencia":4,
          "categoria":"PTOS. ACUM. TOTALES AL:(ACTIVO)",
          "accion":"2020/11/27",
          "puntos":300
        }
      ]);

       */
    }
  },
  [REQUEST_GET_BENEFIT_CLUB_CITIES]: async ({ commit }, [context]) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_BENEFITS_POINTS_ROUTE}/ciudad`
      }, true, context);
      commit(UPDATE_BENEFIT_CLUB_CITIES_LIST, response);
      return response;
    } catch (err) {
      commit(UPDATE_BENEFIT_CLUB_CITIES_LIST, []);
      throw err;
    }
  },
  [REQUEST_GET_BENEFIT_CLUB_CATEGORIES]: async ({ commit }, [context]) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_BENEFITS_POINTS_ROUTE}/categoria`
      }, true, context);
      commit(UPDATE_BENEFIT_CLUB_CATEGORIES_LIST, response);
      return response;
    } catch (err) {
      commit(UPDATE_BENEFIT_CLUB_CATEGORIES_LIST, []);
      throw err;
    }
  },
  [REQUEST_GET_BENEFIT_CLUB_COMMERCES]: async ({ commit }, [data, context]) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_BENEFITS_POINTS_ROUTE}/comercio`,
        params: data
      }, true, context);
      commit(UPDATE_BENEFIT_CLUB_COMMERCES_LIST, response);
      return response;
    } catch (err) {
      console.log('Error in updating club comerces: ',err);
      commit(UPDATE_BENEFIT_CLUB_COMMERCES_LIST, []);
      throw err;
    }
  },
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.benefitClubLists[res.list] = res.data;
  },
  [UPDATE_BENEFIT_CLUB_POINTS_CONTENT]: (state, data) => {
    state.benefitClubPoints = data;
  },
  [UPDATE_BENEFIT_CLUB_CITIES_LIST]: (state, data) => {
    state.benefitClubCities = data;
  },
  [UPDATE_BENEFIT_CLUB_CATEGORIES_LIST]: (state, data) => {
    state.benefitClubCategories = data;
  },
  [UPDATE_BENEFIT_CLUB_COMMERCES_LIST]: (state, data) => {
    state.benefitClubCommerces = data;
  },
  [UPDATE_BENEFIT_CLUB_POINTS_ERROR]: (state, data) => {
    state.benefitClubPointsError = data;
  },
};
