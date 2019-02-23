describe('jquery-simple-iscroll', function() {
  beforeEach(function() {
    document.body.innerHTML = __html__['index.html'];
  });

  describe('basic use', function() {
    var $container;

    beforeEach(function(done) {
      $container = $('#container');
      $container.simpleIscroll({
        content: '#table tbody',
        paging: '#paging',
        next: 'a.next',
        loading: '#loading'
      }).on('load:end', function(e) {
        done();
      });
      $container.scrollTop(999);
    });

    it('has infinite scroll', function() {
      expect($container.find('td').length).toEqual(40);
    });
  });

  describe('callbacks', function() {
    var $container;
    var $message;
    
    beforeEach(function(done) {
      $container = $('#container');
      $message = $('#message');
      $container.simpleIscroll({
        content: '#table tbody',
        paging: '#paging',
        next: 'a.next'
      }).on('load:start', function(e, href) {
        $message.append("load start: " + href);
      }).on('load:end', function(e, href) {
        $message.append("load end: " + href);
        done();
      }).on('load:success', function(e, $content, $paging) {
        $message.append("loaded content: " + $content.text());
        $message.append("loaded paging: " + $paging.text());
      });
      $container.scrollTop(999);
    });
    
    it('has start', function() {
      expect($message.html()).toContain("load start:");
    });

    it('has end', function() {
      expect($message.html()).toContain("load end:");
    });

    it('has success', function() {
      expect($message.html()).toContain("loaded content:");
    });
  });
});
