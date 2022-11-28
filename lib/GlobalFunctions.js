const GlobalFunctions = {
    //From this cool dude, Elias Van Ootegem, on StackOverflow here: https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string
    removeOuterQuotations(str) {
        return str.replace(/^["'](.+(?=["']$))["']$/, '$1');
    },
    randomNumInt (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    createArrayOfIntegers(amount, plusOne) {
        let tempArray = [];
        for (let i = 0; i < amount; i++) {
            tempArray.push(plusOne ? i + 1 : i);
        }
        return tempArray;
    }
}

export default GlobalFunctions;