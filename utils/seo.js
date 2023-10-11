import {UPDATE_STATE_ACTION} from "~/constants_actions";

export async function getHeader(context) {
  try {
    const route = context.route.path + (context.query.key ? `?key=${context.query.key}` : '') + (context.query.id ? `?id=${context.query.id}` : '');
    const headDataCopy = await context.store.dispatch(`seo/${UPDATE_STATE_ACTION}`, [route, context]);
    const headData = JSON.parse(JSON.stringify(headDataCopy));
    headData.meta.push({ charset: 'utf-8' });
    headData.meta.push({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    //console.log('Head data: ',headData);
    return {headData};
  } catch (error) {
    //console.log('SEO service error: ', error);
  }
}
