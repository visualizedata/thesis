# Updates
## Data Schema


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


## Collecting Progress

Following is a checklist of all the data files to be processed. Some files needs to be manually adjust. So the instructions are also included here.



### Thesis Data

[updated thesis json](https://github.com/JessieJessJe/archive-data/blob/main/thesis_all.json)

- [x] before 2022
- [x] 2022
  
  - [ ] need to collect `student_url`


### MS1 Data

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



## Next Step

	
* What's the value of `image_url` -- aka the path of the image assets? currently there are two scenarios:

  * preview.png from each author's repo (absolute path)
  * directly hosted from repo (relative path)
 
* Process `undp` data

* Manual adjustments and merge files 
