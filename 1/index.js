// Ich habe KEIN bock den datensatz mit reines javascript zu lesen und parsen
let dataset = [{ "id": "001", "name": "Brazil", "birth rate per 1000": 16.405, "cell phones per 100": 90.01936334, "children per woman": 1.862, "electricity consumption per capita": 2201.808724, "gdp_per_capita": 4424.758692, "gdp_per_capita_growth": -1.520402823, "inflation annual": 8.228535058, "internet user per 100": 39.22, "life expectancy": 74, "military expenditure percent of gdp": 1.615173655, "gps_lat": -14.235004, "gps_long": -51.92528 }, { "id": "002", "name": "Canada", "birth rate per 1000": 10.625, "cell phones per 100": 70.70997244, "children per woman": 1.668, "electricity consumption per capita": 15119.76414, "gdp_per_capita": 25069.86915, "gdp_per_capita_growth": -3.953353186, "inflation annual": 2.944408564, "internet user per 100": 80.17086651, "life expectancy": 80.9, "military expenditure percent of gdp": 1.415710422, "gps_lat": 56.130366, "gps_long": -106.346771 }, { "id": "003", "name": "Chile", "birth rate per 1000": 15.04, "cell phones per 100": 97.01862561, "children per woman": 1.873, "electricity consumption per capita": 3276.06449, "gdp_per_capita": 6451.631126, "gdp_per_capita_growth": -2.610485847, "inflation annual": 7.47050527, "internet user per 100": 38.8, "life expectancy": 78.8, "military expenditure percent of gdp": 3.064076139, "gps_lat": -35.675147, "gps_long": 71.542969 }, { "id": "004", "name": "China", "birth rate per 1000": 13.536, "cell phones per 100": 55.97490921, "children per woman": 1.642, "electricity consumption per capita": 2632.724637, "gdp_per_capita": 2208.403948, "gdp_per_capita_growth": 8.648414427, "inflation annual": 6.684109668, "internet user per 100": 28.97659939, "life expectancy": 75.6, "military expenditure percent of gdp": 2.24110794, "gps_lat": 35.86166, "gps_long": 104.195397 }, { "id": "005", "name": "Colombia", "birth rate per 1000": 20.605, "cell phones per 100": 92.34584564, "children per woman": 2.405, "electricity consumption per capita": 1041.994137, "gdp_per_capita": 3137.695335, "gdp_per_capita_growth": 0.2081538559, "inflation annual": 3.666941163, "internet user per 100": 30, "life expectancy": 75.3, "military expenditure percent of gdp": 3.833780372, "gps_lat": 4.570868, "gps_long": -74.297333 }, { "id": "006", "name": "Ecuador", "birth rate per 1000": 20.989, "cell phones per 100": 92.84925653, "children per woman": 2.69, "electricity consumption per capita": 1078.038961, "gdp_per_capita": 1692.067197, "gdp_per_capita_growth": -1.079538461, "inflation annual": 7.595866872, "internet user per 100": 24.6, "life expectancy": 74.1, "military expenditure percent of gdp": 3.746501879, "gps_lat": -1.831239, "gps_long": -78.183406 }, { "id": "007", "name": "Egypt", "birth rate per 1000": 24.83, "cell phones per 100": 69.43661504, "children per woman": 2.919, "electricity consumption per capita": 1607.918763, "gdp_per_capita": 1911.964501, "gdp_per_capita_growth": 2.856917581, "inflation annual": 10.10750976, "internet user per 100": 24.28, "life expectancy": 70.2, "military expenditure percent of gdp": 2.137305699, "gps_lat": 26.820553, "gps_long": 30.802498 }, { "id": "008", "name": "Finland", "birth rate per 1000": 11.127, "cell phones per 100": 144.1530224, "children per woman": 1.86, "electricity consumption per capita": 15241.61194, "gdp_per_capita": 26205.68832, "gdp_per_capita_growth": -8.791558776, "inflation annual": 0.4277308694, "internet user per 100": 82.53133098, "life expectancy": 79.7, "military expenditure percent of gdp": 1.501872268, "gps_lat": 61.92411, "gps_long": 25.748151 }, { "id": "009", "name": "France", "birth rate per 1000": 12.21, "cell phones per 100": 95.44434226, "children per woman": 1.978, "electricity consumption per capita": 7339.946832, "gdp_per_capita": 22508.76261, "gdp_per_capita_growth": -3.264056248, "inflation annual": 1.050366124, "internet user per 100": 69.0633593, "life expectancy": 81, "military expenditure percent of gdp": 2.55313249, "gps_lat": 46.227638, "gps_long": 2.213749 }, { "id": "010", "name": "Germany", "birth rate per 1000": 8.136, "cell phones per 100": 127.4188883, "children per woman": 1.376, "electricity consumption per capita": 6753.05764, "gdp_per_capita": 24368.19561, "gdp_per_capita_growth": -4.886323581, "inflation annual": 0.5959234322, "internet user per 100": 79.48523153, "life expectancy": 80, "military expenditure percent of gdp": 1.438871341, "gps_lat": 51.165691, "gps_long": 10.451526 }, { "id": "011", "name": "Iceland", "birth rate per 1000": 14.738, "cell phones per 100": 107.6604456, "children per woman": 2.123, "electricity consumption per capita": 51259.18763, "gdp_per_capita": 35310.97441, "gdp_per_capita_growth": -6.990418561, "inflation annual": 6.900703626, "internet user per 100": 92.13686385, "life expectancy": 82.2, "military expenditure percent of gdp": 0.0820538039, "gps_lat": 64.963051, "gps_long": -19.020835 }, { "id": "012", "name": "Iraq", "birth rate per 1000": 31.585, "cell phones per 100": 65.47478839, "children per woman": 4.276, "electricity consumption per capita": 1086.323768, "gdp_per_capita": 752.1833548, "gdp_per_capita_growth": 1.141874289, "inflation annual": 25.22442136, "internet user per 100": 1.047516616, "life expectancy": 68.1, "military expenditure percent of gdp": 4.621383386, "gps_lat": 33.223191, "gps_long": 43.679291 }, { "id": "013", "name": "Japan", "birth rate per 1000": 8.201, "cell phones per 100": 91.8955442, "children per woman": 1.359, "electricity consumption per capita": 7838.005685, "gdp_per_capita": 38242.02429, "gdp_per_capita_growth": -6.180260885, "inflation annual": -2.08543109, "internet user per 100": 77.38468963, "life expectancy": 82.8, "military expenditure percent of gdp": 1.019445017, "gps_lat": 36.204824, "gps_long": 138.252924 }, { "id": "014", "name": "Kazakhstan", "birth rate per 1000": 19.775, "cell phones per 100": 107.7147692, "children per woman": 2.537, "electricity consumption per capita": 4447.142293, "gdp_per_capita": 2345.86415, "gdp_per_capita_growth": -1.437812068, "inflation annual": 19.5422854, "internet user per 100": 17.91457965, "life expectancy": 66.6, "military expenditure percent of gdp": 1.105385125, "gps_lat": 48.019573, "gps_long": 66.923684 }, { "id": "015", "name": "Mexico", "birth rate per 1000": 19.091, "cell phones per 100": 74.25785259, "children per woman": 2.313, "electricity consumption per capita": 1869.82352, "gdp_per_capita": 5875.619997, "gdp_per_capita_growth": -7.417438847, "inflation annual": 4.033645258, "internet user per 100": 26.34, "life expectancy": 75.5, "military expenditure percent of gdp": 0.5396656609, "gps_lat": 23.634501, "gps_long": -102.552784 }, { "id": "016", "name": "New Zealand", "birth rate per 1000": 13.831, "cell phones per 100": 108.7301521, "children per woman": 2.125, "electricity consumption per capita": 9375.550304, "gdp_per_capita": 14778.16393, "gdp_per_capita_growth": -1.552308788, "inflation annual": 3.486782259, "internet user per 100": 79.82609287, "life expectancy": 80.3, "military expenditure percent of gdp": 1.140562366, "gps_lat": -40.900557, "gps_long": 174.885971 }, { "id": "017", "name": "Nigeria", "birth rate per 1000": 40.134, "cell phones per 100": 48.23561006, "children per woman": 6.021, "electricity consumption per capita": 119.8151486, "gdp_per_capita": 513.5003377, "gdp_per_capita_growth": 4.3526073, "inflation annual": 9.313146383, "internet user per 100": 20, "life expectancy": 58.5, "military expenditure percent of gdp": 0.8924302789, "gps_lat": 9.081999, "gps_long": 8.675277 }, { "id": "018", "name": "Peru", "birth rate per 1000": 21.342, "cell phones per 100": 85.86901405, "children per woman": 2.545, "electricity consumption per capita": 1043.052601, "gdp_per_capita": 2955.186222, "gdp_per_capita_growth": -0.2228977721, "inflation annual": 4.49134447, "internet user per 100": 31.4, "life expectancy": 76.7, "military expenditure percent of gdp": 1.348875763, "gps_lat": -9.189967, "gps_long": -75.015152 }, { "id": "019", "name": "Russia", "birth rate per 1000": 10.828, "cell phones per 100": 161.1162887, "children per woman": 1.537, "electricity consumption per capita": 6132.978648, "gdp_per_capita": 2806.41483, "gdp_per_capita_growth": -7.749103694, "inflation annual": 11.60398093, "internet user per 100": 29.23584146, "life expectancy": 68.3, "military expenditure percent of gdp": 4.36259042, "gps_lat": 61.52401, "gps_long": 105.318756 }, { "id": "020", "name": "Saudi Arabia", "birth rate per 1000": 23.569, "cell phones per 100": 167.3474553, "children per woman": 2.898, "electricity consumption per capita": 7430.743897, "gdp_per_capita": 9294.355996, "gdp_per_capita_growth": -2.242127204, "inflation annual": 14.36222827, "internet user per 100": 38, "life expectancy": 77.6, "military expenditure percent of gdp": 10.95653405, "gps_lat": 23.885942, "gps_long": 45.079162 }, { "id": "021", "name": "South Africa", "birth rate per 1000": 22.113, "cell phones per 100": 93.33587369, "children per woman": 2.5, "electricity consumption per capita": 4532.021902, "gdp_per_capita": 3697.67368, "gdp_per_capita_growth": -2.732989408, "inflation annual": 7.861608575, "internet user per 100": 10.08745979, "life expectancy": 55.8, "military expenditure percent of gdp": 1.394530379, "gps_lat": -30.559482, "gps_long": 22.937506 }, { "id": "022", "name": "Sweden", "birth rate per 1000": 11.72, "cell phones per 100": 112.1241184, "children per woman": 1.937, "electricity consumption per capita": 14143.01101, "gdp_per_capita": 30885.45914, "gdp_per_capita_growth": -5.976535294, "inflation annual": 1.022227082, "internet user per 100": 91.12326108, "life expectancy": 81.2, "military expenditure percent of gdp": 1.247701873, "gps_lat": 60.128161, "gps_long": 18.643501 }, { "id": "023", "name": "United Arab Emirates", "birth rate per 1000": 14.027, "cell phones per 100": 153.7997194, "children per woman": 1.903, "electricity consumption per capita": 9998.291079, "gdp_per_capita": 22507.00157, "gdp_per_capita_growth": -11.99171952, "inflation annual": 8.549032358, "internet user per 100": 64, "life expectancy": 76.1, "military expenditure percent of gdp": 5.834881976, "gps_lat": 23.424076, "gps_long": 53.847818 }, { "id": "024", "name": "United Kingdom", "birth rate per 1000": 12.195, "cell phones per 100": 130.1742603, "children per woman": 1.89, "electricity consumption per capita": 5685.635995, "gdp_per_capita": 27933.77767, "gdp_per_capita_growth": -5.019251823, "inflation annual": 2.861406642, "internet user per 100": 77.79971962, "life expectancy": 79.7, "military expenditure percent of gdp": 2.667209048, "gps_lat": 52.3555177, "gps_long": -1.1743197 }, { "id": "025", "name": "United States", "birth rate per 1000": 14.191, "cell phones per 100": 89.14911634, "children per woman": 2.002, "electricity consumption per capita": 12913.71143, "gdp_per_capita": 36539.22823, "gdp_per_capita_growth": -4.342271218, "inflation annual": 1.152326348, "internet user per 100": 71.21181627, "life expectancy": 78.3, "military expenditure percent of gdp": 4.822730027, "gps_lat": 37.09024, "gps_long": -95.712891 }]

let availableKeys = {};
let invisibleColumns = new Set()

function sortTable(e) {
    var n = Array.prototype.indexOf.call(e.target.parentNode.children, e.target)

    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function toggleKey(e) {
    let key = e.target.textContent;
    let n = availableKeys[key]

    if (invisibleColumns.has(n)) {
        invisibleColumns.delete(n)

        for (let el of document.getElementsByClassName(n)) {
            el.style.visibility = 'visible';
            el.style.width = '0%';

        };

    } else {
        invisibleColumns.add(n)

        for (let el of document.getElementsByClassName(n)) {
            el.style.visibility = 'hidden';
            el.style.width = '0%';

        };

    }

}

function addKey(name) {
    let n = 0
    if (!(Object.keys(availableKeys).length === 0 && availableKeys.constructor === Object)) {
        n = Object.keys(availableKeys).length + 1

    }

    let c = "col_" + n
    availableKeys[name] = c;

}

function BuildTable() {
    var table = document.getElementById("myTable");
    var tRow = document.createElement('tr');
    let keys = Object.keys(availableKeys)
    let counter = 0;
    for (let item of keys) {
        var th = document.createElement('th');
        var i = document.createElement('i');

        let className = availableKeys[item]

        if (item === "name") item = "Country"
        i.classList.add("fa-sort");
        i.classList.add("fa");
        th.classList.add(className);
        th.appendChild(document.createTextNode(item))
        th.appendChild(i)
        th.addEventListener("click", sortTable, false);

        counter++;
        tRow.appendChild(th);
    }
    table.appendChild(tRow);

    for (let d of dataset) {
        tRow = document.createElement('tr');

        for (let k of keys) {
            let className = availableKeys[k]

            var td = document.createElement('td');
            td.appendChild(document.createTextNode(d[k]))
            td.classList.add(className);

            tRow.appendChild(td);

        }
        table.appendChild(tRow);
    }
}

let bttns = document.getElementsByClassName("Toggler");
addKey("id")
addKey("name")
for (i = 0; i < bttns.length; i++) {
    let bttn = bttns[i];
    addKey(bttn.textContent)
    bttn.addEventListener("click", toggleKey, false);
}

BuildTable();