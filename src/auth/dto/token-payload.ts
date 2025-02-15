export class TokenPayload {
	id: number;
	username: string;
	isAdmin: boolean;
}

export class RequestWithUserPayload extends Request {
	user: TokenPayload;
}
