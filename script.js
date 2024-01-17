AFRAME.registerComponent('colorchanger', {

    init: function () {

        this.colour_options = [
            '#ffffff',
            '#ff0000',
            '#00ff00'
        ]

        this.colour_switched = false;

        let el = this.el;
        let self = this;
        self.trees = [];
        el.addEventListener("model-loaded", e => {
            let tree3D = el.getObject3D('mesh');
            if (!tree3D) { return; }
            console.log('tree3D', tree3D);
            tree3D.traverse(function (node) {
                if (node.isMesh) {
                    console.log(node);
                    self.trees.push(node);
                    if (node.name == "map") {
                        self.treeMat = node.material;
                        console.log('success');
                    }
                    node.material.map = null;
                }
            });

        });
    },

    tick: function (time){

            const change_colour = () => {
                let colorp = this.colour_options[Math.floor(Math.random()*this.colour_options.length)]
                console.log(colorp);
                let colorHex = Number(colorp.replace('#', '0x'));
                let color3D = new THREE.Color(colorHex);
                self.treeMat.color = color3D;
            }

            if(time%1000 < 100 && !this.colour_switched){
                this.colour_switched = true
                change_colour();
            } else if (time%1000 > 100 && this.colour_switched){
                this.colour_switched = false;
            }
        
        }

});

AFRAME.registerComponent('click-listener', {

    init: function () {
        // Listen for click event
        let self = this;
        let el = this.el;
        this.el.addEventListener('click', function (evt) {
            let tree = document.querySelector('#valmiera');
            let color = el.getAttribute('material', 'color');
            tree.emit('changecolor', color);
        });
    }

});