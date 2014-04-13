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
            var url = "";
            $.ajax({
                type: "GET",
                url: url,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {
                    alert("success");
            		var responseJSON = $.parseJSON(response);
                    var strAboutApp = responseJSON.AboutAPP;
            		alert("strAboutApp=" + strAboutApp);
            		app.aboutAppService.viewModel.set("strAboutApp", strAboutApp);
                }
              });
            */
		},
        
        viewModel: new AboutAppViewModel()        
        
    };
    
})(window);
