import { setCookie, deleteCookie, getCookie } from "./cookie";

function setCurrentToken(token) {
	try {
		setCookie('_n', token, 10);
	}catch(err){
		console.log(err);
		return false;
	}
}

function getCurrentToken() {
	try {
		return getCookie('_n');		
	}catch(err){
		console.log(err);
		return false;
	}	
}

function deleteCurrentToken() {
	try {
		return deleteCookie('_n');
	}catch(err){
		console.log(err);
		return true;
	}
}


const modules = {
	deleteCurrentToken,
	setCurrentToken,
	getCurrentToken	
}

export default modules;