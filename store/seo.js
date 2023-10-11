import executeRequest from "@/utils/httpUtil";

import {
  UPDATE_STATE_ACTION,
  UPDATE_STATE_MUTATION,
} from "@/constants_actions";

import {
 SEO_SERVICE_ROUTE
} from "@/constants_routes";

export const state = () => ({
  pageSeo: {

  }
})

export const getters = {
    getList: state => path => {
      let res = JSON.parse(JSON.stringify(state))['pageSeo'][path];
      return res;
    }
};

export const actions = {
  [UPDATE_STATE_ACTION]: async ({ commit },payload) => {
    const path = payload[0];
    const context = payload[1];
    let parsedPath = new URLSearchParams();
    parsedPath.set('path',path);
    //console.log('Path loaded: ', parsedPath.toString());
    let response;
    let url = `${SEO_SERVICE_ROUTE}?idPortal=2&${parsedPath.toString()}`;
    //console.log('Url: ',url);
    try {

      response = await executeRequest({
        url: `${SEO_SERVICE_ROUTE}?idPortal=2&${parsedPath.toString()}`
      },true, context);
      commit(UPDATE_STATE_MUTATION, encapsulatePageSeo(path, response));
      //console.log('Response: ',response);
      return response;
    } catch (err) {
      //console.log('Error: ',err);
      return {
        title: 'BMSC | Banco Mercantil Santa Cruz',
        meta: [
          {name: 'twitter:card', content: 'summary'},
          {name: 'twitter:title', content: 'BMSC | Banco Mercantil Santa Cruz'},
          {name: 'twitter:description', content: 'BMSC | Banco Mercantil Santa Cruz'},
          {name: 'twitter:image', content: "http://3.233.183.218:3000/api/bmsc-cards/cards/107/image/main"},
          {property: 'og:title', content: 'BMSC | Banco Mercantil Santa Cruz'},
          {property: 'og:site_name', content: 'Fundación del Banco Mercantil Santa Cruz'},
          {property: 'og:type', content: 'website'},
          {property: 'og:image', content: "http://3.233.183.218:3000/api/bmsc-cards/cards/107/image/main"},
          {property: 'og:description', content: 'BMSC | Banco Mercantil Santa Cruz'}
        ]
      };
      throw err;
    }
  }
};

export const mutations = {
  [UPDATE_STATE_MUTATION]: (state, res) => {
    state.pageSeo[res.path] = res.headData;
  }
};

export function encapsulatePageSeo(path, headData) {
  return {
    path: path,
    headData: headData
  }
}
