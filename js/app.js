var wordlist = [];
var wordsource = {};

var fileEscapes = [
  ["à", "~a"],
  ["è", "~e"],
  ["é","e_"],
  ["ò","~o"],
  [" ",""],
  ["/","-"]
];

$(".search").typeahead({
  source: wordlist,
  highlighter: function(item){
    return "<span>" + wordsource[ item ].official[0] + "</span>";
  },
  updater: function(item){
    //$("#type").text( wordsource[ item ].type );
    //var definition = wordsource[ item ].def;
    //definitionstart = definition.substring(0,18);
    //definition = definitionstart + definition.split(definitionstart)[1];
    //$("#def").text( definition );
    var fileword = wordsource[ item ].official[0];
    for(var i=0;i<fileEscapes.length;i++){
      fileword = replaceAll(fileword, fileEscapes[i][0], fileEscapes[i][1]);
    }
    $.getJSON("words/" + fileword + ".json", function(data){
      $("#type").text( data[0] );
      var definition = data[1];
      definitionstart = definition.substring(0,18);
      definition = definitionstart + definition.split(definitionstart)[1];
      $("#def").text( definition );
    });
    return wordsource[ item ].official[0];
  }
});

function removeAccents(content){
  var accents = {
    "a": ["à"],
    "e": ["è","é"],
    "i": [ ],
    "o": ["ò"],
    "u": [],
    "-": ["/"]
  };
  for(var letter in accents){
    for(var a=0;a<accents[letter].length;a++){
      content = replaceAll(content, accents[letter][a], letter);
    }
  }
  return content;
}

function replaceAll(src, oldr, newr){
  while(src.indexOf(oldr) > -1){
    src = src.replace(oldr, newr);
  }
  return src;
}

$.getJSON("words.json", function(rows){
  $("#loading").css({ display: "none" });
  for(var r=0;r<rows.length;r++){
    var words = replaceAll(rows[r], '"', '').split(',');
    for(var w=0;w<words.length;w++){
      words[w] = words[w].split(":")[0].split(".")[0];
    }
    var slugs = words.concat();
    for(var s=0;s<slugs.length;s++){
      slugs[s] = removeAccents( slugs[s].toLowerCase() );
    }
    wordlist.push(slugs[0]);
    wordsource[ slugs[0] ] = {
      official: words
      //,
      //type: replaceAll(rows[r][1], '"', ''),
      //def: replaceAll(rows[r][2], '"', '')
    };
  }
});

/*
$.get("content2.csv", function(data){
  var rows = $.csv.toArrays(data);
  for(var r=0;r<rows.length;r++){
    var words = replaceAll(rows[r][0], '"', '').split(',');
    for(var w=0;w<words.length;w++){
      words[w] = words[w].split(":")[0].split(".")[0];
    }
    var slugs = words.concat();
    for(var s=0;s<slugs.length;s++){
      slugs[s] = removeAccents( slugs[s].toLowerCase() );
    }
    wordlist.push(slugs[0]);
    wordsource[ slugs[0] ] = {
      official: words,
      type: replaceAll(rows[r][1], '"', ''),
      def: replaceAll(rows[r][2], '"', '')
    };
  }
  $("#loading").css({ display: "none" });
});
*/