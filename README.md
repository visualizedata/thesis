##This is a repository of all Parsons MSDV thesis projects
This repository uses Vue.js to aggregate all previous student thesis projects from 2016-2020. Each student contains some or all of:

- Student name
- Thesis title
- About project details (currently split into 2 parts)
- Preview image
- Github link
- Video link
- 2 Hashtags

#To Edit
The project vues and data are currently pulling from script.js - it will eventually be pulling from json/project.json. 
Additional scripts managing the UI componenets can be found in into.js.

#Data Handling
The student github and video links are currently conditionally rendered v-if and v-show in index.html. The data connected to student projects is handled with v-bind and will eventually be updated to a json object as with the other thesis microsites. 
