import {
  BMSC_REPORTS_ROUTE,
  CARD_IMAGE_MAIN_SUFFIX_ROUTE,
  CARD_IMAGE_PREFIX_ROUTE, CARD_IMAGE_SECONDARY_SUFFIX_ROUTE,
  CARD_IMAGE_SUFFIX_ROUTE, NEWS_ROUTE_PREFIX_IMAGE
} from "@/constants_routes";
import _ from 'lodash';
import { INFORMATION_PANEL } from "~/cardListKeys/accountDetails";
import { checkValidUrl } from '@/utils/urlUtil';
import axios from 'axios';

export function simpleEncapsulatedUpdate(listName, cards) {
  return {
    list: listName,
    data: cards
  }
}

export function encapsulatedUpdate(listName, cards) {
  return {
    list: listName,
    data: addImageUrlToCards(listName, cards)
  }
}

export function processListFields(list) {
  return list.map(item => {
    if(item['uploadedImage']) {
      item['mainImageUrl'] = generateMainImageUrlFromId(item['id']);
    }
    if(item['uploadedSecondImage']) {
      item['secondImageUrl'] = generateSecondaryImageUrlFromId(item['id']);
    }
    return item;
  });
}

export function addImageUrlToCards(listName, cards) {
  if(!Array.isArray(cards)) {
    console.error('List '+ listName + ' is not returning anything.');
    return [];
  } else {
    return cards.map(card => {
      if(card['uploadedImage']) {
        card['mainImageUrl'] = generateMainImageUrlFromId(card['id']);
      }
      if(card['uploadedSecondImage']) {
        card['secondImageUrl'] = generateSecondaryImageUrlFromId(card['id']);
      }
      return card;
    });
  }
}

export function encapsulatedNewsUpdate(listName, news) {
  return {
    list: listName,
    data: addImageUrlToNews(news)
  }
}

export function addImageUrlToNews(cards) {
  return cards.map(card => {
    card['imageUrl'] = generateNewsImageUrlFromId(card['id']);
    return card;
  });
}

export function generateMainImageUrlFromId(id) {
  const servicesBaseUrl = axios.defaults.baseURL;
  // return "http://3.233.183.218:3000"+`/${CARD_IMAGE_PREFIX_ROUTE}/${id}/${CARD_IMAGE_MAIN_SUFFIX_ROUTE}`;
  return servicesBaseUrl+`/${CARD_IMAGE_PREFIX_ROUTE}/${id}/${CARD_IMAGE_MAIN_SUFFIX_ROUTE}`;
}
export function generateSecondaryImageUrlFromId(id) {
  const servicesBaseUrl = axios.defaults.baseURL;
  return servicesBaseUrl+`/${CARD_IMAGE_PREFIX_ROUTE}/${id}/${CARD_IMAGE_SECONDARY_SUFFIX_ROUTE}`;
}
export function generateNewsImageUrlFromId(id) {
  const servicesBaseUrl = axios.defaults.baseURL;
  return servicesBaseUrl+`/${NEWS_ROUTE_PREFIX_IMAGE}/${id}/image`;
}
export function generateReportFileUrlFromId(id) {
  const servicesBaseUrl = axios.defaults.baseURL;
  return servicesBaseUrl+`/${BMSC_REPORTS_ROUTE}/${id}/file`;
}


export function generateEmptyModels(quantity) {
  let emptyCards = [];
  for(let i = 0; i < quantity; i++) {
    emptyCards.push({
      buttonClarification: "",
      buttonHref: "/",
      buttonName: "",
      buttonType: "ninguno",
      cardCategory: {id: -1, name: "", description: ""},
      description: "",
      gradient: "no-gradient",
      gradientText: "",
      id: -1,
      subTitle: "",
      title: "",
      uploadedImage: false,
      uploadedSecondImage: false,
      mainImageUrl: "",
      secondImageUrl: "",
      tags: null,
      items: [],
      tableHeaders: [],
      tableData: [],
      imageCards: [],
      imgAlt1: "",
      imgAlt2: "",
    });
  }
  return emptyCards;
}
export function generateMockModels(quantity) {
  let emptyCards = [];
  for(let i = 0; i < quantity; i++) {
    emptyCards.push({
      buttonClarification: "",
      buttonHref: "/",
      buttonName: "ButtonName of card",
      buttonType: "ninguno",
      cardCategory: {id: -1, name: "", description: ""},
      description: "Description of card",
      gradient: "no-gradient",
      gradientText: "Gradient of card",
      id: -1,
      subTitle: "Subtitle of card",
      title: "Title of card",
      uploadedImage: false,
      uploadedSecondImage: false,
      mainImageUrl: "https://lh3.googleusercontent.com/proxy/7aRYqsSoAFPTlLk_ASoX2AIMLc9YBA5ZksxAiZsV4a7M0V-CzsFVEfF_5Zk8T6p3sn3gCt46YFWxV9ZBBJFDoke1Fq6BfIQPpWBp",
      secondImageUrl: "https://kknd26.ru/images/no_photo.png",
      tags: null,
      items: [],
      tableHeaders: [],
      tableData: [],
      imageCards: [],
    });
  }
  return emptyCards;
}

export function getRawValueFromCardTitle(title) {
  return title.substring(3,title.length-4);
}

export function getRawHTMLText(text) {
  return getRawValueFromCardTitle(text);
}

export function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

export function directionBoxOnPrograms(index) {
  switch (index) {
    case 0:
      return 'bottom-right';
    case 1:
      return 'top-left';
    case 2:
      return 'bottom-right';
    case 3:
      return 'bottom-left';
    default:
      return '';
  }
}

export function hasOnlyDigits(value) {
  return /^\d+$/.test(value);
}

export function processInformationPanelData(res) {
  /*
      Category 108 Service documents
      Category 109 Item panel de información
  */
  const requirementsListData = res.items.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 109 && card.tags);

  const linksListData = res.items.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 108).map(card => {
    return {
      ...card,
      fileUrl: generateReportFileUrlFromId(card['description']),
    }
  });
  const descriptionData = res.items.filter(item => {
    if (!item.tags) {
      return true;
    }
    return false;
  });
  res = {
    header: descriptionData[0],
    data: { tabs: [] }
  }

  // Default data for requirement on first tab
  res.data.tabs[0] = {
    requirements: [],
    links: []
  }

  // Default data for requirement on first tab
  res.data.tabs[1] = {
    requirements: [],
    links: []
  }

  // Tags mapping to index
  let tagsMap = {};
  let counter = 0;

  requirementsListData.forEach(requirement => {
    let index;
    if (_.isString(requirement.tags)) {
      if (!_.isNumber(tagsMap[requirement.tags])) {
        tagsMap[requirement.tags] = counter++;
      }
      index = tagsMap[requirement.tags];
      res.data.tabs[index] = res.data.tabs[index] || { requirements: [], links: [] };
      res.data.tabs[index].requirements.push({
        title: requirement.title,
        subTitle: requirement.subTitle,
        description: requirement.description
      });
    }
  });

  linksListData.forEach(link => {
    let index;
    if (_.isString(link.tags)) {
      if (!_.isNumber(tagsMap[link.tags])) {
        tagsMap[link.tags] = counter++;
      }
      index = tagsMap[link.tags];
      res.data.tabs[index] = res.data.tabs[index] || { requirements: [], links: [] };
      res.data.tabs[index].links.push({
        title: link.title,
        fileUrl: link.fileUrl
      });
    }
  });

  res.data.tabNames = [];

  Object.keys(tagsMap).forEach(key => {
    res.data.tabNames.push(key.replaceAll('_', ' '));
  });

  //console.log(INFORMATION_PANEL, res);
  return res;
}

export function processInformationPanelDataLoanDetail(res) {
  /*
      Category 108 Service documents
      Category 109 Item panel de información
  */
  const requirementsListData = res.items.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 109 && card.tags);

  const linksListData = res.items.filter(card => card['cardCategory'] && card['cardCategory']['id'] === 108).map(card => {
    return {
      ...card,
      fileUrl: generateReportFileUrlFromId(card['description']),
    }
  });
  const descriptionData = res.items.filter(item => {
    if (!item.tags) {
      return true;
    }
    return false;
  });
  res = {
    header: descriptionData[0],
    data: { tabs: [] }
  }

  // Default data for requirement on first tab
  res.data.tabs[0] = {
    requirements: [],
    links: []
  }

  // Default data for requirement on first tab
  res.data.tabs[1] = {
    requirements: [],
    links: []
  }

  // Tags mapping to index
  let tagsMap = {};
  let counter = 0;

  requirementsListData.forEach(requirement => {
    let index;
    if (_.isString(requirement.tags)) {
      if (!_.isNumber(tagsMap[requirement.tags])) {
        tagsMap[requirement.tags] = counter++;
      }
      index = tagsMap[requirement.tags];
      res.data.tabs[index] = res.data.tabs[index] || { requirements: [], links: [] };
      res.data.tabs[index].requirements.push({
        title: requirement.title,
        subTitle: requirement.subTitle,
        description: requirement.description
      });
    }
  });

  linksListData.forEach(link => {
    let index;
    if (_.isString(link.tags)) {
      if (!_.isNumber(tagsMap[link.tags])) {
        tagsMap[link.tags] = counter++;
      }
      index = tagsMap[link.tags];
      res.data.tabs[index] = res.data.tabs[index] || { requirements: [], links: [] };
      res.data.tabs[index].links.push({
        title: link.title,
        fileUrl: link.fileUrl
      });
    }
  });

  res.data.tabNames = [];
  res.data.tabs[0].links = res.data.tabs[0].links.reverse()

  Object.keys(tagsMap).forEach(key => {
    res.data.tabNames.push(key.replaceAll('_', ' '));
  });

  //console.log(INFORMATION_PANEL, res);
  return res;
}

export function evaluateAddress(router, address) {
  if (checkValidUrl(address)) {
    window.open(address, '_blank');
  } else {
    router.push(address);
  }
}

export function downloadItem (url,title) {
  let label = getRawValueFromCardTitle(title);
  axios.get(url, { responseType: 'blob' })
    .then(response => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = label;
      link.click();
      URL.revokeObjectURL(link.href);
    }).catch(console.error);
}

