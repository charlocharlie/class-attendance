(function () {
    "use strict";
    window.addEventListener("WebComponentsReady", function () {
        const fs = require('fs');
        let classArray = [];
        try {
            classArray = JSON.parse(fs.readFileSync('class.json', 'utf8'));
        }
        catch(err){}
        let classData = [];
        createList();

        function createList() {
            let headerEl = document.createElement("class-list-header");
            document.getElementById("class-list-view").appendChild(headerEl);
            for (let index = 0; index < classArray.length; index++) {
                let dynamicEl = document.createElement("student-module");
                dynamicEl.setAttribute("index", index);
                dynamicEl.setAttribute("name", classArray[index]);
                dynamicEl.setAttribute("id", "student-module-" + index);
                document.getElementById("class-list-view").appendChild(dynamicEl);
                document.getElementById("student-module-" + index).addEventListener("radioChange", radioChanged);
                classData[index] = {
                    "name": classArray[index],
                    "value": "absent"
                };
            }
            updateTotals();
        }

        function radioChanged(e) {
            classData[e.detail.index] = {
                "name": e.detail.name,
                "value": e.detail.radio
            };
            updateTotals();
        }

        function updateTotals() {
            let hot = 0, cold = 0, bag = 0, absent = 0, absentNames = [];
            for (let index = 0; index < classData.length; index++) {
                switch (classData[index].value) {
                    case "hot":
                        hot++;
                        break;
                    case "cold":
                        cold++;
                        break;
                    case "bag":
                        bag++;
                        break;
                    case "absent":
                        absent++;
                        absentNames.push(classData[index].name);
                }
            }
            document.getElementById("hot-count").innerText = "Hot: " + hot;
            document.getElementById("cold-count").innerText = "Cold: " + cold;
            document.getElementById("bag-count").innerText = "Bag: " + bag;
            document.getElementById("absent-count").innerText = "Absent: " + absent;
            document.getElementById("absent-names").innerText = absentNames;
        }
        function refreshList() {
            let classListView = document.getElementById("class-list-view");
            while (classListView.hasChildNodes()) {
                classListView.removeChild(classListView.lastChild);
            }
            createList();
        }
    });
})();