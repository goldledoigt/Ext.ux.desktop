/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns('Ext.ux.form');

Ext.ux.form.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
        Ext.ux.form.SearchField.superclass.initComponent.call(this);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },

    validationEvent:false,
    validateOnBlur:false,
    trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
    hideTrigger1:true,
    width:180,
    hasSearch : false,
    paramNames : null,

    onTrigger1Click : function(){
        if(this.hasSearch){
            this.el.dom.value = '';
            //var o = {start: 0};
            //this.store.baseParams = this.store.baseParams || {};
            //this.store.baseParams[this.paramName] = '';
            //this.store.reload({params:o});
            this.store.setBaseParam(this.paramNames.start, 1);
            //this.store.setBaseParam(this.paramNames.limit, this.limit);
            this.store.setBaseParam(this.paramNames.query, "");
            this.store.load();
            this.triggers[0].hide();
            this.hasSearch = false;
        }
    },

    onTrigger2Click : function(){
        var v = this.getRawValue();
        if(v.length < 1){
            this.onTrigger1Click();
            return;
        }
//        var o = {start: 0};
//        this.store.baseParams = this.store.baseParams || {};
//        this.store.baseParams[this.paramName] = v;
//        this.store.reload({params:o});
        this.store.setBaseParam(this.paramNames.start, 1);
        //this.store.setBaseParam(this.paramNames.limit, this.limit);
        this.store.setBaseParam(this.paramNames.query, v);
        this.store.load();
        this.hasSearch = true;
        this.triggers[0].show();
    }
});

Ext.reg("searchfield", Ext.ux.form.SearchField);
