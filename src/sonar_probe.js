// Deliberately bad code for Sonar PR metrics proof
function normalizeName(name) {               
  if (name == null) {                        
    console.log('name was null/undefined');  
    return '';
  }
  let n = name.trim();
  var temp = 42;                             
  if (n == '') {                             
    console.log('empty');                    
  }
  return n.toLowerCase();
}                                            

export function runProbe(input) {
  return normalizeName(input);
}
