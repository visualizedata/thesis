## This is a little web-bot

It crawls over [jobspider.com](http://www.jobspider.com/) pulling out resumes.
It uses Beautiful Soup to clean up the output for the sed script contained 
in the parent directory.

There are about 60,000 resumes from various industries, The bot uses about a 2 second throttle 
for each request so it took about 38 hours to complete. The bot also implements a simple disk cache 
so as to save time and server demand caused by hiccups or uncaught errors.

> credit where credit is due; Many of the classes in t2 were inspired by 
> Richard Lawson's Web Scraping with Python book from Packt Publishing
> (just rewritten for python 3 and other minor adjustments)

