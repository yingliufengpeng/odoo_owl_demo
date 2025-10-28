
const { Component, mount, xml, loadFile, reactive, useState, useSubEnv, whenReady } = owl;

// Owl Components
class Root extends Component {
    setup()  {
        this.items = reactive_items;
        useSubEnv({
            UpdateItems,
            DeleteItem
        })
    }
    static template = xml` <Main items="items"></Main> `
}



const items = [
    {
        id: 1,
        name: 'A1',
        age: 43,
    },

    {
        id: 2,
        name: 'A2',
        age: 43,
    },
];

let id = items.length + 1;

const UpdateItems = (type, name, age) => {
    if (type === 'add') {
        reactive_items.push({ id, name, age });
        id += 1;
    }
}

const DeleteItem = (id) => {
    // reactive_items.remove(id - 1);
    let i = reactive_items.findIndex(item => item.id === id);
    reactive_items.splice(i, 1);
}

const reactive_items = reactive(items);

whenReady(async () => {
    const get_xml_string = async (urls) => {
        return await Promise.all(urls.map(async url => loadFile(url)));
    }

    const rootString_ls = await get_xml_string([
        '/static/templates/Main.xml',
        '/static/templates/Item.xml',
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
    console.log(templates);
    const getTemplate = (name) => {
        return templates[name];
    }

    const env = {
    };

    mount(Root, document.body, { env, templates, dev: true  });
})


