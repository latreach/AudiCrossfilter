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
//Variables de las gráficas
var emailEnviado    = dc.barChart("#enviados"),
    emailRecipients = dc.barChart("#totalRecipients"),
    emailFallos     = dc.barChart("#bounce"),
    emailExito      = dc.barChart("#successful"),
    emailUnique     = dc.barChart("#unique"),
    emailClicks     = dc.barChart("#uniqueClicks"),
    emailConsidera  = dc.rowChart("#consideracion"),
    emailSatisfecho = dc.rowChart("#satisfaccion"),
    emailTiempo     = dc.lineChart("#tiempoEmail"),
    emailRegion     = dc.selectMenu("#region"),
    emailPais       = dc.selectMenu("#pais"),
    emailAnio       = dc.selectMenu("#anio"),
    emailMes        = dc.selectMenu("#mes");

//crossfiler

d3.csv("./data/datos.csv", function(error, data){
  data.forEach(function(d){
    d.Pais = d.Pais;
    d.Region = d.Region;
    d.fecha= new Date(d.fecha);
    d.Fecha = Math.round(new Date(d.fecha).getTime()/1000);
    d.idEmail = d.idEmail;
    d.TotalRecipients= +d.TotalRecipients;
    d.bounce = +d.bounce;
    d.SuccessfulRecipients = +d.SuccessfulRecipients;
    d.uniqueOpens = +d.uniqueOpens;
    d.OpenRate = +d.OpenRate;
    d.uniqueClicks = +d.uniqueClicks;
    d.consideracion = String(d.consideracion);
    d.satisfaccion = +d.satisfaccion;
    d.mesNombre= d.mesNombre;
    d.mes     = +d.mes;
    d.nombreDia = d.nombreDia;
  });
  audi = data;
  var xfilter = crossfilter(audi);
  all = xfilter.groupAll();
  var emails  = _.countBy(audi, function(d){return d.idEmail});
  console.log(emails);
  $("#total").html(audi.length);

  dc.numberDisplay("#filtrados")
    .group(all)
    .valueAccessor(function(d){return d;})
    .formatNumber(function(d){return d;})
//graficas

  var mes = xfilter.dimension(function(d){
    return d.mes;})
  var enviadoGroup = mes.group().reduceCount(function(d){
    return d.idEmail;
  })
  emailEnviado
    .height(200)
    .width(500)
    .dimension(mes)
    .group(enviadoGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .brushOn(false)
    .elasticX(true)
    .xAxis();
  
  var recipientsGroup= mes.group().reduceSum(function(d){
    return d.TotalRecipients;})

  emailRecipients
    .height(200)
    .width(500)
    .dimension(mes)
    .group(recipientsGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .brushOn(false)
    .elasticX(true)
    .yAxis().tickFormat(function(v){return numberFormatter(v)});
    //.xAxis();

  var fallosGroup = mes.group().reduceSum(function(d){
    return d.bounce;})

  emailFallos
    .height(200)
    .width(500)
    .dimension(mes)
    .group(fallosGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .brushOn(false)
    .elasticX(true)
    .xAxis();
  
  var exitoGroup = mes.group().reduceSum(function(d){
    return d.SuccessfulRecipients;
  })

  emailExito
    .height(200)
    .width(500)
    .dimension(mes)
    .group(exitoGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .brushOn(false)
    .elasticX(true)
    .yAxis().tickFormat(function(v){return  numberFormatter(v)});
  
  var uniqueGroup = mes.group().reduceSum(function(d){
    return d.uniqueOpens;
  })
  
  emailUnique
    .height(200)
    .width(500)
    .dimension(mes)
    .group(uniqueGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .brushOn(false)
    .elasticX(true)
    .yAxis().tickFormat(function(v){return numberFormatter(v)});
  
  var clicksGroup = mes.group().reduceSum(function(d){
    return d.uniqueClicks;
  })
  
  emailClicks
    .height(200)
    .width(500)
    .dimension(mes)
    .group(clicksGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .brushOn(false)
    .elasticX(true)
    .yAxis().tickFormat(function(v){return numberFormatter(v)});

  var consideraDim = xfilter.dimension(function(d){
    return d.consideracion;
  })

  var consideraGroup = consideraDim.group()
    .reduceCount(function(d){return d.consideracion;})

  emailConsidera
    .height(300)
    .width(500)
    .dimension(consideraDim)
    .colors(d3.scale.ordinal()
      .range(["#003c65", "#64b5f6", "#18a151",
          "#ff9e10","#dc4a3d", "#3569d6", "#003366","#b87e7e", "#003366","black"]))
    .group(consideraGroup)
    //.valueAccessor(function(p){return p.value.count})
    .elasticX(true)
    .xAxis().tickFormat(function(v){return numberFormatter(v)})

  var satisfechoDim = xfilter.dimension(function(d){
    return d.satisfaccion;
  })

  var satisfechoGroup = satisfechoDim.group()
    .reduceCount(function(d){return d.satisfaccion;})
  
  emailSatisfecho
    .height(300)
    .width(500)
    .dimension(satisfechoDim)
    .colors(d3.scale.ordinal()
      .range(["#003c65", "#64b5f6", "#18a151",
          "#ff9e10","#dc4a3d", "#3569d6", "#003366","#b87e7e", "#003366","black"]))
    .group(satisfechoGroup)
    //.valueAccessor(function(p){return p.value.count})
    .elasticX(true)
    .xAxis().tickFormat(function(v){return numberFormatter(v)})
    
 
//grafica de tiempo

  var FechaDate = xfilter.dimension(function(d){
    return d.fecha;
  })

  var dateMin = FechaDate.bottom(1).map(function(d){
    return d.fecha
  });
  var dateMin = new Date(dateMin);

  var dateMax = FechaDate.top(1).map(function(d){
    return d.fecha;
  })
  var dateMax = new Date(dateMax);
  console.log(dateMax)
  var dia = xfilter.dimension(function(d){
    return d3.time.day(new Date(d.fecha));
  })
  console.log(dia.top(1))
  var emailDiaGroup = dia.group().reduceSum(function(d){
    return d.TotalRecipients;
  }) 

  ejeX= d3.svg.axis().scale("x").orient("bottom")
    .tickFormat(multiDateFormatter)

  ejeY = d3.svg.axis().scale("y").orient("left")
    .tickFormat(function(v){return numberFormatter(v)})

  emailTiempo
    .height(200)
    .width(1000)
    .dimension(dia)
    .group(emailDiaGroup)
    .colors(["black"])
    //.x(d3.time.scale().domain([new Date(2015,0,1),new Date(2016,12,31)]))
    .x(d3.time.scale().domain([new Date(dateMin), new Date(dateMax)]))
    //.x(d3.time.scale().domain[dateMin, dateMax])
    .round(d3.time.month.round)
    .xUnits(d3.time.months)
    .elasticY(true)
    .elasticX(true)
    .xAxis(ejeX)
    .yAxis(ejeY);


  var regionDim = xfilter.dimension(function(d){
    return d.Region;
  })
  var regionGroup = regionDim.group()
    .reduceCount(function(d){return d.Region})

  emailRegion
    .dimension(regionDim)
    .group(regionGroup)
    .promptText("Todas las regiones")
  
  var paisDim = xfilter.dimension(function(d){
    return d.Pais;
  }) 
  
  var paisGroup= paisDim.group()
    .reduceCount(function(d){return d.Pais})
  
  emailPais
    .dimension(paisDim)
    .group(paisGroup)
    .promptText("Todos los paises")
  
  var anioDim = xfilter.dimension(function(d){
    return d.anio;
  })

  var anioGroup = anioDim.group()
    .reduceCount(function(d){return d.anio})
  
  emailAnio
    .dimension(anioDim)
    .group(anioGroup)
    .promptText("Todos")

  var mesNDim = xfilter.dimension(function(d){
    return d.mesNombre;
  })
  
  var mesNGroup= mesNDim.group()
    .reduceCount(function(d){return d.mesNombre})

  emailMes
    .dimension(mesNDim)
    .group(mesNGroup)
    .promptText("Todos")



dc.renderAll();



  

  
})



