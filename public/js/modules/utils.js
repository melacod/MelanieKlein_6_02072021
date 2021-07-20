export { findGetParameter };

function findGetParameter (searchParameterName) {
    let parameters = location.search.substr(1).split("&");
    for (let parameter of parameters) {
        let parameterInfo = parameter.split("=");
        let parameterName = parameterInfo[0];
        let parameterValue = parameterInfo[1];
        if (parameterName === searchParameterName) {
            return decodeURIComponent(parameterValue);
        }
    }
    return null;
}