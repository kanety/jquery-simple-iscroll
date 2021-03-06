# jquery-simple-iscroll

A jquery plugin for infinite scroll.

## Dependencies

* jquery

## Installation

Install from npm:

    $ npm install @kanety/jquery-simple-iscroll --save

## Usage

Build html as follows:

```html
<div id="container" style="width: 200px; height: 200px; overflow-y: scroll;">
  <table id="table">
    <thead>
      <tr>
        <th>header</th>
        <th>header</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>page1</td>
        <td>page1</td>
      </tr>
    </tbody>
  </table>
  <div id="paging" style="display: none;">
    <a class="prev">prev</a>
    <a href="index.1.html">index.1.html</a>
    <a href="index.2.html">index.2.html</a>
    <a href="index.3.html">index.3.html</a>
    <a href="index.2.html" class="next">next</a>
  </div>
</div>
```

Then run:

```javascript
$('#container').simpleIscroll({
  content: '#table tbody',
  paging: '#paging',
  next: 'a.next'
});
```

### Options

Show loading contents:

```javascript
$('#container').simpleIscroll({
  ...
  loading: '.loading'
});
```

Set margin height to start loading before reaching at the bottom:

```javascript
$('#container').simpleIscroll({
  ...
  margin: 10
});
```

### Callbacks

```javascript
$('#container').simpleIscroll({
  ...
}).on('load:start', function(e, href) {
  ...
}).on('load:end', function(e, href) {
  ...
}).on('load:success', function(e, $content, $paging) {
  ...
}).on('load:failure', function(e, nextHref, xhr, status, error) {
  ...
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
