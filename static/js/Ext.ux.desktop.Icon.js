Ext.ns('Ext.ux.Desktop');

Ext.ux.desktop.Icon = Ext.extend(Ext.BoxComponent, {

  initComponent:function() {
    this.height = 80;
    this.width = 80;
    this.handler = this.handler || Ext.emptyFn;
    this.tpl = '<div class="x-dsk-icon-img {iconCls}"></div>'
	       + '<div class="x-dsk-icon-name">{name}</div>';
    Ext.ux.desktop.Icon.superclass.initComponent.call(this);
  }

  ,onRender:function(ct, position) {
    Ext.ux.desktop.Icon.superclass.onRender.call(this, ct, position);
    this.el.on({scope:this.scope || this, dblclick:this.handler});
  }

});

Ext.reg('desktopicon', Ext.ux.desktop.Icon);
