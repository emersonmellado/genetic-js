//based on //Knapsack items: name, survival points, weight

var weightlimit = 20; // weight limit
//the Phenotype --> a Knapsack item
var Individual = function(name, survivalPoints, weight) {
  this.name = name;
  this.survivalPoints = survivalPoints;
  this.weight = weight;
}


var items = [];
items.push(new Individual("pocketknife", 10.00, 1.00));
items.push(new Individual("beans", 20.00, 5.00));
items.push(new Individual("potatoes", 15.00, 10.00));
items.push(new Individual("unions", 2.00, 1.00));
items.push(new Individual("sleeping bag", 30.00, 7.00));
items.push(new Individual("rope", 10.00, 5.00));
items.push(new Individual("compass", 30.00, 1.00));

//Compare fitness
function compareFitness(gene1, gene2) {
  return gene2.fitness - gene1.fitness;
}

// code to generate the population and draw it on the Canvas
window.onload = init;
var canvas;
var context;

//create the population
var population = new Population(100);
var maxSurvivalPoints = 0;

function init(){
  //gene with maximum fitness possible [without penalty]
  var maxGene = new Gene();
  maxGene.makeMax(items);
  maxSurvivalPoints = maxGene.fitness;

  //get the context for drawing:
  canvas = document.getElementById('populationCanvas');
  context = canvas.getContext('2d');

  population.initialize(); //init the population
  population.generate(); //start the solution generation

  // call generate again after a delay of 100 millisecond
  //var scope = this;
  
}
