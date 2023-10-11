import executeRequest from "@/utils/httpUtil";

import {
  CONTACT_US_FORM_SEND, UPDATE_CAROUSEL_REAL_ESTATE_DATA,
  UPDATE_ESTATE_ITEM_DETAILS, UPDATE_ITEM_DETAILS_CONTACT,
  UPDATE_REAL_ESTATE_DATA,
  UPDATE_REAL_STATE_DATA,
  UPDATE_RELATED_ESTATE_ITEM_DETAILS,
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION,
} from "@/constants_actions";

import {
  BMSC_CLAIM_ROUTE, BMSC_CONTACTS_ROUTE, BMSC_ESTATE_ROUTE, BMSC_INFORMATION_ROUTE, BMSC_WINNERS_ROUTE,
  CARDS_LISTS_ROUTE
} from "@/constants_routes";
import {encapsulatedUpdate, simpleEncapsulatedUpdate} from "@/utils/cardsUtil";
import {
  HOME_CARDS,
  HOME_DOCUMENTS,
  HOME_PROGRAMS, MORE_INFO_FORM,
  STATE_CAROUSEL, STATE_ITEM_DETAILS, STATE_ITEM_DETAILS_CONTACT, STATE_ITEMS, STATE_NOTIFICATION, STATE_RELATED_ITEMS,
  STATE_TITLE, TARIFFS_DOCUMENTS, TARIFFS_TITLE
} from "~/cardListKeys/additionalInfo";
import {PEOPLE} from "~/cardListKeys/accountWinners";

export const state = () => ({
  additionalInfoLists: {
    [HOME_CARDS]: [],
    [HOME_PROGRAMS]: [],
    [HOME_DOCUMENTS]: [],

    [STATE_TITLE]: [],
    [STATE_CAROUSEL]: [],
    [STATE_NOTIFICATION]: [],
    [STATE_ITEMS]: [],
    [STATE_ITEM_DETAILS]: [],
    [STATE_ITEM_DETAILS_CONTACT]: [],
    [STATE_RELATED_ITEMS]: [],

    [TARIFFS_TITLE]: [],
    [TARIFFS_DOCUMENTS]: [],

    [MORE_INFO_FORM]: []
  }
})

export const getters = {
  getList: state => list_key => {
    let res = JSON.parse(JSON.stringify(state))['additionalInfoLists'][list_key];
    return res;
  }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },list_key) => {
    try {
      let response = await executeRequest({
        url: `${CARDS_LISTS_ROUTE}/key/bmsc-additional-info-${list_key}`
      });
      commit(UPDATE_STATE_MUTATION, encapsulatedUpdate(list_key,response['cards']));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',list_key);
      throw err;
    }
  },
  [UPDATE_CAROUSEL_REAL_ESTATE_DATA]: async ({ commit },
                                               [pageNumber, limit, searchText, departmentFilter, stateTypeFilter, categoryFilter, orderBy, minPrice, maxPrice, context]
  ) => {
    let url = `${BMSC_ESTATE_ROUTE}/filter?page=${pageNumber}&limit=${limit}`;
    //console.log('ORDER BY: ',orderBy,' type', typeof orderBy);
    if(searchText!=="")url+=`&searchText=${searchText}`;
    if(departmentFilter.length !== 0)url+=`&departmentFilter=${departmentFilter.join(',')}`;
    if(stateTypeFilter.length !== 0)url+=`&stateTypeFilter=${stateTypeFilter.join(',')}`;
    if(categoryFilter!=="Todo")url+=`&categoryFilter=${categoryFilter}`;
    if(typeof orderBy === "string")url+=`&orderBy=${orderBy}`;
    if(minPrice!=="")url+=`&minPrice=${minPrice}`;
    if(maxPrice!=="")url+=`&maxPrice=${maxPrice}`;
    try {
      let response = await executeRequest({
        url: url
      }, true, context);
      commit(UPDATE_STATE_MUTATION, simpleEncapsulatedUpdate(STATE_CAROUSEL,response));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',STATE_CAROUSEL);
      throw err;
    }
  },
  [UPDATE_REAL_ESTATE_DATA]: async ({ commit },
                                    [pageNumber, limit, searchText, departmentFilter, stateTypeFilter, categoryFilter, orderBy, minPrice, maxPrice, context]
  ) => {
    let url = `${BMSC_ESTATE_ROUTE}/filter?page=${pageNumber}&limit=${limit}`;
    //console.log('ORDER BY: ',orderBy,' type', typeof orderBy);
    if(searchText!=="")url+=`&searchText=${searchText}`;
    if(departmentFilter.length !== 0)url+=`&departmentFilter=${departmentFilter.join(',')}`;
    if(stateTypeFilter.length !== 0)url+=`&stateTypeFilter=${stateTypeFilter.join(',')}`;
    if(categoryFilter!=="Todo")url+=`&categoryFilter=${categoryFilter}`;
    if(typeof orderBy === "string")url+=`&orderBy=${orderBy}`;
    if(minPrice!=="")url+=`&minPrice=${minPrice}`;
    if(maxPrice!=="")url+=`&maxPrice=${maxPrice}`;
    try {
      let response = await executeRequest({
        url: url
      }, true, context);
      commit(UPDATE_STATE_MUTATION, simpleEncapsulatedUpdate(STATE_ITEMS,response));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',STATE_ITEMS);
      throw err;
    }
  },
  [UPDATE_RELATED_ESTATE_ITEM_DETAILS]: async ({ commit },
                                    [pageNumber, limit, searchText, departmentFilter, stateTypeFilter, categoryFilter, orderBy, minPrice, maxPrice, context]
  ) => {
    let url = `${BMSC_ESTATE_ROUTE}/filter?page=${pageNumber}&limit=${limit}`;
    //console.log('ORDER BY: ',orderBy,' type', typeof orderBy);
    if(searchText!=="")url+=`&searchText=${searchText}`;
    if(departmentFilter.length !== 0)url+=`&departmentFilter=${departmentFilter.join(',')}`;
    if(stateTypeFilter.length !== 0)url+=`&stateTypeFilter=${stateTypeFilter.join(',')}`;
    if(categoryFilter!=="Todo")url+=`&categoryFilter=${categoryFilter}`;
    if(typeof orderBy === "string")url+=`&orderBy=${orderBy}`;
    if(minPrice!=="")url+=`&minPrice=${minPrice}`;
    if(maxPrice!=="")url+=`&maxPrice=${maxPrice}`;
    try {
      let response = await executeRequest({
        url: url
      }, true, context);
      commit(UPDATE_STATE_MUTATION, simpleEncapsulatedUpdate(STATE_RELATED_ITEMS,response));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',STATE_RELATED_ITEMS);
      throw err;
    }
  },
  [UPDATE_ESTATE_ITEM_DETAILS]: async ({ commit },[key, context]) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_ESTATE_ROUTE}/${key}`
      }, true, context);
      commit(UPDATE_STATE_MUTATION, simpleEncapsulatedUpdate(STATE_ITEM_DETAILS,response));
      return response;
    } catch (err) {
      console.error('Error trying to fetch cardList: ',STATE_ITEM_DETAILS);
      throw err;
    }
  },
  [CONTACT_US_FORM_SEND]: async ({ commit },formData) => {
    try {
      let response = await executeRequest({
        url: `${BMSC_INFORMATION_ROUTE}`,
        method: 'POST',
        data: formData
      });
      return response;
    } catch (err) {
      return {
        success: false
      };
    }
  },
  [UPDATE_ITEM_DETAILS_CONTACT]: async ({ commit },[scope, context]) => {
    let parsedScope = scope.toLowerCase();
    try {
      let response = await executeRequest({
        url: `${BMSC_CONTACTS_ROUTE}/${parsedScope}`,
        method: 'GET'
      }, true, context);
      commit(UPDATE_STATE_MUTATION, simpleEncapsulatedUpdate(STATE_ITEM_DETAILS_CONTACT,response));
      return response;
    } catch (err) {
      return {
        success: false
      };
    }
  },

};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.additionalInfoLists[res.list] = res.data;
  }
};
