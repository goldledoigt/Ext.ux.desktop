Ext.ns('Ext.ux.desktop.Applications');

Ext.ux.desktop.Applications.Application = function(config) {

  Ext.apply(this, config || {});

  this.getMenu = function() {
    if (this.menu) {
      return new Ext.menu.Item({
        text:this.name || "<i>unknown</i>"
        ,iconCls:this.iconCls16 || ""
        ,menu:this.menu
        ,scope:this
        ,handler:this.start
      });
    } else return false;
  };

  this.getIcon = function() {
    return {
        name:this.name
        ,iconCls:this.iconCls64
        ,scope:this
        ,handler:this.start
    };
    /*
    return new Ext.ux.desktop.Icon({
      x:20
      ,y:20
      ,handler:this.start
      ,data:{
        name:this.name
	    ,iconCls:this.iconCls64
      }
    });
    */
  };

  this.startApp = Ext.emptyFn;

};
