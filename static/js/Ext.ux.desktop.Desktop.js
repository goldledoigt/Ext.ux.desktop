Ext.ns('Ext.ux.desktop');

Ext.ux.desktop.Desktop = function() {

  var wallpaper = "http://www.thoosje.com/vista-wallpapers/windowsvista/vista_wallpapers(53).jpg";

  var menu = new Ext.ux.desktop.StartMenu();

  var bbar = [{
    text:"Start"
    ,menu:menu
  }];

  var panel = new Ext.Panel({
    bbar:bbar
  });

  var setWallpaper = function(img) {
    console.log('setWallpaper', this, arguments, this.body);
    panel.body.setStyle("background-image", "url('"+img+"')");
  };

  var init = function() {
    setWallpaper(wallpaper);
  };

  var viewport = new Ext.Viewport({
    layout:"fit"
    ,items:panel
    ,listeners:{
      afterrender:function() {
	init();
      }
    }
  });

  return {
    getStartMenu:function() {
      return menu;
    }
  };

}();


/*
Ext.extend(Ext.Panel, {



  ,initComponent:function() {



    Ext.ux.desktop.Desktop.superclass.initComponent.call(this);

    this.on({

    });
  }

  ,afterRender:function() {
    console.log('afterRender', this, arguments, Ext.ux.desktop);
    Ext.ux.desktop.Desktop.superclass.afterRender.call(this);
    this.setWallpaper(this.wallpaper);
  }

  ,setWallpaper:function(img) {
    console.log('setWallpaper', this, arguments, this.body);
    this.body.setStyle("background-image", "url('"+img+"')");
  }

  ,getStartMenu:function() {
    if (!this.startMenu)
      this.startMenu = new Ext.ux.desktop.StartMenu();
    return this.startMenu;
  }

});

Ext.reg('desktop', Ext.ux.desktop.Desktop);
*/