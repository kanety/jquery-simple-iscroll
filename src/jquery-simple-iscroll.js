import $ from 'jquery';

import { NAMESPACE } from './consts';
import SimpleIscroll from './simple-iscroll';

$.fn.simpleIscroll = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if (!$elem.data(NAMESPACE)) {
      let si = new SimpleIscroll($elem, options);
      $elem.data(NAMESPACE, si);
    }
  });
};

$.SimpleIscroll = SimpleIscroll;
