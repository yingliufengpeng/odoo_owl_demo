
const { Component, mount, xml, reactive } = owl;
// in the main js file:
const { loadFile } = owl;
const items = [
    {
        name: 'A',
        age: 4,
    },

    {
        name: 'A2',
        age: 43,
    },
];


const  reactive_items = reactive(items);




