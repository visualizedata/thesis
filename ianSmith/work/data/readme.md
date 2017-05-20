## The data

jspider.json is the resume data fed into the protoviz notebook the object structure 
appears like so:

```json
{"Downloading":"http //www.jobspider.com/job/view-resume-78638.html",
"rCategories":["Experience", "Education", "Skills", "Candidate Contact Information"],
"Desired Industry":"Accounting/Bookkeeping",
"SpiderID":"78638",
"Desired Job Location":"Huntersville, North Carolina",
"Date Posted":"1/15/2017",
"Type of Position":"Full-Time Permanent",
"Availability Date":"",
"Desired Wage":"",
"U.S. Work Authorization":"Yes",
"Job Level":"Management (Manager, Director)",
"Willing to Travel":"",
"Highest Degree Attained":"Masters",
"Willing to Relocate":"",
"Experience":"Time Warner Cable Inc., Charlotte, NCIncome Tax Manager Nov 2014PresentIncome Tax Supervisor May 2010Oct 2014Senior Tax Accountant Oct 2008Apr 2010Closely work with .... -end tax provisionsCarried out multiple federal and state tax research projects",
"Education":"Master of Professional Accountancy, West Virginia University, Morgantown, WV | Dec 2006Bachelor of Science in History, Fairmont State University, Fairmont, WV | Dec 2002Certified Public Accountant, State of West Virginia",
"Skills":"Areas of ExpertiseMergers and Acquisitions | Tax Planning and Implementation | Estimated Tax Payments | Annual Tax Return PreparationTax Compliance | Tax Provision Processes | Income Tax Management | Generally Accepted Accounting PrinciplesMicrosoft Office Applications (Word, Excel, Access, and PowerPoint), PowerTax, PeopleSoft, Hyperion, ProSystem fx Tax, and ProSystem fx Engagement"},
```

All the fields are taken directly from the html elements of the resumes except for 'rCategories' and 'Downloading'
Not all resumes contained the same fields so rCategories is an array of the fields that each
particular resume contains.

combined_onet.txt contains the combined descriptive data for occupational profiles from Bureau of Labor Stats and Onet.org

Titles.txt contains the same data but formated to be stored in /nltk_data/corpora/wordnet to be used by NLTK 
functions in protoviz as a custom corpora for creating ngrams.

categories.txt contains the list industries as organized by jobspider.

The tsv files contain occupation profiles and descriptive data from the (Bureau of Labor statistics)[https://www.bls.gov/oes/]
 and (onet.org)[https://www.onetonline.org/]


