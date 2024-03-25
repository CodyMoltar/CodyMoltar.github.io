// create an aframe component called bind-to-hands
AFRAME.registerComponent("bind-to-hands", {
    schema: {},
    init: function () {
        let data = {};

        // wait until the model is loaded and then traverse over all nodes and print the nodes to the console
        this.el.addEventListener("model-loaded", () => {
            // create a sphere for every node in the model and attach it to the node
            this.el.object3D.traverse((node) => {
                if (node.type === "Mesh") {
                    let sphere = document.createElement("a-sphere");
                    sphere.setAttribute("radius", "0.3");
                    sphere.setAttribute("color", "red");
                    sphere.setAttribute("position", node.position);
                    this.el.appendChild(sphere);
                }
            });

            // traverse the model and create a new a-text element for each node with the id of the nodes name
            // this.el.object3D.traverse((node) => {
            //     let text = document.createElement("a-text");
            //     text.setAttribute("value", node.name);
            //     text.setAttribute("scale", "2 2 2");
            //     text.setAttribute("color", "red");
            //     text.id = node.name;
            //     this.el.appendChild(text);

            //     // create a new a-text elementc
            // });
        });
    },
    tick: function () {
        // iterate over all the text elements and update their position to match the position of the corresponding node
        // this.el.object3D.traverse((node) => {
        //     if (node.type === "Object3D" && node.name === "HeadTip") {
        //         let text = document.getElementById(node.name);
        //         let position = new THREE.Vector3();
        //         position.setFromMatrixPosition(node.matrixWorld);
        //         text.setAttribute("position", position);
        //         // also update the rotation of the text element to match the rotation of the node
        //         let rotation = new THREE.Euler();
        //         rotation.setFromRotationMatrix(node.matrixWorld);
        //         text.setAttribute("rotation", rotation);
        //     }
        // });
    },
});
