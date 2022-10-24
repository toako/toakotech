const GlobalFunctions = {
    //From this cool dude, Elias Van Ootegem, on StackOverflow here: https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string
    removeOuterQuotations(str) {
        return str.replace(/^["'](.+(?=["']$))["']$/, '$1');
    }
}

export default GlobalFunctions;