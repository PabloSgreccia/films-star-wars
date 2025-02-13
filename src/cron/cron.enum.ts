// TODO revisar todo este archivo
// export enum CronDependenciasEnum {
// 	CRON_SERVICIO = 'CRON_SERVICIO',
// }

// Los servidores tienen 3 horas mas del horario de argentina (EJ: si queremos enviar un email a las 16 tenemos que configurarlo a las 19)
export enum CronPeriods {
	CADA_DIA_UNO_Y_DIECISEIS_DE_CADA_MES = '0 0 16 1,16 * *',
	CADA_DIA_DIEZ_DE_CADA_MES = '0 0 17 10 * *',
}

// export enum OpcionesCron {
// 	DIAS_A_EVALUAR_PARA_ENVIAR_EL_EMAIL_DE_INACTIVIDAD = 30,
// }
