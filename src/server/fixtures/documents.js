
if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/server/fixture-documents.js');

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE
// ---------------------------------------------------------------------------------------------------------------------

var fs = Npm.require('fs');

// ---------------------------------------------------------------------------------------------------------------------
// STARTUP
// ---------------------------------------------------------------------------------------------------------------------

Meteor.startup(function() {
  if(CONSOLE_LOG_ROUTES) console.log('STARTUP: src/server/fixture-documents.js');

  // -------------------------------------------------------------------------------------------------------------------

  //deleteAllDocuments();
  if (Documents.find().count() === 0) {

    console.log('fixutes-documents.js | populateDocuments');
    populateDocuments();

  }//if (Documents.find().count() === 0)

  // -------------------------------------------------------------------------------------------------------------------

});//Meteor.startup

// ---------------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

var deleteAllDocuments = function() {
    var cursor = Documents.find().fetch();

    for (var i = 0; i < cursor.length; i++) {
      var id = cursor[i]._id;
      Meteor.call("deleteDocument", id);
    }
}

// ---------------------------------------------------------------------------------------------------------------------

var populateDocuments = function() {
    Documents.remove({});

    var examples = getExamples();

    for (var i=0; i<examples.length; i++) {
      var title = examples[i][0];
      var filepath = examples[i][1];

      var id = insertDocument(title,filepath);
      var file = readFile(filepath);

      ShareJS.initializeDoc(id, file);
    }
}

// ---------------------------------------------------------------------------------------------------------------------

var readFile = function (filename) {

  //console.log( fs.readdirSync('.') );
  // .meteor/local/build/programs/server      <== ROOT-DIRECTORY
  // .meteor/local/build/programs/client/app

  //var CLIENT = '../client/app/';
  var PRIVATE = 'assets/app/'
  var filepath = PRIVATE + filename;

  var file = fs.readFileSync(filepath, 'utf8');

  return file;
}


// ---------------------------------------------------------------------------------------------------------------------

var insertDocument = function(title, filepath) {

    var id = Documents.insert({
      title: title,
      filepath: filepath,
      snapshots: []
    });

    return id;
}

// ---------------------------------------------------------------------------------------------------------------------

var getExamples = function() {
  var examples = [];

  //Unselected Example
  // examples.push (["<clear>", undefined]);

  //Basic: hello | happy | intro | filter | tokenize | insertion sort | list comprehension
  examples.push (["Basic: hello", "aliasing.txt"]);
  examples.push (["Basic: happy", "happy.txt"]);
  examples.push (["Basic: intro", "py_tutorial.txt"]);
  examples.push (["Basic: filter", "filter.txt"]);
  examples.push (["Basic: tokenize", "strtok.txt"]);
  examples.push (["Basic: insertion sort", "ins_sort.txt"]);
  examples.push (["Basic: list comprehension", "list-comp.txt"]);

  //Math: factorial | fibonacci | memoized fibonacci | square root | gcd | towers of hanoi
  examples.push (["Math: factorial", "fact.txt"]);
  examples.push (["Math: fibonacci", "fib.txt"]);
  //examples.push (["Math: memoized fibonacci", "memo_fib.txt"]);  //PROBLEM: this one does not load in the visualizer...
  examples.push (["Math: square root", "sqrt.txt"]);
  examples.push (["Math: gcd", "wentworth_gcd.txt"]);
  examples.push (["Math: towers of hanoi", "towers_of_hanoi.txt"]);

  //User Input: raw input
  //examples.push (["User Input: raw input", "raw_input.txt"]);

  //Objects: OOP 1 | OOP 2 | OOP 3 | inheritance
  examples.push (["Objects: OOP 1", "oop_1.txt"]);
  examples.push (["Objects: OOP 2", "oop_2.txt"]);
  examples.push (["Objects: OOP 3", "oop_small.txt"]);
  examples.push (["Objects: inheritance", "oop_inherit.txt"]);

  //Linked Lists: LL 1 | LL 2 | LL sum
  examples.push (["Linked Lists: LL 1", "linked-lists/ll1.txt"]);
  examples.push (["Linked Lists: LL 2", "linked-lists/ll2.txt"]);
  examples.push (["Linked Lists: LL sum", "sum-list.txt"]);

  //Pointer Aliasing:
  // aliasing 1 | aliasing 2 | aliasing 3 | aliasing 4 |
  // aliasing 5 | aliasing 6 | aliasing 7 | aliasing 8 | sumList
  examples.push (["Pointer Aliasing: aliasing 1", "aliasing/aliasing1.txt"]);
  examples.push (["Pointer Aliasing: aliasing 2", "aliasing/aliasing2.txt"]);
  examples.push (["Pointer Aliasing: aliasing 3", "aliasing/aliasing3.txt"]);
  examples.push (["Pointer Aliasing: aliasing 4", "aliasing/aliasing4.txt"]);
  examples.push (["Pointer Aliasing: aliasing 5", "aliasing/aliasing5.txt"]);
  examples.push (["Pointer Aliasing: aliasing 6", "aliasing/aliasing6.txt"]);
  examples.push (["Pointer Aliasing: aliasing 7", "aliasing/aliasing7.txt"]);
  examples.push (["Pointer Aliasing: aliasing 8", "aliasing/aliasing8.txt"]);
  examples.push (["Pointer Aliasing: sumList", "wentworth_sumList.txt"]);

  //Higher-Order Functions:
  //closure 1 | closure 2 | closure 3 | closure 4 | closure 5
  //list map | summation | lambda param | student torture
  examples.push (["Higher-Order Functions: closure 1", "closures/closure1.txt"]);
  examples.push (["Higher-Order Functions: closure 2", "closures/closure2.txt"]);
  examples.push (["Higher-Order Functions: closure 3", "closures/closure3.txt"]);
  examples.push (["Higher-Order Functions: closure 4", "closures/closure4.txt"]);
  examples.push (["Higher-Order Functions: closure 5", "closures/closure5.txt"]);

  //examples.push (["Higher-Order Functions: sum cubes", "sum-cubes.txt"]);
  examples.push (["Higher-Order Functions: list map", "map.txt"]);
  examples.push (["Higher-Order Functions: summation", "sum.txt"]);
  examples.push (["Higher-Order Functions: lambda param", "closures/lambda-param.txt"]);
  examples.push (["Higher-Order Functions: student torture", "closures/student-torture.txt"]);

  //Python Tricks:
  //decorators | generators | gen expr | varargs | exceptions | for-else | non-local
  examples.push (["Python Tricks: decorators", "decorators.txt"]);
  examples.push (["Python Tricks: generators", "gen_primes.txt"]);
  examples.push (["Python Tricks: gen expr", "genexpr.txt"]);
  examples.push (["Python Tricks: varargs", "varargs.txt"]);
  examples.push (["Python Tricks: exceptions", "wentworth_try_finally.txt"]);
  examples.push (["Python Tricks: for-else", "for-else.txt"]);
  examples.push (["Python Tricks: non-local", "nonlocal.txt"])

  //experimental code by Chris Meyers: minPath | knapsack | sieve | fib
  //examples.push (["Chris Meyers: minPath", "chris-meyers/optMinpath.txt"])
  //examples.push (["Chris Meyers: knapsack", "chris-meyers/optKnapsack.txt"])
  //examples.push (["Chris Meyers: sieve", "chris-meyers/optSieve.txt"])
  //examples.push (["Chris Meyers: fib", "chris-meyers/optFib.txt"])

  var folder = "example-code/";
  examples.forEach( function(item) {
    if(item[1] !== undefined)
      item[1] = folder + item[1];
  });

  return examples;
};

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
