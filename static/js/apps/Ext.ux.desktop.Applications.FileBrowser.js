Ext.ns('Ext.ux.desktop.Applications');

Ext.ux.desktop.Applications.FileBrowser = Ext.extend(Ext.ux.desktop.Applications.Application, {

    name:"File Browser"

    ,iconCls16:"icon-filebrowser-16"

    ,iconCls64:"icon-filebrowser-64"

    ,constructor:function() {

        this.menu = new Ext.menu.Menu({
            items:[{
                text:"FileBrowser 1"
            }]
        });

        Ext.ux.desktop.Applications.FileBrowser.superclass.constructor.call(this);
    }

    ,start:function() {

        this.filebrowser = new Ext.ux.FileBrowser({
            rootText:"My Documents"
            ,readOnly:false
            ,enableBrowser:true
            ,browserDDGroup:"DDGroup1"
            ,url:"php/getfiles.php"
        });

        new Ext.ux.desktop.Window({
            width:600
            ,height:300
            ,layout:"fit"
            ,border:false
            ,title:this.name
            ,iconCls:this.iconCls16
            ,items:this.filebrowser
        }).show();

    }

});

Ext.ux.desktop.Desktop.registerApplication(Ext.ux.desktop.Applications.FileBrowser);


