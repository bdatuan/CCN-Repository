(function (global) {
    var HistoryDetailViewModel, app = global.app = global.app || {};
    
    app.application = new kendo.mobile.Application(document.body);
        
    
    HistoryDetailViewModel = kendo.data.ObservableObject.extend({
        
    });
    
    app.historyDetailService = {
    	listViewHistoryDetailInit: function(e){
            //alert("listViewHistoryDetailInit()");    
            
            var view = e.view;
            var id = view.params.id;
            var url = "http://apidev.ccnhub.com/v1/FlightSchedule.WebAPI/flightschedulehistory/123/" + id;
            console.log("url=" + url);
            
            //Datasource of flightDisplayList
            var arrHistoryDetail = "";
            $.ajax({
                type: "GET",
                url: url,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                success: function(response) {
                    alert("Load data success");
                    var responseJSON = $.parseJSON(response);
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
                                arrHistoryDetail += flightDetailItem;
                        	});                            
                        });                        
                    });
                    
                    arrHistoryDetail = arrHistoryDetail.substring(0, arrHistoryDetail.length - 1);
                    //alert("arrHistoryDetail=" + arrHistoryDetail);
                    //console.log("arrHistoryDetail=" + arrHistoryDetail);
                    arrHistoryDetail = $.parseJSON('[' + arrHistoryDetail + ']');
                    
                    $("#listDetail").kendoMobileListView({
                        dataSource: arrHistoryDetail,
                        template: $("#history-lw-detail-template").html(),
                        fixedHeaders: true
                    });
                }
            });
            
        },
        
        listViewHistoryDetailShow: function(e){
        	//alert("listViewHistoryDetailShow()");
        },
        
        historyDetailService: new HistoryDetailViewModel()        
        
    };
    
})(window);