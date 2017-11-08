import myConst from '../constants';

export default class Util
{
		getDateAndTime()
		{
		//create date object
		const date = new Date();

		//get month, day & year to create a formatted Date string
		var month = "";
		const day = date.getDay();
		const year = date.getYear();

		//get hour, min. & sec. to create formateed Time string
		const hour = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		//mapping month number to correct name
		switch(date.getMonth())
		{
			case 1 : month = myConst.month.jan; break
			case 2 : month = myConst.month.feb; break
			case 3 : month = myConst.month.mar; break
			case 4 : month = myConst.month.apr; break
			case 5 : month = myConst.month.may; break
			case 6 : month = myConst.month.jun; break
			case 7 : month = myConst.month.jul; break
			case 8 : month = myConst.month.aug; break
			case 9 : month = myConst.month.sep; break
			case 10 : month = myConst.month.oct; break
			case 11 : month = myConst.month.nov; break
			case 12 : month = myConst.month.dec; break
			default : throw new Error("Not a valid month, please check: getDateAndTime() function");
		}

		//formatted Date & Time String ***DO NOT MODIFY***
		const formattedDate_Str = month+" "+day+", "+year;
		const formattedTime_Str = hour+":"+minutes+":"+seconds;
		
		

		//returning a a JSON object with date & time string DO NOT MODIFY
		return { date: formattedDate_Str, time: formattedTime_Str};

	};	
}
