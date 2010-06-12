Ext.ns('Ext.ux.desktop.StartMenu');

Ext.ux.desktop.StartMenu.Applications = function() {

  this.pof = "pif";

  this.menu = new Ext.menu.Menu({
    items:[{
      text:"Application 1"
    }, {
      text:"Application 2"
    }, {
      text:"Application 3"
    }, {
      text:"Application 4"
    }]
  });

  var item = new Ext.menu.Item({
    text:"Applications"
    ,menu:this.menu
  });

//  Ext.ux.desktop.StartMenu.add(item);

  /***************************************************/
  /***************************************************/
  /***************************************************/

  this.add = function(item) {
    this.menu.add(item);
  };

};
