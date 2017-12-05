var Population = function(size) {
  this.genes = [];
  this.generation = 0;
  this.solution = 0;
  // create and encode the genes
  while (size--) {
    var gene = new Gene();
    gene.encode(items);
    this.genes.push(gene);
  }
}

// initialization of the Population by making a pass of the fitness function
Population.prototype.initialize = function() {
  for (var i = 0; i < this.genes.length; i++) {
    this.genes[i].calcFitness();
  }
}

//operator select : Rank-based fitness assignment
Population.prototype.select = function() {
  // sort and select the best
  this.genes.sort(compareFitness);
  return [this.genes[0], this.genes[1]];
}

//the core genetic algorithm (cross over, mutation, selection)
//GA parameters:
//Cross-over probability:
var crossOverPr = 0.9;
//Mutation probability:
var mutationPr = 0.3;

//calculates one generation from the current population
Population.prototype.generate = function() {
  // select the parents
  parents = this.select();

  // cross-over
  var offSpring = parents[0].onePointCrossOver(crossOverPr, parents[1]);
  this.generation++; //increment the generation

  //re-place in population
  this.genes.splice(this.genes.length - 2, 2, offSpring[0], offSpring[1]);
  //attach the generation number to the new offspring
  offSpring[0].generation = offSpring[1].generation = this.generation;

  //mutate the population
  for (var i = 0; i < this.genes.length; i++) {
    this.genes[i].mutate(mutationPr);
  }

  //recalculate fitness after cross-over & mutation:
  this.initialize();
  this.genes.sort(compareFitness);
  this.solution = population.genes[0].fitness; // pick the solution;

  //draw the population:
  display();

  //stop iteration after 100th generation
  //this assumption is arbitrary that the solution would converge after reaching
  //the 100th generation, there can be other criteria like no change in fitness
  if (this.generation >= 100) {
    return true;
  }
  var me = this;
  setTimeout(function () { me.generate(this) }, 100);  
}

//function to draw the population on the canvas
function display(){
  var fitness = document.getElementById('fitness');
  //print the best total Survival point and the corresponding genotype:
  fitness.innerHTML = 'Survival Points:' + population.genes[0].fitness;
  fitness.innerHTML += '<br/>Genotype:' + population.genes[0].genotype;

  context.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
  var index = 0;
  var radius = 30;
  //draw the Genes
  for(var i = 0; i < 10; i++){
    var centerY = radius + (i + 1) * 5 + i * 2 * radius; //Y
    for(var j = 0; j < 10; j++){
      var centerX = radius + (j + 1) * 5 + j * 2 * radius; //X
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      // pick the fitness for opacity calculation;
      var opacity = population.genes[index].fitness / maxSurvivalPoints;
      context.fillStyle = 'rgba(0,0,255, ' + opacity + ')';
      context.fill();
      context.stroke();
      context.fillStyle = 'black';
      context.textAlign = 'center';
      context.font = 'bold 12pt Calibri';
      // print the generation number
      context.fillText(population.genes[index].generation, centerX, centerY);
      index++;
    }
  }
}