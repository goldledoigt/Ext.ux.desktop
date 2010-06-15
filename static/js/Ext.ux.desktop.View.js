Ext.ns('Ext.ux.desktop');

Ext.ux.desktop.View = Ext.extend(Ext.DataView, {

  cls:"x-desktop-view"
  ,overClass:"x-view-over"
  ,itemSelector:"div.thumb-wrap"
  ,multiSelect:true
  ,wallpaper:"http://www.thoosje.com/vista-wallpapers/windowsvista/vista_wallpapers(53).jpg"

  ,initComponent:function() {

    this.iconWidth = 80;
    this.iconHeight = 80;

    this.store = new Ext.data.JsonStore({
      fields:["name", "img", "cols"]
    });

    this.tpl = new Ext.XTemplate(
      '<table style="width:100%;border-collapse:collapsed;">',
      '<tpl for=".">',
      '<tr style="border:1px solid black;">',
      '<tpl for="cols">',
      '<td style="border:1px solid black!important;height:80px;width:80px;">{name}</td>',
      '</tpl>',
      '</tr>',
      '</tpl>',
      '</table>'
    );

    Ext.ux.desktop.View.superclass.initComponent.call(this);

    this.on({
      afterrender:function() {
	this.setWallpaper(this.wallpaper);
      }
      ,resize:function(view, adjWidth, adjHeight, rawWidth, rawHeight) {
	var rows, cols;
	var viewArea = adjWidth * adjHeight;
	this.rowCount = Math.floor(adjHeight / this.iconHeight);
	this.colCount = Math.floor((adjWidth) / this.iconWidth);
	console.log('resize', this, arguments, this.rowCount, this.colCount);
	rows = [];
	for (var i = 0; i < this.rowCount; i++) {
	  cols = [];
	  for (var j = 0; j < this.colCount; j++) {
	    cols.push({name:i+" - "+j, img:"**"});
	  }
	  rows.push({name:"<i>blank</i>", cols:cols});
	}
	view.store.loadData(rows);
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
    var rowIndex;
    console.log('add', this, arguments);
    for (var i = 0; i < this.colCount; i++) {
      rowIndex = false;
      this.store.each(function(record, index) {
	console.log('in store', arguments, record.get("cols")[i], record.get("cols")[i].img);
	if (record.get("cols")[i].img) {
	  rowIndex = index;
	  return false;
	} else return true;
      });
      if (rowIndex !== false) {
	console.log("INDEX", rowIndex, this.store.getAt(rowIndex).get("cols"));
	break;
      }
    }
//    this.store.add(new this.store.recordType(data));
// TO BE CONTINUED ...
  }

});
