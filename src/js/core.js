//based on //Knapsack items: name, survival points, weight

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

// code to generate the population and draw it on the Canvas
var canvas;
var context;

//create the population
//var population = new Population(100);
var maxSurvivalPoints = 0;

var Core = function() {
  this.population;
  this.fitness;
  this.generation = 0;
}

Core.prototype.population = function(pop){
  this.population = new Population(pop);
}

Core.prototype.init = function(pop){
  var weightlimit = 20; // weight limit
  this.population = new Population(pop);
  //gene with maximum fitness possible [without penalty]
  var maxGene = new Gene(weightlimit);
  maxGene.makeMax(items);
  maxSurvivalPoints = maxGene.fitness;

  console.log("this.population", this.population);

  this.population.initialize(weightlimit); //init the population
  this.population.generate(); //start the solution generation  
}

var core = new Core();
//core.population = 20;

window.onload = core.init(30);

//get the context for drawing:
canvas = document.getElementById('populationCanvas');
context = canvas.getContext('2d');