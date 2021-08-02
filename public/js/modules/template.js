export { fillTemplate };

// load template HTML file
async function loadTemplate (templateName) {
    return fetch('./public/templates/' + templateName + '.html')
        
        .then(function(response) {
            if (response.status !== 200) {
                console.log('Bad response from server! Status Code: ' + response.status);
                return;
            }
            return response.text();
        
        }).catch(function(err) {
            console.log('Error occurred!', err);
        });
}

async function fillTemplate ( templateName, object ) {
    const templateContent = await loadTemplate(templateName);
    return templateContent
        .replace(
        /{(\w*)}/g, 
        function( m, key ) {
            if (object.hasOwnProperty(key)) {
                return object[key];
            } else {
                return "";
            }
        }
    );
}