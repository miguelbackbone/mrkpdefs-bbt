// Footer map
google.maps.event.addDomListener(window, 'load', initMainMap);

function initMainMap() {
	if($('#gmap').length){
		var markerList = [];
		var bounds = new google.maps.LatLngBounds();
		$('.mapMarker').each(function(){
			var ilat = Number($(this).data('lat'));
			var ilng = Number($(this).data('lng'));
			var myLatLng = new google.maps.LatLng(ilat, ilng);
			var pinIcono = $(this).data('pin') || 'media/pin-def.png';
			var contenido = $(this).html() || false;
			var disItem = {
				latitude: ilat, 
				longitude: ilng, 
				content:  contenido,
				thePin: new google.maps.MarkerImage(pinIcono, null, null, null, new google.maps.Size(24,32)),
				role: 'main'
			};
			markerList.push(disItem);
			bounds.extend(myLatLng);
		});

		var maincoors = [markerList[0].latitude, markerList[0].longitude] || [4.625900, -74.113160];

		var mapOptions = {
			zoom: 14,
			zoomControl: true,
			scrollwheel: false,
			streetViewControl: false,
			mapTypeControl: false,
			scaleControl: false,
			draggable:true,
			center: new google.maps.LatLng(maincoors[0], maincoors[1]),
			styles: [{"stylers":[{"visibility":"simplified"},{"saturation":20},{"weight":3.2},{"lightness":25}]}]
		};
		var mapElement = document.getElementById('gmap'), map = new google.maps.Map(mapElement, mapOptions);

		var def_point = [], infowindow_content = [], infowindow = new InfoBox({ alignBottom: true, infoBoxClearance: new google.maps.Size(10,10), pixelOffset: new google.maps.Size(-100, -50) });

		$.each(markerList, function (i){
			def_point[i] = new google.maps.Marker({ position: new google.maps.LatLng(markerList[i].latitude, markerList[i].longitude), map: map, icon: markerList[i].thePin });
			if(this.content !== false){
				infowindow_content[i] = markerList[i].content;
				infowindow.setContent(infowindow_content[i]);
				infowindow.open(map, def_point[i]);
				def_point[i].addListener('click', function() { infowindow.setContent(infowindow_content[i]); infowindow.open(map, this); });
			}
		});
		if(markerList.length > 1){ map.fitBounds(bounds); }
	}
}