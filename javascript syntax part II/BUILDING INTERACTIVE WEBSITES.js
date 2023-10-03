// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)];
  };
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };
  
  // Factory function to create pAequor objects
  const pAequorFactory = (specimenNum, dna) => {
    return {
      specimenNum, // Assign a unique specimen number
      dna, // Assign the provided DNA strand
      mutate() {
        const randomBaseIndex = Math.floor(Math.random() * this.dna.length);
        const oldBase = this.dna[randomBaseIndex];
        let newBase;
        do {
          newBase = returnRandBase();
        } while (newBase === oldBase);
        this.dna.splice(randomBaseIndex, 1, newBase); // Mutate the DNA by replacing a base
        return this.dna;
      },
      compareDNA(pAequor) {
        const commonBasesPercentage = this.dna.reduce((acc, curr, idx) => {
          if (curr === pAequor.dna[idx]) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0) / this.dna.length * 100; // Calculate common bases percentage using reduce
        console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${commonBasesPercentage.toFixed(2)}% DNA in common.`);
      },
      willLikelySurvive() {
        const cAndGBases = this.dna.filter(base => base === 'C' || base === 'G');
        const cAndGPercentage = (cAndGBases.length / this.dna.length) * 100;
        return cAndGPercentage >= 60; // Check if the DNA is likely to survive
      }
    };
  };
  
  // Example usage:
  const specimen1 = pAequorFactory(1, mockUpStrand()); // Create a pAequor specimen with a unique number and random DNA
  const specimen2 = pAequorFactory(2, mockUpStrand()); // Create another pAequor specimen
  
  console.log(specimen1.dna); // Print the DNA of specimen1
  console.log(specimen2.dna); // Print the DNA of specimen2
  
  specimen1.compareDNA(specimen2); // Compare the DNA of specimen1 and specimen2
  console.log(specimen1.willLikelySurvive()); // Check if specimen1 is likely to survive
  console.log(specimen2.willLikelySurvive()); // Check if specimen2 is likely to survive  
  
  
      

      

  
  
  
  
  
  
  
  