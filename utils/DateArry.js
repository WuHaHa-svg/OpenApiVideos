export const DateToArry = (Date)=>{
	return Date.split('-')
}


export const ArryToDate = (Arry)=>{
	return Arry.join('-')
}



// var date = "0001-01-01"
// var arry = [1970,1,1]

// console.log(DateToArry(date))
// console.log(ArryToDate(arry))