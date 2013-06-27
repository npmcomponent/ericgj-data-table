
# data-table

  Minimalist data table view

  Encapsulates rendering of header and records from model, and that's it.
  Bring your own sorting, pagination, selection, etc. Header and record 
  templates can be bound to [reactive][reactive] views.

## Installation

    $ component install ericgj/data-table

## Examples

### Simple rendering

```javascript
var table = DataTable('#table', model)
              .header(headerTemplate)
              .record(recordTemplate);
```

Note that the passed templates are _precompiled template functions_, using
whatever template engine you wish.

### Rendering bound to (reactive) views

```javascript
var table = DataTable('#table', model)
              .header(headerTemplate, headerView)
              .record(recordTemplate, recordView);
```

Note here the passed templates are _strings_, which are DOMified and passed 
into the view constructors together with the models. 

Your views are responsible for doing the binding, which can use reactive or
some other library.

## More details:

- For simple rendering, `header()` and `record()` take compiled templates.
For the header template, `model` and `record` (the first record) are exposed.
For the record template, `model`, `record`, and `index` are exposed for each
record in the data.

- For reactive templates, `header()` and `record()` each take a _string_ template,
and the class of the view that binds the model to the template.

- For either simple or reactive rendering, the header and records are both 
attached to the element passed in the constructor by default, or you can specify
an element as the third parameter of `header()` and `record()`. Useful in cases
such as classic tables where `<thead>` is a separate branch from `<tbody>`. Also
useful if you want to re-render records but not the header.

For more examples of use see `test/index.html`.

## API

### DataTable( el, [modelClass] )

Construct data table at el (element or string), with optional model class specified.
Note the model class is not used generally, it's there in case your templates need it.

### DataTable#header( tmpl, [view, el] )

Specify the header template (function for simple rendering, string for reactive), and
optional view, and optional el (element or selector string) where header is appended.

### DataTable#record( tmpl, [view, el] )

Specify the record template (function or string), optional view, and optional el 
(element or selector string) where records are appended.

### DataTable#render( data ) 

Render records from data (array of objects), and header if header doesn't exist.

### DataTable#clear()

Clear header and records and remove any views.

### DataTable#headerView

View object bound to header

### DataTable#recordViews

Array of view objects bound to records


## Events

### 'render', n

After records rendered. N is the number of records rendered.

### 'render header'

After header rendered.


## License

  MIT


[reactive]: https://github.com/component/reactive
