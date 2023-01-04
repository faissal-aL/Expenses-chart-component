const daysGraph = Array.from(document.getElementsByClassName("graph"));
const today = new Date();

//set today graph color to blue
let todayGraph = document.getElementById(daysGraph[today.getDay()-1].id);
todayGraph.style.backgroundColor = "var(--Cyan)";
todayGraph.addEventListener("mouseover", function () {
  todayGraph.style.backgroundColor = "hsla(186, 34%, 60%, 0.721)";
});
todayGraph.addEventListener("mouseout", function () {
  todayGraph.style.backgroundColor = "var(--Cyan)";
});
// get data from Json file

const dataJson = fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    return data;
  });

let amountMax;

const dataJsonObject = () => {
  dataJson.then((a) => {
    //console.log("a is", a);
    let arr = [];
    let i = 0;
    a.forEach((element) => {
      //console.log(element.amount);
      arr.push(element.amount);
    });
    amountMax = Math.max(...arr);
    //console.log("the max is", amountMax);
    a.forEach((e) => {
      let height = Math.round(map(e.amount, [0, amountMax], [0, 250]));
      let graphDraw = document.getElementById(daysGraph[i].id);
      let graphParagraph = graphDraw.getElementsByTagName("p")[0];
      graphDraw.style.height = `${height}px`;
      graphParagraph.innerHTML = `$${e.amount}`;
      i++;
    });
  });
};

dataJsonObject();

// function to map graph height
function map(value, oldRange, newRange) {
  var newValue =
    ((value - oldRange[0]) * (newRange[1] - newRange[0])) /
      (oldRange[1] - oldRange[0]) +
    newRange[0];
  return Math.min(Math.max(newValue, newRange[0]), newRange[1]);
}

// hover function

daysGraph.forEach((el) => {
  let graphs = document.getElementById(el.id);
  let pGraphs = graphs.getElementsByTagName("p")[0];
  graphs.addEventListener("mouseover", function () {
    pGraphs.style.display = "block";
  });
  graphs.addEventListener("mouseout", function () {
    pGraphs.style.display = "none";
  });
});
