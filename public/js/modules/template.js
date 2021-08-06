export { Template };

// template manager
class Template {

    // load template HTML file
    static async loadTemplate (templateName) {
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

    // load template HTML file and replace {attribute} tags
    static async fillTemplate ( templateName, object ) {
        const templateContent = await Template.loadTemplate(templateName);
        return templateContent.replace(
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
}
