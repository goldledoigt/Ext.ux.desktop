Ext.ns('Ext.ux.desktop.Applications');

Ext.ux.desktop.Applications.Application = function(config) {

  Ext.apply(this, config || {});

  this.getMenu = function() {
    if (this.menu) {
      return new Ext.menu.Item({
	text:"RSSReaders"
	,menu:this.menu
      });
    } else return false;
  };

};


Ext.ux.desktop.Application.RSSReader = Ext.extend(Ext.ux.desktop.Applications.Application, {
  constructor:function() {
    this.menu = new Ext.menu.Menu({
      items:[{
	text:"RSSReader 1"
      }, {
	text:"RSSReader 2"
      }, {
	text:"RSSReader 3"
      }, {
	text:"RSSReader 4"
      }]
    });
    Ext.ux.desktop.Application.RSSReader.superclass.constructor.call(this);
  }
});


Ext.onReady(function() {
  var app = new Ext.ux.desktop.Application.RSSReader();
  var Dsk = Ext.ux.desktop.Desktop;
  console.log(Dsk);
  Dsk.getStartMenu().add(app.getMenu());
});
