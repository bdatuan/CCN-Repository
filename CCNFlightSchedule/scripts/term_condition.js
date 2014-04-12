(function (global) {
    var TermConditionViewModel, app = global.app = global.app || {};
    
    app.application = new kendo.mobile.Application(document.body);
    
    TermConditionViewModel = kendo.data.ObservableObject.extend({
        strTermCondition: "The Term & Condition content."           
        
        
    });
    
    app.termConditionService = {
        showTermCondition: function () {
            //alert("showTermCondition");
            //Call ws to get the strTermCondition
            /*
            $.ajax({
                type: "GET",
                url: "http://apidev.ccnhub.com/v1/FlightSchedule.WebAPI/flightschedulehistory/?token=123&limit=10&offset=0",
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                  // Hide the fake progress indicator graphic.
                  alert("success");
                  alert(msg);
                }
              });
            */
            var strTermCondition = "Call WS to show the strTermCondition";
            
            app.termConditionService.viewModel.set("strTermCondition", strTermCondition);
		},

        viewModel: new TermConditionViewModel()        
        
    };
    
})(window);
