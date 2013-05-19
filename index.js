var Emitter = require('emitter');

function DataTable(el,model){
  // TODO
  this.model = model;
  model.on('update', this.onUpdate.bind(this));
  return this;
}

Emitter(DataTable.prototype);

DataTable.prototype.record = function(tmpl, el){
  this._record = tmpl;
  this.recordsEl = el || this.el;
  return this;
}

DataTable.prototype.header = function(tmpl, el){
  this._header = tmpl;
  this.headerEl = el || this.el;
  return this;
}

DataTable.prototype.onUpdate = function(recs){
  this.render(recs);
};

DataTable.prototype.clear = function(){
  this.clearHeader();
  this.clearRecords();
  return this;
}

DataTable.prototype.clearHeader = function(){
  // TODO
  return this;
}

DataTable.prototype.clearRecords = function(){
  // TODO
  return this;
}

DataTable.prototype.headerEmpty = function(){
  // TODO
  return true;
}

DataTable.prototype.render = function(recs){
  if (this.headerEmpty() && recs.length) this.renderHeader(recs[0]);
  this.clearRecords();
  for (var i=0;i<recs.length;++i){
    this.recordsEl.appendChild(
      this._record({
        model: this.model,
        index: i,
        record: recs[i]
      })
    );
  }
  this.emit('render', recs.length);
}

DataTable.prototype.renderHeader = function(rec){
  this.clearHeader();
  this.headerEl.appendChild(
    this._header({
      model: this.model,
      record: rec
    })
  );
  this.emit('renderHeader');
}


