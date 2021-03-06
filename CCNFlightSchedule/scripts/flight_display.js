(function (global) {
    var FlightDisplayViewModel, app = global.app = global.app || {};
    
    app.application = new kendo.mobile.Application(document.body);
    
    FlightDisplayViewModel = kendo.data.ObservableObject.extend({
        carrier: "", 
        createdDate: "", 
        destination: "",
        flightDate: "", 
        flightNumber: "", 
        origin: "", 
        id: "",
        isVisible: true,
        
        onSave: function (e){
        	alert("onSave");  
            this.id = "FD8F51DA-5214-41C7-B070-93D7CC4B6936";
            var url = "http://apidev.ccnhub.com/v1/FlightSchedule.WebAPI/flightschedulehistory/1234/" + this.id;
            //alert("url=" + url);
            //console.log("url=" + url);
            
            var visible;
            $.ajax({
                type: "PUT",
                url: url,
                data: "{\"save\":\"true\"}",
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                success: function(response) {
                	alert("response=" + response);
            		if (response.trim() == "true"){
                    	visible = false;
                    } else{
                        visible = true;
                    }
                }
            });
            
            this.set("isVisible", visible);
            //alert("isVisible=" + this.isVisible);
            
        }
    });
    
    app.flightDisplayService = {
        flightDisplayInit: function (e) {
            //alert("flightDisplayInit");
            
            //Init the url from query parameter
            var view = e.view;
            var token = view.params.token;
            var origin = view.params.origin;
            var destination = view.params.destination;
            var carrier = view.params.carrier;
            var flightdate = view.params.flightdate;
            var flightNo = view.params.flightNo;            
            var url = "http://apidev.ccnhub.com/v1/FlightSchedule.WebAPI/flightschedule/?token=" + token + "&origin=" + 
            	origin + "&destination=" + destination + "&carrier=" + carrier + "&flightdate=" + flightdate;
            if (flightNo != null && flightNo != "")
            	url += "&flightNo=" + flightNo;
            //alert("flightDisplayInit(), url=" + url);
            //console.log("url=" + url);
            
            //TODO: use the dummy url
            //url = "http://apidev.ccnhub.com/v1/FlightSchedule.WebAPI/flightschedule/?token=1234&origin=LAX&destination=SYD&carrier=SQ";
            
            //Datasource of flightDisplayList
            var arrFlightDetail = "";
            
            //Call WS and parse JSON data
            $.ajax({
                type: "GET",
                url: url,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                success: function(response) {
                    alert("Load data success");
                    
                    //Parse response data
                    var responseJSON = $.parseJSON(response);
                    var carrier = responseJSON.FlightScheduleRequest.Carrier;
                    var createdDate = responseJSON.FlightScheduleRequest.CreatedDate;
                    var destination = responseJSON.FlightScheduleRequest.Destination;
                    var flightDate = responseJSON.FlightScheduleRequest.FlightDate;
                    var flightNumber = responseJSON.FlightScheduleRequest.FlightNumber;
                    var id = responseJSON.FlightScheduleRequest.Id;
                    console.log("id=" + id);
                    var origin = responseJSON.FlightScheduleRequest.Origin;
                    
                    var scheduleAnswers = responseJSON.ScheduleAnswers;
                    $.each(scheduleAnswers, function() {
                        $.each(this.ScheduleAnswerDetails, function() {
                            var flightDetailItem;
                        	$.each(this.FlightDetails, function() {
                                flightDetailItem = "{";
                                flightDetailItem += "\"AirCraftTypeCode\":\"" + this.AirCraftTypeCode + "\",";
                                flightDetailItem += "\"Arrival\":\"" + this.Arrival + "\",";
                                flightDetailItem += "\"CarrierCode\":\"" + this.CarrierCode + "\",";
                                flightDetailItem += "\"Departure\":\"" + this.Departure + "\",";
                                flightDetailItem += "\"Destination\":\"" + this.Destination + "\",";
                                flightDetailItem += "\"FlightNumber\":\"" + this.FlightNumber + "\",";
                                flightDetailItem += "\"Origin\":\"" + this.Origin + "\"";
                            	flightDetailItem += "},"; 
                                //alert("flightDetailItem=" + flightDetailItem);
                				//console.log("flightDetailItem=" + flightDetailItem);                	
                                arrFlightDetail += flightDetailItem;
                        	});                            
                        });                        
                    });
                    
                    arrFlightDetail = arrFlightDetail.substring(0,arrFlightDetail.length - 1);
                    arrFlightDetail = $.parseJSON('[' + arrFlightDetail + ']');
                                        
                    //alert("arrFlightDetail=" + arrFlightDetail.toString());
                    //$.each( arrFlightDetail, function( index, value ){
                    //	 alert("flightDetailItem=" + value);                       
                    //});
                    
                    //Set value of data-binding
                    app.flightDisplayService.viewModel.set("carrier", carrier);
                    app.flightDisplayService.viewModel.set("createdDate", createdDate);
                    app.flightDisplayService.viewModel.set("destination", destination);
                    app.flightDisplayService.viewModel.set("flightDate", flightDate);
                    app.flightDisplayService.viewModel.set("flightNumber", flightNumber);
                    app.flightDisplayService.viewModel.set("id", id);
                    app.flightDisplayService.viewModel.set("origin", origin);
                                        
                    $("#flightDisplayList").kendoMobileListView({
                        dataSource: arrFlightDetail,
                        template: $("#flight_display-detail-template").html(),
                        fixedHeaders: true,
                        
                        click: function (e) {                
                            //alert("onClick()");
                            var item = $(e.target);
                            var text = item.text().trim(), length = text.length;
                            
                            if (length > 10){
                                //alert("move page");
                                app.application.navigate('#flight_display_detail','slide:right');
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
                }
              });
        },
        
        viewModel: new FlightDisplayViewModel()
    };
    
})(window);