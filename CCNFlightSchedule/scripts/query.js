(function (global) {
    var QueryViewModel, app = global.app = global.app || {};
    
    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();
    }, false);

    app.application = new kendo.mobile.Application(document.body);
    
    QueryViewModel = kendo.data.ObservableObject.extend({
                 
        onQueryAction: function () {
        	//alert("onQueryAction");
        	//Validate Query input form
        
        	
        	//Call Flight display WS & parse JSON data
        
        	
        	//Move to the Flight Display page
            app.application.navigate('#flight_display','slide:right');	
            
        }
        
    });
    
    app.queryService = {
        initQueryView: function () {
            //alert("initQueryView");
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
            //alert("show");
        },

        viewModel: new QueryViewModel()        
        
    };
    
})(window);

        
        /*
        function onClick(e){
        	alert("Clicked item");
        }
        
        
        var historyDS = new kendo.data.DataSource({
            data: [
                {id: 1, category: 1, name: "Water"},
                {id: 2, category: 1, name: "Tea"},
                {id: 3, category: 1, name: "Coffee"},
                {id: 4, category: 1, name: "Juice"},
                {id: 5, category: 2, name: "Banana"},
                {id: 6, category: 2, name: "Apple"},
                {id: 7, category: 2, name: "Orange"},
                {id: 8, category: 2, name: "Berries"},
                {id: 9, category: 2, name: "Pineaple"}
            ]
        });
        
        ,
              schema: {
                parse: function(response) {
                  var products = [];
                  for (var i = 0; i < response.length; i++) {
                    var product = {
                      id: response[i].ProductID,
                      name: response[i].ProductName
                    };
                    products.push(product);
                  }
                  return products;
                }
              }
        */
        
                
        /*
        $("#endless-scrolling").kendoMobileListView({
            dataSource: dataSource,
            template: $("#endless-scrolling-template").text(),
            endlessScroll: true
        });
        */
        
        /*
        function initForm() {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "FlashReportMobileWebService.asmx/GetCompany",
            dataType: "json",
            success: function (data) {
                for (i = 0; i < data.d.length; i++) {
                    ddlCompany.append($("<option></option>").val(data.d[i].Company).html(data.d[i].Company));
                };


                $("#ddlCompany").kendoDropDownList();
        
        		// correct value
        		var dataSource = [];
                for (i = 0; i < data.d.length; i++) {                    
                    ddlCompany.push({ "Company": data.d[i].Company})
                };
                $("#ddlCompany").kendoDropDownList({
                    dataTextField: "Company",
                    dataSource: dataSource
                });
                }
        });
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "FlashReportMobileWebService.asmx/ToCategoryDropDown",
            dataType: "json",
            success: function (data) {
                for (i = 0; i < data.d.length; i++) {
                    ddlCategory.append($("<option></option>").val(data.d[i].Category).html(data.d[i].Category));

                };
                $("#ddlCategory").kendoDropDownList();
            },
            failure: function (msg) {
                alert(msg);
            }
        });
    }
        
    $("#ddlCategory").change(
        function (e) {
            var ddlProduct= $("#ddlProduct");  
            var dataItem = $("#ddlCategory").val();  
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: "{'Category':'" + dataItem + "'}",
                url: "FlashReportWebService.asmx/ToFillProductDropDown",
                dataType: "json",
                success: function (data) {
        
                    ddlProduct.empty();
                    for (i = 0; i < data.d.length; i++) {
                        ddlProduct.append($("<option></option>").val(data.d[i].ProductName).html(data.d[i].ProductName));
                    };
                    $("#ddlProduct").kendoDropDownList();
                },
                failure: function (msg) {
                    alert(msg);
                }
            });
        });
        */
