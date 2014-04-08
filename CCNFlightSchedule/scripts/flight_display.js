(function (global) {
    var FlightDisplayViewModel, app = global.app = global.app || {};
    
    app.application = new kendo.mobile.Application(document.body);
    
    //flightDisplayDS: show the list of Flight Display view 
    var flightDisplayDS = new kendo.data.DataSource({
        transport: {
        // make JSONP request to http://demos.telerik.com/kendo-ui/service/products
        read: {
          url: "data/schedule_history_array.json",
          dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
    	scrollable: {
        	virtual: true
    	}
      }
    });
    
    FlightDisplayViewModel = kendo.data.ObservableObject.extend({
        onFlightDisplay_showMap: function (e) {
            alert("onFlightDisplay_showMap()");
        
        	//Calculate the location of flight display
        	
        	//Move to the Flight Display page
            app.navigate('#flight_map','slide:right');
        
        	e.preventDefault();    
        },
        
        onFlightDisplay_save: function (e) {
            //Move to the Flight Display page
        	alert("onFlightDisplay_save()");   
        }
        
    });
    
    app.flightDisplayService = {
        flightDisplayInit: function (e) {
            //alert("flightDisplayInit");
            $("#flightDisplayList").kendoMobileListView({
                dataSource: flightDisplayDS,
                template: $("#flight_display-lw-template").text(),
                fixedHeaders: true,
                click: function (e) {                
                    alert("onClick()");
                    console.log("app: onLibraryItemClick e:" + e);
                    console.log("app: onLibraryItemClick e.item:" + e.item);
                    console.log("app: onLibraryItemClick e.target:" + e.target);
                    console.log("app: onLibraryItemClick e.dataItem:" + e.dataItem);
            		//Move to the Flight Display page                    
                	//app.application.navigate('#flight_display_detail','slide:right');
                    //e.preventDefault();
                }
            });
        },
		
        
        flightDisplayService: new FlightDisplayViewModel()        
        
    };
    
})(window);