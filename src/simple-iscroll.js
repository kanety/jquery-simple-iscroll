import $ from 'jquery';
import { NAMESPACE } from './consts';

const DEFAULTS = {
  content: '',
  paging: '',
  next: '',
  margin: 0,
  loading: null
};

export default class SimpleIscroll {
  constructor(container, options = {}) {
    this.options = $.extend(true, {}, DEFAULTS, options);

    if (container.get(0) === window) {
      this.$container = $('body');
      this.$handler = $(window);
    } else {
      this.$container = this.$handler = $(container);
    }
    this.loading = false;

    this.init();
  }

  init() {
    this.unbind();
    this.bind();
  }

  destroy() {
    this.unbind();
  }
  
  bind() {
    this.$handler.on(`scroll.${NAMESPACE}`, (e) => {
      if (this.scrolledAtBottom()) {
        this.load();
      }
    });
  }

  unbind() {
    this.$handler.off(`.${NAMESPACE} load:start load:end load:success load:failure`);
  }

  scrolledAtBottom() {
    let scrollTop, scrollHeight, contentHeight;

    if (this.$container.get(0) === document.body) {
      scrollTop = $(window).scrollTop();
      scrollHeight = $(document).height();
      contentHeight = $(window).height();
    } else {
      scrollTop = this.$container.get(0).scrollTop;
      scrollHeight = this.$container.get(0).scrollHeight;
      contentHeight = Math.ceil(this.$container.innerHeight())
    }

    return scrollTop + contentHeight + this.options.margin >= scrollHeight;
  }

  load() {
    this.nextHref = this.$container.find(this.options.paging).find(this.options.next).attr('href');
    if (!this.nextHref) return;

    if (this.loading) return;

    this.start();
    $.get(this.nextHref).done((data) => {
      this.success(data);
    }).fail((jqXHR, textStatus, errorThrown) => {
      this.failure(jqXHR, textStatus, errorThrown);
    }).always(() => {
      this.end();
    });
  }

  start() {
    this.loading = true;
    this.$handler.trigger('load:start', [this.nextHref]);

    if (this.options.loading) {
      this.$container.find(this.options.loading).show();
    }
  }

  end() {
    this.loading = false;
    this.$handler.trigger('load:end', [this.nextHref]);

    if (this.options.loading) {
      this.$container.find(this.options.loading).hide();
    }
  }

  success(data) {
    let $data = $(data);
    let $content = $data.find(this.options.content);
    let $paging = $data.find(this.options.paging);

    this.$handler.trigger('load:success', [$content, $paging]);

    this.$container.find(this.options.content).append($content.html());
    this.$container.find(this.options.paging).html($paging.html());
  }

  failure(jqXHR, textStatus, errorThrown) {
    this.$handler.trigger('load:failure', [this.nextHref, jqXHR, textStatus, errorThrown]);
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    return $.extend(true, DEFAULTS, options);
  }
}
