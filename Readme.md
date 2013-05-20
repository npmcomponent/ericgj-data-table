
# data-table

  Minimalist data table view

  Encapsulates rendering of header and records from model, and that's it.
  Bring your own sorting, pagination, selection, etc.
  
## Installation

    $ component install ericgj/data-table

## Example

Given some structure:
```html
<div id="table">
  <div class="header"></div>
  <div class="records"></div>
</div>
```

Render model data within it according to provided templates:
```javascript
var table = DataTable('#table', model)
              .header(headerTemplate, '.header')
              .record(recordTemplate, '.records');

```

Note:

- `header()` and `record()` take compiled templates.
For the header template, `model` and `record` (the first record) are exposed.
For the record template, `model`, `record`, and `index` are exposed for each
record in the data.

- You can render an array of records directly using `table.render(data)`. 
For instance in an xhr callback: `model.all( errorWrapper(table.render.bind(table)) )` .

- You can also have the table render automatically by having your model emit
'update' with the records.

For more details see `test/index.html`.


## API

### DataTable(el {Element|String}, model)

### DataTable#header(fn {Function}, [el {Element|String}] )

### DataTable#record(fn {Function}, [el {Element|String}] )

### DataTable#render(data {Array}) 

### DataTable#clear()


## License

  MIT
