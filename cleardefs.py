# cleardefs.py

words = open('contentfix.csv', 'r')
fix = open('content.csv', 'w')

while(True):
    line = words.readline()
    if(len(line) < 10):
        break
    #word = line.split(':')[0]
    #line = word + ":" + line.replace(word + ":","")
    
    addword = ''
    if(line[0] == '"'):
      # ignore word
      fix.write(line)
      continue
      line = line[ line.find('"') + 1 ]
      addword = addword + '"' + line[ : line.find('"') ] + '"'
      line = line[ line.find('"') + 1 ]
    # crop a definition within quotes
    if(line.find('"') > -1):
      definition = line[ line.find('"') + 1 : line.rfind('"') ]
      if(len(definition) > 15):
        definitionstart = definition[:15]
        if(definition.rfind(definitionstart) > 0):
          definition = definitionstart + definition.split(definitionstart)[1]
          line = line[ : line.find('"') ] + '"' + definition + '"\r'
    
    fix.write(addword + line)

words.close()
fix.close()