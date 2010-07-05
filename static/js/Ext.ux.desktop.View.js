Ext.ns('Ext.ux.desktop');

Ext.ux.desktop.View = Ext.extend(Ext.DataView, {

  cls:"x-desktop-view"
  ,overClass:"x-desktop-view-cell-over"
  ,itemSelector:"td.x-desktop-view-cell"
  ,selectedClass:"x-desktop-view-cell-selected"
  ,multiSelect:true
  ,wallpaper:"http://www.android.com/media/wallpaper/android-wallpaper6_1280x800.jpg"

  ,initComponent:function() {

    this.iconWidth = 100;
    this.iconHeight = 100;

    this.icons = [];

    this.store = new Ext.data.JsonStore({
      fields:["name", "iconCls", "cols"]
    });

    this.tpl = new Ext.XTemplate(
      '<table style="width:100%;border-collapse:collapse;">',
      '<tpl for=".">',
      '<tr>',
      '<tpl for="cols">',
      '<td class="x-desktop-view-cell" style="">',
      '<div class="{iconCls}"><a>{name}</a></div>',
      '</td>',
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
      ,dblclick:function(view, index, node, event) {
        var data = view.getData(index);
        data.handler.call(data.scope || this);
      }
      ,resize:function(view, adjWidth, adjHeight, rawWidth, rawHeight) {
        var rows, cols, record, cell, data, index = 0,
        viewArea = adjWidth * adjHeight;
        this.rowCount = Math.floor(adjHeight / this.iconHeight);
        this.colCount = Math.floor(adjWidth / this.iconWidth);
        rows = [];
        for (var i = 0; i < this.rowCount; i++) {
          cols = [];
          for (var j = 0; j < this.colCount; j++) {
            data = {};
            //record = this.store.getAt(i);
            //if (record) cell = record.get("cols")[j];
            //if (cell) Ext.apply(data, cell);
            index++;
            cols.push(data);
          }
          rows.push({cols:cols});
        }
        view.store.loadData(rows);
        view.loadIcons();
      }
    });

  }

  ,prepareData: function(data){
      data.shortName = Ext.util.Format.ellipsis(data.name, 15);
      return data;
  }

  ,setWallpaper:function(img) {
    this.el.setStyle({
        "background-image":"url('"+img+"')"
        ,"background-position":"50% 50%"
    });
  }

  ,add:function(data) {
    var rowIndex, colIndex, nodeIndex, name;
    if (this.icons.indexOf(data) < 0) this.icons.push(data);
    for (var i = 0; i < this.colCount; i++) {
      rowIndex = false;
      this.store.each(function(record, index) {
        name = record.get("cols")[i].name;
	    if (!name || !name.length) {
	        rowIndex = index;
	        return false;
	    } else return true;
      });
      if (rowIndex !== false) {
        colIndex = i;
	    break;
      }
    }
    var cols = this.store.getAt(rowIndex).get("cols");
    Ext.apply(cols[colIndex], data);
    this.refresh();
  }

    ,getData:function(index) {
      var rowIndex = Math.floor(index / this.colCount);
      var colIndex = Math.ceil(index - (rowIndex * this.colCount));
      return this.store.getAt(rowIndex).get("cols")[colIndex];
    }

    ,loadIcons:function() {
        Ext.each(this.icons, this.add, this);
    }
});
