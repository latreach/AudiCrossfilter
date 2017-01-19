###
#Datos ficticios para el crossfilter de Audi de México
##
####################################
#Creado por Fernando Dorantes Nieto <(°) 
#                                     ( >)"
#                                      /|
####################################

# Librerias ---------------------------------------------------------------
library(magrittr)
c("dplyr", "tidyr", "lubridate", "data.table","reshape2",
  "XLConnect") %>% sapply(require, character.only=T)


# Globales ----------------------------------------------------------------
meses <- c("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
           "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")

# Datos -------------------------------------------------------------------
Caribe = c("Barbados","Curazao", "Islas_Caiman", "Guadalupe","Haiti", "Jamaica", 
  "Rep_Dominicana", "San_Martín","Santa_Lucía", "Trinidad_y_Tobago") %>%
  sample(4500, rep=T) %>% data_frame(Pais=.) %>% mutate(Region="Caribe")

CentroAmerica = c("Costa_Rica","El_Salvador","Guatemala","Honduras",
                  "Panamá") %>% 
  sample(5000, rep=T) %>% data_frame(Pais=.) %>% mutate(Region="Centro_América")

Sudamerica = c("Bolivia", "Ecuador","Paraguay","Uruguay","Venezuela") %>% 
  sample(5500, rep=T) %>% data_frame(Pais=.) %>% mutate(Region="Sudamérica")

datosAudi = rbind(Caribe, Sudamerica, CentroAmerica)


fecha  = seq.POSIXt(as.POSIXct("2015-01-01"),
                     as.POSIXct("2016-12-31"), by="days") %>% 
  sample(15000, replace=T) %>%  as.Date() 


idEmail = sample(rpois(100000,12000),15000, rep=T)
l = letters %>%  sample(15000,rep=T)
L = LETTERS %>%  sample(15000,rep=T)
Letras =paste(letters,LETTERS, sep="")  %>%  sample(15000,rep=T)
n = 1:10 %>% sample(15000,rep=T)
n1 = 1:10 %>% sample(15000,rep=T)
idEmail = paste("EAuL",idEmail, l,L, Letras,n,n1, sep="") %>% unique 

uniqueOpens = sample(5:50) %>%  sample(15000, rep=T)
bounce = sapply(uniqueOpens, function(x){
  ifelse(x>10, x- sample(5:8) %>% head(1),
         ifelse(x>20, x- sample(5:8) %>% head(1),
         x-sample(1:2) %>%  head(1)))
  })

TotalRecipients = uniqueOpens+bounce+ sample(1:30) %>% sample(15000,rep=T)
SuccessfulRecipients = TotalRecipients-bounce
OpenRate = uniqueOpens/SuccessfulRecipients
uniqueClicks = sample(1:30) %>%  sample(15000, rep=T)
consideracion = 1:5 %>%  sample(15000, rep=T)
satisfaccion = 1:10 %>%  sample(15000, rep=T)


datosAudi1 = data.frame(fecha, idEmail,TotalRecipients, bounce, SuccessfulRecipients,
                        uniqueOpens,OpenRate, uniqueClicks,
                        consideracion, satisfaccion )
datosAudi = datosAudi %>% cbind(datosAudi1) 
datosAudi = datosAudi %>%  mutate(OpenRate=round(OpenRate,digits = 2)) %>% 
  mutate(fecha= as.Date(fecha), anio = year(fecha),
         mes = month(fecha),dia = day(fecha)) %>% 
  mutate(nombreDia = lubridate::wday(fecha, label=T, abbr=F)) %>% 
  mutate(mesNombre = factor(mes), nombreDia = factor(nombreDia)) 

levels(datosAudi$nombreDia)<-c("Domingo", "Lunes","Martes", "Miércoles",
                               "Jueves","Viernes", "Sábado")
levels(datosAudi$mesNombre)<-meses
datosAudi %>% write.csv("~/local/Audi/audiCrossfilter/datosSimula.csv",
                        row.names=F)
datosAudi %>% write.csv("~/local/Audi/audiCrossfilter/datos.csv", row.names=F)
