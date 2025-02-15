import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

type ResponsesCodes = 200 | 201 | 400 | 401 | 403 | 404;

interface ApiBaseDecorator {
	title: string;
	description: string;
	posibleResponses: ResponsesCodes[];
	requiresJWT: boolean;
	bodyType?: any;
	responseType?: any;
}

export function ApiDocumentation({ requiresJWT = false, title, description, posibleResponses = [], bodyType, responseType }: ApiBaseDecorator) {
	const responseDecorators = posibleResponses.map((code) => {
		let responseDescription = '';
		switch (code) {
			case 200:
				responseDescription = 'Request was successful.';
				break;
			case 201:
				responseDescription = 'Entity successfully registered.';
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

		return ApiResponse({ status: code, description: responseDescription, type: responseType });
	});

	return applyDecorators(
		ApiOperation({
			summary: title || 'Default title',
			description: description || 'Default description',
		}),
		...responseDecorators,
		...(bodyType ? [ApiBody({ type: bodyType })] : []),
		...(requiresJWT ? [ApiBearerAuth()] : []),
	);
}
