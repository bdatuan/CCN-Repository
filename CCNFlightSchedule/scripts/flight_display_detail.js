(function (global) {
    var FlightDisplayDetailViewModel, app = global.app = global.app || {};
    
    app.application = new kendo.mobile.Application(document.body);
    
    //flightDisplayDetailDS: show the list of Flight Display Detail view 
	var flightDisplayDetailDS = new kendo.data.DataSource({
        transport: {
        // make JSONP request to http://demos.telerik.com/kendo-ui/service/products
        read: {
          url: "data/getScheduleDetail.json",
          dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
    	scrollable: {
        	virtual: true
    	}
      }
    });
    
    FlightDisplayDetailViewModel = kendo.data.ObservableObject.extend({
        onFlightDisplayDetail_showMap: function (e) {
            alert("onFlightDisplayDetail_showMap()");
            //Calculate the location of flight display
        	
        	//Move to the Flight Display page
            app.navigate('#flight_map','slide:right');
        },
        
        onFlightDisplayDetail_save: function (e) {
            //Move to the Flight Display page
        	alert("onFlightDisplayDetail_save()");  
        },
        
    });
    
    app.flightDisplayDetailService = {
        flightDisplayDetailInit: function (e) {
            //alert("flightDisplayDetailInit");
            $("#flightDisplayDetailList").kendoMobileListView({
                dataSource: flightDisplayDetailDS,
                template: $("#flight_display_detail-lw-template").text(),
                fixedHeaders: true
            });
        },

        flightDisplayDetailService: new FlightDisplayDetailViewModel()        
        
    };
    
})(window);