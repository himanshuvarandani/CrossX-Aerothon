{
"response":
            {
		"language":{	 //COULD BE MORE THAN ONE 		
				"PYTHON":"{CODE SNIPPETS}","nODE":"{CODE SNIPPETS}","JAVA":"{CODE SNIPPETS}",.....
                            },
		"FEATURES":{	 //COULD BE MORE THAN ONE 		
				"CLOUD":"{CODE SNIPPETS}","AI ML BOT":"{CODE SNIPPETS}","AR VR":"{CODE SNIPPETS}",.....
                            }

             }



}


//CODE SNIPPET  JSON /ARRAY 
"{   --:1 TO MANY 
    "MODULE-NAME":"CONTEMT TO DISPLAY","NETWORKING":"CONTENT TO DISPLAY",....ETC


}"
[0:46 pm, 23/05/2022] Activeshala: @Himanshu Varandani @Himanshu Kumar
var fs = require('fs');

//create a file named mynewfile1.txt:
fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});