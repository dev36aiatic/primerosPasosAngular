
/**Interfaz de la respuesta enviada por la API de los departamentos y municipios de colombia */
export interface WebServiceResponse {
    region: Region;
    c_digo_dane_del_departamento: string;
    departamento: string;
    c_digo_dane_del_municipio: string;
    municipio: string;
}

export enum Region {
    RegiónCaribe = "Región Caribe",
    RegiónCentroOriente = "Región Centro Oriente",
    RegiónCentroSur = "Región Centro Sur",
    RegiónEjeCafeteroAntioquia = "Región Eje Cafetero - Antioquia",
    RegiónLlano = "Región Llano",
    RegiónPacífico = "Región Pacífico",
}
