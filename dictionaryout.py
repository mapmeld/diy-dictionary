# dictionaryout.py

inp = open('content.csv','r')
words = open('words.json','w')

line = None

words.write('[')
wordlist = [ ]

while True:
    line = inp.readline()
    
    # get the word
    word = None
    if(line.find('"') == -1 or line.find(',') < line.find('"')):
        # comma separated word
        word = line.split(',')[0]
    else:
        # quote separated word
        word = line.split('"')[1]
    wordlist.append('"' + word + '"')
    
    # save the noun and definition
    fixword = word.replace('"','').split(',')[0].split(':')[0].split('.')[0].replace(' ','').replace('/','-')
    fixword = fixword.replace(u"à", "~a").replace("è", "~e").replace("é","e_").replace("ò","~o")
    
    newdef = line.replace(word, "", 1)    
    newdef = newdef[ newdef.find(',') + 1 : ]
    partofspeech = '["' + newdef.split(',')[0] + '",'
    newdef = newdef[ newdef.find(',') + 1 : ]
    if(newdef.replace(" ","").find('"') != 0):
      newdef = '"' + newdef.replace("\n","<br>") + '"'
    newdef = newdef + ']'
    wordfile = open('static/words/' + fixword + '.json', 'w')
    wordfile.write(partofspeech + newdef)
    wordfile.close()
    
    if(len(line) == 0):
        break

words.write(','.join(wordlist))
words.write(']')
words.close()
inp.close()