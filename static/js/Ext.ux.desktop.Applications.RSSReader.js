Ext.ns('Ext.ux.desktop.Applications');

Ext.ux.desktop.Applications.RSSReader = Ext.extend(Ext.ux.desktop.Applications.Application, {

    name:"RSS Reader"

    ,iconCls16:"icon-rssreader-16"

    ,iconCls64:"icon-rssreader-64"

    ,constructor:function() {

        this.menu = new Ext.menu.Menu({
            items:[{
                text:"RSSReader 1"
            }]
        });

        Ext.ux.desktop.Applications.RSSReader.superclass.constructor.call(this);
    }

    ,start:function() {

        var titleTpl = new Ext.Template(
            '<div class="x-desktop-rssreader-col-title">'
            ,'<div style="white-space:normal"><a href="{link}" target="_blank">{title}</a></div>'
            ,'<div class="x-desktop-rssreader-col-snippet">{contentSnippet}</div>'
            ,'</div>'
            ,{compiled:true}
        );

        var titleRenderer = function(value, metaData, record) {
            return titleTpl.apply(record.data);
        };

        var dateRenderer = function(value) {
            return value.format("d/m/Y");
        };

        var labelTpl = '<div class="x-desktop-rssreader-feed-label">{label}</div>';

        this.feedListView = new Ext.list.ListView({
            singleSelect:true
            ,hideHeaders:true 
            ,store:new Ext.data.JsonStore({
                data:[
                    {label:"Digg", url:"http://www.digg.com/rss/index.xml"}
                    ,{label:"BinnewZ", url:"http://www.binnews.in/rss/cat-6.html"}
                ]
                ,fields:["label", "url"]
            })
            ,columns:[
                {header:"Label", dataIndex:"label", tpl:labelTpl}
            ]
            ,listeners:{
                scope:this
                ,selectionchange:function(view, node) {
                    var record = view.getRecord(node[0]);
                    this.loadFeed(record.get("url"));
                }
            }
        });

        this.postListView = new Ext.grid.GridPanel({
            border:false
            ,enableHdMenu:false
            ,viewConfig:{forceFit:true}
            ,store:new Ext.data.JsonStore({
                root:"feed.entries"
                ,fields:[
                    "title","link", "content", "contentSnippet"
                    ,{name:"date", mapping:"publishedDate", type:"date"}
                ]
            })
            ,columns:[
                {header:"Title", dataIndex:"title", renderer:titleRenderer}
                ,{header:"Date", dataIndex:"date", align:"right", fixed:true, width:80, renderer:dateRenderer}
            ]
        });

        new Ext.ux.desktop.Window({
            width:600
            ,height:300
            ,layout:"fit"
            ,border:false
            ,title:this.name
            ,iconCls:this.iconCls16
            ,items:[{
                layout:"border"
                ,border:false
                ,items:[{
                    region:"center"
                    ,layout:"fit"
                    ,style:"background-color:#FFFFFF;"
                    ,items:this.postListView
                }, {
                    region:"west"
                    ,width:100
                    ,split:true
                    ,title:"Feeds"
                    ,autoScroll:true
                    ,items:this.feedListView
                    ,collapsible:true
                    ,collapseMode:"mini"
                }]
            }]
        }).show();

    }

    ,titleRenderer:function(value) {
        return value;
    }

    ,loadFeed:function(url) {
        var feed = new google.feeds.Feed(url);
        feed.load((function(data) {
            this.postListView.getStore().loadData(data);
        }).createDelegate(this));
    }
});

Ext.ux.desktop.Desktop.registerApplication(Ext.ux.desktop.Applications.RSSReader);


