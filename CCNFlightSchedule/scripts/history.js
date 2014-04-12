(function (global) {
    var HistoryViewModel, app = global.app = global.app || {};
    
    app.application = new kendo.mobile.Application(document.body);
    
    //historyDS: show the list of History view 
    var historyDS = new kendo.data.DataSource({
        transport: {
        // make JSONP request to http://demos.telerik.com/kendo-ui/service/products
        read: {
          url: "data/schedule_history_array.json",
          dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
    	scrollable: {
        	virtual: true
    	},
    	selectable: "multiple"
      }
    });
    
    HistoryViewModel = kendo.data.ObservableObject.extend({
                
    });
    
    app.historyService = {
        listViewHistoryInit: function (e) {
            //alert("listViewHistoryInit");
            $("#list").kendoMobileListView({
                dataSource: historyDS,
                template: $("#history-lw-delete-template").text(),
                fixedHeaders: true,
                click: function (e) {
                    //alert("onHistoryListClick");
        	
                	$('#deleteAllDiv').show('fast');
                	
                	e.item.toggleClass("listview-selected");
                    
                    var item = $(e.target);
                    var text = item.text().trim(), length = text.length;
                    
                    if (length > 10){
                        e.preventDefault();                        
                    } else if (text == "Save"){
                        //Move to the Flight Display page
        				//alert("onHistory_save()");
                    } else if (text == "Map"){
                    	//alert("onHistory_showMap()");
                        //Calculate the location of flight display
                    	
                    	//Move to the Flight Display page
                        app.application.navigate('#flight_map','slide:right');                       
                    } else if (text == "Delete"){
                       //alert("onHistory_delete");
                        
                    } else {
                        e.preventDefault();
                    }
                }
            });
            
        	e.view.element.find("#list").kendoTouch({
                filter: ">li",
                enableSwipe: true,
                swipe: function (e) {
                    //alert("onHistorySwipe");
                	if ($(e.touch.target).find("[id=delBtn]").css("visibility") == "hidden")
            		{
            			$(e.touch.target).find("[id=delBtn]").css("visibility", "visible");
            		} else {
            			$(e.touch.target).find("[id=delBtn]").css("visibility", "hidden");
            		}
                
                	var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
                	button.expand().duration(200).play();
                }
            });      
        	
        	e.preventDefault(); 
        },
        
        listViewHistoryShow: function () {
            //alert("listViewHistoryShow");
            //Hide the delete btn
        	$('#deleteAllDiv').hide();
        }, 

        historyService: new HistoryViewModel()        
        
    };
    
})(window);