import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

type ResponsesCodes = 200 | 201 | 400 | 401 | 403 | 404;

interface ApiBaseDecorator {
	title?: string;
	description: string;
	posibleResponses?: ResponsesCodes[];
	requiresJWT?: boolean;
	bodyType?: any;
	paramsType?: { name: string; type: 'number' }[];
	responseType?: any;
}

export function ApiDocumentation({ requiresJWT = false, title, description, posibleResponses = [], bodyType, responseType, paramsType }: ApiBaseDecorator) {
	const responseDecorators = posibleResponses.map((code) => {
		let responseDescription = '';
		let responseTypeRes: any;
		switch (code) {
			case 200:
				responseDescription = 'Request was successful.';
				responseTypeRes = responseType;
				break;
			case 201:
				responseDescription = 'Entity successfully registered.';
				responseTypeRes = responseType;
				break;
			case 400:
				responseDescription = 'Bad Request: The request body is invalid.';
				break;
			case 401:
				responseDescription = 'Unauthorized: Invalid credentials.';
				break;
			case 403:
				responseDescription = 'Forbidden: User does not have permission.';
				break;
			case 404:
				responseDescription = 'Not Found: The requested resource was not found.';
				break;
		}

		return ApiResponse({ status: code, description: responseDescription, type: responseTypeRes });
	});

	return applyDecorators(
		ApiOperation({
			summary: title,
			description: description || 'Default description',
		}),
		...responseDecorators,
		...(bodyType ? [ApiBody({ type: bodyType })] : []),
		...(paramsType?.forEach((param) => ApiParam({ name: param.name, type: param.type })) || []),
		...(requiresJWT ? [ApiBearerAuth()] : []),
	);
}
