import executeRequest from "@/utils/httpUtil";
import { REQUEST_GET_CATEGORIES, REQUEST_GET_QUESTIONS, UPDATE_SEARCH_RESULTS } from "@/constants_actions";
import { BMSC_QUESTIONS_ROUTE } from "@/constants_routes";
import { processListFields } from '@/utils/cardsUtil';

export const state = () => ({
    categories: [],
    questions: [],
    results: []
});

export const getters = {
    getCategories: state => state.categories,
    getQuestions: state => state.questions
}

export const actions = {
    [REQUEST_GET_CATEGORIES]: async ({ commit }) => {
        try {
            let response = await executeRequest({
                url: `${BMSC_QUESTIONS_ROUTE}/category`
            });
            commit(REQUEST_GET_CATEGORIES, processListFields(response));
            return response;
        } catch (err) {
            console.error('Error trying to fetch question categories');
        }
    },
    [REQUEST_GET_QUESTIONS]: async ({ commit }) => {
        try {
            let response = await executeRequest({
                url: `${BMSC_QUESTIONS_ROUTE}/question`
            });
            commit(REQUEST_GET_QUESTIONS, response);
            return response;
        } catch (err) {
            console.error('Error trying to fetch questions');
        }
    },
    [UPDATE_SEARCH_RESULTS]: async ({ commit }, searchText) => {
        try {
            let response = await executeRequest({
                url: `${BMSC_QUESTIONS_ROUTE}/question`,
                params: {
                    search: searchText
                }
            });
            commit(UPDATE_SEARCH_RESULTS, response);
            return response;
        } catch (error) {
            console.error('Error trying to fetch question search');
        }
    }
};

export const mutations = {
    [REQUEST_GET_CATEGORIES]: (state, data) => {
        state.categories = data;
    },
    [REQUEST_GET_QUESTIONS]: (state, data) => {
        state.questions = data;
    },
    [UPDATE_SEARCH_RESULTS]: (state, data) => {
        state.results = data;
    }
};