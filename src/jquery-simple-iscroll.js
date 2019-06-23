import $ from 'jquery';

import { NAMESPACE } from './consts';
import SimpleIscroll from './simple-iscroll';

$.fn.simpleIscroll = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if ($elem.data(NAMESPACE)) $elem.data(NAMESPACE).destroy();
    $elem.data(NAMESPACE, new SimpleIscroll($elem, options));
  });
};

$.SimpleIscroll = SimpleIscroll;
