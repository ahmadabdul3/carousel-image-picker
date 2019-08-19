// const hash = {
// 	levelOneFirst: 'level one',
//   levelOneSecond: {
//   	levelTwoFirst: 'level two first',
//     levelTwoSecond: 'level two',
//     levelTwoThird: {
//     	levelThreeFirst: 'first three',
//     },
//   },
//   levelOneThird: {
//   	levelTwoFirst: 'asdf',
//     levelTwoSecond: {
//     	levelThreeFirst: 'a;sldkfj'
//     },
//   },
// };

export default function convertCamelToSnake(hash) {
	// console.log('initial hash', hash);
	if (!hash) return;
	const finalHash = {};

  Object.keys(hash).forEach(function(key) {
		const value = hash[key];
		if (!value) return;
    if (value.length) {
    	finalHash[convertToSnake(key)] = value;
    } else if (typeof value === 'number') {
			finalHash[convertToSnake(key)] = value;
		} else if (typeof value === "boolean") {
			finalHash[convertToSnake(key)] = value;
		} else {
    	finalHash[convertToSnake(key)] = convertCamelToSnake(value);
    }
  });

	// console.log('final hash', finalHash);
  return finalHash;
}

function convertToSnake(string) {
	let newString = '';
  for (let i = 0; i < string.length; i++) {
  	const char = string[i];
		if (isNaN(parseInt(char, 10))) {
	    if (char === char.toUpperCase()) {
	    	newString += '_' + char.toLowerCase();
	    } else {
	    	newString += char;
	    }
		} else {
			newString += char;
		}
  }
  return newString;
}

// console.log(toSnake(hash));
