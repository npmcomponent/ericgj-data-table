var Emitter = require('emitter')
  , domify  = require('domify')

module.exports = DataTable;

function DataTable(el,model){
  if (!(this instanceof DataTable)) return new DataTable(el,model);
  this.el = (typeof el == 'string' ? document.querySelector(el) : el);
  this.recordsEl = this.el;
  this.headerEl = this.el;
  this.model = model;
  this._recordViews = [];
  return this;
}

Emitter(DataTable.prototype);

DataTable.prototype.record = function(tmpl, viewClass, el){
  this._record = tmpl;
  this._recordViewClass = viewClass;
  if (el) 
    this.recordsEl = (typeof el == 'string' ? this.el.querySelector(el) : el);
  return this;
}

DataTable.prototype.header = function(tmpl, viewClass, el){
  this._header = tmpl;
  this._headerViewClass = viewClass;
  if (el) 
    this.headerEl = (typeof el == 'string' ? this.el.querySelector(el) : el);
  return this;
}

DataTable.prototype.clear = function(){
  this.clearHeader();
  this.clearRecords();
  return this;
}

DataTable.prototype.clearHeader = function(){
  empty(this.headerEl);
  if (this._headerView) delete this._headerView;
  return this;
}

DataTable.prototype.clearRecords = function(){
  empty(this.recordsEl);
  this._recordViews.splice(0,0);
  return this;
}

DataTable.prototype.headerEmpty = function(){
  return (!this.headerEl.firstChild);
}

DataTable.prototype.render = function(recs){
  if (!this._record) return;
  this.clearRecords();
  if (this.headerEmpty() && recs.length) this.renderHeader(recs[0]);
  for (var i=0;i<recs.length;++i){
    var el;
    if (this._recordViewClass) {
      el = domify(this._record);
      var view = new this._recordViewClass(el, recs[i]);
      this._recordViews.push(view);
    } else { 
      el = rendered(this._record, recs[i], this.model, i); 
    }
    this.recordsEl.appendChild(el);
  }
  this.emit('render', recs.length);
}

DataTable.prototype.renderHeader = function(rec){
  if (!this._header) return;
  this.clearHeader();
  var el;
  if (this._headerViewClass) {
    el = domify(this._header);
    var view = new this._headerViewClass(el, this.model);
    this._headerView = view;
  } else {
    el = rendered(this._header, rec, this.model);
  }
  this.headerEl.appendChild(el);
  this.emit('render header');
}


// private


function rendered(tmpl,model,modelClass,i){
  return domify(
    tmpl({ model: modelClass,
           index: i,
           record: model
         })
  );
}


/* inlined from yields/empty */

function empty(el,node){
  while (node = el.firstChild) el.removeChild(node);
  return el;
}

