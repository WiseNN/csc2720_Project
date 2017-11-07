// This file exists to create a safe way to use any user defined (meaning defined by you) constants 
// that will not change throughout the lifecycle of the application. Please do not list any 
// confidential keys here. Import using this syntax: 
// 
// 	import myConst from 'constants';
// 
// 	//how to use
// 	myConst.yourConstant


const constants = {
	month : {
		jan : "January",
		feb : "Febuary",
		mar : "March",
		apr : "April",
		may : "May",
		jun : "June",
		jul : "July",
		aug : "August",
		sep : "September",
		oct : "October",
		nov : "November",
		dec : "December"
	}
};

export default constants;