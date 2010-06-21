Ext.ns('Ext.ux.desktop.Applications');

Ext.ux.desktop.Applications.Bookmark = Ext.extend(Ext.ux.desktop.Applications.Application, {

  name:"Bookmarks"

  ,constructor:function() {

    this.menu = new Ext.menu.Menu({
      items:[{
	text:"Bookmark 1"
      }, {
	text:"Bookmark 2"
      }, {
	text:"Bookmark 3"
      }, {
	text:"Bookmark 4"
      }]
    });

    Ext.ux.desktop.Applications.Bookmark.superclass.constructor.call(this);

  }

});
