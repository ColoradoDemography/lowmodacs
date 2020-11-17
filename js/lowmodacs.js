


var map;
var legend = null;


var featureLayer;
var featureLayerbg;
var featureLayercounty;
var featureLayerplace;
var lowmodtr;
var lowmodbg;
var lowmodcounty;
var lowmodplace;

var legendLayers = [];

var structureLayer;
var floodplainLayer;
var businessLayer;
var damagepoints;
var damagelines;

var gl;
var p;
var s;
var g;



require(["esri/map", "esri/graphic", "esri/symbols/SimpleMarkerSymbol", "esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/InfoTemplate", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "esri/arcgis/utils", "esri/layers/FeatureLayer", "dijit/Menu", "esri/dijit/Geocoder", "esri/dijit/Legend", "esri/layers/WebTiledLayer", "esri/renderers/UniqueValueRenderer"], function( Map, Graphic, SimpleMarkerSymbol, GraphicsLayer, Point, InfoTemplate, BorderContainer, ContentPane, utils, FeatureLayer, Menu, ESRIGeocoder, Legend, WebTiledLayer, UniqueValueRenderer ){

document.getElementById("focusbutton").focus();

function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="text"))  { return false;} 
} 

document.onkeypress = stopRKey; 

gl = new GraphicsLayer();


	$("#speed").uniform();
	$("#speed2").uniform();	


function init() {

	$("#legendDiv").draggable({
		containment : "#mapDiv"
	});
	$("#advancedbox").draggable({
		containment : "#mapDiv"
	});
	
		
	map = new Map("mapDiv", {
		center : [-104.96, 39.72],
		zoom : 11
	});

	dojo.connect(map, "onLoad", initOperationalLayer);

	dojo.byId("title").innerHTML = "Low-Mod Webmap";
	dojo.byId("subtitle").innerHTML = "Data:&nbsp;&nbsp;HUD (ACS 2011-2015)";

	addbasemap("TerrainMap");
}


function commafy(nStr) {
	var x, x1, x2, rgx;

	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}


function getTextContent(graphic) {

	var graphicAttributes = graphic.attributes;
	
	
	var tcontent;

	var newradio2 = $('#speed2').val();

	if (newradio2 === '1') { tcontent = graphicAttributes.NAMELSAD10+", "+graphicAttributes.tractname+'<br />'+graphicAttributes.countyname+'<table><tr><td></td><td></td></tr><tr><td>Low & Moderate Income:&nbsp;&nbsp;</td><td>'+commafy(graphicAttributes.lowmod)+'</td></tr><tr><td>Population Sample:</td><td>'+commafy(graphicAttributes.lowmoduniv)+'</td></tr><tr><td>Percent:</td><td><b>'+((graphicAttributes.lowmod_pct)*100).toFixed(0)+'%</b></td></tr></table>'; }
	if (newradio2 === '2') { tcontent = graphicAttributes.NAMELSAD10+'<br />'+getCounty(graphicAttributes.county)+'<table><tr><td></td><td></td></tr><tr><td>Low & Moderate Income:&nbsp;&nbsp;</td><td>'+commafy(graphicAttributes.lowmod)+'</td></tr><tr><td>Population Sample:</td><td>'+commafy(graphicAttributes.lowmoduniv)+'</td></tr><tr><td>Percent:</td><td><b>'+((graphicAttributes.lowmod_pct)*100).toFixed(0)+'%</b></td></tr></table>'; }	
	if (newradio2 === '3') { tcontent = graphicAttributes.NAMELSAD10+'<br /><table><tr><td></td><td></td></tr><tr><td>Low & Moderate Income:&nbsp;&nbsp;</td><td>'+commafy(graphicAttributes.lowmod)+'</td></tr><tr><td>Population Sample:</td><td>'+commafy(graphicAttributes.lowmoduniv)+'</td></tr><tr><td>Percent:</td><td><b>'+((graphicAttributes.lowmod_pct)*100).toFixed(0)+'%</b></td></tr></table>'; }
	if (newradio2 === '4') { tcontent = graphicAttributes.NAMELSAD10+'<br /><table><tr><td></td><td></td></tr><tr><td>Low & Moderate Income:&nbsp;&nbsp;</td><td>'+commafy(graphicAttributes.lowmod)+'</td></tr><tr><td>Population Sample:</td><td>'+commafy(graphicAttributes.lowmoduniv)+'</td></tr><tr><td>Percent:</td><td><b>'+((graphicAttributes.lowmod_pct)*100).toFixed(0)+'%</b></td></tr></table>'; } 

	return tcontent;
}


function getCounty(fips){

var tcontent="";

if(fips=="001"){tcontent='Adams County';}
if(fips=="003"){tcontent='Alamosa County';}
if(fips=="005"){tcontent='Arapahoe County';}
if(fips=="007"){tcontent='Archuleta County';}
if(fips=="009"){tcontent='Baca County';}
if(fips=="011"){tcontent='Bent County';}
if(fips=="013"){tcontent='Boulder County';}
if(fips=="014"){tcontent='Broomfield County';}
if(fips=="015"){tcontent='Chaffee County';}
if(fips=="017"){tcontent='Cheyenne County';}
if(fips=="019"){tcontent='Clear Creek County';}
if(fips=="021"){tcontent='Conejos County';}
if(fips=="023"){tcontent='Costilla County';}
if(fips=="025"){tcontent='Crowley County';}
if(fips=="027"){tcontent='Custer County';}
if(fips=="029"){tcontent='Delta County';}
if(fips=="031"){tcontent='Denver County';}
if(fips=="033"){tcontent='Dolores County';}
if(fips=="035"){tcontent='Douglas County';}
if(fips=="037"){tcontent='Eagle County';}
if(fips=="039"){tcontent='Elbert County';}
if(fips=="041"){tcontent='El Paso County';}
if(fips=="043"){tcontent='Fremont County';}
if(fips=="045"){tcontent='Garfield County';}
if(fips=="047"){tcontent='Gilpin County';}
if(fips=="049"){tcontent='Grand County';}
if(fips=="051"){tcontent='Gunnison County';}
if(fips=="053"){tcontent='Hinsdale County';}
if(fips=="055"){tcontent='Huerfano County';}
if(fips=="057"){tcontent='Jackson County';}
if(fips=="059"){tcontent='Jefferson County';}
if(fips=="061"){tcontent='Kiowa County';}
if(fips=="063"){tcontent='Kit Carson County';}
if(fips=="065"){tcontent='Lake County';}
if(fips=="067"){tcontent='La Plata County';}
if(fips=="069"){tcontent='Larimer County';}
if(fips=="071"){tcontent='Las Animas County';}
if(fips=="073"){tcontent='Lincoln County';}
if(fips=="075"){tcontent='Logan County';}
if(fips=="077"){tcontent='Mesa County';}
if(fips=="079"){tcontent='Mineral County';}
if(fips=="081"){tcontent='Moffat County';}
if(fips=="083"){tcontent='Montezuma County';}
if(fips=="085"){tcontent='Montrose County';}
if(fips=="087"){tcontent='Morgan County';}
if(fips=="089"){tcontent='Otero County';}
if(fips=="091"){tcontent='Ouray County';}
if(fips=="093"){tcontent='Park County';}
if(fips=="095"){tcontent='Phillips County';}
if(fips=="097"){tcontent='Pitkin County';}
if(fips=="099"){tcontent='Prowers County';}
if(fips=="101"){tcontent='Pueblo County';}
if(fips=="103"){tcontent='Rio Blanco County';}
if(fips=="105"){tcontent='Rio Grande County';}
if(fips=="107"){tcontent='Routt County';}
if(fips=="109"){tcontent='Saguache County';}
if(fips=="111"){tcontent='San Juan County';}
if(fips=="113"){tcontent='San Miguel County';}
if(fips=="115"){tcontent='Sedgwick County';}
if(fips=="117"){tcontent='Summit County';}
if(fips=="119"){tcontent='Teller County';}
if(fips=="121"){tcontent='Washington County';}
if(fips=="123"){tcontent='Weld County';}
if(fips=="125"){tcontent='Yuma County';}

return tcontent;
}

function getTextTitle(graphic) {

	var tcontent;

	var newradio2 = $('#speed2').val();

	if (newradio2 === '1') { tcontent = 'Block Group'; }
	if (newradio2 === '2') { tcontent = 'Tract'; }	
	if (newradio2 === '3') { tcontent = 'County'; }
	if (newradio2 === '4') { tcontent = 'Place'; } 

	return tcontent;
}


function initOperationalLayer(map) {

	var Geocoder = new ESRIGeocoder({
		autoComplete : true,
		arcgisGeocoder : {
			placeholder : "Find a place",
			sourceCountry : 'USA'
		},
		map : map
	}, dojo.byId("search"));

	// start widget
	Geocoder.startup();

	var infoTemplate = new InfoTemplate(getTextTitle, getTextContent);

	esri.config.defaults.map.logoLink = "https://dola.colorado.gov/";
	document.getElementsByClassName('logo-med')[0].style.backgroundImage = "url(\"https://dola.colorado.gov/gis-php/files/gis-images/CO_LOGO.png\")";
	document.getElementsByClassName('logo-med')[0].style.backgroundRepeat = "no-repeat";

	
	
	lowmodtr = new FeatureLayer("https://services.arcgis.com/IamIM3RJ5xHykalK/arcgis/rest/services/lm_tr2/FeatureServer/0", {
		mode : esri.layers.FeatureLayer.MODE_ONDEMAND,
		outFields : ["*"],
		infoTemplate : infoTemplate
	});
	
	lowmodbg = new FeatureLayer("https://services.arcgis.com/IamIM3RJ5xHykalK/arcgis/rest/services/lm_bg3/FeatureServer/0", {
		mode : esri.layers.FeatureLayer.MODE_ONDEMAND,
		outFields : ["*"],
		infoTemplate : infoTemplate
	});
	
	lowmodcounty = new FeatureLayer("https://services.arcgis.com/IamIM3RJ5xHykalK/arcgis/rest/services/lm_cnty/FeatureServer/0", {
		mode : esri.layers.FeatureLayer.MODE_ONDEMAND,
		outFields : ["*"],
		infoTemplate : infoTemplate
	});
	
	lowmodplace = new FeatureLayer("https://services.arcgis.com/IamIM3RJ5xHykalK/arcgis/rest/services/lm_pl/FeatureServer/0", {
		mode : esri.layers.FeatureLayer.MODE_ONDEMAND,
		outFields : ["*"],
		infoTemplate : infoTemplate
	});	

	
	
	

	var countyLayer = new FeatureLayer("https://services.arcgis.com/IamIM3RJ5xHykalK/arcgis/rest/services/County_C2010v3/FeatureServer/0", {
		mode : esri.layers.FeatureLayer.MODE_ONDEMAND
	});

	var defaultSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 0]), 2), new dojo.Color([0, 0, 0, 1]));

	var renderer2 = new esri.renderer.SimpleRenderer(defaultSymbol);

	countyLayer.setRenderer(renderer2);

	map.addLayers([lowmodtr, lowmodbg, lowmodcounty, lowmodplace]);
	
	map.infoWindow.resize(240, 135);

	var renderer = new esri.renderer.ClassBreaksRenderer(false, function (graphic) {
				return ((graphic.attributes.lowmod / graphic.attributes.lowmoduniv) * 100);
			});
		renderer.addBreak({
			minValue : 0,
			maxValue : 50.999999,
			symbol : new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([250,233,212, 0.6])).setOutline(new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([100,100,100]), 1)),
			label : "Non LMI"
		});
		renderer.addBreak({
			minValue : 51,
			maxValue : 100,
			symbol : new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([220,0,0, 0.6])).setOutline(new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([100,100,100]), 1)),
			label : "LMI"
		});

	lowmodtr.setVisibility(true);
	lowmodbg.setVisibility(false);
	lowmodcounty.setVisibility(false);
	lowmodplace.setVisibility(false);

	
	lowmodtr.setRenderer(renderer);

	document.getElementById('y1').checked = true;

	dojo.forEach(map.graphicsLayerIds, function(id) {
		var layer = map.getLayer(id);
		legendLayers.push({
			layer : layer,
			title : "TITLE"
		});
	});

	legend = new esri.dijit.Legend({
		map : map,
		layerInfos : legendLayers
	}, "legendDiv");
	legend.startup();

	map.addLayers([countyLayer]);
	
	map.addLayer(gl);
	
	
	var highlightSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0,255,255]), 3), new dojo.Color([125,125,125,0.35]));
				
	map.graphics.enableMouseEvents();
	//Listen for when the onMouseOver event fires on the featureLayer
	//When fired, create new graphic with the geometry from the event.graphic and 
	//add it to the map's graphics layer

	
	dojo.connect(lowmodtr, "onMouseOver", function(evt) {
		map.graphics.clear();
		var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
		map.graphics.add(highlightGraphic);
	});
	
	dojo.connect(lowmodbg, "onMouseOver", function(evt) {
		map.graphics.clear();
		var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
		map.graphics.add(highlightGraphic);
	});
	
	dojo.connect(lowmodcounty, "onMouseOver", function(evt) {
		map.graphics.clear();
		var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
		map.graphics.add(highlightGraphic);
	});
	
	dojo.connect(lowmodplace, "onMouseOver", function(evt) {
		map.graphics.clear();
		var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
		map.graphics.add(highlightGraphic);
	});
 
	//Listen for when the map.graphics onMouseOut event is fired and then clear the 
	//highlight graphic
	dojo.connect(map.graphics, "onMouseOut", function(evt) {
		map.graphics.clear();
	});

}

function addbasemap(bmName) {
	var basemap;

	if (bmName == "MapBoxTerrain") {
		basemap = new WebTiledLayer("https://${subDomain}.tiles.mapbox.com/v3/statecodemog.map-392qgzze/${level}/${col}/${row}.png", {
			"copyright" : "<a href='https://www.mapbox.com/about/maps/'>© Map Box and OpenStreetMap</a>",
			"id" : "MapBoxTerrain",
			"subDomains" : ["a", "b", "c", "d"]
		});
	}

	if (bmName == "TerrainMap") {
		basemap = new esri.layers.ArcGISTiledMapServiceLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
	}

	if (bmName == "MapBoxStreets") {
		basemap = new WebTiledLayer("https://${subDomain}.tiles.mapbox.com/v3/statecodemog.map-i4mhpeb3/${level}/${col}/${row}.png", {
			"copyright" : "<a href='https://www.mapbox.com/about/maps/'>© Map Box and OpenStreetMap</a>",
			"id" : "MapBoxStreets",
			"subDomains" : ["a", "b", "c", "d"]
		});
	}

	if (bmName == "StamenTerrain") {
		basemap = new WebTiledLayer("https://${subDomain}.tile.stamen.com/terrain/${level}/${col}/${row}.png", {
			"copyright" : "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA",
			"id" : "StamenTerrain",
			"subDomains" : ["a", "b", "c", "d"]
		});
	}

	if (bmName == "Satellite") {
		basemap = new esri.layers.ArcGISTiledMapServiceLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
	}

	map.addLayer(basemap);
}

function makeid() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function Clickhereformap(mainid) {

	var extitle;
	
	var geogname;
	if ($('#speed2').val() == '1') {
		geogname = 'Block Group';
	}
	if ($('#speed2').val() == '2') {
		geogname = 'Census Tract';
	}
	if ($('#speed2').val() == '3') {
		geogname = 'County';
	}
	if ($('#speed2').val() == '4') {
		geogname = 'Place';
	}	

	if ($('#speed').val() == '1') {
		extitle = 'Median Household Income by ' + geogname;
	}
	if ($('#speed').val() == '2') {
		extitle = 'Median Family Income by ' + geogname;
	}
	if ($('#speed').val() == '3') {
		extitle = 'Population 65+ by ' + geogname;
	}
	if ($('#speed').val() == '4') {
		extitle = 'Population Density by ' + geogname;
	}
	if ($('#speed').val() == '5') {
		extitle = 'Rental Rate by ' + geogname;
	}
	if ($('#speed').val() == '6') {
		extitle = 'Disability Rate by ' + geogname;
	}
	if ($('#speed').val() == '7') {
		extitle = 'Mobile Housing Units by ' + geogname;
	}
	if ($('#speed').val() == '8') {
		extitle = 'Low and Moderate Income by ' + geogname;
	}
	if ($('#speed').val() == '9') {
		extitle = 'Minority Population by ' + geogname;
	}	
	//new ({ wkid: 4326});
	//old ({ wkid: 102100});
	var oldx = (map.extent.xmin + map.extent.xmax) / 2;
	var oldy = (map.extent.ymin + map.extent.ymax) / 2;

	//function convert spatial ref 102100 to spatial ref 4326
	var x = oldx;
	var y = oldy;
	var num3 = x / 6378137.0;
	var num4 = num3 * 57.295779513082323;
	var num5 = Math.floor(((num4 + 180.0) / 360.0));
	var num6 = num4 - (num5 * 360.0);
	var num7 = 1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * y) / 6378137.0)));
	var newx = num6;
	var newy = num7 * 57.295779513082323;

	var newobj = new Object();
	newobj.zoom = map.getZoom();
	newobj.filename = "https://dola.colorado.gov/gis-php/phantomHsngDept.html";
	newobj.lat = newy;
	newobj.lng = newx;
	newobj.title = encodeURIComponent(extitle);
	newobj.subtitle = encodeURIComponent(dojo.byId("subtitle").innerHTML);
	newobj.stat = $('#speed').val();
	newobj.geog = $('#speed2').val();
	newobj.outname = makeid();
	
	var ds1=0;
	var fl1=0;
	var bs1=0;
	var dp1=0;
	var dl1=0;
	
	if($("#chk1").is(':checked')){ds1=1;}
	if($("#chk2").is(':checked')){fl1=1;}	
	if($("#chk3").is(':checked')){bs1=1;}	
	if($("#chk4").is(':checked')){dp1=1;}	
	if($("#chk5").is(':checked')){dl1=1;}	
	
	newobj.ds=ds1;
	newobj.fl=fl1;
	newobj.bs=bs1;	
	newobj.dp=dp1;
	newobj.dl=dl1;		
	
	//output file name  ... makeid() is function creates random 5 letter filename

	$('#printspan').html('Processing...');

	$.get("https://dola.colorado.gov/gis-php/dohsngdept.php", newobj, function() {
		$('#printspan').html('DOWNLOAD');
		$('#uniform-printbtns').attr("onClick", "opmapwin('" + newobj.outname + "')");
	});

}

function opmapwin(outname) {
	window.open("https://dola.colorado.gov/tmp/" + outname + ".png");
	$('#printspan').html("Print Map");
	$('#uniform-printbtns').attr("onClick", "javascript:Clickhereformap('uniform-printbtns')");
}

function closeadvancedbox() {
	$('#advancedbox').toggle();
}

dojo.ready(init); 

})


function handleClick() {

	map.infoWindow.hide();

	var newradio2 = $('#speed2').val();

	var renderer;
	

	map.infoWindow.resize(240, 135);

	
	if(newradio2 == '1'){ 
		lowmodbg.setVisibility(true); 	
		lowmodtr.setVisibility(false); 
		lowmodcounty.setVisibility(false); 
		lowmodplace.setVisibility(false); 
	}
	if(newradio2 == '2'){
		lowmodbg.setVisibility(false); 	
		lowmodtr.setVisibility(true); 
		lowmodcounty.setVisibility(false); 
		lowmodplace.setVisibility(false); 
	}
	if(newradio2 == '3'){
		lowmodbg.setVisibility(false); 	
		lowmodtr.setVisibility(false); 
		lowmodcounty.setVisibility(true); 
		lowmodplace.setVisibility(false); 
	}
	if(newradio2 == '4'){
		lowmodbg.setVisibility(false); 	
		lowmodtr.setVisibility(false); 
		lowmodcounty.setVisibility(false); 
		lowmodplace.setVisibility(true); 
	}	
	
			renderer = new esri.renderer.ClassBreaksRenderer(false, function (graphic) {
				return ((graphic.attributes.lowmod / graphic.attributes.lowmoduniv) * 100);
			});
		renderer.addBreak({
			minValue : 0,
			maxValue : 50.999999,
			symbol : new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([250,233,212, 0.6])).setOutline(new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([100,100,100]), 1)),
			label : "Non LMI"
		});
		renderer.addBreak({
			minValue : 51,
			maxValue : 100,
			symbol : new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([220,0,0, 0.6])).setOutline(new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([100,100,100]), 1)),
			label : "LMI"
		});
	
	if(newradio2 == '1'){ 
		lowmodbg.setRenderer(renderer);
		lowmodbg.redraw();
		}
	
	if(newradio2 == '2'){ 
		lowmodtr.setRenderer(renderer);
		lowmodtr.redraw();
		}		
	
	if(newradio2 == '3'){ 
		lowmodcounty.setRenderer(renderer);
		lowmodcounty.redraw();
		}	
	
	if(newradio2 == '4'){ 
		lowmodplace.setRenderer(renderer);
		lowmodplace.redraw();
		}	
	
	
		legend.refresh();
		
}


	function validate(element){
	
	var newVal=[];
	newVal = $(element).val().split(",");

		if(newVal[0]!="" && newVal[0]!="-"){	
		var valbool = $.isNumeric(newVal[0]);
		if(valbool){
		//nothing
		}else{
		$(element).val('');
		}
		}


		if(newVal[1]!="" && newVal[1]!=" " && newVal[1]!="-" && newVal[1]!=" -" && newVal[1] != null){
		valbool = $.isNumeric(newVal[1]);
		if(valbool){
		//nothing
		}else{
		$(element).val('');
		}
		
		}

		
	}


function addMarker(latlngtext){
gl.clear();

var coord=[];
coord=latlngtext.split(",");

var point=new esri.geometry.Point({
latitude: coord[0],
longitude: coord[1]
});

map.centerAndZoom(point,15);

s = new esri.symbol.SimpleMarkerSymbol().setSize(20);
s.setColor(new dojo.Color("#00FFFF"));
g = new esri.Graphic(point, s);
var GInfoTemplate = new esri.InfoTemplate();
g.setInfoTemplate(GInfoTemplate);
GInfoTemplate.setTitle("Latitude, Longitude");
GInfoTemplate.setContent("Latitude:&nbsp;&nbsp;"+coord[0]+"<br />"+"Longitude:&nbsp;&nbsp;"+coord[1]);
gl.add(g)


}