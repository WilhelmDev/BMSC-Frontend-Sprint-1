import _ from "lodash";
import { getURL } from "@/utils/urlUtil";
import axios from 'axios';
import {BMSC_ESTATE_ROUTE} from "~/constants_routes";

export function getCardImage(card, type) {
  const servicesBaseUrl = axios.defaults.baseURL;
  if (!card) {
    return undefined;
  }

  if (!type) {
    type = 'main';
  }

  if (type === 'main') {
    if (card.uploadedImage) {
      const url = getURL(`/api/bmsc-cards/cards/${_.get(card, ["id"])}/image/${type}`, servicesBaseUrl);
      return url.toString();
    }
  } if (type === 'secondary') {
    if (card.uploadedSecondImage) {
      const url = getURL(`/api/bmsc-cards/cards/${_.get(card, ["id"])}/image/${type}`, servicesBaseUrl);
      return url.toString();
    }
  }
  return undefined;
}

export function getCommerceImage(card, type, context) {
  const servicesBaseUrl = axios.defaults.baseURL;
  if (!type) {
    type = 'main';
  }

  if (type === 'main') {
    if (card.uploadedImage) {
      const url = getURL(`/api/bmsc-benefits/puntos/comercio/${_.get(card, ["id"])}/image`, servicesBaseUrl);
      return url.toString();
    }
  } if (type === 'secondary') {
    if (card.uploadedSecondImage) {
      const url = getURL(`/api/bmsc-benefits/puntos/comercio/${_.get(card, ["id"])}/image`, servicesBaseUrl);
      return url.toString();
    }
  }
  return undefined;
}

export function getDiscountCommerceImage(card, type, context) {
  //console.log('Context config: ',context.$config);
  const servicesBaseUrl = axios.defaults.baseURL;

  if (!type) {
    type = 'main';
  }

  if (type === 'main') {
    if (card.uploadedImage) {
      const url = getURL(`/api/bmsc-benefits/descuentos/comercio/${_.get(card, ["id"])}/image`, servicesBaseUrl);
      return url.toString();
    }
  } if (type === 'secondary') {
    if (card.uploadedSecondImage) {
      const url = getURL(`/api/bmsc-benefits/descuentos/comercio/${_.get(card, ["id"])}/image`, servicesBaseUrl);
      return url.toString();
    }
  }
  return undefined;
}
export function getEstateCarouselImage(estateId, idx) {
  const servicesBaseUrl = axios.defaults.baseURL;
  return servicesBaseUrl+`/${BMSC_ESTATE_ROUTE}/${estateId}/image/${idx}`;
}
