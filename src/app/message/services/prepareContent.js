angular.module('proton.message')
.factory('prepareContent', function(transformLinks, transformImages, transformWelcome, transformBlockquotes, transformAttachement) {
    return function(content, message) {
        const div = document.createElement('div');
        const transformers = [transformLinks, transformImages, transformWelcome, transformBlockquotes];

        div.innerHTML = content;

        const output =  transformers.reduceRight((html, transformer) => transformer(html, message), div);

        transformAttachement(output, message);
        return output.innerHTML;
    };
});
