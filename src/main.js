docReady(function() {
  var check1 = document.getElementById("tab-1");
  var check2 = document.getElementById("tab-2");
  check1.addEventListener("click", function hello(){
    document.getElementById('map-container').innerHTML = '';
    load_gmap();
  });
  check2.addEventListener("click", function hola(){
    document.getElementById('map-container').innerHTML = '';
    load_openlayer();
  });
});

function load_gmap() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(10.066051, -69.363191),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map-container"),
  mapOptions);
  var ctaLayer = new google.maps.KmlLayer('https://dl.dropboxusercontent.com/u/5832520/DCyt.kml');
  ctaLayer.setMap(map);
}

function load_openlayer() {
  map = new OpenLayers.Map('map-container');
  layer = new OpenLayers.Layer.OSM("OSM Map del DCyT");
  var myStyles2 = new OpenLayers.StyleMap({ 'default': {
    strokeColor: "#00FF00",
    strokeOpacity: 1,
    strokeWidth: 1,
    fillColor: "#005500",
    fillOpacity: 0.5,
    pointRadius: 10,
    pointerEvents: "visiblePainted",
    // label with \n linebreaks
    label: "",
    cursor: "pointer",
    fontColor: "#000000",
    fontSize: "12px",
    fontFamily: "Courier New, monospace",
    fontWeight: "bold",
    labelAlign: "${align}",
    labelXOffset: "${xOffset}",
    labelYOffset: +18,
    labelOutlineColor: "white",
    labelOutlineWidth: 3
    }
  });
  kmllayer = new OpenLayers.Layer.Vector("KML", {
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.HTTP({
      url: "assets/DCyt.kml",
      format: new OpenLayers.Format.KML({
      extractAttributes: true,
      maxDepth: 2
      })
    }),
    styleMap: myStyles2
  });
  map.addLayer(layer);
  map.addLayer(kmllayer);
  map.setCenter(
    new OpenLayers.LonLat(-69.363191, 10.066051).transform(
      new OpenLayers.Projection("EPSG:4326"),
      map.getProjectionObject()
    ), 16
  );
  //Add a selector control to the kmllayer with popup functions
  var controls = {
    selector: new OpenLayers.Control.SelectFeature(kmllayer, { onSelect: createPopup, onUnselect: destroyPopup })
  };
  function createPopup(feature) {
    feature.popup = new OpenLayers.Popup.FramedCloud("pop",
      feature.geometry.getBounds().getCenterLonLat(),
      null,
      '<div class="markerContent">'+feature.attributes.description+'</div>',
      null,
      true,
      function() { controls.selector.unselectAll(); }
    );
    //feature.popup.closeOnMove = true;
    map.addPopup(feature.popup);
  }
  function destroyPopup(feature) {
    feature.popup.destroy();
    feature.popup = null;
  }
  map.addControl(controls.selector);
  controls.selector.activate();
}
