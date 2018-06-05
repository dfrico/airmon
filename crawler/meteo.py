import os;
import requests;
import json;
from dateutil.parser import parse;

def parseKeys(keys, obj, txts):
	info = ""
	raw  = []
	for i, key in enumerate(keys):
		try:
			value = obj[key];
			info += txts[i].replace("VALUE", str(value))
			raw.append(value)
		except KeyError:
			raw.append(0)
			continue
	return (info, raw)

'''
METEO-PREDICCIONES
'''

headers = {
	"api_key": os.environ['aemet'],
	"Accept": "application/json"
}

'''
PARA SACAR LAS ESTACIONES DE MADRID:

url = "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones/"

r = requests.get(url, headers=headers)
body = json.loads(r.text)
url_data = body["datos"]

r = requests.get(url_data);
estaciones = json.loads(r.text)

for e in estaciones:
	if(e["provincia"]=="MADRID" and "MADRID" in e["nombre"]):
		print(e['nombre'], e['indicativo'], e['indsinop'])

MAD_st = list(filter(lambda e: e["provincia"]=="MADRID" and "MADRID" in e["nombre"], estaciones))
ids = list(map(lambda e: e["indicativo"], MAD_st))
'''

estaciones = [
	{"nombre": "MADRID AEROPUERTO", "id": "3129"},
	{"nombre": "MADRID, CIUDAD UNIVERSITARIA", "id": "3194U"},
	{"nombre": "MADRID, CUATRO VIENTOS", "id": "3196"},
	{"nombre": "MADRID, RETIRO", "id": "3195"}
]

for e in estaciones:
	'''
	DATOS ULTIMAS 24h - por estacion:

	"idema": "Indicativo climatógico de la estación meteorológia automática",
    "lon": "Longitud de la estación meteorológica (grados)",
    "lat": "Latitud de la estación meteorológica (grados)",
    "alt": "Altitud de la estación en metros",
    "fint": "Fecha hora final del período de observación, se trata de datos del periodo de la hora anterior a la indicada por este campo (hora UTC)",
    "ubi": "Ubicación de la estación. Nombre de la estación",
    
	PRECIPITACION
    "prec": "Precipitación acumulada, medida por el pluviómetro, durante los 60 minutos anteriores a la hora indicada por el período de observación 'fint' (mm, equivalente a l/m2)",
    X"pacutp": "Precipitación acumulada, medida por el disdrómetro, durante los 60 minutos anteriores a la hora indicada por el período de observación 'fint' (mm, equivalente a l/m2)"
    X"pliqtp": "Precipitación líquida acumulada durante los 60 minutos anteriores a la hora indicada por el período de observación 'fint' (mm, equivalente a l/m2)"
    X"psolt": "Precipitación sólida acumulada durante los 60 minutos anteriores a la hora indicada por el período de observación 'fint' (mm, equivalente a l/m2)"

	VIENTO
    "vmax":  "Velocidad máxima del viento, valor máximo del viento mantenido 3 segundos y registrado en los 60 minutos anteriores a la hora indicada por el período de observación 'fint' (m/s)",
    X"vmaxu": "Velocidad máxima del viento (sensor ultrasónico), valor máximo del viento mantenido 3 segundos y registrado en los 60 minutos anteriores a la hora indicada por el período de observación 'fint' (m/s)"
    "vv": "Velocidad media del viento, media escalar de las muestras adquiridas cada 0,25 ó 1 segundo en el período de 10 minutos anterior al indicado por 'fint' (m/s)",
    
    "dv": "Dirección media del viento, en el período de 10 minutos anteriores a la fecha indicada por 'fint' (grados)",
    "dmax": "Dirección del viento máximo registrado en los 60 minutos anteriores a la hora indicada por 'fint' (grados)",
    X"dmaxu": "Dirección del viento máximo registrado en los 60 minutos anteriores a la hora indicada por 'fint' por el sensor ultrasónico (grados)",

    "stdvv": "Desviación estándar de las muestras adquiridas de velocidad del viento durante los 10 minutos anteriores a la fecha dada por 'fint' (m/s)",
    "stddv": "Desviación estándar de las muestras adquiridas de la dirección del viento durante los 10 minutos anteriores a la fecha dada por 'fint' (grados)",

	OTROS
    "pres": "Presión instantánea al nivel en el que se encuentra instalado el barómetro y correspondiente a la fecha dada por 'fint' (hPa)",
    "pres_nmar": "Valor de la presión reducido al nivel del mar para aquellas estaciones cuya altitud es igual o menor a 750 metros y correspondiente a la fecha indicada por 'fint' (hPa)",
    
    "hr": "Humedad relativa instantánea del aire correspondiente a la fecha dada por 'fint' (%)",
    "vis": "Visibilidad, promedio de la medida de la visibilidad correspondiente a los 10 minutos anteriores a la fecha dada por 'fint' (Km)",
    
    TEMPERATURA
    "ts": "Temperatura suelo, temperatura instantánea junto al suelo y correspondiente a los 10 minutos anteriores a la fecha dada por 'fint' (grados Celsius)",
    "ta": "Temperatura instantánea del aire correspondiente a la fecha dada por 'fint' (grados Celsius)",
    "tamin": "Temperatura mínima del aire, valor mínimo de los 60 valores instantáneos de 'ta' medidos en el período de 60 minutos anteriores a la hora indicada por el período de observación 'fint' (grados Celsius)",
    "tamax": "Temperatura máxima del aire, valor máximo de los 60 valores instantáneos de 'ta' medidos en el período de 60 minutos anteriores a la hora indicada por el período de observación 'fint' (grados Celsius)",
    "tpr": "Temperatura del punto de rocío calculado correspondiente a la fecha 'fint' (grados Celsius)",
    
    "inso": "Duración de la insolación durante los 60 minutos anteriores a la hora indicada por el período de observación 'fint' (horas)"

	'''

	url = 'https://opendata.aemet.es/opendata/api/observacion/convencional/datos/estacion/{}'.format(e["id"])
	r = requests.get(url, headers=headers)
	body = json.loads(r.text)

	if(body["estado"]==404):
		print("Err getting data from {} ({})".format(e["nombre"], body["estado"]))
		# print("Response: {}".format(body["descripcion"]))
		continue
	else:
		print("{} {}".format(e["nombre"], body["descripcion"]))
		url_data = body["datos"]

	r = requests.get(url_data);
	data = json.loads(r.text)

	# data: lista con 23 valores, 1 por hora

	for d in data:
		date = parse(d["fint"]).strftime("%d-%m %H:%M")

		# ubi, hora, temp
		txts = [
			# "En VALUE {}.".format(date),
			" temp: VALUE°C,",
			" presión: VALUE (hPa),",
			" humedad: VALUE (%),",
			" viento: VALUE (m/s),",
			" precipitación: VALUE (l/m2)"
		]
		keys = [
			# "ubi",
			"ta",
			"pres",
			"hr",
			"vv",
			"prec"
		]
		(info, raw) = parseKeys(keys, d, txts)

		print(date, info);
		# print(raw)
	print()
