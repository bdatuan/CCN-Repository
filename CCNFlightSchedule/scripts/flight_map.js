(function (global) {
    var FlightMapViewModel, app = global.app = global.app || {};
    
    app.application = new kendo.mobile.Application(document.body);
    
    var markers = [
            {
                "title": "Alibaug",
                "lat": "18.641400",
                "lng": "72.872200",
                "description": "Show the flight schedule information"
            }
        ,
            {
                "title": "Mumbai",
                "lat": "18.964700",
                "lng": "72.825800",
                "description": "Show the flight schedule information"
            }
        ,
            {
                "title": "Pune",
                "lat": "18.523600",
                "lng": "73.847800",
                "description": "Show the flight schedule information"
            }
		];
    
    FlightMapViewModel = kendo.data.ObservableObject.extend({
        
        
    });
    
    app.flightMapService = {
        showMap: function (e) {
            alert("showMap");
            var mapOptions = {
                center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
            var infoWindow = new google.maps.InfoWindow();
            var lat_lng = new Array();
            var latlngbounds = new google.maps.LatLngBounds();
            for (i = 0; i < markers.length; i++) {
                var data = markers[i]
                var myLatlng = new google.maps.LatLng(data.lat, data.lng);
                lat_lng.push(myLatlng);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: data.title
                });
                latlngbounds.extend(marker.position);
                (function (marker, data) {
                    google.maps.event.addListener(marker, "click", function (e) {
                        infoWindow.setContent(data.description);
                        infoWindow.open(map, marker);
                    });
                })(marker, data);
            }
            map.setCenter(latlngbounds.getCenter());
            map.fitBounds(latlngbounds);

            //***********ROUTING****************//

            //Intialize the Path Array
            var path = new google.maps.MVCArray();

            //Intialize the Direction Service
            var service = new google.maps.DirectionsService();

            //Set the Path Stroke Color
            var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });

            //Loop and Draw Path Route between the Points on MAP
            for (var i = 0; i < lat_lng.length; i++) {
                if ((i + 1) < lat_lng.length) {
                    var src = lat_lng[i];
                    var des = lat_lng[i + 1];
                    path.push(src);
                    poly.setPath(path);
                    service.route({
                        origin: src,
                        destination: des,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    }, function (result, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                                path.push(result.routes[0].overview_path[i]);
                            }
                        }
                    });
                }
            }
        	/*
        	//Use json ws
            $('#map_canvas').gmap().bind('init', function() { 
            	// This URL won't work on your localhost, so you need to change it
            	// see http://en.wikipedia.org/wiki/Same_origin_policy
            	$.getJSON( 'http://jquery-ui-map.googlecode.com/svn/trunk/demos/json/demo.json', function(data) {
                                                
            		$.each( data.markers, function(i, marker) {        
        				        
            			$('#map_canvas').gmap('addMarker', { 
            				'position': new google.maps.LatLng(marker.latitude, marker.longitude), 
            				'bounds': true 
            			}).click(function() {
            				$('#map_canvas').gmap('openInfoWindow', { 'content': "Show the flight schedule" }, this);
            			});
            		});
        
            	});
            });
            
            //initialize the google map: kendo ui mobile
            function showMap(e) {
                var myOptions = {
                    center: new google.maps.LatLng(-34.397, 150.644),
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var mapElement = $("#map_canvas");
                var container = e.view.content;

                var map = new google.maps.Map(mapElement[0], myOptions);
            }
            
        	*/
        },
        
        flightMapService: new FlightMapViewModel()        
        
    };
    
})(window);

//initialize the google map: kendo ui mobile
        
