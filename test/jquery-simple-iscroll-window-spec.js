describe('jquery-simple-iscroll', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index_window.html'];
    eval($('script').text());
  });

  describe('window', () => {
    let $container;

    beforeEach((done) => {
      $container = $(window);
      $container.on('load:end', () => {
        setTimeout(done, 1000);
      });
      $container.scrollTop(999);
    });

    it('has infinite scroll', () => {
      expect($('body').find('tbody tr').length).toBeGreaterThanOrEqual(55);
    });
  });
});
