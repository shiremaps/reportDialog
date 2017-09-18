define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dojo/query',
    'dojo/on',
    'dojo/topic',
    'dojo/_base/lang',
	"dijit/registry",
	"dijit/Dialog",
	'xstyle/css!./Report/css/Report.css'

], function (
    declare,
    _WidgetBase,
    domQuery,
    on,
    topic,
    lang,
	registry,
	 Dialog
) {
    return declare([_WidgetBase], {

        postCreate: function () {
            this.inherited(arguments);
//			this.map.infoWindow.on('selection-change', lang.hitch(this, function (evt) {;
				var myidwidget = registry.byId("idpanel_parent");
//				var dnode = myidwidget.domNode; 
//				var panel = domQuery('.esriPopup .sizer .contentPane',dnode),
//				targetNode = null;
//				if (panel.length > 0){
//					targetNode = panel[0];
				on(myidwidget, 'click', lang.hitch(this, function(evt){
					if (evt.target.id === 'parcel-report'){
						var myapnlink = evt.target.attributes.value.value;
						this.parcelReportClick(myapnlink);
					}
				}));
//				}
//			}));	
//			
        },

        parcelReportClick: function (link) {
            //var feature = this.map.infoWindow.getSelectedFeature();
            topic.publish('parcelReportWidget/createReport', {
                apn: link
            });
			var myDialog = new Dialog({
				title: "Programmatic Dialog Creation",
				style: "width: 300px"
			});		
			myDialog.set("content", "<div class='reportdialog'><ul><li>hey</li><li>its me</li><li>" + link + "</li><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li> <li>Item 5</li></ul></div>");
			myDialog.show();
            return false;
        }

    });
});