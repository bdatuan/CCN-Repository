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
                    var strAboutCCN = responseJSON.AboutCCN;
            		alert("strAboutCCN=" + strAboutCCN);
            		app.aboutAppService.viewModel.set("strAboutCCN", strAboutCCN);
                }
              });
            */
		},

        viewModel: new AboutCCNViewModel()        
        
    };
    
})(window);
