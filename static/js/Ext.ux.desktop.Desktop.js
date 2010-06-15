Ext.ns('Ext.ux.desktop');

Ext.ux.desktop.Desktop = function() {
  var me, menu, bbar, view, panel, viewport
  ,apps = []
  ,rendered = false;

  var setStartMenuItem = function(item) {
    if (item) menu.add(item);
  };

  var setDesktopItem = function(item) {
//    if (item) panel.add(item);
    if (item) view.add(item);
  };

  /*********************************************/

  menu = new Ext.ux.desktop.StartMenu({
    listeners:{
      afterrender:function() {
	//console.log("render menu");
      }
    }
  });

  bbar = new Ext.Toolbar({
    items:[{
      text:"Start"
      ,menu:menu
    }, "-"]
    ,listeners:{
      afterrender:function() {
	//console.log("render toolbar");
      }
    }
  });

  view = new Ext.ux.desktop.View({
    listeners:{
      afterrender:function() {
	//console.log("render view");
      }
    }
  });

  panel = new Ext.Panel({
    bbar:bbar
    ,border:false
//    ,layout:"absolute"
    ,layout:"fit"
    ,items:view
  });

  viewport = new Ext.Viewport({
    layout:"fit"
    ,items:panel
  });

  return {

    rendered:rendered

    ,getStartMenu:function() {
      return menu;
    }

    ,getView:function() {
      return view;
    }

    ,getStatusBar:function() {
      return panel.getBottomToolbar();
    }

    ,registerApplication:function(app) {
      apps.push(this.loadApp(app));
    }

    ,loadApp:function(app) {
      app = new app;
      setStartMenuItem(app.getMenu());
      setDesktopItem(app.getIcon());
      return app;
    }

    ,setWallpaper:function(img) {
      panel.body.setStyle("background-image", "url('"+img+"')");
    }

  };

}();

Ext.onReady(function() {
  var Dsk = Ext.ux.desktop.Desktop,
  img = "http://www.thoosje.com/vista-wallpapers/windowsvista/vista_wallpapers(53).jpg";
  //Dsk.setWallpaper(img);
});
