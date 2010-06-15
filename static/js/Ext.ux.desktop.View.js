Ext.ns('Ext.ux.desktop');

Ext.ux.desktop.View = Ext.extend(Ext.DataView, {

  cls:"x-desktop-view"
  ,overClass:"x-view-over"
  ,itemSelector:"div.thumb-wrap"
  ,multiSelect:true
  ,wallpaper:"http://www.thoosje.com/vista-wallpapers/windowsvista/vista_wallpapers(53).jpg"

  ,initComponent:function() {

    this.store = new Ext.data.JsonStore({
      fields:["name", "img"]
    });

    this.tpl = new Ext.XTemplate(
      '<tpl for=".">',
      '<div class="thumb-wrap" id="{name}">',
      '<div class="thumb"><img src="{img}" title="{name}"></div>',
      '<span class="x-editable">{shortName}</span></div>',
      '</tpl>',
      '<div class="x-clear"></div>'
    );

    Ext.ux.desktop.View.superclass.initComponent.call(this);

    this.on({
      afterrender:function() {
	this.setWallpaper(this.wallpaper);
      }
    });

  }

  ,prepareData: function(data){
      data.shortName = Ext.util.Format.ellipsis(data.name, 15);
      return data;
  }

  ,setWallpaper:function(img) {
    this.el.setStyle("background-image", "url('"+img+"')");
  }

  ,add:function(data) {
    this.store.add(new this.store.recordType(data));
  }

});
