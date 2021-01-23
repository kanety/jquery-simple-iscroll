describe('jquery-simple-iscroll', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  describe('basic', () => {
    let $container;

    beforeEach((done) => {
      $container = $('#basic');
      $container.on('load:end', () => {
        setTimeout(done, 1000);
      });
      $container.scrollTop($container.height() + 5);
    });

    it('has infinite scroll', () => {
      expect($container.find('tbody tr').length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('callbacks', () => {
    let $container;
    let $message;

    beforeEach((done) => {
      $container = $('#callbacks');
      $message = $('#message');
      $container.on('load:end', () => {
        setTimeout(done, 1000);
      });
      $container.scrollTop($container.height() + 5);
    });

    it('has start', () => {
      expect($message.html()).toContain("load start:");
    });

    it('has end', () => {
      expect($message.html()).toContain("load end:");
    });

    it('has success', () => {
      expect($message.html()).toContain("loaded content:");
    });
  });
});
