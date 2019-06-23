// Create a map object
var myMap = L.map("map", {
  center: [37.69, -122.11],
  zoom: 11
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(throughput) {
  return throughput / 500;
}

// Each city object contains the city's name, location and population
var cities = [
  {name:"12th St. Oakland City Center (12TH)", location:[37.803768,-122.27145], throughput:319583},
{name:"16th St. Mission (16TH)", location:[37.765062,-122.419694], throughput:320810},
{name:"19th St. Oakland (19TH)", location:[37.80835,-122.268602], throughput:309121},
{name:"24th St. Mission (24TH)", location:[37.75247,-122.418143], throughput:314513},
{name:"Ashby (ASHB)", location:[37.852803,-122.270062], throughput:136850},
{name:"Balboa Park (BALB)", location:[37.721585,-122.447506], throughput:253893},
{name:"Bay Fair (BAYF)", location:[37.696924,-122.126514], throughput:139754},
{name:"Castro Valley (CAST)", location:[37.690746,-122.075602], throughput:70972},
{name:"Civic Center/UN Plaza (CIVC)", location:[37.779732,-122.414123], throughput:573048},
{name:"Coliseum/Oakland Airport (COLS)", location:[37.753661,-122.196869], throughput:183691},
{name:"Colma (COLM)", location:[37.684638,-122.466233], throughput:104857},
{name:"Concord (CONC)", location:[37.973737,-122.029095], throughput:142737},
{name:"Daly City (DALY)", location:[37.706121,-122.469081], throughput:206061},
{name:"Downtown Berkeley (DBRK)", location:[37.870104,-122.268133], throughput:323023},
{name:"El Cerrito del Norte (DELN)", location:[37.925086,-122.316794], throughput:204035},
{name:"Dublin/Pleasanton (DUBL)", location:[37.701687,-121.899179], throughput:191420},
{name:"Embarcadero (EMBR)", location:[37.792874,-122.39702], throughput:1034972},
{name:"Fremont (FRMT)", location:[37.557465,-121.976608], throughput:214424},
{name:"Fruitvale (FTVL)", location:[37.774836,-122.224175], throughput:204457},
{name:"Glen Park (GLEN)", location:[37.733064,-122.433817], throughput:179919},
{name:"Hayward (HAYW)", location:[37.669723,-122.087018], throughput:117309},
{name:"Lafayette (LAFY)", location:[37.893176,-122.12463], throughput:87294},
{name:"Lake Merritt (LAKE)", location:[37.797027,-122.26518], throughput:164116},
{name:"MacArthur (MCAR)", location:[37.829065,-122.26704], throughput:220037},
{name:"Millbrae (MLBR)", location:[37.600271,-122.386702], throughput:164191},
{name:"Montgomery St. (MONT)", location:[37.789405,-122.401066], throughput:994420},
{name:"North Berkeley (NBRK)", location:[37.873967,-122.28344], throughput:114514},
{name:"North Concord/Martinez (NCON)", location:[38.003193,-122.024653], throughput:61296},
{name:"Oakland Airport (OAKL)", location:[37.713238,-122.212191], throughput:40164},
{name:"Orinda (ORIN)", location:[37.878361,-122.183791], throughput:72160},
{name:"Pleasant Hill/Contra Costa Centre (PHIL)", location:[37.928468,-122.056012], throughput:170154},
{name:"Pittsburg/Bay Point (PITT)", location:[38.018914,-121.945154], throughput:147784},
{name:"El Cerrito Plaza (PLZA)", location:[37.902632,-122.298904], throughput:116694},
{name:"Powell St. (POWL)", location:[37.784471,-122.407974], throughput:770141},
{name:"Richmond (RICH)", location:[37.936853,-122.353099], throughput:103424},
{name:"Rockridge (ROCK)", location:[37.844702,-122.251371], throughput:141992},
{name:"San Leandro (SANL)", location:[37.721947,-122.160844], throughput:141478},
{name:"San Bruno (SBRN)", location:[37.637761,-122.416287], throughput:92044},
{name:"San Francisco Int'l Airport (SFIA)", location:[37.615966,-122.392409], throughput:191662},
{name:"South Hayward (SHAY)", location:[37.634375,-122.057189], throughput:71693},
{name:"South San Francisco (SSAN)", location:[37.664245,-122.44396], throughput:89380},
{name:"Union City (UCTY)", location:[37.59063,-122.017388], throughput:113231},
{name:"Walnut Creek (WCRK)", location:[37.905522,-122.067527], throughput:165405},
{name:"West Dublin/Pleasanton (WDUB)", location:[37.699756,-121.92824], throughput:84042},
{name:"West Oakland (WOAK)", location:[37.804872,-122.29514], throughput:179060},
];

// Loop through the cities array and create one marker for each city object
for (var i = 0; i < cities.length; i++) {
  L.circle(cities[i].location, {
    fillOpacity: 0.35,
    color: "black",
    fillColor: "purple",
    stroke: true,
    weight: 0.3,
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: markerSize(cities[i].throughput)
  }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Throughput: " + cities[i].throughput + "</h3>").addTo(myMap);
}
