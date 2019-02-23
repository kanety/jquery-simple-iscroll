import $ from 'jquery';
import { NAMESPACE } from './consts';

const DEFAULTS = {
  content: '',
  paging: '',
  next: '',
  margin: 0,
  loadingText: null
};

export default class SimpleIscroll {
  constructor(container, options = {}) {
    this.options = $.extend(true, {}, DEFAULTS, options);

    this.$container = $(container);
    this.loading = false;

    this.bind();
  }

  init() {
    this.unbind();
    this.bind();
  }

  bind() {
    this.$container.on(`scroll.${NAMESPACE}`, (e) => {
      let scrollTop = this.$container.get(0).scrollTop;
      let scrollHeight = this.$container.get(0).scrollHeight;
      let innerHeight = Math.ceil(this.$container.innerHeight());

      if (scrollTop + innerHeight + this.options.margin >= scrollHeight) {
        this.load();
      }
    });
  }

  unbind() {
    this.$container.off(`.${NAMESPACE}`);
  }

  load() {
    this.nextHref = this.$container.find(this.options.paging).find(this.options.next).attr('href');
    if (!this.nextHref) {
      return;
    }

    if (!this.loading) {
      this.start();
      $.get(this.nextHref).done((data) => {
        this.success(data);
      }).always(() => {
        this.end();
      });
    }
  }

  start() {
    this.loading = true;
    this.$container.trigger('load:start', [this.nextHref]);

    if (this.options.loadingText) {
      let loading = $('<div class="iscroll-loading">').html(this.options.loadingText)
      this.$container.append(loading);
    }
  }

  end() {
    this.loading = false;
    this.$container.trigger('load:end', [this.nextHref]);

    if (this.options.loadingText) {
      this.$container.find('.iscroll-loading').remove();
    }
  }

  success(data) {
    let $data = $(data);
    let $content = $data.find(this.options.content);
    let $paging = $data.find(this.options.paging);

    let replaced = {};
    this.$container.trigger('load:success', [$content, $paging]);

    this.$container.find(this.options.content).append($content.html());
    this.$container.find(this.options.paging).html($paging.html());
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    $.extend(true, DEFAULTS, options);
  }
}
