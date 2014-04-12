(function (global) {
    var HistoryViewModel, app = global.app = global.app || {};
    
    app.application = new kendo.mobile.Application(document.body);
        
    
    HistoryViewModel = kendo.data.ObservableObject.extend({
        
    });
    
    app.historyService = {
    	
        refresh: function(){
            //alert("refresh()");
            var list = $('#list').data('kendoMobileListView');
            list.dataSource.read();   // added line
            list.refresh();
        },
        
        listViewHistoryInit: function (e) {
            //alert("listViewHistoryInit");
            //historyDS: show the list of History view 
            var historyDS = new kendo.data.DataSource({
                transport: {
                read: {
                  url: "http://apidev.ccnhub.com/v1/FlightSchedule.WebAPI/flightschedulehistory/123/?limit=10&offset=0",
                  dataType: "json" 
                },
            	scrollable: {
                	virtual: true
            	},
            	selectable: "multiple"
              }
            });
            
            //var list = $("#list").data("kendoListView");
            
            //List of index of seleted item
            var arrIndex = [];
            
            $("#list").kendoMobileListView({
                dataSource: historyDS,
                template: $("#history-lw-delete-template").text(),
                fixedHeaders: true,
                click: function (e) {
                    //alert("onHistoryListClick");
                    
                    var index = $(e.item).index();
                    //alert("index=" + index);
                    var dataItem = this.dataSource.view()[index];
                    var id = dataItem.Id;
                    //alert("id=" + dataItem.Id);
                    console.log("id=" + dataItem.Id);
                    
                    var item = $(e.target);
                    var text = item.text().trim(), length = text.length;
                    //alert("text=" + text);                                     
                    
                    
                    if (length > 10){
                        //alert("Seleted item");
                        
                        //Show the deleteAllBtn & toogle class
                    	$('#deleteAllDiv').show('fast');                    	
                    	e.item.toggleClass("listview-selected");
                        
                        //Add more item
                        arrIndex = jQuery.grep(arrIndex, function(value) {
                            return value != id;
                          });
                        if (e.item.hasClass("listview-selected")){
                        	arrIndex.push(id);
                        }
                        
                        e.preventDefault();                        
                    } else if (text == "Query"){
                        //Move to the Flight Display page
        				//alert("onHistory_query()");
                        
                        app.application.navigate('#query','slide:right');
                    } else if (text == "Map"){
                    	//alert("onHistory_showMap()");
                        //Calculate the location of flight display
                    	
                    	//Move to the Flight Display page
                        app.application.navigate('#flight_map','slide:right');                       
                    } else if (text == "Delete"){
                        //alert("onHistory_delete");                                             
                        
                        //Call WS delete history
                        var deleteURL = "http://apidev.ccnhub.com/v1/FlightSchedule.WebAPI/flightschedulehistory/123/" + id;
                        //console.log("deleteURL=" + deleteURL);
                        //alert("deleteURL=" + deleteURL);
                        
                        $.ajax({
                            type: "DELETE", 
                            url: deleteURL,
                            data: "{}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function(msg) {
                                //alert("delete success");
                                //console.log("Delete success");
                            }
                        });
                        
                        //Refresh the list
                        //$("#list").data("kendoListView").dataSource.read();
                        app.historyService.refresh();
                    } else if (length == 0){
                        //alert("Button pressed");
                        /*
                        var xyz = $(e.touch.target).closest("[role='option']");
                        if (xyz.find("[id=detail-history]").css("display") == "none"){
                            alert("kaka");
                        }
                        
                        if ($(e.touch.target).find("[id=detail-history]").css("display") == "none")
                		{
                			alert("Here");	
                		} else {
                			
                		}
                        
                        if ($(e.target).find("[id=detail-history]").css("display") == "none")
                		{
                            alert("Find");
                			$(e.target).find("[id=detail-history]").css("visibility", "visible");
                		} else {
                			$(e.target).find("[id=detail-history]").css("display", "none");
                		}
                        */
                        e.preventDefault(); 
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
            
            $('#deleteAllBtn').click(function(e) {  
                //alert("deleteAllBtn_onClick()");
                
                var strIndex = "{ \"requests\" : [";
                $.each( arrIndex, function( index, value ){
                    //alert("value=" + value);
                    strIndex += "\"" + value.toString() + "\",";
                });
                strIndex = strIndex.substring(0,strIndex.length - 1)
                strIndex += "] }";
                //alert("strIndex=" + strIndex);
                
                var url = "http://apidev.ccnhub.com/v1/FlightSchedule.WebAPI/flightschedulehistory/123/";
                //alert("url=" + url);
                //console.log("url=" + url);
                
                //Call ws to remove many seleted index of history item
                $.ajax({
                    type: "PUT", //will change DELETE when ws is OK
                    url: url,
                    data: strIndex,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        //alert("Delete success");
                    	//console.log("Delete success");	   
                    }
                });
                
                //Refresh the list
                app.historyService.refresh();
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