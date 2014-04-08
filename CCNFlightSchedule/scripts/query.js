(function (global) {
    var app = global.app = global.app || {};
    
    QueryViewModel = kendo.data.ObservableObject.extend({
        
    });
    
    app.queryService = {
        init: function () {
            alert("initQueryView");
        	//Init components
        	var d = new Date();
        	var month = d.getMonth() + 1;
        	var day = d.getDate();

        	var output = 
        		((''+month).length<2 ? '0' : '') + month + '/' +
        		((''+day).length<2 ? '0' : '') + day + '/' + d.getFullYear();
        	$("#flight_date").val(output);
        
        	$("#flight_date").kendoDatePicker();
        
        	//Init dropdownlist carrier code
        	var carrierCodeDS = new kendo.data.DataSource({
                transport: {
                // make JSONP request to http://demos.telerik.com/kendo-ui/service/products
                read: {
                  url: "data/getCarrierCollection.json",
                  dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                }
              }
            });        	
        
        	//Init dropdownlist origin, destination
        	var cityDS = new kendo.data.DataSource({
                transport: {
                // make JSONP request to http://demos.telerik.com/kendo-ui/service/products
                read: {
                  url: "data/getCityCollection.json",
                  dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                }
              }
            });
        
        	// Data binding
        	$("#ddlCarrierCode").kendoDropDownList({
                dataTextField: "Carrier",
                dataValueField: "Carrier",
                dataSource: carrierCodeDS
         	});
        	
        	$("#ddlOrigin").kendoDropDownList({
                dataTextField: "City",
                dataValueField: "City",
                dataSource: cityDS
            });
        	
        	$("#ddlDestination").kendoDropDownList({
                dataTextField: "City",
                dataValueField: "City",
                dataSource: cityDS
            });
        },
        
        show: function () {
            alert("show");
        },

        viewModel: new QueryViewModel()        
        
    };
    
})(window);