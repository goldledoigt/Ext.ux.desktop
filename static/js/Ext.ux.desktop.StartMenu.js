Ext.ns('Ext.ux.desktop');

Ext.ux.desktop.StartMenu = Ext.extend(Ext.menu.Menu, {

  initComponent:function() {
    Ext.ux.desktop.StartMenu.superclass.initComponent.call(this);
  }

  ,afterRender:function() {
    Ext.ux.desktop.StartMenu.superclass.afterRender.call(this);
    console.log('menu afterRender', this, arguments, Ext.ux.desktop.StartMenu.Bookmarks);
  }

});

