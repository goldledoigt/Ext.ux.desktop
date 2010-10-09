Ext.ns('Ext.ux.desktop.Applications');

Ext.ux.desktop.Applications.Contacts = Ext.extend(Ext.ux.desktop.Applications.Application, {

        name:"Contacts"

         ,iconCls16:"icon-contacts-16"

         ,iconCls64:"icon-contacts-64"

         ,AUTH_SCOPE:"http://www.google.com/m8/feeds/"
         ,GROUPS_URL:"http://www.google.com/m8/feeds/groups/default/full"
         ,CONTACTS_URL:"http://www.google.com/m8/feeds/contacts/default/full"

         ,constructor:function() {

         this.menu = new Ext.menu.Menu({
         items:[{
         text:"Contacts 1"
         }]
 });

 Ext.ux.desktop.Applications.Contacts.superclass.constructor.call(this);
 }

 ,start:function() {

         // Make sure that the client library is initialized
         google.gdata.client.init(console.log);

         this.serviceName = "dsk-contacts";

         // Execute only if the current session is valid.
         if (google.accounts.user.checkLogin(this.AUTH_SCOPE)) {

         // Create a new persistant service object
         this.contactsService = new google.gdata.contacts.ContactsService(this.serviceName);

         this.win = new Ext.ux.desktop.Window({
         width:600
         ,height:300
         ,layout:"fit"
         ,border:false
         ,title:this.name
         ,iconCls:this.iconCls16
         ,items:[{
         xtype:"tabpanel"
         ,ref:"tabpanel"
         ,enableTabScroll:true
         ,layoutOnTabChange:true
         ,tbar:[{
         xtype:"searchfield"
         ,ref:"../../searchField"
         ,listeners:{
         scope:this
         ,search:this.onSearch
         ,clear:this.onClearSearch
         }
 }]
 ,listeners:{

         scope:this
         ,tabchange:function(tabpanel, grid) {
         console.log("tabchange", arguments);
         this.getContacts(grid);
         }
 }
 }]
 }).show();

 this.mask = new Ext.LoadMask(this.win.body, {msg:"Loading UI..."});

 this.getGroups();

 } else {
         this.login();
         }

 }

 ,login: function() {
         if (this.serviceName != 0 && typeof(this.serviceName) != 'undefined') {
         // Obtain a login token
         google.accounts.user.login(this.AUTH_SCOPE);
         } else {
         console.log('Service name undefined, call setServiceName()');
         }
 }

 ,getGroups:function() {
         this.mask.msg = "Loading groups...";
         this.mask.show();
         var query = new google.gdata.contacts.ContactQuery(this.GROUPS_URL);
         query.setParam('max-results', 1000);

         var callback = function(feedRoot) {
         var entries = feedRoot.feed.entry;
         var groups = [];
         Ext.each(entries, function(entry) {
         groups.push({
         groupId:entry.getId().getValue()
         ,title:entry.getTitle().getText()
         ,layout:"fit"
         ,xtype:"dsk-contacts-list"
         });
 });
 this.setGroups(groups);
 };

 this.contactsService.getContactGroupFeed(query, callback.createDelegate(this), console.log);

 }

 ,setGroups:function(groups) {
         this.win.tabpanel.removeAll();
         this.win.tabpanel.add(groups);
         this.win.tabpanel.setActiveTab(0);
         }

 ,getContacts:function(grid) {
         this.mask.msg = "Loading contacts...";
         this.mask.show();
         var query = new google.gdata.contacts.ContactQuery(this.CONTACTS_URL);
         query.setParam('max-results', 1000);

         var callback = function(feedRoot) {
         var entries = feedRoot.feed.entry;
         var contacts = [];
         Ext.each(entries, function(entry) {
         console.log("entry", entry);
         var name;
         if (entry.getTitle() && entry.getTitle().getText())
         name = entry.getTitle().getText();
         else if (entry.getEmailAddresses() && entry.getEmailAddresses().length)
         name = entry.getName();
         else name = "Untitled Contact";
         contacts.push({
         id:entry.getId().getValue()
         ,name:name
         ,email:entry.getEmailAddresses()[0].getAddress()
         });
 });
 this.setContacts(grid, contacts);
 };

 if (grid.groupId != this.CONTACTS_URL)
 query.setParam('group', grid.groupId);
 this.contactsService.getContactFeed(query, callback.createDelegate(this), console.log);
 }

 ,setContacts:function(grid, contacts) {
         grid.getStore().loadData(contacts);
         grid.getStore().sort("name", "ASC");
         this.win.searchField.store = grid.getStore();
         var value = this.win.searchField.getValue();
         if (value.length) this.onSearch(this.win.searchField, value);
         this.mask.hide();
         }

 ,handleMyFeed:function() {
         console.log("feed", arguments);
         }

 ,handleError:function() {
         console.log("error", arguments);
         }

 ,onSearch:function(field, query) {
         field.store.filterBy(
         this.filterList.createDelegate(this, [field.store, query], true)
         );
         }

 ,onClearSearch:function(field) {
         field.store.clearFilter();
         }

 ,filterList:function(record, id, store, query) {
         if (record.get("name").indexOf(query) > -1 || record.get("email").indexOf(query) > -1) {
         return true;
         }
 else return false;
 }
});

Ext.ux.desktop.Desktop.registerApplication(Ext.ux.desktop.Applications.Contacts);




Ext.ux.desktop.Applications.Contacts.ContactList = Ext.extend(Ext.grid.GridPanel, {
         initComponent:function() {

         this.autoExpandColumn = "id";

         this.store = new Ext.data.JsonStore({
         fields:["id", "name", "email"]
         });

 this.columns = [
 new Ext.grid.RowNumberer()
 ,{header:"Name", dataIndex:"name"}
 ,{id:"id", header:"Email", dataIndex:"email"}
 ];

 Ext.ux.desktop.Applications.Contacts.ContactList.superclass.initComponent.call(this);
 }

});

Ext.reg("dsk-contacts-list", Ext.ux.desktop.Applications.Contacts.ContactList);

