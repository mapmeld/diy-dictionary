# DIY-Dictionary

Static website for searching a dictionary of thousands of words, with an autocompleting
search bar and support for accents on words.

## In production
I am using this code to search and display content from an 8,500-word dictionary.

I am working with SugarLabs to build a Haitian Creole dictionary which we can
deliver to One Laptop per Child laptops, in a Sugar activity or on a school server, and
through mobile apps. HTML/JSON was a clear winner.

## How it works

### Preparing content
The Haitian Creole content cannot be released at this time, but essentially you populate
content.csv with several thousand rows in the format
```
word,part of speech,definition
```

Run dictionaryout.py to create a words list at words.json and a definition file for each
word. For example, words/sample.json for the word "sample".

### Delivering content

Twitter Bootstrap's autocomplete tool matches your text against words in words.json,
with accents and case insensitive. You pick the word from the list, the browser quickly
finds the matching JSON file from the words directory, and the part of speech and definition
are loaded into the interface.