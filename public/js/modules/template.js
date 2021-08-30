export { Template };

// template manager
class Template {
   
    // load all template HTML files
    static async loadTemplates () {
        Template.templates = {};
        Template.templates['media-photo'] = await Template.loadTemplate("media-photo");
        Template.templates['media-video'] = await Template.loadTemplate("media-video");
        Template.templates['photographer-card-horizontal'] = await Template.loadTemplate("photographer-card-horizontal");
        Template.templates['photographer-card'] = await Template.loadTemplate("photographer-card");
        Template.templates['photographer-infos'] = await Template.loadTemplate("photographer-infos");
        Template.templates['tag'] = await Template.loadTemplate("tag");
        Template.templates['modal-contact'] = await Template.loadTemplate("modal-contact");
        Template.templates['modal-lightbox'] = await Template.loadTemplate("modal-lightbox");
    }

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
    static fillTemplate ( templateName, object ) {
        const templateContent = Template.templates[templateName];
        return templateContent.replace(
            /{(\w*)}/g, 
            function( m, key ) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    return object[key];
                } else {
                    return "";
                }
            }
        );
    }
}
