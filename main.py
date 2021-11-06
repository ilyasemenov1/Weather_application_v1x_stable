import eel
import math
import pyowm
from pyowm import OWM
from pyowm.utils.config import get_default_config
from pyowm.utils import timestamps

config_dict = get_default_config()
config_dict['language'] = 'ru'
owm = OWM('f665db053cc96fe4acb498e53a52f14c', config_dict)
mgr = owm.weather_manager()

@eel.expose
def main(place) -> list:
    try:
        observation = mgr.weather_at_place(place)
        w = observation.weather

        temp = round(w.temperature('celsius')['temp'])

        temp_min = round(w.temperature('celsius')['temp_min'])
        temp_max = round(w.temperature('celsius')['temp_max'])
        temp_min_max = "{0}/{1}".format(temp_min, temp_max)

        wind = round(w.wind()['speed'], 1)

        humidity = round(w.humidity)

        status = w.detailed_status

        weather_info = [
            temp, status, wind, temp_min_max, humidity
            ]
        ret_list = [weather_info, 1]

        print(ret_list)
        return ret_list
    except:
        ret_list = ["", 0]
        print(ret_list)
        return ret_list

@eel.expose
def is_town(place) -> int:
    try:
        observation = mgr.weather_at_place(place)
        return 1
    except:
        return 0
        
eel.init("web")
eel.start("site.html", mode="chrome_app")