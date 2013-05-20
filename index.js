var Emitter = require('emitter')
  , domify  = require('domify')

module.exports = DataTable;

function DataTable(el,model){
  if (!(this instanceof DataTable)) return new DataTable(el,model);
  this.el = (typeof el == 'string' ? document.querySelector(el) : el);
  this.recordsEl = this.el;
  this.headerEl = this.el;
  this.model = model;
  if (model && model.on) model.on('update', this.render.bind(this));
  return this;
}

Emitter(DataTable.prototype);

DataTable.prototype.record = function(tmpl, el){
  this._record = tmpl;
  if (el) 
    this.recordsEl = (typeof el == 'string' ? document.querySelector(el) : el);
  return this;
}

DataTable.prototype.header = function(tmpl, el){
  this._header = tmpl;
  if (el) 
    this.headerEl = (typeof el == 'string' ? document.querySelector(el) : el);
  return this;
}

DataTable.prototype.clear = function(){
  this.clearHeader();
  this.clearRecords();
  return this;
}

DataTable.prototype.clearHeader = function(){
  empty(this.headerEl);
  return this;
}

DataTable.prototype.clearRecords = function(){
  empty(this.recordsEl);
  return this;
}

DataTable.prototype.headerEmpty = function(){
  return (!this.headerEl.firstChild);
}

DataTable.prototype.render = function(recs){
  this.clearRecords();
  if (this.headerEmpty() && recs.length) this.renderHeader(recs[0]);
  for (var i=0;i<recs.length;++i){
    this.recordsEl.appendChild(
      domify(
        this._record({
          model: this.model,
          index: i,
          record: recs[i]
        })
      )[0]
    );
  }
  this.emit('render', recs.length);
}

DataTable.prototype.renderHeader = function(rec){
  this.clearHeader();
  this.headerEl.appendChild(
    domify(
      this._header({
        model: this.model,
        record: rec
      })
    )[0]
  );
  this.emit('renderHeader');
}


// private

/* inlined from yields/empty */

function empty(el,node){
  while (node = el.firstChild) el.removeChild(node);
  return el;
}

