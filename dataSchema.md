## Example

### thesis object

```json
      {
            "description": "Voting choices are made on more than just facts \u2013 emotion, bias and unconscious thought play an important role in one\u2019s decision-making process. But what effect does advertising have? This thesis visualizes American voters\u2019 unconscious response to political advertising & media.",
            "image": "preview-2020/lulu.png",
            "name": "Lulu Tanenbaum",
            "portfolio": "http://lulutanenbaum.com/",
            "repo": "https://github.com/visualizedata/thesis-2020/tree/master/luluTannenbaum",
            "subtitle": "Voting choices are made on more than just facts...",
            "tags": [
              "media",
              "society"
            ],
            "title": "Your Brain on Political Media",
            "url": "http://lulutanenbaum.com/portfolio/thesis/",
            "video": "https://vimeo.com/422526930",
            "year": 2020
      },
```


### original ms1 object (2019 Met)

```json
      {
            "title": "New Media Art",
            "title_full": "Has The Met adopted New Media Art?",
            "description": "The Met is a pivotal example of a legacy museum. The collection is vast and encompasses some of the most fundamental pieces of art and artifacts. However, the negative connotations of legacy can suggest traditional standards or practices, which might not suggest the new nuances of contemporary art. This led to my questioning for this quantitative data visualization; has The Met adopted new media art? What types of new media art do they collect? What is the makeup of this collection?",
            "url": "http://lulutanenbaum.com/portfolio/met-new-media/",
            "author": "Lulu Tanenbaum",
            "image": "quant1 - Lulu Tanenbaum.jpg"
      },
```

### new ms1 object
will hasve the same structure(property names) as thesis data.json

property values are either pulled from the `original ms1 obj` or `thesis obj`

as demonstrated below – [ name ] means property value pulled from `ms1 obj`

```javascript
      const imgURLPrefix = "github.com/visualizedata/met-museum-2019/blob/master/data/images/"
      const year = 2019
```

```jsonc
      {
            "description": ["description"] 
            "image": imgURLPrefix + ["image"]  
            "name": ["author"] //from ms1 author
            "portfolio": "http://lulutanenbaum.com/"  //from thesis
            "repo": "https://github.com/visualizedata/thesis-2020/tree/master/luluTannenbaum"  //from thesis
            "subtitle": ["title_full"] 
            "tags": ["met"], //option 1: add institution name to the existing "tags" property
            "title": ["title"],
            "url": ["url"],
            "video": N/A,
            "year": year, 
            "project": "met", //option 2: store institution name to a new property "project"
                            //and all thesis projects will have the value "thesis"
      }
```
