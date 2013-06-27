
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
an element as the third parameter of `header()` and `record()`. (Useful in cases
such as classic tables where `<thead>` is a separate branch from `<tbody>`.)

For more examples of use see `test/index.html`.

## API

### DataTable( el {Element|String}, model )

### DataTable#header( tmpl {Function|String}, [view, el {Element|String}] )

### DataTable#record( tmpl {Function|String}, [view, el {Element|String}] )

### DataTable#render( data {Array} ) 

### DataTable#clear()


## License

  MIT


[reactive]: https://github.com/component/reactive
