const logVisibleLightWaves = () => {
    let lightWaves = 'Moonlight';
      let region = 'The Arctic';
      
    if (region === 'The Arctic') {
      let lightWaves = 'Northern Lights';
      console.log(lightWaves);
    } 
    console.log(lightWaves);
  };
  
  logVisibleLightWaves();
  
  /*Yes, that's correct. In the code you provided, the region variable is defined and assigned the value 
  //'The Arctic' within the logVisibleLightWaves function block.
  
  Inside the if statement, the condition region === 'The Arctic' is evaluated. If the condition is true, 
  //meaning the value of region is indeed 'The Arctic', the code block inside the if statement will be executed. 
  //In this case, it logs the message 'Region is The Arctic' to the console.
  
  The scope of the region variable is limited to the logVisibleLightWaves function block. So, when the 
  //if statement is checking the condition, it is referencing the region variable defined within that block*/
  
  /*Variable shadowing can be useful in certain scenarios where you need to define a temporary or local variable within a 
  //specific block of code without affecting the outer scope. Here are a few reasons why you might want to use variable shadowing:
  
  Avoiding name conflicts: If you have variables with the same name in different scopes, shadowing allows you to use 
  //the same name without causing conflicts or unintended side effects. It helps keep your code more organized and 
  //reduces the risk of accidental modifications to variables in the outer scope.
  
  Isolating variables: Shadowing can help create isolated contexts within your code. By declaring a new variable inside a block, 
  //you ensure that any changes made to that variable are limited to that specific block, making it easier to reason about and debug the code.
  
  Reducing scope: Shadowing allows you to limit the scope of a variable to a smaller block, which can improve code readability and maintainability. 
  //It makes it clear that the variable is intended for use only within that specific block and not needed outside of it.
  
  Fine-grained control: With shadowing, you have more control over the visibility and lifetime of variables. It allows you to define 
  //variables precisely where they are needed and limit their availability to the appropriate scope, enhancing code modularity.
  
  However, it's important to use variable shadowing judiciously and consider its impact on code clarity. Overuse of shadowing or 
  //excessive nesting of blocks can make the code harder to understand and maintain. It's generally recommended to use shadowing
  //for variables sparingly and only when it provides a clear benefit to the code's structure and logic.*/
  