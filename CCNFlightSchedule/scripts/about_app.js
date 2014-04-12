(function (global) {
    var AboutAppViewModel, app = global.app = global.app || {};
    
    app.application = new kendo.mobile.Application(document.body);
    
    AboutAppViewModel = kendo.data.ObservableObject.extend({
        strAboutApp: "The About App content."
                
    });
    
    app.aboutAppService = {
        showAboutApp: function () {
            //alert("showAboutApp");
            //Call ws to get the strAboutApp
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
            var strAboutApp = "Call WS to show the strAboutApp";
            
            app.aboutAppService.viewModel.set("strAboutApp", strAboutApp);
		},
        
        viewModel: new AboutAppViewModel()        
        
    };
    
})(window);
