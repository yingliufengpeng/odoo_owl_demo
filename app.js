
// Owl Components
class Main extends Component {

    setup() {

    }

    static props = {
        items: { type: Array, optional: false },
    };
}


Main.template = 'Main';


Root.components = {
    ...Root.components,
    Main,
}

