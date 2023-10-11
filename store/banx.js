import executeRequest from "@/utils/httpUtil";

import {
  BMSC,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION, UPDATE_STATE_NEWS_ACTION,
  UPDATE_STATE_ACTION_RANKING_PROMO
} from "@/constants_actions";

import {
  CARDS_LISTS_ROUTE, NEWS_ROUTE,
  BMSC_RANKING_PROMO_ROUTE
} from "@/constants_routes";
import {encapsulatedNewsUpdate, encapsulatedUpdate, generateEmptyModels} from "@/utils/cardsUtil";
import {
  HOME_INTRODUCTION,
  HOME_CAROUSEL,
  HOME_LISTED_PRODUCTS,
  HOME_CARDS,
  HOME_PROGRAMS,
  HOME_NEWS_TITLE,
  HOME_NEWS,
  HOME_RELATED_ITEMS,
  HOME_MORE_INFO,
  ACCOUNTS_TITLE,
  ACCOUNTS_CARDS_LIST,
  ACCOUNTS_CARDS,
  ACCOUNTS_COMPARE,
  ACCOUNTS_PROGRAMS,
  ACCOUNT_RELATED_PANEL,
  ACCOUNT_MORE_INFO,
  ACCOUNT_DETAILS_TITLE,
  ACCOUNT_DETAILS_IMAGE,
  ACCOUNT_DETAILS_BENEFITS,
  ACCOUNT_DETAILS_TITLE_PANEL,
  ACCOUNT_DETAILS_DETAILS_PANEL,
  ACCOUNT_DETAILS_COMPARE,
  ACCOUNT_DETAILS_RELATED_PANEL,
  ACCOUNT_DETAILS_MORE_INFO,
  BENEFIT_TITLE,
  BENEFIT_DESCRIPTION,
  BENEFIT_DESCRIPTION_DETAILS,
  BENEFIT_CAROUSEL,
  BENEFIT_PROGRAMS,
  BENEFIT_RELATED_PANEL,
  BENEFIT_MORE_INFO,
  PROMO_TITLE,
  PROMO_SUB_TITLE,
  PROMO_STEPS,
  PROMO_CHALLENGE_TITLE,
  PROMO_CHALLENGE_LIST,
  PROMO_RULES,
  PROMO_NEWS,
  PROMO_FREQUENT_QUESTION,
  CHALLENGE_INTRODUCTION,
  CHALLENGE_DATES,
  CHALLENGE_DESCRIPTION,
  CHALLENGE_DETAILS,
  CHALLENGE_AWARDS,
  CHALLENGE_DISCLAIMER,
  CHALLENGE_NEWS,
  CHALLENGE_FREQUENT_QUESTION,
  LOANS_TITLE,
  LOANS_CARDS,
  LOANS_COMPARE,
  LOANS_PROGRAMS,
  LOANS_RELATED_PANEL,
  LOANS_MORE_INFO,
  CREDIT_CARD_TITLE,
  CREDIT_CARD_CARDS,
  CREDIT_CARD_REVIEWS_CAROUSEL,
  CREDIT_CARD_COMPARE,
  CREDIT_CARD_BENEFITS,
  CREDIT_CARD_PROGRAMS,
  CREDIT_CARD_BENEFITS_2,
  CREDIT_CARD_RELATED_PANEL,
  CREDIT_CARD_MORE_INFO,
  HELP_MORE_INFO,
  HELP_PHONES,
  NEWS_LIST,
  INSURANCE_TITLE,
  INSURANCE_CARDS,
  INSURANCE_REVIEWS_CAROUSEL,
  INSURANCE_BENEFITS,
  INSURANCE_PROGRAMS,
  INSURANCE_BENEFITS_2,
  INSURANCE_COMPARE
} from "~/cardListKeys/banx";
import executeRequestWithHandler from "~/utils/httpUtilWithHandlers";

export const state = () => ({
  banxLists: {
    [HOME_INTRODUCTION]: generateEmptyModels(1),
    [HOME_CAROUSEL]: [],
    [HOME_LISTED_PRODUCTS]: [],
    [HOME_CARDS]:[],
    [HOME_PROGRAMS]: [],
    [HOME_NEWS_TITLE]:[],
    [HOME_NEWS]: [],
    [HOME_RELATED_ITEMS]: [],
    [HOME_MORE_INFO]: [],

    [ACCOUNTS_TITLE]: generateEmptyModels(1),
    [ACCOUNTS_CARDS_LIST]:generateEmptyModels(1),
    [ACCOUNTS_CARDS]: generateEmptyModels(1),
    [ACCOUNTS_COMPARE]: generateEmptyModels(1),
    [ACCOUNTS_PROGRAMS]: generateEmptyModels(1),
    [ACCOUNT_RELATED_PANEL]: generateEmptyModels(1),
    [ACCOUNT_MORE_INFO]: generateEmptyModels(1),

    [ACCOUNT_DETAILS_TITLE]: generateEmptyModels(1),
    [ACCOUNT_DETAILS_IMAGE]: [],
    [ACCOUNT_DETAILS_BENEFITS]: [],
    [ACCOUNT_DETAILS_TITLE_PANEL]: [],
    [ACCOUNT_DETAILS_DETAILS_PANEL]: [],
    [ACCOUNT_DETAILS_COMPARE]: [],
    [ACCOUNT_DETAILS_RELATED_PANEL]: [],
    [ACCOUNT_DETAILS_MORE_INFO]: [],

    [BENEFIT_TITLE]: generateEmptyModels(1),
    [BENEFIT_DESCRIPTION]: [],
    [BENEFIT_DESCRIPTION_DETAILS]: [],
    [BENEFIT_CAROUSEL]: [],
    [BENEFIT_PROGRAMS]: [],
    [BENEFIT_RELATED_PANEL]: [],
    [BENEFIT_MORE_INFO]: [],

    [PROMO_TITLE]: generateEmptyModels(1),
    [PROMO_SUB_TITLE]: [],
    [PROMO_STEPS]: [],
    [PROMO_CHALLENGE_TITLE]: [],
    [PROMO_CHALLENGE_LIST]: [],
    [PROMO_RULES]: [],
    [PROMO_NEWS]: [],
    [PROMO_FREQUENT_QUESTION]: [],

    [CHALLENGE_INTRODUCTION]: generateEmptyModels(1),
    [CHALLENGE_DATES]: [],
    [CHALLENGE_DESCRIPTION]: [],
    [CHALLENGE_DETAILS]: [],
    [CHALLENGE_AWARDS]: [],
    [CHALLENGE_DISCLAIMER]: [],
    [CHALLENGE_NEWS]: [],
    [CHALLENGE_FREQUENT_QUESTION]: [],

    [LOANS_TITLE]: generateEmptyModels(1),
    [LOANS_CARDS]: generateEmptyModels(1),
    [LOANS_COMPARE]: [],
    [LOANS_PROGRAMS]: generateEmptyModels(1),
    [LOANS_RELATED_PANEL]: generateEmptyModels(1),
    [LOANS_MORE_INFO]: generateEmptyModels(1),

    [CREDIT_CARD_TITLE]: generateEmptyModels(1),
    [CREDIT_CARD_CARDS]: [],
    [CREDIT_CARD_REVIEWS_CAROUSEL]: [],
    [CREDIT_CARD_COMPARE]: [],
    [CREDIT_CARD_BENEFITS]: [],
    [CREDIT_CARD_PROGRAMS]: [],
    [CREDIT_CARD_BENEFITS_2]: [],
    [CREDIT_CARD_RELATED_PANEL]: [],
    [CREDIT_CARD_MORE_INFO]: [],

    [HELP_MORE_INFO]: generateEmptyModels(1),
    [HELP_PHONES]: [],

    [NEWS_LIST]: generateEmptyModels(1),

    [INSURANCE_TITLE]: generateEmptyModels(1),
    [INSURANCE_CARDS]: [],
    [INSURANCE_REVIEWS_CAROUSEL]: [],
    [INSURANCE_BENEFITS]: [],
    [INSURANCE_PROGRAMS]: [],
    [INSURANCE_BENEFITS_2]: [],
    [INSURANCE_COMPARE]: []
  },
  promoRaking: []
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['banxLists'][list_key];
    return res;
  },
  getPromoRaking: state => state.promoRaking
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({commit}, list_key) => {
    try {
      let response = await executeRequest({
        // url: `http://3.233.183.218:3000/${CARDS_LISTS_ROUTE}/key/${BMSC}-banx-${list_key}`
        url: `${CARDS_LISTS_ROUTE}/key/${BMSC}-banx-${list_key}`
      });
      /* default values of banx */
      response['cards'].forEach(function (element) {
        element.isBanx = true;
        element.hasBracket = false
      });
      commit(UPDATE_STATE_MUTATION, await encapsulatedUpdate(list_key, response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ', list_key);
      throw err;
    }
  },
  [UPDATE_STATE_ACTION_RANKING_PROMO]: async ({commit},[context]) => {
    try {
      let response = await executeRequest({
        // url: `http://3.233.183.218:3000/${BMSC_RANKING_PROMO_ROUTE}`
        url: `${BMSC_RANKING_PROMO_ROUTE}`
      }, true, context);
      commit(UPDATE_STATE_ACTION_RANKING_PROMO, response);
      return response;
    } catch (err) {
      //commit(UPDATE_STATE_ACTION_RANKING_PROMO, [{"nombrePromocion":"IMMANENT 2018","puntosAcumulados":484766,"turno":"Mañana","nombreColegio":"SAINT ANDREWS SCCHOOL","departamento":"LA PAZ"},{"nombrePromocion":"INFINITE FIRE","puntosAcumulados":382263,"turno":"Mañana","nombreColegio":"HUGHES SCHOOLS","departamento":"COCHABAMBA"},{"nombrePromocion":"PRE PROMOCION 2019","puntosAcumulados":263900,"turno":"Mañana","nombreColegio":"SAINT ANDREWS SCCHOOL","departamento":"LA PAZ"},{"nombrePromocion":"SAVIOR'S ","puntosAcumulados":235870,"turno":"Mañana","nombreColegio":"SAGRADO CORAZON DE JESUS","departamento":"CHUQUISACA"},{"nombrePromocion":"PRE-PROMOCION EINHAT","puntosAcumulados":197366,"turno":"Mañana","nombreColegio":"LA SALLE","departamento":"SANTA CRUZ"},{"nombrePromocion":"PROMOCION EINFACH","puntosAcumulados":148339,"turno":"Mañana","nombreColegio":"COLEGIO JUAN PABLO II","departamento":"SANTA CRUZ"},{"nombrePromocion":"GENIUS","puntosAcumulados":104020,"turno":"Mañana","nombreColegio":"SANTA ANA","departamento":"TARIJA"},{"nombrePromocion":"NATUS VINCERE","puntosAcumulados":103069,"turno":"Mañana","nombreColegio":"LA SALLE","departamento":"LA PAZ"},{"nombrePromocion":"PRE PROMOCION ENFFACH 2019","puntosAcumulados":88515,"turno":"Mañana","nombreColegio":"COLEGIO FRANCO BOLIVIANO","departamento":"SANTA CRUZ"},{"nombrePromocion":"MMXIX","puntosAcumulados":87200,"turno":"Mañana","nombreColegio":"SANTA CRUZ COOPERATIVE SCHOOL","departamento":"SANTA CRUZ"},{"nombrePromocion":"PRE PROMOCION MOCOS","puntosAcumulados":83208,"turno":"Mañana","nombreColegio":"COLEGIO HORIZONTES","departamento":"LA PAZ"},{"nombrePromocion":"SUEM","puntosAcumulados":76866,"turno":"Tarde","nombreColegio":"SIMON RODRIGUEZ","departamento":"CHUQUISACA"},{"nombrePromocion":"2018 AZUL","puntosAcumulados":53117,"turno":"Mañana","nombreColegio":"DON BOSCO","departamento":"COCHABAMBA"},{"nombrePromocion":"PORTATORI DI CRISTO","puntosAcumulados":52133,"turno":"Mañana","nombreColegio":"COLEGIO SEMINARIO SAN CRISTOBAL","departamento":"CHUQUISACA"},{"nombrePromocion":"SWAT AGUSTINA","puntosAcumulados":50590,"turno":"Mañana","nombreColegio":"SAN AGUSTIN","departamento":"COCHABAMBA"},{"nombrePromocion":"ALESUS","puntosAcumulados":46100,"turno":"Mañana","nombreColegio":"JUAN ENRIQUE PESTALOZZI","departamento":"CHUQUISACA"},{"nombrePromocion":"PRE PROMOCION MONTESSORI","puntosAcumulados":45645,"turno":"Mañana","nombreColegio":"MONTESSORI","departamento":"LA PAZ"},{"nombrePromocion":"PROMOCION 2018","puntosAcumulados":37618,"turno":"Mañana","nombreColegio":"COLEGIO CUMBRE","departamento":"LA PAZ"},{"nombrePromocion":"PROMO SHUHEF","puntosAcumulados":36150,"turno":"Mañana","nombreColegio":"COLEGIO FRANCO BOLIVIANO","departamento":"SANTA CRUZ"},{"nombrePromocion":"ELYSIAN","puntosAcumulados":34055,"turno":"Mañana","nombreColegio":"AMERICAN COOPERATIVE SCHOOL","departamento":"LA PAZ"},{"nombrePromocion":"PRE- PROMOCION ENDLICH","puntosAcumulados":33647,"turno":"Mañana","nombreColegio":"COLEGIO ALEMAN","departamento":"SANTA CRUZ"},{"nombrePromocion":"PRE PROMOCION - SHUEFF","puntosAcumulados":33120,"turno":"Mañana","nombreColegio":"MAYOR SAN LORENZO","departamento":"SANTA CRUZ"},{"nombrePromocion":"SHAFERS","puntosAcumulados":32038,"turno":"Mañana","nombreColegio":"MUYURINA","departamento":"SANTA CRUZ"},{"nombrePromocion":"AUGENBLICK","puntosAcumulados":31900,"turno":"Mañana","nombreColegio":"ALEXANDER VON HUMBOLDT","departamento":"CHUQUISACA"},{"nombrePromocion":"PRE PROMOCION COLEGIO PAULO VI","puntosAcumulados":25900,"turno":"Mañana","nombreColegio":"PAULO VI","departamento":"COCHABAMBA"},{"nombrePromocion":"INDELEBLIS","puntosAcumulados":24300,"turno":"Mañana","nombreColegio":"MONTESSORI","departamento":"LA PAZ"},{"nombrePromocion":"KAIROS 2018","puntosAcumulados":23359,"turno":"Mañana","nombreColegio":"COLEGIO SAN CALIXTO","departamento":"LA PAZ"},{"nombrePromocion":"PROMOCION 2018","puntosAcumulados":22188,"turno":"Mañana","nombreColegio":"COLEGIO ALEMAN MARISCAL BRAUN","departamento":"LA PAZ"},{"nombrePromocion":"PROMOCION SCHAFFER","puntosAcumulados":21780,"turno":"Mañana","nombreColegio":"COLEGIO DON BOSCO","departamento":"SANTA CRUZ"},{"nombrePromocion":"SAN JUAN PABLO II","puntosAcumulados":21445,"turno":"Mañana","nombreColegio":"LA SALLE TARIJA","departamento":"TARIJA"},{"nombrePromocion":"NATUS VINCERE","puntosAcumulados":21225,"turno":"Mañana","nombreColegio":"JOSEFA MANUELA GANDARILLAS","departamento":"COCHABAMBA"},{"nombrePromocion":"PRE-PROMOCION","puntosAcumulados":21106,"turno":"Mañana","nombreColegio":"ESPANA","departamento":"COCHABAMBA"},{"nombrePromocion":"SUICIDE SQUAD ","puntosAcumulados":20900,"turno":"Tarde","nombreColegio":"LINDAURA ANZOATEGUI DE CAMPERO 1","departamento":"TARIJA"},{"nombrePromocion":"SWATS","puntosAcumulados":20900,"turno":"Mañana","nombreColegio":"BAUTISTA","departamento":"SANTA CRUZ"},{"nombrePromocion":"NEXUS ","puntosAcumulados":20900,"turno":"Tarde","nombreColegio":"MARIA LAURA JUSTINIANO 2","departamento":"TARIJA"},{"nombrePromocion":"PREPROMO 2019","puntosAcumulados":18054,"turno":"Mañana","nombreColegio":"TIQUIPAYA","departamento":"COCHABAMBA"},{"nombrePromocion":"ARTIUM","puntosAcumulados":17900,"turno":"Tarde","nombreColegio":"COLEGIO HORIZONTES","departamento":"LA PAZ"},{"nombrePromocion":"DOMINIOS ILUMINATEO MEA","puntosAcumulados":15900,"turno":"Mañana","nombreColegio":"NUESTRA SENORA DE ITATI","departamento":"LA PAZ"},{"nombrePromocion":"LA SALLE PRE- PROMOCION","puntosAcumulados":15002,"turno":"Mañana","nombreColegio":"LA SALLE","departamento":"LA PAZ"},{"nombrePromocion":"NEXUS ","puntosAcumulados":15000,"turno":"Mañana","nombreColegio":"NACIONAL SAN LUIS","departamento":"TARIJA"},{"nombrePromocion":"PROMOCION 2019","puntosAcumulados":12001,"turno":"Mañana","nombreColegio":"COLEGIO INTEGRAL BOLIVIANO ACHUMANI","departamento":"LA PAZ"},{"nombrePromocion":"PRE PROMOCION COLEGIO CUMBRE","puntosAcumulados":11378,"turno":"Mañana","nombreColegio":"COLEGIO CUMBRE","departamento":"LA PAZ"},{"nombrePromocion":"PRE PROMOCION FAREM ","puntosAcumulados":11300,"turno":"Mañana","nombreColegio":"COLEGIO ADVENTISTA TRINIDAD","departamento":"BENI"},{"nombrePromocion":"ALWAYS TOGETHER NEVER FORGOTTEN (ATNF)","puntosAcumulados":11140,"turno":"Mañana","nombreColegio":"COLEGIO ISAAC ATTIE","departamento":"COCHABAMBA"},{"nombrePromocion":"PRE PROMO EINIGKEIT","puntosAcumulados":10913,"turno":"Mañana","nombreColegio":"COLEGIO ALEMAN MARISCAL BROWN","departamento":"LA PAZ"},{"nombrePromocion":"SENIOR CLASS","puntosAcumulados":10900,"turno":"Mañana","nombreColegio":"COLEGIO EVANGELICO METODISTA JUAN WESLEY","departamento":"SANTA CRUZ"},{"nombrePromocion":"PROMO 2018 BOLIVIANO JAPONES","puntosAcumulados":10900,"turno":"Mañana","nombreColegio":"BOLIVIANO JAPONES","departamento":"SANTA CRUZ"},{"nombrePromocion":"PROMOCION FREIHEIT ","puntosAcumulados":10900,"turno":"Mañana","nombreColegio":"COLEGIO ALEXANDER VON HUMBOLD","departamento":"SANTA CRUZ"},{"nombrePromocion":"DERSHATS","puntosAcumulados":10900,"turno":"Mañana","nombreColegio":"SAGRADO CORAZON DE MARIA","departamento":"SANTA CRUZ"},{"nombrePromocion":"PROMOCION 2019","puntosAcumulados":10505,"turno":"Mañana","nombreColegio":"COLEGIO ANGLO AMERICANO","departamento":"COCHABAMBA"},{"nombrePromocion":"LA SALLISTAS DE CORAZON 2018","puntosAcumulados":10216,"turno":"Tarde","nombreColegio":"LA SALLE CONVENIO","departamento":"TARIJA"},{"nombrePromocion":"PHYSIUS","puntosAcumulados":10201,"turno":"Mañana","nombreColegio":"COLEGIO BOLIVIANO ALEMÁN","departamento":"CHUQUISACA"},{"nombrePromocion":"TEIHEN'S","puntosAcumulados":10200,"turno":"Mañana","nombreColegio":"COLEGIO BILINGUE DOMINGO SAVIO","departamento":"SANTA CRUZ"},{"nombrePromocion":"SEINETZ","puntosAcumulados":10164,"turno":"Mañana","nombreColegio":"SAINT GEORGE","departamento":"SANTA CRUZ"},{"nombrePromocion":"TOF","puntosAcumulados":10038,"turno":"Tarde","nombreColegio":"TERCERA ORDEN FRANCISCANA","departamento":"TARIJA"},{"nombrePromocion":"HALCONES 2018","puntosAcumulados":10021,"turno":"Mañana","nombreColegio":"SANTA TERESA","departamento":"LA PAZ"},{"nombrePromocion":"NON EST FINIS","puntosAcumulados":10000,"turno":"Mañana","nombreColegio":"LOYOLA","departamento":"COCHABAMBA"},{"nombrePromocion":"PROMOCION 2018 COLEGIO BELGRANO","puntosAcumulados":10000,"turno":"Mañana","nombreColegio":"COLEGIO BELGRANO","departamento":"TARIJA"},{"nombrePromocion":"PRE PROMOCION ZEUTECH","puntosAcumulados":10000,"turno":"Mañana","nombreColegio":"COLEGIO ALEXANDER VON HUMBOLD","departamento":"SANTA CRUZ"},{"nombrePromocion":"ZEINHERS","puntosAcumulados":10000,"turno":"Mañana","nombreColegio":"CRISTO REY","departamento":"SANTA CRUZ"},{"nombrePromocion":"PRE PROMOCION SUANHET","puntosAcumulados":9710,"turno":"Mañana","nombreColegio":"LYCEE FRANCAIS DE SANTA CRUZ","departamento":"SANTA CRUZ"},{"nombrePromocion":"YOUNG AND FREE","puntosAcumulados":3006,"turno":"Mañana","nombreColegio":"CARACHIPAMPA","departamento":"COCHABAMBA"},{"nombrePromocion":"LEDGERS","puntosAcumulados":337,"turno":"Mañana","nombreColegio":"MAYOR SANTO TOMAS DE AQUINO","departamento":"SANTA CRUZ"}]);
      console.error('Error trying to fetch ranking de promos.');
    }
  },
  [UPDATE_STATE_NEWS_ACTION]: async ({commit}) => {
    try {
      let banxNewsCategory = 5;
      let response = await executeRequest({
        url: `${NEWS_ROUTE}/category/${banxNewsCategory}`
      });
      commit(UPDATE_STATE_MUTATION, encapsulatedNewsUpdate(NEWS_LIST, response));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ', NEWS_LIST);
      throw err;
    }
  },
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.banxLists[res.list] = res.data;
  },
  [UPDATE_STATE_ACTION_RANKING_PROMO]: (state, res) => {
    state.promoRaking = res;
  }
};
