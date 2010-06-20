Ext.ns('Ext.ux.desktop');

Ext.ux.desktop.Window = Ext.extend(Ext.Window, {

  maximizable:true
  ,minimizable:true

  ,initComponent:function() {
    Ext.ux.desktop.Window.superclass.initComponent.call(this);
    var statusBar = Ext.ux.desktop.Desktop.getStatusBar();
    this.on({
      scope:this
      ,afterrender:function() {
        if (statusBar.items.length > 2) statusBar.add(" ");
        this.statusBarBtn = statusBar.addButton({
          text:this.title || "<i>unknown</i>"
          ,iconCls:this.iconCls || ""
          ,scope:this
          ,handler:function() {
            if (this.hidden)
              this.show(this.statusBarBtn.el);
            else this.hide(this.statusBarBtn.el);
          }
        });
        statusBar.doLayout();
      }
      ,show:function() {
        this.statusBarBtn.toggle(true);
      }
      ,hide:function() {
        this.statusBarBtn.toggle(false);
      }
      ,close:function() {
        statusBar.remove(this.statusBarBtn);
      }
    });
  }

  ,minimize:function() {
    this.hide(this.statusBarBtn.el);
    return this;
  }

});

Ext.reg('desktopwindow', Ext.ux.desktop.Window);
