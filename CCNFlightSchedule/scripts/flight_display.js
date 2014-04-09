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
                
    });
    
    app.flightDisplayService = {
        flightDisplayInit: function (e) {
            //alert("flightDisplayInit");
            
            $("#flightDisplayList").kendoMobileListView({
                dataSource: flightDisplayDS,
                template: $("#flight_display-lw-template").html(),
                fixedHeaders: true,
                
                click: function (e) {                
                    //alert("onClick()");
                    var item = $(e.target);
                    var text = item.text().trim(), length = text.length;
                    
                    if (length > 10){
                        //alert("move page");
                        app.application.navigate('#flight_display_detail','slide:right');
                        e.preventDefault();                        
                    } else if (text == "Save"){
                        //Move to the Flight Display page
        				//alert("onFlightDisplay_save()");  
                        e.preventDefault();
                    } else if (text == "Map"){
                    	//alert("onFlightDisplay_showMap()");
        
                    	//Calculate the location of flight display
                    	
                    	//Move to the Flight Display page
                        app.application.navigate('#flight_map','slide:right');
                    
                    	e.preventDefault();                        
                    } else {
                        e.preventDefault();
                    }
                }
                
            });
        },
        
        viewModel: new FlightDisplayViewModel()
    };
    
})(window);