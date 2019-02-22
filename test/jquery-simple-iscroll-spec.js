describe('jquery-simple-iscroll', function() {
  beforeEach(function() {
    document.body.innerHTML = __html__['index.html'];
  });

  it('has infinite scroll', function() {
    var $container = $('#container');
    $container.simpleIscroll({
      content: '#table tbody',
      paging: '#paging',
      next: 'a.next'
    });

    $container.scrollTop(999);

    expect($container.find('td').length).toEqual(20);
  });

  it('has callbacks', function() {
    var $container = $('#container');
    var $message = $('#message');
    $container.simpleIscroll({
      content: '#table tbody',
      paging: '#paging',
      next: 'a.next'
    }).on('load:start', function(e, href) {
      $message.append("load start: " + href);
      console.log("after start: " + $message.html());
    }).on('load:end', function(e, href) {
      $message.append("load end: " + href);
    }).on('load:success', function(e, $content, $paging) {
      $message.append("loaded content: " + $content.text());
      $message.append("loaded paging: " + $paging.text());
    });

    $container.scrollTop(999);

    setTimeout(function() {
      expect($message.html()).toContain("load start:");
      expect($message.html()).toContain("load end:");
      expect($message.html()).toContain("loaded content:");
      expect($message.html()).toContain("loaded paging:");
    }, 500)
  });
});
