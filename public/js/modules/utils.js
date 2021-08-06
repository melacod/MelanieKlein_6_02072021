export { Utils };

// utility functions
class Utils {

    // compute string date to object date
    static computeDate (strDate) {
        let parts = strDate.split('-');
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }

    //get parameter value from url parameters
    static findGetParameter (searchParameterName) {
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
}



