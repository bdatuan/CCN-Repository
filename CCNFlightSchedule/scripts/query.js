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
        	if(validator.validate()) {
                //alert("success");
                //alert("ddlOrigin=" + $("#ddlOrigin").val() );
                //alert("ddlDestination=" + $("#ddlDestination").val() );
                //alert("ddlCarrierCode=" + $("#ddlCarrierCode").val() );
                //alert("flight_date=" + $("#flight_date").val() );
                //alert("flight_number=" + $("#flight_number").val() );
            }
            else {
                alert("Please input the mandatory field");
                return;
            }
        	
            //Format the date: ddmmyyyy
            var strDate = $("#flight_date").val();
            var dateParts = strDate.split("/");
            var month = dateParts[0].toString();
            if (month.length == 1)
            	month = "0" + month;
            var day = dateParts[1].toString();
            if (day.length == 1)
            	day = "0" + day;
            var year = dateParts[2].toString();
            strDate = day + month + year;
            //alert("strDate=" + strDate);
            
        	//Call Flight display WS & parse JSON data
            
        	//Move to the Flight Display page
            var url = "#flight_display?token=123&origin=";
            url += $("#ddlOrigin").val() + "&destination=" + $("#ddlDestination").val();
            url += "&carrier=" + $("#ddlCarrierCode").val() + "&flightdate=" + strDate;
            url += "&flightNo=" + $("#flight_number").val();
            
            //Move to Flight Display page
            //alert("url=" + url);
            app.application.navigate(url, 'slide:right');	
            
            /*
            var deviceId;
            deviceId = window.localStorage.getItem("deviceId");
            if (!deviceId) {            	
                alert("Reset");
            	
            	//Call WS to get the 
            	$.ajax({
                type: "GET",
                url: url,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {
                    alert("GetDeviceId success");
            		var responseJSON = $.parseJSON(response);
            		deviceId = responseJSON.SystemDeviceID;	
            		alert("deviceId=" + deviceId);
            		window.localStorage.setItem("deviceId", deviceId);	
                }
              });
            }
            
            */
            
            
            
        }
        
    });
    
    app.queryService = {
        initQueryView: function (e) {
            //alert("initQueryView");
        	//Init components
            
        	var d = new Date();
        	var month = d.getMonth() + 1;
            var day = d.getDate();
            day = day.toString();
        	var output = month + '/' + day + '/' + d.getFullYear();
            //alert("output=" + output);
            
        	$("#flight_date").kendoDatePicker({ dateFormat: 'ddmmyyyy' });
        	$("#flight_date").val(output);
        	
        	//Init dropdownlist carrier code
        	var carrierCodeDS = new kendo.data.DataSource({
                transport: {
                read: {
                  url: "http://apidev.ccnhub.com/v1/FlightSchedule.WebAPI/carriers/",
                  dataType: "json" 
                }
              }
            });        	
        	
        	//Init dropdownlist origin, destination
        	var cityDS = new kendo.data.DataSource({
                transport: {
                read: {
                  url: "http://apidev.ccnhub.com/v1/FlightSchedule.WebAPI/cities/",
                  dataType: "json" 
                }
              }
            });
        
        	// Data binding
        	$("#ddlCarrierCode").kendoDropDownList({
                dataTextField: "Name",
                dataValueField: "Name",
                dataSource: carrierCodeDS
         	});
        	
        	$("#ddlOrigin").kendoDropDownList({
                dataTextField: "LongName",
                dataValueField: "Name",
                dataSource: cityDS
            });
        	
        	$("#ddlDestination").kendoDropDownList({
                dataTextField: "LongName",
                dataValueField: "Name",
                dataSource: cityDS
            });
            
            validator = e.view.element.kendoValidator().data("kendoValidator");
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
