import {formatDistanceToNow} from 'date-fns';
import {REPLY_ACTION_CODES, MENTION} from '../Constants';
import {useAuthState} from '../../context/auth';
import {useEnvState} from '../../context/env';

export const clone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const stringify = (obj: any, formatted: boolean = false) => {
  if (formatted) {
    return JSON.stringify(obj, null, '\t');
  } else {
    return JSON.stringify(obj);
  }
};

export const displayTime = (inputTime) => {
  return formatDistanceToNow(new Date(inputTime), {includeSeconds: true});
};

export const stickModeratorsToTop = (firstValue, secondValue) => {
  if (firstValue.moderator === undefined) {
    firstValue.moderator = false;
  }

  if (secondValue.moderator === undefined) {
    secondValue.moderator = false;
  }

  return secondValue.moderator - firstValue.moderator;
};

export const getLikedReplyIDs = (posts) => {
  if (posts) {
    const othersPosts = posts.filter((post) => !post.yours);
    const likedPosts = othersPosts?.filter((othersPost) =>
      othersPost.actions_summary.find((action) => action.id === 2 && action.acted)
    );

    if (!likedPosts || likedPosts.length === 0) {
      return [];
    }

    const data: number[] = likedPosts.map((likedPost) => likedPost.id);
    return data;
  }

  return [];
};

// this function extracts topicID in the slug to navigate with
export const getTopicIDFromURL = (string: string): number | null => {
  // for now this function is valid for 'A post was merged into an existing topic:' type of post
  if (string.includes('A post was merged into an existing topic')) {
    const forwardSlashIndexes: number[] = [];

    const indexOfATagStart = string.indexOf('<a href=');
    const indexOfATagEnd = string.indexOf('">') + 2;
    string = string.substring(indexOfATagStart, indexOfATagEnd);

    for (let i = 0; i < string.length; i += 1) {
      if (string[i] === '/') {
        forwardSlashIndexes.push(i);
      }
    }

    const startingIndex: number = forwardSlashIndexes[forwardSlashIndexes.length - 2] + 1;
    const endingIndex: number = forwardSlashIndexes[forwardSlashIndexes.length - 1];

    const topicID = Number(string.substring(startingIndex, endingIndex));

    return topicID;
  }

  return null;
};

export const getSourceHTML = (reply, colors) => {
  const authState = useAuthState();
  const envState = useEnvState();
  let sourceHTML = '';

  if (typeof reply === 'string') {
    // this condition is for excerpt in Activity.tsx
    return reply;
  }

  if (reply) {
    const {cooked} = reply;
    if (cooked) {
      // if post is an auto-generated message by flagging
      if (cooked === '<p>This post was flagged by the community and is temporarily hidden.</p>') {
        return `<p style="color:${colors.reply.text.cooked}">(This post was flagged by the community and is temporarily hidden.)</p>`;
      }

      if (cooked.includes('<img src="//')) {
        const cookedWithImage = cooked.replaceAll('<img src="//', '<img src="https://');
        return cookedWithImage;
      }

      // default
      return cooked;

      // if !cooked and a post is auto-generated after (un)pinning
    } else {
      const {updated_at, action_code} = reply;

      // reply obj contains updated_at and action_code
      // but pmsg obj does not
      if (updated_at && action_code) {
        for (const item of REPLY_ACTION_CODES) {
          if (action_code === item.code) {
            sourceHTML = `${item.message} on ${updated_at.substring(0, 10)}`;
            break;
          }
        }
      }
    }

    return sourceHTML;
  }

  return null;
};

const checkTwoObjectsAreEqual = (objA, objB) => {
  if (typeof objA === 'object' && Object.keys(objA).length > 0) {
    return (
      Object.keys(objA).length === Object.keys(objB).length &&
      Object.keys(objA).every((key) => checkTwoObjectsAreEqual(objA[key], objB[key]))
    );
  }

  return objA === objB;
};

const checkTwoArraysAreEqual = (arrA, arrB) => {
  if (arrA.length === arrB.length && arrA.every((obj, index) => checkTwoObjectsAreEqual(obj, arrB[index]))) {
    return true;
  }
  return false;
};

export const checkPrevAndNextPropsAreEqual = (
  type: string,
  prevItem: any,
  nextItem: any,
  propsToCompare: string[]
): boolean => {
  const acceptedTypes = ['topic', 'reply'];
  if (!acceptedTypes.includes(type)) {
    throw new Error('Invalid type passed');
  }

  let numOfMatchingProps = 0;

  for (const prop of propsToCompare) {
    if (type === 'reply' && !prevItem[type]['action_code'] && !nextItem[type]['action_code']) {
      // check if type of the prop to be compared is array in order to apply different logic
      if (prop === 'actions_summary') {
        if (checkTwoArraysAreEqual(prevItem[type][prop], nextItem[type][prop])) {
          numOfMatchingProps += 1;
        }
      } else {
        if (prevItem[type][prop] === nextItem[type][prop]) {
          numOfMatchingProps += 1;
        }
      }
    } else if (type === 'topic') {
      if (prevItem[type][prop] === nextItem[type][prop]) {
        numOfMatchingProps += 1;
      }
    }
  }

  if (numOfMatchingProps === propsToCompare.length) {
    return true;
  }

  return false;
};

export const getFutureDate = (years = 10): string => {
  const yearsInUnixTimestamp: number = 60 * 60 * 24 * 365 * years * 1000;
  const futureDate: string = new Date(Date.now() + yearsInUnixTimestamp).toISOString().substring(0, 10);
  return futureDate;
};

export const checkFlagged = (reply) => {
  if (reply && reply.actions_summary && reply.actions_summary.length > 0) {
    const allowedActionIds = [3, 4, 7, 8];
    const myAction = reply.actions_summary.filter((action) => allowedActionIds.includes(action.id) && action.acted);
    if (myAction && myAction.length > 0) {
      return myAction[0];
    }
  }

  return false;
};

export const isArrayValid = (array: any[]): boolean => {
  if (array && array.length) {
    return true;
  }

  return false;
};

export const combinePostsAndTopics = (posts, topics) => {
  const newPostsArray = [];

  if (isArrayValid(posts) && isArrayValid(topics)) {
    let newPostObj = {};
    for (let i = 0; i < posts.length; i++) {
      newPostObj = posts[i];
      newPostObj.topic_title = topics[i].title;
      newPostObj.category_id = topics[i].category_id;
      newPostsArray.push(newPostObj);
    }
  }

  return newPostsArray;
};

export const flattenProductCategories = (rootProductCategory) => {
  /* given a product category with forum and subcategories
   * return a flattened array with the root product category and the forum subcategory */
  if (!rootProductCategory) return [];
  let flattenedList = [rootProductCategory]; // not deleting sub categories here, but I could

  if (rootProductCategory.subcategory_list && rootProductCategory.subcategory_list.length) {
    /* don't have to worry about truthiness of an empty array here
     * because this array isn't present in the object if no subcategories */
    let forumParent = rootProductCategory.subcategory_list[0];
    if (forumParent.subcategory_list && forumParent.subcategory_list.length) {
      flattenedList = [...flattenedList, ...forumParent.subcategory_list];
    }
  }

  return flattenedList;
};

export const getCategoryNames = (categoryId, productCategoryObject, forumCategories) => {
  let data = [];

  function categoryArrayPrettier() {
    if (isArrayValid(data)) {
      data = data.map((item) => '#' + item + ' ');
    }
    return data;
  }

  if (categoryId == productCategoryObject.id) return categoryArrayPrettier([productCategoryObject.name]);

  let thisForumCategory = forumCategories.find((c) => categoryId == c.id);
  if (!thisForumCategory) return [];

  data.push(thisForumCategory.name);
  if (productCategoryObject.subcategory_list && productCategoryObject.subcategory_list.length) {
    let forumRootCategory = productCategoryObject.subcategory_list[0];
    data.push(forumRootCategory.name);
  }
  data.push(productCategoryObject.name);

  // does categoryArrayPrettier() need any argument?
  return categoryArrayPrettier(data.reverse());
};

export const getFriendlyOrDiscourseUsername = (data: any, option: string): string => {
  const possibleOptions = ['friendly', 'discourse'];
  if (!possibleOptions.includes(option) || !option) {
    throw new Error('Option not passed or invalid');
  }

  let name = '';

  if (option === 'friendly' && data.name) {
    name = data.name;
  } else if (option === 'discourse' && data.username) {
    name = data.username;
  }

  return name;
};

// not exported
// 'A' and 'a' has different width value, so case needs to be taken into consideration
const getNameLength = (name: string): number => {
  // name should be friendlyName ('Anthony J') or 'test'
  // 'test' if broken @ mention (only @ symbol on screen)
  if (!name) {
    throw new Error('invalid name argument');
  }

  // handle upper & lower cases
  // title will be handled here
  const upperCases = name.match(/[A-Z]/g);
  const lowerCases = name.match(/[a-z]/g);
  const lengthUpperCase = isArrayValid(upperCases) ? upperCases.length : 0;
  const lengthLowerCase = isArrayValid(lowerCases) ? lowerCases.length : 0;

  // handle special characters
  // period doesn't necessarily need to be included here
  // as we're already multiplying length by 1.5
  const specialChars = name.match(/[~`!#$@%\^&*+=\-_\[\]\\';,/{}|\\":<>\?]/g); // includes @ symbol
  const lengthSpecialChar = isArrayValid(specialChars) ? specialChars.length : 0;

  // handle spaces
  const spaces = name.match(/\s/g);
  const lengthSpace = isArrayValid(spaces) ? spaces.length : 0;

  /*
  why * 1.5?
    The specialChars uses regex to look for special characters,
    but in most cases it would catch @ symbol and some often-used chars (_ and &, for example)
    which, especially @, look a bit wider than single lowercase character.
    But 2 was too wide when tested.
    So:
      1px per each lowercase character and space
      1.5px per each uppercase character and special character
  */
  const nameLength = lengthUpperCase * 1.5 + lengthLowerCase + lengthSpace + lengthSpecialChar * 1.5;
  return nameLength;
};

// not exported, just used here for addInlineStyleToMentionBlot() below
const getMentionElementWithInlineStyle = (
  html: string,
  targetString: string,
  namesArr: string[],
  colors: any
): string => {
  if (!html || typeof html !== 'string') {
    throw new Error('Invalid html value');
  }
  if (!targetString || typeof targetString !== 'string') {
    throw new Error('Invalid targetString value');
  }
  if (!isArrayValid(namesArr)) {
    throw new Error('Invalid namesArr value');
  }

  const splitHtml: string[] = html.split(' ');
  const {bg, fontColor} = colors.mention;
  const {BORDER_RADIUS, TEXT_DECORATION, TEXT_ALIGN, WIDTH_MULTIPLIER, MAX_WIDTH_MULTIPLIER} = MENTION;

  const stylesArr = namesArr.map((name) => {
    const nameLength = getNameLength(name);
    const blotWidth = nameLength * WIDTH_MULTIPLIER;
    const blotMaxWidth = nameLength * MAX_WIDTH_MULTIPLIER;

    return {
      'background-color': bg,
      'border-radius': BORDER_RADIUS,
      'text-decoration': TEXT_DECORATION,
      color: fontColor,
      width: `${blotWidth}px`, // dynamically assigning width value using name length
      'max-width': `${blotMaxWidth}px`, // here as well
      'text-align': TEXT_ALIGN,
      display: 'inline-block'
    };
  });

  for (let i = 0; i < splitHtml.length; i++) {
    if (splitHtml[i] === targetString) {
      if (!stylesArr.length) {
        break;
      }

      // using shift() to ensure items in stylesArr is used only once and in order
      const styleToAdd = stylesArr.shift();
      const styles = Object.keys(styleToAdd)
        .map((key) => `${key}:${styleToAdd[key]}`)
        .join(';');

      // replace class="mention" with:
      // class="mention" style="background-color: ${bg}; ..."
      splitHtml[i] = splitHtml[i].replace(splitHtml[i], splitHtml[i] + ` style="${styles}"`);
    }
  }

  html = splitHtml.join(' ');
  return html;
};

export const addInlineStyleToMentionBlot = (parser: any, html: string, colors: any): string => {
  if (parser) {
    const parsed = parser.parseFromString(html, 'text/html');
    if (parsed) {
      const mentions = parsed.getElementsByClassName('mention');
      if (mentions) {
        const mentionsList = Array.prototype.filter.call(mentions, (el) => {
          return el.attributes.length > 1;
        });
        if (mentionsList.length) {
          const targetString = 'class="mention"';
          const namesArr = [];
          // get name from each mention and push name to namesArr
          for (const mentionElement of mentionsList) {
            // assigning 'test' for some empty @ mentions in test env
            const friendlyName = mentionElement.getAttribute('data-value') || 'test';
            namesArr.push(friendlyName);
          }
          // this routine runs only when a post includes mention
          html = getMentionElementWithInlineStyle(html, targetString, namesArr, colors);
        }
      }
    }
  }

  return html;
};
