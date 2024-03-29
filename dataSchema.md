# Updates
## Data Schema

for data.json

```jsonc
{
      "author": array[1],
      
      "title": string,
      "subtitle": string, 		
      "description": string,

      "student_url": string, 			
      "project_url": string,       
      "project_repo": string, 
      
      "category": array[1],  //"thesis" or "ms1"     
      "tags": array, //for "ms1" category, tag can be "smithsonian", "met", or "undp"
      
      "year": int,
      
      "image": array,      
      "image_url": array,     
      "video": string,
}

```

for metadata.json

```json

{

    "msdv_url": "http://www.newschool.edu/parsons/ms-data-visualization/",
    "msdv_archive_url": "https://parsons.nyc/",

    "amt_url": "http://www.newschool.edu/parsons/art-media-technology-school-amt/",
    "parsons_url": "https://www.newschool.edu/parsons/",
    "newschool_url": "https://www.newschool.edu/"
    
}

```



## Collecting Progress

Following is a checklist of all the data files to be processed. Some files needs to be manually adjust. So the instructions are also included here.



### Thesis Data

[updated thesis json](https://github.com/JessieJessJe/archive-data/blob/main/thesis_all.json)

- [x] before 2022
- [x] 2022
  
  - [ ] need to collect `student_url`


### Partnerships

- Smithsonian Institute Partnership 2021 https://github.com/visualizedata/smithsonian-2020`
- SI 2020 https://github.com/visualizedata/smithsonian-2020
- The Met Museum 2019 https://github.com/visualizedata/met-museum-2019
- UNDP Renewable Energy 2018 https://github.com/visualizedata/undp-renewable-energy
- UNDP Inequality Trends 2017 https://github.com/visualizedata/undp-inequality-trends
- UNDP Inequality 2016 https://github.com/visualizedata/undp-inequality
- UNDP Gender Gap 2015 https://github.com/visualizedata/undp

#### Collection

- [ ] undp 2015 [currently working on](https://parsons.nyc/undp/)

- [ ] undp 2016 `repo?`

- [ ] undp 2017 `repo?`
- [x] met [ms1-2018](https://github.com/JessieJessJe/archive-data/blob/main/ms1_2018.json)
- [x] met [ms1-2019](https://github.com/JessieJessJe/archive-data/blob/main/ms1_2019.json)
  - [ ] modify name: Antonie C. Dreyer
  - [ ] missing: Xingyang Cai
- [x] smithsonian [ms1-2020](https://github.com/JessieJessJe/archive-data/blob/main/ms1_2020.json)
  - [ ] modify name: Soonk Paik
- [x] smithsonian [ms1-2021](https://github.com/JessieJessJe/archive-data/blob/main/ms1_2021.json)
  - [ ] modify name: Baihan Lin, Gisli Gudjonsson
  - [ ] 1 typo: `decription`


# Next Step

	
* What's the value of `image_url` -- aka the path of the image assets? currently there are two scenarios:

  * preview.png from each author's repo (absolute path)
  * directly hosted from repo (relative path)
 
* Process `undp` data

* Manual adjustments 

* Any changes on metadata.json
