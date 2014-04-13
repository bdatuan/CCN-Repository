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
                    alert(response);
            		var strTermCondition = "Call WS to show the strTermCondition";            
            		app.termConditionService.viewModel.set("strTermCondition", strTermCondition);
                }
              });
            */
            
		},

        viewModel: new TermConditionViewModel()        
        
    };
    
})(window);
