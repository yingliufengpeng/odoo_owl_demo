const { Component, mount, xml, loadFile } = owl;

// Owl Components
class Root extends Component {
}

Root.template = 'Root';


// async, so we can use async/await
(async function setup() {
    const get_xml_string = async (urls) => {
        return await Promise.all(urls.map(async url => loadFile(url)));
    }

    const rootString_ls = await get_xml_string([
        '/static/templates/Root.xml',
    ]);
    let templates = {};
    const parser = new DOMParser();
    for (const rootString of rootString_ls) {
        const doc = parser.parseFromString(rootString, "text/xml")
        const xml_doc = doc.firstChild;
        for (const t_doc of xml_doc.children) {
            templates[t_doc.getAttribute('t-name')] = t_doc;
        }
    }

    const getTemplate = (name) => {
        return templates[name];
    }

    const env = {
    };

    mount(Root, document.body, { env, templates, dev: true  });
})();