Ext.ns('Ext.ux.desktop.Application');

Ext.ux.desktop.Application.Bookmark = function() {

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

  this.getMenu = function() {
    return new Ext.menu.Item({
      text:"Bookmarks"
      ,menu:this.menu
    });
  };

};


Ext.onReady(function() {
  var app = new Ext.ux.desktop.Application.Bookmark();
  var Dsk = Ext.ux.desktop.Desktop;
  console.log(Dsk);
  Dsk.getStartMenu().add(app.getMenu());
});
