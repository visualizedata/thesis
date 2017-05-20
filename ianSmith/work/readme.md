## Analytical/backend programs

- bot/ contains the webbot used to pull the resumes from jobspider.com
- The protoviz file is an ipython/jupyter notebook where most of the 
analysis and wrangling on the resume data is done
- onet_reaper is the jupyter notebook here occupation profiles are pulled from onet.org and
restructured to be used a corpora
- expviz is some exploratory grouping and charting of the resume data
- downloader.py is a webpage downloader class that packages together 
the creation of an User-agent, Throttling, and parsing robots.txt files
- vsed is a small sed script to translate the raw data pulled from the internet by 
the web bot into json format to be imported into the protoviz notebook.





