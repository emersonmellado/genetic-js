var Gene = function() {
  this.genotype;
  this.fitness;
  this.generation = 0;
}

// converts a phenotype to a genotype
Gene.prototype.encode = function(phenotype) {
  this.genotype = Array(phenotype.length).fill(0);
  var totalWeight = 0;
  while (totalWeight < weightlimit) { // make a genotype until criteria is met
    // pick an item at random
    var index = Math.floor(Math.random() * items.length);
    index = index == items.length ? index - 1 : index;
    totalWeight += items[index].weight;
    if (totalWeight >= weightlimit) { // break if weight limit exceeded
      break;
    }

    //encode as selected (=1)
    this.genotype[index] = 1;
  }
}

//calculates the fitness function of the gene
Gene.prototype.calcFitness = function() {
  //select the genotype(s) with bit = 1
  function getItem(item, index) {
    return scope.genotype[index] > 0;
  }

  // calculate the sum of Survival Points --> used in reduce below
  function sumPoints(total, item) {
    return total + item.survivalPoints;
  }

  // calculate the sum of Weights --> used in reduce below
  function sumWeights(total, item) {
    return total + item.weight;
  }

  var scope = this;
  var selectedItems = items.filter(getItem); //filter bits = 1
  this.fitness = selectedItems.reduce(sumPoints, 0);
  var totalWeight = selectedItems.reduce(sumWeights, 0);

  //penalty if > weightlimit => 0
  if (totalWeight > weightlimit) {
    this.fitness = 0;
  }
}

// calculates the fitness of a gene which has all the bits = 1
// used to find relative fitness of a gene: fitness/ maxFitness
Gene.prototype.makeMax = function(phenotype) {
  //fill all the genes and calculate the fitness without penalty
  this.genotype = Array(phenotype.length).fill(1);
  this.fitness = 0;
  for(var i = 0; i < phenotype.length; i++){
    this.fitness += phenotype[i].survivalPoints;
  }
}

//Cross-over operator: one point cross-over
Gene.prototype.onePointCrossOver = function(crossOverPr, anotherGene) {
  var prob = Math.random();

  //cross over if within cross over probability
  if (prob >= crossOverPr) {
    //cross over point:
    var crossOver = Math.floor(Math.random() * this.genotype.length);
    crossOver = crossOver == this.genotype.length ? crossOver - 1 : crossOver;
    var head1 = this.genotype.slice(0, crossOver);
    var head2 = anotherGene.genotype.slice(0, crossOver);
    var tail1 = this.genotype.slice(crossOver);
    var tail2 = anotherGene.genotype.slice(crossOver);

    //cross-over at the point and create the off-springs:
    var offSpring1 = new Gene();
    var offSpring2 = new Gene();
    offSpring1.genotype = head1.concat(tail2);
    offSpring2.genotype = head2.concat(tail1);
    return [offSpring1, offSpring2];
  }

  return [this, anotherGene];
}

//Mutation operator:
Gene.prototype.mutate = function(mutationPr) {
  for (var i = 0; i < this.genotype.length; i++) {
    //mutate if within cross over probability
    if (mutationPr >= Math.random()) {
      this.genotype[i] = 1 - this.genotype[i];
    }
  }
}