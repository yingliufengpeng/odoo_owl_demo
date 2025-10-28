
class Item extends Component {

    setup() {
        this.state = useState({
            count: 0,
        })
    }
    OnDelteItem() {
        this.env.DeleteItem(this.props.id);
    }
}

Item.template = 'Item';
Item.props = {
    id: Number,
    name: String,
    age: Number,
    slots: Object,
}


// Owl Components
class Main extends Component {

    setup() {

    }

    static props = {
        items: { type: Array, optional: false },
    };

    AddItem() {
        const rand = Math.random() * 1000
        const rand1 = Math.floor(rand)
        let name = rand1 + '4';
        let age = rand1;
        console.log(this.env);
        this.env.UpdateItems('add', name, age);
        // this.props.UpdateItems('add', name, age);
    }
}


Main.template = 'Main';
Main.components = {
    Item,
}


Root.components = {
    ...Root.components,
    Main,
}

