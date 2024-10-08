import  { setupKinde, GrantType } from "@kinde-oss/kinde-node-express";
import { app } from "../application/web";


const config = {
	clientId: process.env.KINDE_CLIENT_ID!,
	issuerBaseUrl: "https://innovatechsolusindo.kinde.com",
	siteUrl: "http://localhost:3000",
	secret: process.env.KINDE_CLIENT_SECRET!,
	redirectUrl: process.env.KINDE_CLIENT_REDIRECT_URL!,
	scope: "openid profile email",
	grantType: GrantType.AUTHORIZATION_CODE,
	unAuthorisedUrl: "http://localhost:3000/unauthorised",
	postLogoutRedirectUrl: "http://localhost:3000"
}

setupKinde(config, app);
