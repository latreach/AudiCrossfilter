/*
 Comenzando el dashboard de Audi
 variables globales
 
  Creado por Fernando Dorantes Nieto <(°) 
                                       ( >)"
                                        /|
*/

var ES = d3.locale({
  dateTime: "%A, %e, de %B de %Y, %X", 
  date: "%Y-%m-%d",
  time: "%H:%M:%S",
  periods: ['AM', 'PM'],
  days: ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'],
  shortDays: ["dom", "lun", "mar", "mie", "jue", "vie", "sab"],
  months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto","septiembre", "octubre", "noviembre", "diciembre"],
  shortMonths: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago','sep','oct','nov', 'dic']
});
var dateFormatter = ES.timeFormat('%b %Y');
var fullDateFormatter = ES.timeFormat("%Y-%m-%d");
var dateFormatter = d3.time.format('%m/%d/%Y');
var numberFormatter = d3.format(".2s");

var multiDateFormatter = ES.timeFormat.multi([
            [".%L", function(d) { return d.getMilliseconds(); }],
            [":%S", function(d) { return d.getSeconds(); }],
            ["%I:%M", function(d) { return d.getMinutes(); }],
            ["%I %p", function(d) { return d.getHours(); }],
            ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
            ["%b %d", function(d) { return d.getDate() != 1; }],
            ["%b", function(d) { return d.getMonth(); }],
            ["%Y", function() { return true; }]
        ]);

var mesFormato  = d3.time.format("%B");
var mesFormatoN = d3.time.format("%m");
var anioFormato = d3.time.format("%Y");
var diaFormato  = d3.time.format("%A");
var diaFormatoN = d3.time.format("%d")

//crossfiler

d3.csv("../data/datos.csv", function(error, data){
  data.forEach(function(d){
    d.Pais = d.Pais;
    d.Region = d.Region;
    
  })
  
})



