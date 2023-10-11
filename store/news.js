import executeRequest from "@/utils/httpUtil";

import {
  REQUEST_GET_NEWS,
  REQUEST_GET_NEWS_ENTRY,
  REQUEST_GET_FILTERED_NEWS,
  REQUEST_GET_NEWS_CATEGORIES,
  UPDATE_NEWS_LIST_CONTENT,
  UPDATE_NEWS_CATEGORY_LIST_CONTENT,
} from "@/constants_actions";

import {
  NEWS_ROUTE,
  NEWS_CATEGORIES_ROUTE
} from "@/constants_routes";

export const state = () => ({
  newsList: [],
  newsCategoryList: []
})

export const getters = {
  getNewsList: state => state.newsList,
  getNewsCategoryList: state => state.newsCategoryList
};

export const actions = {
  [REQUEST_GET_NEWS]: async ({ commit }) => {
    try {
      let response = await executeRequest({
        url: `${NEWS_ROUTE}`
      });
      commit(UPDATE_NEWS_LIST_CONTENT, response);
      return response;
    } catch (err) {
      commit(UPDATE_NEWS_LIST_CONTENT, []);
      throw err;
    }
  },
  [REQUEST_GET_NEWS_ENTRY]: async ({ commit }, entryId) => {
    return await executeRequest({
      url: `${NEWS_ROUTE}/${entryId}`
    });
  },
  [REQUEST_GET_FILTERED_NEWS]: async ({ commit }, params) => {
    try {
      let response = await executeRequest({
        url: `${NEWS_ROUTE}/category/${params.id}`
      });
      commit(UPDATE_NEWS_LIST_CONTENT, response);
      return response;
    } catch (err) {
      commit(UPDATE_NEWS_LIST_CONTENT, []);
      throw err;
    }
  },
  [REQUEST_GET_NEWS_CATEGORIES]: async ({ commit }, [context]) => {
    try {
      let response = await executeRequest({
        url: `${NEWS_CATEGORIES_ROUTE}`
      }, true, context);
      commit(UPDATE_NEWS_CATEGORY_LIST_CONTENT, response);
      return response;
    } catch (err) {
      commit(UPDATE_NEWS_CATEGORY_LIST_CONTENT, []);
      throw err;
    }
  }
};

export const mutations = {
  [UPDATE_NEWS_LIST_CONTENT]: (state, data) => {
    state.newsList = data;
  },
  [UPDATE_NEWS_CATEGORY_LIST_CONTENT]: (state, data) => {
    state.newsCategoryList = data;
  }
};
