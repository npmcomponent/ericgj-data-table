
# data-table

  Minimalist data table view

  Encapsulates rendering of header and records from model, and that's it.
  Bring your own sorting, pagination, selection, etc.
  
  Now header and record templates can be bound to [reactive][reactive] views.

## Installation

    $ component install ericgj/data-table

## Examples

Given some structure:
```html
<div id="table">
  <div class="header"></div>
  <div class="records"></div>
</div>
```

Render model data within it according to provided (compiled) templates:
```javascript
var table = DataTable('#table', model)
              .header(headerTemplate, null, '.header')
              .record(recordTemplate, null, '.records');

```

_Or_ for reactive headers/records, pass the reactive template (string) and view class:
```javascript
var table = DataTable('#table', model)
              .header(headerTemplate, headerView, '.header')
              .record(recordTemplate, recordView, '.records');
```

Note:

- For simple rendering, `header()` and `record()` take compiled templates.
For the header template, `model` and `record` (the first record) are exposed.
For the record template, `model`, `record`, and `index` are exposed for each
record in the data.

- For reactive templates, `header()` and `record()` each take a __string__ template,
and the class of the view that binds the model to the template.

the header and records are both attached to the element passed
in the constructor, except f an element is not specified as the third parameter of `header()` and 

- You can render an array of records directly using `table.render(data)`. 
For instance in an xhr callback: `model.all( table.render.bind(table)) )` .

For more details see `test/index.html`.


## API

### DataTable(el {Element|String}, model)

### DataTable#header(tmpl {Function|String}, [view], [el {Element|String}] )

### DataTable#record(tmpl {Function|String}, [view]. [el {Element|String}] )

### DataTable#render(data {Array}) 

### DataTable#clear()


## License

  MIT


[reactive]: https://github.com/component/reactive
