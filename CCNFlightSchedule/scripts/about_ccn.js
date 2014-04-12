(function (global) {
    var AboutCCNViewModel, app = global.app = global.app || {};
    
    app.application = new kendo.mobile.Application(document.body);
    
    AboutCCNViewModel = kendo.data.ObservableObject.extend({
        strAboutCCN: "The About CCN content."         
        
        
    });
    
    app.aboutCCNService = {
        showAboutCCN: function () {
            //alert("showAboutCCN");
            //Call ws to get the strAboutCCN
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
            var strAboutCCN = "Call WS to show the strAboutCCN";
            
            app.aboutCCNService.viewModel.set("strAboutCCN", strAboutCCN);
		},

        viewModel: new AboutCCNViewModel()        
        
    };
    
})(window);
