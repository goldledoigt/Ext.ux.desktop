Ext.ns('Ext.ux.desktop.Applications');

Ext.ux.desktop.Applications.RSSReader = Ext.extend(Ext.ux.desktop.Applications.Application, {

  name:"RSS Reader"

  ,iconCls16:"icon-rssreader-16"

  ,iconCls64:"icon-rssreader-64"

  ,constructor:function() {

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

    Ext.ux.desktop.Applications.RSSReader.superclass.constructor.call(this);
  }

  ,start:function() {
    new Ext.ux.desktop.Window({
      width:300
      ,height:300
    }).show();
  }

});

Ext.ux.desktop.Desktop.registerApplication(Ext.ux.desktop.Applications.RSSReader);


