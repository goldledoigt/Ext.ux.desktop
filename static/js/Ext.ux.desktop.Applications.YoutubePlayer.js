Ext.ns('Ext.ux.desktop.Applications');

Ext.ux.desktop.Applications.YoutubePlayer = Ext.extend(Ext.ux.desktop.Applications.Application, {

  name:"Youtube Player"

  ,iconCls16:"icon-youtubeplayer-16"

  ,iconCls64:"icon-youtubeplayer-64"

  ,constructor:function() {

    this.menu = new Ext.menu.Menu({
      items:[{
	text:"Video 1"
      }]
    });

    Ext.ux.desktop.Applications.YoutubePlayer.superclass.constructor.call(this);
  }

  ,start:function() {
    new Ext.ux.desktop.Window({
      width:300
      ,height:300
    }).show();
  }

});

Ext.ux.desktop.Desktop.registerApplication(Ext.ux.desktop.Applications.YoutubePlayer);


