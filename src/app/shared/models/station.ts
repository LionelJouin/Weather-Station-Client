import { Sensor } from "./sensor";
import { WeatherData } from "./weather-data";

export class Station {
    id: string;
    name: string;
    sensors: Sensor[];
    data: WeatherData[];
    createdOn: string;
    updatedOn: string;
}