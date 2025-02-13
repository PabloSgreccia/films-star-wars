// import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { EmailServicioInterface } from '../../src/emails/email.servicio';
// import { BautismoRepositorioInterface } from '../../src/rds/bautismo/bautismo.repositorio';
// import { BautismoServicio } from '../../src/rds/bautismo/bautismo.servicio';
// import { ActualizarBautismoRequest } from '../../src/rds/bautismo/dto/request/actualizar-bautismo.request';
// import { CrearBautismoRequest } from '../../src/rds/bautismo/dto/request/crear-bautismo.request';
// import { RegistrarOActualizarBautismoPersonaYMiembroRequest } from '../../src/rds/bautismo/dto/request/registrar-o-actualizar-bautismo-persona-y-miembro.request';
// import { BautismoResponse } from '../../src/rds/bautismo/dto/response/bautismo.response';
// import { Bautismo } from '../../src/rds/entidades/bautismo';
// import { Miembro } from '../../src/rds/entidades/miembro';
// import { Ministro } from '../../src/rds/entidades/ministro';
// import { Parroco } from '../../src/rds/entidades/parroco';
// import { Parroquia } from '../../src/rds/entidades/parroquia';
// import { Persona } from '../../src/rds/entidades/persona';
// import { Usuario } from '../../src/rds/entidades/usuario';
// import { EstadoBautismo } from '../../src/rds/enums/estado-bautismo';
// import { MensajeDeError } from '../../src/rds/enums/mensajes-de-error';
// import { ActualizarMiembroRequest } from '../../src/rds/miembro/dto/actualizar.request';
// import { CrearMiembroRequest } from '../../src/rds/miembro/dto/crear-para-la-persona.request';
// import { MiembroRepositorioInterface } from '../../src/rds/miembro/miembro.repositorio';
// import { MiembroServicioInterface } from '../../src/rds/miembro/miembro.servicio';
// import { MinistroRepositorioInterface } from '../../src/rds/ministro/ministro.repositorio';
// import { ParrocoRepositorioInterface } from '../../src/rds/parroco/parroco.repositorio';
// import { ParroquiaRepositorioInterface } from '../../src/rds/parroquia/parroquia.repositorio';
// import { ActualizarPersonaRequest } from '../../src/rds/persona/dto/request/actualizar-persona.request';
// import { CrearPersonaRequest } from '../../src/rds/persona/dto/request/crear-persona.request';
// import { PersonaRepositorioInterface } from '../../src/rds/persona/persona.repositorio';
// import { PersonaServicioInterface } from '../../src/rds/persona/persona.servicio';
// import { UsuarioRepositorioInterface } from '../../src/rds/usuario/usuario.repositorio';
// import { ValidadorFechasInterface } from '../../src/rds/validador-fechas/validador-fechas';
// import { useDate } from '../../src/utils/date';
// import {
// 	dadoUnRepositorioDeBautismo,
// 	dadoUnRepositorioDeMiembro,
// 	dadoUnRepositorioDeMinistro,
// 	dadoUnRepositorioDeParroco,
// 	dadoUnRepositorioDeParroquia,
// 	dadoUnRepositorioDePersona,
// 	dadoUnRepositorioDeUsuario,
// 	dadoUnServicioDeEmail,
// 	dadoUnServicioDePermiso,
// } from '../dados';
// import { entoncesSeRetornaLaExcepcionExperada } from '../entonces';
// import { dadoQueElMinistroNoExiste, dadoUnMinistroCualquiera } from './ministro.servicio.spec';
// import { actualizarBautismoRequestMock, idDeUnaPErsonaCualquiera, idDeUnBautismoCualquiera, unBautismoCualquiera } from './mocks/bautismo';
// import { dadoQueLaPersonaNoExiste } from './persona.servicio.spec';
// import { dadoQueElUsuarioNoExiste, dadoUnUsuarioCualquiera } from './usuario.servicio.spec';
// import { dadoQueElMiembroNoExiste, dadoUnMiembroCualquiera } from './miembro.servicio.spec';
// import { dadoQueLaParroquiNoExiste, dadoUnaParroquiaCualquiera } from './parroquia.servicio.spec';
// import { dadoQueElParrocoNoExiste, dadoUnParrocoCualquiera } from './parroco.servicio.spec';
// import { RdsSession } from 'src/auth/guards/parishSession.guard';
// import { PermisoServicio, PermisoServicioInterface } from 'src/rds/permiso/permiso.servicio';

// describe('Servicio para Bautismo', () => {
// 	let usuarioRepositorio: UsuarioRepositorioInterface;
// 	let personaRepositorio: PersonaRepositorioInterface;
// 	let validadorFechas: ValidadorFechasInterface;
// 	let parroquiaRepositorio: ParroquiaRepositorioInterface;
// 	let miembroRepositorio: MiembroRepositorioInterface;
// 	let parrocoRepositorio: ParrocoRepositorioInterface;
// 	let bautismoRepositorio: BautismoRepositorioInterface;
// 	let servicioDeEmail: EmailServicioInterface;
// 	let ministroRepositorio: MinistroRepositorioInterface;
// 	let permisoServicio: PermisoServicioInterface;

// 	beforeAll(() => {
// 		usuarioRepositorio = dadoUnRepositorioDeUsuario();
// 		personaRepositorio = dadoUnRepositorioDePersona();
// 		parroquiaRepositorio = dadoUnRepositorioDeParroquia();
// 		miembroRepositorio = dadoUnRepositorioDeMiembro();
// 		parrocoRepositorio = dadoUnRepositorioDeParroco();
// 		bautismoRepositorio = dadoUnRepositorioDeBautismo();
// 		servicioDeEmail = dadoUnServicioDeEmail();
// 		ministroRepositorio = dadoUnRepositorioDeMinistro();
// 		permisoServicio = dadoUnServicioDePermiso();
// 	});

// 	beforeEach(() => {
// 		validadorFechas = dadoUnValidadorFechas();
// 	});

// 	describe('Registrar un bautismo', () => {
// 		it('Un bautismo es registrado sin atributos dinámicos y la parroquia no usa acta', async () => {
// 			dadoQueExisteElUsuario(usuarioRepositorio);
// 			dadoQueExisteLaPersona(personaRepositorio);
// 			dadoQueExisteLaParroquiaNoUsaActa(parroquiaRepositorio);
// 			dadoQueExisteElMiembro(miembroRepositorio);
// 			dadoQueExisteElParroco(parrocoRepositorio);
// 			dadoQueExisteElMinistro(ministroRepositorio);
// 			const request = dadoUnRequestConFechaBautismoLibroYFolio('2024-11-18');

// 			await cuandoSeCreaUnBautismo(
// 				1,
// 				1,
// 				request,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				null,
// 				ministroRepositorio,
// 			);

// 			entoncesSeGuardaElBautismoCon(
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 			);
// 			entoncesLaRespuestaEsUnBautismoCreado(bautismoRepositorio);
// 		});

// 		it('Un bautismo es registrado con cambio de sexo', async () => {
// 			dadoQueExisteElUsuario(usuarioRepositorio);
// 			dadoQueExisteLaPersona(personaRepositorio);
// 			dadoQueExisteLaParroquiaNoUsaActa(parroquiaRepositorio);
// 			dadoQueExisteElMiembro(miembroRepositorio);
// 			dadoQueExisteElParroco(parrocoRepositorio);
// 			dadoQueExisteElMinistro(ministroRepositorio);
// 			const request = dadoUnRequestConCambioDeSexo();

// 			await cuandoSeCreaUnBautismo(
// 				1,
// 				1,
// 				request,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				null,
// 				ministroRepositorio,
// 			);

// 			entoncesSeGuardaElBautismoCon(
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 			);
// 			entoncesLaRespuestaEsUnBautismoCreadoConCambioDeSexo(bautismoRepositorio);
// 		});

// 		it('Un bautismo es registrado con apostasia (abandono de fé).', async () => {
// 			dadoQueExisteElUsuario(usuarioRepositorio);
// 			dadoQueExisteLaPersona(personaRepositorio);
// 			dadoQueExisteLaParroquiaNoUsaActa(parroquiaRepositorio);
// 			const emailMiembro = 'emailmiembro@email.com';
// 			dadoQueExisteElMiembroConEmail(miembroRepositorio, emailMiembro);
// 			dadoQueExisteElParroco(parrocoRepositorio);
// 			dadoQueExisteElMinistro(ministroRepositorio);
// 			const request = dadoUnRequestConApostasia();

// 			await cuandoSeCreaUnBautismo(
// 				1,
// 				1,
// 				request,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				servicioDeEmail,
// 				ministroRepositorio,
// 			);

// 			entoncesSeAgregaElEmailDelUsuarioALaBlackList(servicioDeEmail, emailMiembro);
// 		});

// 		it('Se valida al usuario como dato obligatorio para validar la excepción.', async () => {
// 			const idUsuarioNull = null;
// 			let errorEsperado;
// 			try {
// 				await cuandoSeCreaUnBautismo(idUsuarioNull, null, null, null, null, null, null, null, null, null, null, null);
// 			} catch (error) {
// 				errorEsperado = error;
// 			}
// 			entoncesSeInformaQueNoSeTienenLosDatosObligatorios(errorEsperado);
// 		});

// 		it('No se puede crear el bautismo porque la persona ya tiene uno registrado', async () => {
// 			const request = dadoUnRequestParaCrearBautismo();
// 			dadoQueExisteElUsuario(usuarioRepositorio);
// 			dadoQueExisteLaPersona(personaRepositorio);
// 			dadoQueYaExisteUnBautismoParaLaPersona(bautismoRepositorio);
// 			let errorEsperado;
// 			try {
// 				await cuandoSeCreaUnBautismo(1, 1, request, usuarioRepositorio, personaRepositorio, null, null, null, null, bautismoRepositorio, null, null);
// 			} catch (error) {
// 				errorEsperado = error;
// 			}
// 			entoncesSeObtieneUnaExcepcionBadRequest(errorEsperado);
// 		});

// 		it('No se puede crear el bautismo porque la fecha de bautismo es mayor a la fecha de comunion', async () => {
// 			dadoQueExisteElUsuario(usuarioRepositorio);
// 			dadoQueExisteLaPersona(personaRepositorio);
// 			dadoQueLaValidacionConComunionResultaNegativa(validadorFechas);
// 			dadoQueElBautismoNoExiste(bautismoRepositorio);
// 			const request = dadoUnRequestParaCrearBautismo();
// 			let errorEsperado;
// 			try {
// 				await cuandoSeCreaUnBautismo(1, 1, request, usuarioRepositorio, personaRepositorio, validadorFechas, null, null, null, bautismoRepositorio, null, null);
// 			} catch (error) {
// 				errorEsperado = error;
// 			}
// 			entoncesSeObtieneUnaExcepcionBadRequest(errorEsperado);
// 		});

// 		it('No se puede crear el bautismo porque la fecha de bautismo es mayor a la fecha de confirmacion', async () => {
// 			dadoQueExisteElUsuario(usuarioRepositorio);
// 			dadoQueExisteLaPersona(personaRepositorio);
// 			dadoQueLaValidacionConConfirmacionResultaNegativa(validadorFechas);
// 			dadoQueElBautismoNoExiste(bautismoRepositorio);
// 			const request = dadoUnRequestParaCrearBautismo();
// 			let errorEsperado;
// 			try {
// 				await cuandoSeCreaUnBautismo(1, 1, request, usuarioRepositorio, personaRepositorio, validadorFechas, null, null, null, bautismoRepositorio, null, null);
// 			} catch (error) {
// 				errorEsperado = error;
// 			}
// 			entoncesSeObtieneUnaExcepcionBadRequest(errorEsperado);
// 		});

// 		it('No se puede crear el bautismo porque la fecha de bautismo es mayor a la fecha de matrimonio', async () => {
// 			dadoQueExisteElUsuario(usuarioRepositorio);
// 			dadoQueExisteLaPersona(personaRepositorio);
// 			dadoQueLaValidacionConMatrimonioResultaNegativa(validadorFechas);
// 			dadoQueElBautismoNoExiste(bautismoRepositorio);
// 			const request = dadoUnRequestParaCrearBautismo();
// 			let errorEsperado;
// 			try {
// 				await cuandoSeCreaUnBautismo(1, 1, request, usuarioRepositorio, personaRepositorio, validadorFechas, null, null, null, bautismoRepositorio, null, null);
// 			} catch (error) {
// 				errorEsperado = error;
// 			}
// 			entoncesSeObtieneUnaExcepcionBadRequest(errorEsperado);
// 		});

// 		it('Apellido y nombre de cambio deben ser los dos obligatorios o los dos null', async () => {
// 			dadoQueExisteElUsuario(usuarioRepositorio);
// 			dadoQueExisteLaPersona(personaRepositorio);
// 			dadoQueExisteLaParroquia(parroquiaRepositorio);
// 			dadoQueExisteElMiembro(miembroRepositorio);
// 			dadoQueExisteElParroco(parrocoRepositorio);
// 			dadoQueExisteElMinistro(ministroRepositorio);

// 			const request = dadoUnRequestConCambioDeSexoConRequestInconsistente();

// 			let errorEsperado;
// 			try {
// 				await cuandoSeCreaUnBautismo(
// 					1,
// 					1,
// 					request,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					null,
// 					ministroRepositorio,
// 				);
// 			} catch (error) {
// 				errorEsperado = error;
// 			}
// 			entoncesSeInformaQueFaltanLosDatosParaElBautismoConCambioDeSexo(errorEsperado);
// 		});

// 		it('Un bautismo se da de alta en una parroquia que usa acta entonces se verifican las fechas y si corresponde libro y folio quedan en null', async () => {
// 			dadoQueExisteElUsuario(usuarioRepositorio);
// 			dadoQueExisteLaPersona(personaRepositorio);
// 			dadoQueExisteElMiembro(miembroRepositorio);
// 			dadoQueExisteElParroco(parrocoRepositorio);
// 			dadoQueExisteElMinistro(ministroRepositorio);
// 			/**
// 			 * La fecha de acta es debe ser menor a la fecha de bautismo
// 			 debe ser */
// 			dadoQueExisteLaParroquiaQueUsaActa('2023-11-15', parroquiaRepositorio);
// 			const request = dadoUnRequestConFechaBautismoLibroYFolio('2024-12-01');

// 			const response = await cuandoSeCreaUnBautismo(
// 				1,
// 				1,
// 				request,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				null,
// 				ministroRepositorio,
// 			);

// 			entoncesLibroYFolioDebenQuedarEnNulo(bautismoRepositorio);
// 		});
// 	});

// 	describe('Actualizar entidad bautismo', () => {
// 		it('Se retorna la exepción bad request porque falta idUsuario en los parámetros.', async () => {
// 			const sesion = dadoUnaSession();
// 			sesion.idUsuario = null;
// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(sesion, null, null, null, null, null, null, null, null, null, null, null, null);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_DATOS_OBLIGATORIOS,
// 				},
// 			});
// 		});

// 		it('Se retorna la exepción bad request porque falta idPersona en los parámetros.', async () => {
// 			const sesion = dadoUnaSession();
// 			const idPersonaNull = null;
// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(sesion, idPersonaNull, null, null, null, null, null, null, null, null, null, null, null);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_DATOS_OBLIGATORIOS,
// 				},
// 			});
// 		});

// 		it('Se retorna la exepción bad request porque faltan datos obligatorios del bautismo.', async () => {
// 			const request = dadoUnRequestParaActualizarBautismoConDatosFaltantes();
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(sesion, idDeUnaPersonaCualqueira, request, null, null, null, null, null, null, null, null, null, null);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_DATOS_OBLIGATORIOS,
// 				},
// 			});
// 		});

// 		it('Se retorna la exepción not found porque no se encuentra el bautismo a actualizar.', async () => {
// 			const request = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoQueElBautismoNoExiste(bautismoRepositorio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(sesion, idDeUnaPersonaCualqueira, request, null, null, null, null, null, null, null, bautismoRepositorio, null, null);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			expect(bautismoRepositorio.obtenerPorId).toBeCalledWith(request.id);
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: NotFoundException,
// 					mensaje: MensajeDeError.BAUTISMO_NO_ENCONTRADO,
// 				},
// 			});
// 		});

// 		it('Se retorna la exepción not found porque no se encuentra al usuario del request.', async () => {
// 			const request = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();

// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoQueElUsuarioNoExiste(usuarioRepositorio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					request,
// 					null,
// 					usuarioRepositorio,
// 					null,
// 					null,
// 					null,
// 					null,
// 					null,
// 					bautismoRepositorio,
// 					null,
// 					null,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}
// 			expect(usuarioRepositorio.obtenerPorId).toBeCalledWith(sesion.idUsuario);
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: NotFoundException,
// 					mensaje: MensajeDeError.USUARIO_NO_ENCONTRADO,
// 				},
// 			});
// 		});

// 		it('Se retorna la exepción not found porque no se encuentra a la persona del request.', async () => {
// 			const request = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();

// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoQueLaPersonaNoExiste(personaRepositorio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					request,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					null,
// 					null,
// 					null,
// 					null,
// 					bautismoRepositorio,
// 					null,
// 					null,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			expect(personaRepositorio.obtenerUnaPorId).toBeCalledWith(idDeUnaPersonaCualqueira);
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: NotFoundException,
// 					mensaje: MensajeDeError.PERSONA_NO_ENCONTRADA,
// 				},
// 			});
// 		});

// 		it('Se retorna la exepción not found porque no se encuentra el miembro del request.', async () => {
// 			const request = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();

// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoQueElMiembroNoExiste(miembroRepositorio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					request,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					null,
// 					null,
// 					miembroRepositorio,
// 					null,
// 					bautismoRepositorio,
// 					null,
// 					null,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			expect(miembroRepositorio.obtenerPorId).toBeCalledWith(request.idMiembro);
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: NotFoundException,
// 					mensaje: MensajeDeError.MIEMBRO_NO_ENCONTRADO,
// 				},
// 			});
// 		});

// 		it('Se retorna la exepción not found porque no se encuentra la parroquia del request.', async () => {
// 			const request = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();

// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoQueLaParroquiNoExiste(parroquiaRepositorio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					request,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					null,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					null,
// 					bautismoRepositorio,
// 					null,
// 					null,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			expect(parroquiaRepositorio.obtenerPorId).toBeCalledWith(request.idParroquia);
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: NotFoundException,
// 					mensaje: MensajeDeError.PARROQUIA_NO_ENCONTRADA,
// 				},
// 			});
// 		});

// 		it('Se retorna la exepción not found porque no se encuentra el parroco del request.', async () => {
// 			const request = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();

// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoQueElParrocoNoExiste(parrocoRepositorio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					request,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					null,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					null,
// 					null,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			expect(parrocoRepositorio.obtenerPorId).toBeCalledWith(request.idParroco);
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: NotFoundException,
// 					mensaje: MensajeDeError.PARROCO_NO_ENCONTRADO,
// 				},
// 			});
// 		});

// 		it('Se retorna la exepción not found porque no se encuentra el ministro del request.', async () => {
// 			const bautismo = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();

// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoQueElMinistroNoExiste(ministroRepositorio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismo,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					null,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					null,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			expect(ministroRepositorio.buscarPorId).toBeCalledWith(bautismo.idMinistro);
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: NotFoundException,
// 					mensaje: MensajeDeError.MINISTRO_NO_ENCONTRADO,
// 				},
// 			});
// 		});

// 		it('No se puede actualizar el bautismo porque la fecha de bautismo es mayor a la fecha de comunión.', async () => {
// 			const request = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();

// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaNegativa(validadorFechas);

// 			let errorEsperado;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					request,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					null,
// 				);
// 			} catch (error) {
// 				errorEsperado = error;
// 			}

// 			entoncesSeObtieneUnaExcepcionBadRequest(errorEsperado);
// 		});

// 		it('No se puede actualizar el bautismo porque la fecha de bautismo es mayor a la fecha de confirmacion', async () => {
// 			const request = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();

// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaNegativa(validadorFechas);
// 			let errorEsperado;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					request,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					null,
// 				);
// 			} catch (error) {
// 				errorEsperado = error;
// 			}
// 			entoncesSeObtieneUnaExcepcionBadRequest(errorEsperado);
// 		});

// 		it('No se puede actualizar el bautismo porque la fecha de bautismo es mayor a la fecha de matrimonio', async () => {
// 			const request = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();

// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaNegativa(validadorFechas);

// 			let errorEsperado;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					request,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					null,
// 				);
// 			} catch (error) {
// 				errorEsperado = error;
// 			}

// 			entoncesSeObtieneUnaExcepcionBadRequest(errorEsperado);
// 		});

// 		it('Se actualiza correctamente un bautismo para una parroquia que usa acta', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			bautismo.usaActa = false;
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			const parroquia = dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			parroquia.usaActa = true;
// 			parroquia.fechaInicioActa = '1900/01/01'; // debe ser menor a bautismoRequest.fechaBautismo
// 			bautismoRequest.fechaBautismo = '1901/01/01'; // debe ser mayor a parroquia.fechaInicioActa

// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);

// 			await cuandoSeActualizaUnBautismo(
// 				sesion,
// 				idDeUnaPersonaCualqueira,
// 				bautismoRequest,
// 				null,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 				null,
// 			);

// 			expect(bautismoRepositorio.actualizar).toHaveBeenCalledWith(
// 				expect.objectContaining({
// 					usaActa: true,
// 				}),
// 			);
// 		});

// 		it('No se actualiza un bautismo para una parroquia que NO APLICA acta porque falta libro.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.libro = null;
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			bautismo.usaActa = false;
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			const parroquia = dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			parroquia.usaActa = true;
// 			parroquia.fechaInicioActa = '1901/01/01'; // debe ser mayor a bautismoRequest.fechaBautismo
// 			bautismoRequest.fechaBautismo = '1900/01/01'; // debe ser menor a parroquia.fechaInicioActa

// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					null,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_LIBRO_O_FOLIO,
// 				},
// 			});
// 		});

// 		it('No se actualiza un bautismo para una parroquia que NO USA acta porque falta libro.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.libro = null;
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			bautismo.usaActa = false;
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			const parroquia = dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			parroquia.usaActa = false;

// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					null,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_LIBRO_O_FOLIO,
// 				},
// 			});
// 		});

// 		it('No se actualiza un bautismo para una parroquia que NO APLICA acta porque falta folio.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.folio = null;
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			bautismo.usaActa = false;
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			const parroquia = dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			parroquia.usaActa = true;
// 			parroquia.fechaInicioActa = '1901/01/01'; // debe ser mayor a bautismoRequest.fechaBautismo
// 			bautismoRequest.fechaBautismo = '1900/01/01'; // debe ser menor a parroquia.fechaInicioActa

// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					null,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_LIBRO_O_FOLIO,
// 				},
// 			});
// 		});

// 		it('No se actualiza un bautismo para una parroquia que NO USA acta porque falta folio.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.folio = null;
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			bautismo.usaActa = false;
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			const parroquia = dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			parroquia.usaActa = false;

// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					null,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_LIBRO_O_FOLIO,
// 				},
// 			});
// 		});

// 		it('Se actualiza correctamente un bautismo con apostasia (abandono de fé católica).', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.apostasiaFecha = 'cualquier fecha';
// 			bautismoRequest.apostasiaObservaciones = 'cualquier observacion';
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			const usuario = dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			const persona = dadoUnaPersonaCualquiera(personaRepositorio);
// 			persona.apostasia = true;
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaCargarApostasia(permisoServicio);

// 			await cuandoSeActualizaUnBautismo(
// 				sesion,
// 				idDeUnaPersonaCualqueira,
// 				bautismoRequest,
// 				null,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 				permisoServicio,
// 			);

// 			expect(bautismoRepositorio.actualizar).toHaveBeenCalledWith(
// 				expect.objectContaining({
// 					apostasiaUsuario: usuario,
// 					apostasiaFecha: bautismoRequest.apostasiaFecha,
// 					apostasiaObservaciones: bautismoRequest.apostasiaObservaciones,
// 				}),
// 			);
// 		});

// 		it('Se actualiza correctamente un bautismo que ya tenía apostasia (abandono de fé católica) y no fue modificada.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.apostasiaFecha = 'misma fecha';
// 			bautismoRequest.apostasiaObservaciones = 'misma observacion';
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			bautismo.apostasiaFecha = 'misma fecha';
// 			bautismo.apostasiaObservaciones = 'misma observacion';
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			const persona = dadoUnaPersonaCualquiera(personaRepositorio);
// 			persona.apostasia = true;
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaCargarApostasia(permisoServicio);

// 			await cuandoSeActualizaUnBautismo(
// 				sesion,
// 				idDeUnaPersonaCualqueira,
// 				bautismoRequest,
// 				null,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 				permisoServicio,
// 			);

// 			expect(bautismoRepositorio.actualizar).toHaveBeenCalledWith(
// 				expect.objectContaining({
// 					apostasiaUsuario: bautismo.apostasiaUsuario,
// 					apostasiaFecha: bautismo.apostasiaFecha,
// 					apostasiaObservaciones: bautismo.apostasiaObservaciones,
// 				}),
// 			);
// 		});

// 		it('No se actualiza un bautismo con apostasia (abandono de fé católica) porque falta la fecha de apostasia.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.apostasiaFecha = null;
// 			bautismoRequest.apostasiaObservaciones = 'cualquier observacion';
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			const persona = dadoUnaPersonaCualquiera(personaRepositorio);
// 			persona.apostasia = true;
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaCargarApostasia(permisoServicio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					permisoServicio,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_DATOS_APOSTASIA,
// 				},
// 			});
// 		});

// 		it('No se actualiza un bautismo con apostasia (abandono de fé católica) porque falta la observacion de apostasia.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.apostasiaFecha = 'Cualquier fecha';
// 			bautismoRequest.apostasiaObservaciones = null;
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			const persona = dadoUnaPersonaCualquiera(personaRepositorio);
// 			persona.apostasia = true;
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaCargarApostasia(permisoServicio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					permisoServicio,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_DATOS_APOSTASIA,
// 				},
// 			});
// 		});

// 		it('No se actualiza un bautismo con apostasia (abandono de fé católica) porque el usuario no tiene permisos para cargar apostasia.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.apostasiaFecha = 'Cualquier fecha';
// 			bautismoRequest.apostasiaObservaciones = 'Cualquier observacion';
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			bautismo.apostasiaFecha = 'Cualquier fecha diferente';
// 			bautismo.apostasiaObservaciones = 'Cualquier observacion diferente';
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			const persona = dadoUnaPersonaCualquiera(personaRepositorio);
// 			persona.apostasia = true;
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioNoTienePermisosParaCargarApostasia(permisoServicio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					permisoServicio,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: UnauthorizedException,
// 					mensaje: 'No tienes permisos para cargar información de apostasia.',
// 				},
// 			});
// 		});

// 		it('Se actualiza correctamente un bautismo sin apostasia (abandono de fé católica).', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			const persona = dadoUnaPersonaCualquiera(personaRepositorio);
// 			persona.apostasia = false;
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaCargarApostasia(permisoServicio);

// 			await cuandoSeActualizaUnBautismo(
// 				sesion,
// 				idDeUnaPersonaCualqueira,
// 				bautismoRequest,
// 				null,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 				permisoServicio,
// 			);

// 			expect(bautismoRepositorio.actualizar).toHaveBeenCalledWith(
// 				expect.objectContaining({
// 					apostasiaUsuario: null,
// 					apostasiaFecha: null,
// 					apostasiaObservaciones: null,
// 				}),
// 			);
// 		});

// 		it('Se actualiza correctamente un bautismo con cambio de sexo.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.cambioSexoNombre = 'cualquier nombre';
// 			bautismoRequest.cambioSexoApellido = 'cualquier apellido';
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			bautismo.cambioSexoNombre = 'cualquier nombre diferente';
// 			bautismo.cambioSexoApellido = 'cualquier apellido diferente';
// 			const usuario = dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaCargarCambioDeSexo(permisoServicio);

// 			await cuandoSeActualizaUnBautismo(
// 				sesion,
// 				idDeUnaPersonaCualqueira,
// 				bautismoRequest,
// 				null,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 				permisoServicio,
// 			);

// 			expect(bautismoRepositorio.actualizar).toHaveBeenCalledWith(
// 				expect.objectContaining({
// 					cambioSexoUsuario: usuario,
// 					cambioSexoNombre: bautismoRequest.cambioSexoNombre,
// 					cambioSexoApellido: bautismoRequest.cambioSexoApellido,
// 				}),
// 			);
// 		});

// 		it('Se actualiza correctamente un bautismo que ya tenía cambio de sexo y no fue modificado.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.cambioSexoNombre = 'mismo nombre';
// 			bautismoRequest.cambioSexoApellido = 'mismo apellido';
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			bautismo.cambioSexoNombre = 'mismo nombre';
// 			bautismo.cambioSexoApellido = 'mismo apellido';
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaCargarCambioDeSexo(permisoServicio);

// 			await cuandoSeActualizaUnBautismo(
// 				sesion,
// 				idDeUnaPersonaCualqueira,
// 				bautismoRequest,
// 				null,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 				permisoServicio,
// 			);

// 			expect(bautismoRepositorio.actualizar).toHaveBeenCalledWith(
// 				expect.objectContaining({
// 					cambioSexoUsuario: bautismo.cambioSexoUsuario,
// 					cambioSexoNombre: bautismo.cambioSexoNombre,
// 					cambioSexoApellido: bautismo.cambioSexoApellido,
// 				}),
// 			);
// 		});

// 		it('No se actualiza un bautismo con cambio de sexo porque falta el nuevo nombre.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.cambioSexoNombre = null;
// 			bautismoRequest.cambioSexoApellido = 'mismo apellido';
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaCargarCambioDeSexo(permisoServicio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					permisoServicio,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_DATOS_CAMBIO_SEXO,
// 				},
// 			});
// 		});

// 		it('No se actualiza un bautismo con cambio de sexo porque falta el nuevo apellido.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.cambioSexoNombre = 'cualquier nombre';
// 			bautismoRequest.cambioSexoApellido = null;
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaCargarCambioDeSexo(permisoServicio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					permisoServicio,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_DATOS_CAMBIO_SEXO,
// 				},
// 			});
// 		});

// 		it('No se actualiza un bautismo con cambio de sexo porque el usuario no tiene permisos para cargar cambio de sexo.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.cambioSexoNombre = 'cualquier nombre';
// 			bautismoRequest.cambioSexoApellido = 'cualquier apellido';
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			bautismo.cambioSexoNombre = 'cualquier nombre diferente';
// 			bautismo.cambioSexoApellido = 'cualquier apellido diferente';
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioNoTienePermisosParaCargarCambioDeSexo(permisoServicio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					permisoServicio,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: UnauthorizedException,
// 					mensaje: 'No tienes permisos para cargar información de cambio de sexo.',
// 				},
// 			});
// 		});

// 		it('Se actualiza correctamente un bautismo sin cambio de sexo.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.cambioSexoNombre = null;
// 			bautismoRequest.cambioSexoApellido = null;
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaCargarCambioDeSexo(permisoServicio);

// 			await cuandoSeActualizaUnBautismo(
// 				sesion,
// 				idDeUnaPersonaCualqueira,
// 				bautismoRequest,
// 				null,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 				permisoServicio,
// 			);

// 			expect(bautismoRepositorio.actualizar).toHaveBeenCalledWith(
// 				expect.objectContaining({
// 					cambioSexoUsuario: null,
// 					cambioSexoNombre: null,
// 					cambioSexoApellido: null,
// 				}),
// 			);
// 		});

// 		it('Se actualiza correctamente un bautismo con profesión de fé católica (otro bautismo).', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.otroBautismoFecha = 'cualquier fecha';
// 			bautismoRequest.otroBautismoIglesia = 'cualquier iglesia';
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);

// 			await cuandoSeActualizaUnBautismo(
// 				sesion,
// 				idDeUnaPersonaCualqueira,
// 				bautismoRequest,
// 				null,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 				permisoServicio,
// 			);

// 			expect(bautismoRepositorio.actualizar).toHaveBeenCalledWith(
// 				expect.objectContaining({
// 					otroBautismoFecha: bautismoRequest.otroBautismoFecha,
// 					otroBautismoIglesia: bautismoRequest.otroBautismoIglesia,
// 				}),
// 			);
// 		});

// 		it('Se actualiza correctamente un bautismo sin profesión de fé católica (otro bautismo).', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.otroBautismoFecha = null;
// 			bautismoRequest.otroBautismoIglesia = null;
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);

// 			await cuandoSeActualizaUnBautismo(
// 				sesion,
// 				idDeUnaPersonaCualqueira,
// 				bautismoRequest,
// 				null,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 				permisoServicio,
// 			);

// 			expect(bautismoRepositorio.actualizar).toHaveBeenCalledWith(
// 				expect.objectContaining({
// 					otroBautismoFecha: null,
// 					otroBautismoIglesia: null,
// 				}),
// 			);
// 		});

// 		it('No se actualiza un bautismo con profesión de fé católica (otro bautismo) porque falta la fecha.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.otroBautismoFecha = null;
// 			bautismoRequest.otroBautismoIglesia = 'cualquier iglesia';
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					permisoServicio,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_DATOS_PROFESION_FE_CATOLICA,
// 				},
// 			});
// 		});

// 		it('No se actualiza un bautismo con profesión de fé católica (otro bautismo) porque falta la ignlesia.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			bautismoRequest.otroBautismoFecha = 'cualquier fecha';
// 			bautismoRequest.otroBautismoIglesia = null;
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					null,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					permisoServicio,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_DATOS_PROFESION_FE_CATOLICA,
// 				},
// 			});
// 		});

// 		it('Se actualiza correctamente un bautismo que se va a firmar.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			const firmar = true;
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			const usuario = dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaFirmarSacramentos(permisoServicio);

// 			await cuandoSeActualizaUnBautismo(
// 				sesion,
// 				idDeUnaPersonaCualqueira,
// 				bautismoRequest,
// 				firmar,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 				permisoServicio,
// 			);

// 			expect(bautismoRepositorio.actualizar).toHaveBeenCalledWith(
// 				expect.objectContaining({
// 					usuarioFirma: usuario,
// 					fechaFirma: useDate(new Date(), { storeInDb: true }),
// 				}),
// 			);
// 		});

// 		it('No se actualiza un bautismo con firma porque el usuario no tiene permisos para firmar sacramentos.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			const firmar = true;
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioNoTienePermisosParaFirmarSacramentos(permisoServicio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeActualizaUnBautismo(
// 					sesion,
// 					idDeUnaPersonaCualqueira,
// 					bautismoRequest,
// 					firmar,
// 					usuarioRepositorio,
// 					personaRepositorio,
// 					validadorFechas,
// 					parroquiaRepositorio,
// 					miembroRepositorio,
// 					parrocoRepositorio,
// 					bautismoRepositorio,
// 					ministroRepositorio,
// 					permisoServicio,
// 				);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: UnauthorizedException,
// 					mensaje: 'No tienes permisos para firmar sacramentos.',
// 				},
// 			});
// 		});

// 		it('Se actualiza correctamente el usuario de carga, si el bautismo previamente fue creado por otro sacramento.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			bautismo.estado = EstadoBautismo.CREADO_POR_OTRO_SACRAMENTO;
// 			const usuario = dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoUnMiembroCualquiera(miembroRepositorio);
// 			dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			dadoUnParrocoCualquiera(parrocoRepositorio);
// 			dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaFirmarSacramentos(permisoServicio);

// 			await cuandoSeActualizaUnBautismo(
// 				sesion,
// 				idDeUnaPersonaCualqueira,
// 				bautismoRequest,
// 				null,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 				permisoServicio,
// 			);

// 			expect(bautismoRepositorio.actualizar).toHaveBeenCalledWith(
// 				expect.objectContaining({
// 					usuarioCarga: usuario,
// 					fechaCarga: useDate(new Date(), { storeInDb: true }),
// 				}),
// 			);
// 		});

// 		it('Se actualiza correctamente el bautismo y se retorna la respuesta correctamente.', async () => {
// 			const bautismoRequest = dadoUnBautismoParaActualizarCompleto();
// 			const sesion = dadoUnaSession();
// 			const idDeUnaPersonaCualqueira = 456;
// 			dadoUnBautismoCualquiera(bautismoRepositorio);
// 			dadoUnUsuarioCualquiera(usuarioRepositorio);
// 			dadoUnaPersonaCualquiera(personaRepositorio);
// 			const miembro = dadoUnMiembroCualquiera(miembroRepositorio);
// 			const parroquia = dadoUnaParroquiaCualquiera(parroquiaRepositorio);
// 			const parroco = dadoUnParrocoCualquiera(parrocoRepositorio);
// 			const ministro = dadoUnMinistroCualquiera(ministroRepositorio);
// 			dadoQueLaValidacionConComunionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas);
// 			dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas);
// 			dadoQueElUsuarioTienePermisosParaFirmarSacramentos(permisoServicio);

// 			const respuesta = await cuandoSeActualizaUnBautismo(
// 				sesion,
// 				idDeUnaPersonaCualqueira,
// 				bautismoRequest,
// 				null,
// 				usuarioRepositorio,
// 				personaRepositorio,
// 				validadorFechas,
// 				parroquiaRepositorio,
// 				miembroRepositorio,
// 				parrocoRepositorio,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 				permisoServicio,
// 			);

// 			expect(bautismoRepositorio.actualizar).toHaveBeenCalledWith(
// 				expect.objectContaining({
// 					miembro: miembro,
// 					fechaBautismo: bautismoRequest.fechaBautismo,
// 					parroquia: parroquia,
// 					parroco: parroco,
// 					estado: bautismoRequest.estado,
// 					ministro: ministro.nombre,
// 					observaciones: bautismoRequest.observaciones,
// 				}),
// 			);
// 			expect(bautismoRepositorio.obtenerPorId).toBeCalledTimes(2);
// 			expect(bautismoRepositorio.obtenerPorId).toHaveBeenCalledWith(bautismoRequest.id);
// 			const respuestaEsperada = bautismoRepositorio.obtenerPorId(bautismoRequest.id);
// 			expect(respuesta).toBe(respuestaEsperada);
// 		});
// 	});

// 	describe('Obtener un bautismo por id de persona', () => {
// 		it('Ocurre un error badRequest porque no viene id de persona en el request', async () => {
// 			const idPersonaNull = null;

// 			let errorObtenido;
// 			try {
// 				await cuandoSeObtieneUnBautismoPorIdDePersona(idPersonaNull, null, personaRepositorio, null, null, null, null, null, null);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_DATOS_OBLIGATORIOS,
// 				},
// 			});
// 		});

// 		it('Ocurre un error NotFound porque la persona no existe', async () => {
// 			const cualquierIdDePersona = 1;
// 			dadoQueLaPersonaNoExiste(personaRepositorio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeObtieneUnBautismoPorIdDePersona(cualquierIdDePersona, null, personaRepositorio, null, null, null, null, null, null);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}
// 			entoncesSeBuscaObtenerUnaPersonaPorId(cualquierIdDePersona, personaRepositorio);
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: NotFoundException,
// 					mensaje: MensajeDeError.PERSONA_NO_ENCONTRADA,
// 				},
// 			});
// 		});

// 		it('Ocurre un error NotFound porque la persona no tiene un bautismo asociado', async () => {
// 			const persona = dadoUnaPersonaCualquiera(personaRepositorio);
// 			dadoQueElBautismoNoExiste(bautismoRepositorio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeObtieneUnBautismoPorIdDePersona(persona.id, null, personaRepositorio, null, null, null, null, bautismoRepositorio, null);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			expect(bautismoRepositorio.obtenerPorIdPersona).toBeCalledWith(persona.id);
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: NotFoundException,
// 					mensaje: MensajeDeError.BAUTISMO_NO_ENCONTRADO,
// 				},
// 			});
// 		});

// 		it('Se retorna el bautismo correctamente', async () => {
// 			const persona = dadoUnaPersonaCualquiera(personaRepositorio);
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			const ministro = dadoUnMinistroCualquiera(ministroRepositorio);

// 			const respuesta = await cuandoSeObtieneUnBautismoPorIdDePersona(
// 				persona.id,
// 				null,
// 				personaRepositorio,
// 				null,
// 				null,
// 				null,
// 				null,
// 				bautismoRepositorio,
// 				ministroRepositorio,
// 			);

// 			const respuestaEsperada: BautismoResponse = {
// 				id: bautismo.id,
// 				idMiembro: bautismo.miembro.id,
// 				fechaBautismo: useDate(bautismo.fechaBautismo, { sendToFront: true }),
// 				idParroquia: bautismo.parroquia.id,
// 				diocesisObservaciones: bautismo.diocesisObservaciones,
// 				idParroco: bautismo.parroco.id,
// 				libro: bautismo.libro,
// 				folio: bautismo.folio,
// 				fechaFirma: useDate(bautismo.fechaFirma, { sendToFront: true }),
// 				estado: bautismo.estado,
// 				apostasiaFecha: useDate(bautismo.apostasiaFecha, { sendToFront: true }),
// 				apostasiaObservaciones: bautismo.apostasiaObservaciones,
// 				fechaBautismoUrgencia: useDate(bautismo.fechaBautismoUrgencia, { sendToFront: true }),
// 				idMinistro: ministro.id,
// 				otroBautismoIglesia: bautismo.otroBautismoIglesia,
// 				otroBautismoFecha: useDate(bautismo.otroBautismoFecha, { sendToFront: true }),
// 				observaciones: bautismo.observaciones,
// 				usaActa: bautismo.usaActa,
// 				cambioSexoFecha: useDate(bautismo.cambioSexoFecha, { sendToFront: true }),
// 				cambioSexoApellido: bautismo.cambioSexoApellido,
// 				cambioSexoNombre: bautismo.cambioSexoNombre,
// 			};

// 			expect(ministroRepositorio.buscarPorIdParroquiaYNombre).toBeCalledWith(bautismo.parroquia.id, bautismo.ministro);
// 			expect(respuesta).toBeInstanceOf(BautismoResponse);
// 			expect(respuesta).toEqual(respuestaEsperada);
// 		});
// 	});

// 	describe('Obtener un bautismo por id ', () => {
// 		it('Ocurre un error badRequest porque no viene id de bautismo en el request', async () => {
// 			const idBautismoNull = null;
// 			let errorObtenido;
// 			try {
// 				await cuandoSeObtieneUnBautismoPorId(idBautismoNull, null, null, null, null, null, null, null, null);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: BadRequestException,
// 					mensaje: MensajeDeError.FALTAN_DATOS_OBLIGATORIOS,
// 				},
// 			});
// 		});

// 		it('Ocurre un error NotFound porque el bautismo no existe', async () => {
// 			dadoQueElBautismoNoExiste(bautismoRepositorio);

// 			let errorObtenido;
// 			try {
// 				await cuandoSeObtieneUnBautismoPorId(idDeUnBautismoCualquiera, null, null, null, null, null, null, bautismoRepositorio, null);
// 			} catch (error) {
// 				errorObtenido = error;
// 			}

// 			expect(bautismoRepositorio.obtenerPorId).toBeCalledWith(idDeUnBautismoCualquiera);
// 			entoncesSeRetornaLaExcepcionExperada({
// 				errorObtenido,
// 				excepcionEsperada: {
// 					tipo: NotFoundException,
// 					mensaje: MensajeDeError.BAUTISMO_NO_ENCONTRADO,
// 				},
// 			});
// 		});

// 		it('Se retorna el bautismo correctamente', async () => {
// 			const bautismo = dadoUnBautismoCualquiera(bautismoRepositorio);
// 			const ministro = dadoUnMinistroCualquiera(ministroRepositorio);

// 			const respuesta = await cuandoSeObtieneUnBautismoPorId(bautismo.id, null, null, null, null, null, null, bautismoRepositorio, ministroRepositorio);
// 			const respuestaEsperada: BautismoResponse = {
// 				id: bautismo.id,
// 				idMiembro: bautismo.miembro.id,
// 				fechaBautismo: useDate(bautismo.fechaBautismo, { sendToFront: true }),
// 				idParroquia: bautismo.parroquia.id,
// 				diocesisObservaciones: bautismo.diocesisObservaciones,
// 				idParroco: bautismo.parroco.id,
// 				libro: bautismo.libro,
// 				folio: bautismo.folio,
// 				fechaFirma: useDate(bautismo.fechaFirma, { sendToFront: true }),
// 				estado: bautismo.estado,
// 				apostasiaFecha: useDate(bautismo.apostasiaFecha, { sendToFront: true }),
// 				apostasiaObservaciones: bautismo.apostasiaObservaciones,
// 				fechaBautismoUrgencia: useDate(bautismo.fechaBautismoUrgencia, { sendToFront: true }),
// 				idMinistro: ministro.id,
// 				otroBautismoIglesia: bautismo.otroBautismoIglesia,
// 				otroBautismoFecha: useDate(bautismo.otroBautismoFecha, { sendToFront: true }),
// 				observaciones: bautismo.observaciones,
// 				usaActa: bautismo.usaActa,
// 				cambioSexoFecha: useDate(bautismo.cambioSexoFecha, { sendToFront: true }),
// 				cambioSexoApellido: bautismo.cambioSexoApellido,
// 				cambioSexoNombre: bautismo.cambioSexoNombre,
// 			};
// 			expect(ministroRepositorio.buscarPorIdParroquiaYNombre).toBeCalledWith(bautismo.parroquia.id, bautismo.ministro);
// 			expect(respuesta).toBeInstanceOf(BautismoResponse);
// 			expect(respuesta).toEqual(respuestaEsperada);
// 		});
// 	});
// });

// function dadoQueElUsuarioNoTienePermisosParaCargarApostasia(permisoServicio: PermisoServicioInterface) {
// 	permisoServicio.validarSiElUsuarioTienePermisosParaCargarApostasiaEnLaParroquia = jest.fn().mockResolvedValue(false);
// }

// function dadoQueElUsuarioTienePermisosParaCargarApostasia(permisoServicio: PermisoServicioInterface) {
// 	permisoServicio.validarSiElUsuarioTienePermisosParaCargarApostasiaEnLaParroquia = jest.fn().mockResolvedValue(true);
// }
// function dadoQueElUsuarioNoTienePermisosParaCargarCambioDeSexo(permisoServicio: PermisoServicioInterface) {
// 	permisoServicio.validarSiElUsuarioTienePermisosParaCargarCambioSexoEnLaParroquia = jest.fn().mockResolvedValue(false);
// }

// function dadoQueElUsuarioTienePermisosParaCargarCambioDeSexo(permisoServicio: PermisoServicioInterface) {
// 	permisoServicio.validarSiElUsuarioTienePermisosParaCargarCambioSexoEnLaParroquia = jest.fn().mockResolvedValue(true);
// }

// function dadoQueElUsuarioNoTienePermisosParaFirmarSacramentos(permisoServicio: PermisoServicioInterface) {
// 	permisoServicio.validarSiElUsuarioTienePermisosParaFirmarSacramentosEnLaParroquia = jest.fn().mockResolvedValue(false);
// }

// function dadoQueElUsuarioTienePermisosParaFirmarSacramentos(permisoServicio: PermisoServicioInterface) {
// 	permisoServicio.validarSiElUsuarioTienePermisosParaFirmarSacramentosEnLaParroquia = jest.fn().mockResolvedValue(true);
// }

// function dadoUnRequestParaRegistrarOActualizarPersonaMiembroYBautismo(
// 	persona: CrearPersonaRequest | ActualizarPersonaRequest,
// 	miembro: CrearMiembroRequest | ActualizarMiembroRequest,
// 	bautismo: CrearBautismoRequest | ActualizarBautismoRequest,
// ): RegistrarOActualizarBautismoPersonaYMiembroRequest {
// 	const request = { persona, miembro, bautismo };
// 	return request;
// }

// function dadoUnRequestParaActualizarBautismoConDatosFaltantes(): ActualizarBautismoRequest {
// 	const actualizarBautismoRequest = { ...actualizarBautismoRequestMock };
// 	actualizarBautismoRequest.idParroquia = null;
// 	actualizarBautismoRequest.idMiembro = null;
// 	actualizarBautismoRequest.fechaBautismo = null;
// 	actualizarBautismoRequest.idParroco = null;
// 	actualizarBautismoRequest.idMinistro = null;
// 	return actualizarBautismoRequest;
// }

// function dadoUnBautismoParaActualizarCompleto(): ActualizarBautismoRequest {
// 	const actualizarBautismoRequest = { ...actualizarBautismoRequestMock };
// 	return actualizarBautismoRequest;
// }

// function dadoQueExisteElUsuario(usuarioRepositorio: UsuarioRepositorioInterface): Usuario {
// 	const usuario = new Usuario();
// 	usuario.id = 1;
// 	usuarioRepositorio.obtenerPorId = jest.fn().mockImplementation(() => usuario);
// 	return usuario;
// }

// function dadoUnaSession(userId?: number, roleId?: number, parishId?: number, dioceseId?: number, countryId?: number, paymentUpToDate?: boolean): RdsSession {
// 	const session: RdsSession = {
// 		idUsuario: userId || 8544,
// 		idRol: roleId || 2345,
// 		idParroquia: parishId || 5673,
// 		idDiocesis: dioceseId || 5822,
// 		idPaisUsuario: countryId || 8744,
// 		pagoAlDia: !!paymentUpToDate,
// 	};
// 	return session;
// }

// function dadoUnaPersonaCualquiera(personaRepositorio: PersonaRepositorioInterface): Persona {
// 	const persona = new Persona();
// 	persona.id = idDeUnaPErsonaCualquiera;
// 	personaRepositorio.obtenerUnaPorId = jest.fn().mockImplementation(() => persona);
// 	return persona;
// }

// export function dadoUnBautismoCualquiera(bautismoRepositorio: BautismoRepositorioInterface): Bautismo {
// 	const bautismo = { ...unBautismoCualquiera };
// 	bautismoRepositorio.obtenerPorIdPersona = jest.fn().mockReturnValue(bautismo);
// 	bautismoRepositorio.obtenerPorId = jest.fn().mockReturnValue(bautismo);
// 	return bautismo;
// }

// function dadoQueExisteLaParroquia(repositorioParroquia: ParroquiaRepositorioInterface) {
// 	repositorioParroquia.obtenerPorId = jest.fn().mockImplementation(() => new Parroquia());
// }

// function dadoQueExisteLaParroquiaNoUsaActa(repositorioParroquia: ParroquiaRepositorioInterface) {
// 	const parroquia = new Parroquia();
// 	parroquia.usaActa = false;
// 	repositorioParroquia.obtenerPorId = jest.fn().mockImplementation(() => parroquia);
// }

// function dadoQueExisteLaParroquiaQueUsaActa(fechaInicioActa: string, repositorioParroquia: ParroquiaRepositorioInterface) {
// 	const parroquia = new Parroquia();
// 	parroquia.usaActa = true;
// 	parroquia.fechaInicioActa = fechaInicioActa;
// 	repositorioParroquia.obtenerPorId = jest.fn().mockImplementation(() => parroquia);
// }

// function dadoQueExisteLaPersona(repositorioPersona: PersonaRepositorioInterface) {
// 	repositorioPersona.obtenerUnaPorId = jest.fn().mockImplementation(() => new Persona());
// }

// export function dadoQueElBautismoNoExiste(repositorio: BautismoRepositorioInterface) {
// 	repositorio.obtenerPorIdPersona = jest.fn().mockImplementation(() => undefined);
// 	repositorio.obtenerPorId = jest.fn().mockImplementation(() => undefined);
// }

// function dadoQueYaExisteUnBautismoParaLaPersona(repositorio: BautismoRepositorioInterface) {
// 	repositorio.obtenerPorIdPersona = jest.fn().mockImplementation(() => new Bautismo());
// }

// function dadoQueExisteElMiembro(repositorioMiembro: MiembroRepositorioInterface) {
// 	repositorioMiembro.obtenerPorId = jest.fn().mockImplementation(() => new Miembro());
// }

// function dadoQueExisteElMiembroConEmail(repositorioMiembro: MiembroRepositorioInterface, email: string) {
// 	const miembro = new Miembro();
// 	miembro.email = email;
// 	repositorioMiembro.obtenerPorId = jest.fn().mockImplementation(() => miembro);
// }

// function dadoQueExisteElParroco(repositorioParroco: ParrocoRepositorioInterface) {
// 	repositorioParroco.obtenerPorId = jest.fn().mockImplementation(() => new Parroco());
// }

// function dadoQueExisteElMinistro(repositorioMinistro: MinistroRepositorioInterface) {
// 	repositorioMinistro.buscarPorId = jest.fn().mockImplementation(() => new Ministro(null, 'Juan Perez'));
// }

// function dadoQueLaValidacionConComunionResultaNegativa(validadorFechas: ValidadorFechasInterface) {
// 	validadorFechas.bautismoConComunion = jest.fn().mockImplementation(() => {
// 		throw new BadRequestException();
// 	});
// }
// function dadoQueLaValidacionConComunionResultaPositiva(validadorFechas: ValidadorFechasInterface) {
// 	validadorFechas.bautismoConComunion = jest.fn().mockReturnValue(true);
// }

// function dadoQueLaValidacionConConfirmacionResultaPositiva(validadorFechas: ValidadorFechasInterface) {
// 	validadorFechas.bautismoConConfirmacion = jest.fn().mockReturnValue(true);
// }

// function dadoQueLaValidacionConMatrimonioResultaPositiva(validadorFechas: ValidadorFechasInterface) {
// 	validadorFechas.bautismoConMatrimonio = jest.fn().mockReturnValue(true);
// }
// function dadoQueLaValidacionConConfirmacionResultaNegativa(validadorFechas: ValidadorFechasInterface) {
// 	validadorFechas.bautismoConConfirmacion = jest.fn().mockImplementation(() => {
// 		throw new BadRequestException();
// 	});
// }

// function dadoQueLaValidacionConMatrimonioResultaNegativa(validadorFechas: ValidadorFechasInterface) {
// 	validadorFechas.bautismoConMatrimonio = jest.fn().mockImplementation(() => {
// 		throw new BadRequestException();
// 	});
// }

// function dadoQueLaCreacionOActualizacionDePersonaFalla(personaServicio: PersonaServicioInterface): BadRequestException {
// 	const badRequestException = new BadRequestException('un error cualquiera');
// 	personaServicio.crear = jest.fn().mockRejectedValue(badRequestException);
// 	personaServicio.actualizar = jest.fn().mockRejectedValue(badRequestException);
// 	return badRequestException;
// }

// function dadoQueLaCreacionOActualizacionDeMiembroFalla(miembroServicio: MiembroServicioInterface): BadRequestException {
// 	const badRequestException = new BadRequestException('un error cualquiera');
// 	miembroServicio.crear = jest.fn().mockRejectedValue(badRequestException);
// 	miembroServicio.actualizar = jest.fn().mockRejectedValue(badRequestException);
// 	return badRequestException;
// }

// function dadoQueLaCreacionOActualizacionDeBautismoFalla(bautismoRepositorio: BautismoRepositorioInterface): BadRequestException {
// 	const badRequestException = new BadRequestException('un error cualquiera');
// 	bautismoRepositorio.crear = jest.fn().mockRejectedValue(badRequestException);
// 	bautismoRepositorio.actualizar = jest.fn().mockRejectedValue(badRequestException);
// 	return badRequestException;
// }

// function dadoUnValidadorFechas(): ValidadorFechasInterface {
// 	return {
// 		bautismoConComunion: jest.fn(),
// 		bautismoConConfirmacion: jest.fn(),
// 		bautismoConMatrimonio: jest.fn(),
// 	};
// }

// function dadoUnRequestParaCrearBautismo(): CrearBautismoRequest {
// 	const bautismoRequest = new CrearBautismoRequest();
// 	bautismoRequest.idParroquia = 1;
// 	bautismoRequest.idMiembro = 1;
// 	bautismoRequest.fechaBautismo = '01/01/1970';
// 	bautismoRequest.idParroco = 1;
// 	bautismoRequest.idMinistro = 1;
// 	return bautismoRequest;
// }

// function dadoUnRequestConCambioDeSexo(): CrearBautismoRequest {
// 	const bautismoRequest = dadoUnRequestParaCrearBautismo();
// 	bautismoRequest.cambioSexoNombre = 'Sergia';
// 	bautismoRequest.cambioSexoApellido = 'Risposi';
// 	return bautismoRequest;
// }

// function dadoUnRequestConApostasia(): CrearBautismoRequest {
// 	const bautismoRequest = dadoUnRequestParaCrearBautismo();
// 	bautismoRequest.apostasia = true;
// 	bautismoRequest.apostasiaObservaciones = 'Cualquiera Observacion de apostasia';
// 	return bautismoRequest;
// }

// function dadoUnRequestConCambioDeSexoConRequestInconsistente(): CrearBautismoRequest {
// 	const bautismoRequest = dadoUnRequestParaCrearBautismo();
// 	bautismoRequest.cambioSexoNombre = 'John';
// 	bautismoRequest.cambioSexoApellido = undefined;
// 	return bautismoRequest;
// }

// function dadoUnRequestConFechaBautismoLibroYFolio(fechaBautismo: string): CrearBautismoRequest {
// 	const bautismoRequest = dadoUnRequestParaCrearBautismo();
// 	bautismoRequest.fechaBautismo = fechaBautismo;
// 	bautismoRequest.libro = 'Cualquier libro';
// 	bautismoRequest.folio = 'Cualquier folio';
// 	return bautismoRequest;
// }

// function entoncesSeGuardaElBautismoCon(
// 	usuarioRepositorio: UsuarioRepositorioInterface,
// 	repositorioPersona: PersonaRepositorioInterface,
// 	validadorFechas: ValidadorFechasInterface,
// 	repositorioParroquia: ParroquiaRepositorioInterface,
// 	repositorioMiembro: MiembroRepositorioInterface,
// 	parrocoRepositorio: ParrocoRepositorioInterface,
// 	repositorioBautismo: BautismoRepositorioInterface,
// ) {
// 	expect(usuarioRepositorio.obtenerPorId).toHaveBeenCalled();
// 	expect(repositorioPersona.obtenerUnaPorId).toHaveBeenCalled();
// 	expect(validadorFechas.bautismoConComunion).toHaveBeenCalled();
// 	expect(validadorFechas.bautismoConConfirmacion).toHaveBeenCalled();
// 	expect(validadorFechas.bautismoConMatrimonio).toHaveBeenCalled();
// 	expect(repositorioParroquia.obtenerPorId).toHaveBeenCalled();
// 	expect(repositorioMiembro.obtenerPorId).toHaveBeenCalled();
// 	expect(parrocoRepositorio.obtenerPorId).toHaveBeenCalled();
// 	expect(repositorioBautismo.crear).toHaveBeenCalled();
// }

// function entoncesLaRespuestaEsUnBautismoCreado(respositorioBautismo: BautismoRepositorioInterface) {
// 	const bautismoAGuardar = generarBautismoAGuardarEsperado();
// 	expect(respositorioBautismo.crear).toBeCalledWith(bautismoAGuardar);
// }

// function entoncesLaRespuestaEsUnBautismoCreadoConCambioDeSexo(respositorioBautismo: BautismoRepositorioInterface) {
// 	expect(respositorioBautismo.crear).toHaveBeenCalledWith(
// 		expect.objectContaining({
// 			cambioSexoNombre: 'Sergia',
// 			cambioSexoApellido: 'Risposi',
// 			cambioSexoUsuario: { id: 1 },
// 		}),
// 	);
// }

// function entoncesSeAgregaElEmailDelUsuarioALaBlackList(servicioDeEmail: EmailServicioInterface, email: string) {
// 	//TODO: PROBAR CUANDO ESTE LISTO EL BAUTISMO
// 	//expect(servicioDeEmail.agregarEmailABlackList).toHaveBeenCalledWith(email);
// }

// function entoncesSeInformaQueNoSeTienenLosDatosObligatorios(error) {
// 	expect(error).toBeInstanceOf(BadRequestException);
// 	expect(error.message).toEqual(MensajeDeError.FALTAN_DATOS_OBLIGATORIOS);
// }

// function entoncesSeInformaQueFaltanLosDatosParaElBautismoConCambioDeSexo(error) {
// 	expect(error).toBeInstanceOf(BadRequestException);
// 	expect(error.message).toEqual('Faltan apellido y nombre para cambio de sexo.');
// }

// function entoncesSeObtieneUnaExcepcionBadRequest(error) {
// 	expect(error).toBeInstanceOf(BadRequestException);
// }

// function entoncesLibroYFolioDebenQuedarEnNulo(respositorioBautismo: BautismoRepositorioInterface) {
// 	expect(respositorioBautismo.crear).toHaveBeenCalledWith(
// 		expect.objectContaining({
// 			libro: null,
// 			folio: null,
// 			usaActa: true,
// 		}),
// 	);
// }

// function entoncesSeBuscaObtenerUnaPersonaPorId(idPersona: Number, repositorioPersona: PersonaRepositorioInterface) {
// 	expect(repositorioPersona.obtenerUnaPorId).toHaveBeenCalled();
// 	expect(repositorioPersona.obtenerUnaPorId).toHaveBeenCalledWith(idPersona);
// }

// function generarBautismoAGuardarEsperado() {
// 	const bautismoAGuardar = new Bautismo();
// 	const usuario = new Usuario();
// 	usuario.id = 1;
// 	bautismoAGuardar.usuarioCarga = usuario;
// 	const parroquia = new Parroquia();
// 	parroquia.usaActa = false;
// 	bautismoAGuardar.parroquia = parroquia;
// 	bautismoAGuardar.usaActa = false;
// 	bautismoAGuardar.libro = 'Cualquier libro';
// 	bautismoAGuardar.folio = 'Cualquier folio';
// 	bautismoAGuardar.miembro = new Miembro();
// 	bautismoAGuardar.fechaBautismo = '2024-11-18';
// 	const parroco = new Parroco();
// 	parroco.actual = false;
// 	parroco.estado = 1;
// 	bautismoAGuardar.parroco = parroco;
// 	bautismoAGuardar.ministro = 'Juan Perez';
// 	bautismoAGuardar.observaciones = undefined;
// 	bautismoAGuardar.estado = EstadoBautismo.CREADO_SIN_FIRMA;
// 	bautismoAGuardar.fechaCarga = useDate(new Date(), { storeInDb: true });
// 	return bautismoAGuardar;
// }

// async function cuandoSeCreaUnBautismo(
// 	idUsuario: number,
// 	idPersona: number,
// 	bautismoRequest: CrearBautismoRequest,
// 	usuarioRepositorio: UsuarioRepositorioInterface,
// 	repositorioPersona: PersonaRepositorioInterface,
// 	validadorFechas: ValidadorFechasInterface,
// 	repositorioParroquia: ParroquiaRepositorioInterface,
// 	repositorioMiembro: MiembroRepositorioInterface,
// 	repositorioParroco: ParrocoRepositorioInterface,
// 	repositorioBautismo: BautismoRepositorioInterface,
// 	emailServicioInterface: EmailServicioInterface,
// 	ministroRepositorio: MinistroRepositorioInterface,
// ): Promise<Bautismo> {
// 	const servicio = new BautismoServicio(
// 		usuarioRepositorio,
// 		repositorioPersona,
// 		validadorFechas,
// 		repositorioParroquia,
// 		repositorioMiembro,
// 		repositorioParroco,
// 		repositorioBautismo,
// 		ministroRepositorio,
// 		null,
// 	);
// 	return servicio.crear(idUsuario, idPersona, bautismoRequest);
// }

// async function cuandoSeObtieneUnBautismoPorIdDePersona(
// 	idPersona: number | null,
// 	usuarioRepositorio: UsuarioRepositorioInterface,
// 	personaRepositorio: PersonaRepositorioInterface,
// 	validadorFechas: ValidadorFechasInterface,
// 	parroquiaRepositorio: ParroquiaRepositorioInterface,
// 	miembroRepositorio: MiembroRepositorioInterface,
// 	parrocoRepositorio: ParrocoRepositorioInterface,
// 	bautismoRepositorio: BautismoRepositorioInterface,
// 	ministroRepositorio: MinistroRepositorioInterface,
// ) {
// 	const servicioBautismo = new BautismoServicio(
// 		usuarioRepositorio,
// 		personaRepositorio,
// 		validadorFechas,
// 		parroquiaRepositorio,
// 		miembroRepositorio,
// 		parrocoRepositorio,
// 		bautismoRepositorio,
// 		ministroRepositorio,
// 		null,
// 	);
// 	return await servicioBautismo.obtenerPorIdDePersona(idPersona);
// }

// async function cuandoSeObtieneUnBautismoPorId(
// 	idBautismo: number | null,
// 	usuarioRepositorio: UsuarioRepositorioInterface,
// 	personaRepositorio: PersonaRepositorioInterface,
// 	validadorFechas: ValidadorFechasInterface,
// 	parroquiaRepositorio: ParroquiaRepositorioInterface,
// 	miembroRepositorio: MiembroRepositorioInterface,
// 	parrocoRepositorio: ParrocoRepositorioInterface,
// 	bautismoRepositorio: BautismoRepositorioInterface,
// 	ministroRepositorio: MinistroRepositorioInterface,
// ) {
// 	const servicioBautismo = new BautismoServicio(
// 		usuarioRepositorio,
// 		personaRepositorio,
// 		validadorFechas,
// 		parroquiaRepositorio,
// 		miembroRepositorio,
// 		parrocoRepositorio,
// 		bautismoRepositorio,
// 		ministroRepositorio,
// 		null,
// 	);
// 	return await servicioBautismo.obtenerPorId(idBautismo);
// }

// async function cuandoSeActualizaUnBautismo(
// 	sesion: RdsSession,
// 	idPersona: number,
// 	bautismoRequest: ActualizarBautismoRequest,
// 	firmar: boolean,
// 	usuarioRepositorio: UsuarioRepositorioInterface,
// 	repositorioPersona: PersonaRepositorioInterface,
// 	validadorFechas: ValidadorFechasInterface,
// 	repositorioParroquia: ParroquiaRepositorioInterface,
// 	repositorioMiembro: MiembroRepositorioInterface,
// 	repositorioParroco: ParrocoRepositorioInterface,
// 	repositorioBautismo: BautismoRepositorioInterface,
// 	ministroRepositorio: MinistroRepositorioInterface,
// 	permisoServicio: PermisoServicioInterface,
// ): Promise<Bautismo> {
// 	const servicio = new BautismoServicio(
// 		usuarioRepositorio,
// 		repositorioPersona,
// 		validadorFechas,
// 		repositorioParroquia,
// 		repositorioMiembro,
// 		repositorioParroco,
// 		repositorioBautismo,
// 		ministroRepositorio,
// 		permisoServicio,
// 	);
// 	return servicio.actualizar(sesion, idPersona, bautismoRequest, firmar);
// }
