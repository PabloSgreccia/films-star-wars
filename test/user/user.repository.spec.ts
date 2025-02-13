// import { Repository } from 'typeorm';
// import { Bautismo } from '../../src/rds/entidades/bautismo';
// import { BautismoRepositorio } from '../../src/rds/bautismo/bautismo.repositorio';

// describe('Repositorio de persona.', () => {
// 	let entidadBautismoRepositorio: jest.Mocked<Repository<Bautismo>>;

// 	beforeAll(() => {
// 		entidadBautismoRepositorio = dadoUnRepositorioDeEntidadDeBautismo();
// 	});

// 	it('Se busca correctamente un Bautismo por id de persona', async () => {
// 		const cualquierIdPersona = 9871;
// 		cuandoSeBuscaUnBautismoPorIdPersona(entidadBautismoRepositorio, cualquierIdPersona);

// 		expect(entidadBautismoRepositorio.findOne).toHaveBeenCalledWith({
// 			where: { miembro: { persona: { id: cualquierIdPersona } } },
// 			relations: {
// 				parroquia: true,
// 				parroco: true,
// 				miembro: true,
// 				usuarioCarga: true,
// 				usuarioFirma: true,
// 				apostasiaUsuario: true,
// 			},
// 		});
// 	});

// 	it('Se busca correctamente un Bautismo por id', async () => {
// 		const cualquierIdBautismo = 2395;
// 		cuandoSeBuscaUnBautismoPorId(entidadBautismoRepositorio, cualquierIdBautismo);

// 		expect(entidadBautismoRepositorio.findOne).toHaveBeenCalledWith({
// 			where: { id: cualquierIdBautismo },
// 			relations: {
// 				parroquia: true,
// 				parroco: true,
// 				miembro: true,
// 				usuarioCarga: true,
// 				usuarioFirma: true,
// 				apostasiaUsuario: true,
// 			},
// 		});
// 	});
// });

// function cuandoSeBuscaUnBautismoPorIdPersona(entidadBautismoRepositorio: jest.Mocked<Repository<Bautismo>>, idPersona: number) {
// 	const repo = new BautismoRepositorio(entidadBautismoRepositorio, null);
// 	return repo.obtenerPorIdPersona(idPersona);
// }

// function cuandoSeBuscaUnBautismoPorId(entidadBautismoRepositorio: jest.Mocked<Repository<Bautismo>>, idBautismo: number) {
// 	const repo = new BautismoRepositorio(entidadBautismoRepositorio, null);
// 	return repo.obtenerPorId(idBautismo);
// }

// function dadoUnRepositorioDeEntidadDeBautismo(): jest.Mocked<Repository<Bautismo>> {
// 	return {
// 		findOne: jest.fn(),
// 	} as unknown as jest.Mocked<Repository<Bautismo>>;
// }
