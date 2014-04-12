(function (global) {
    var HelpViewModel, app = global.app = global.app || {};
    
    app.application = new kendo.mobile.Application(document.body);
    
    HelpViewModel = kendo.data.ObservableObject.extend({
         strHelp: "The Help content."          
        
        
    });
    
    app.helpService = {
        showHelp: function () {
            //alert("showHelp");
            //Call ws to get the strHelp
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
            var strHelp = "Call WS to show the strHelp";
            
            app.helpService.viewModel.set("strHelp", strHelp);
		},

        viewModel: new HelpViewModel()        
        
    };
    
})(window);
