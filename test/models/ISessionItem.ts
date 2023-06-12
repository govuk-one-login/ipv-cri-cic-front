export interface ICICSession {
	given_names?: string[];
	family_names?: string[];
	date_of_birth?: string;
	date_of_expiry?: string;
	document_selected?: string;
	
}

export interface ISessionItem extends ICICSession {
	sessionId: string;
	accessTokenExpiryDate?: number;
	authorizationCodeExpiryDate?: number;
	authSessionState: string;
	clientId: string;
	clientSessionId: string;
	createdDate: number;
	redirectUri: string;
	state: string;
	subject: string;
}

