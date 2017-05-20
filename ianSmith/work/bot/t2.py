import itertools
import sys
#import urlparse
from datetime import datetime, timedelta
from urllib.parse import urljoin, urlparse, urlsplit

import os
import re
import pickle
import zlib

from urllib.request import Request, urlopen, urlretrieve
from urllib.error import HTTPError
from urllib.error import URLError 
from bs4 import BeautifulSoup
import time

#parse robots file
#import robotparser
import robotexclusionrulesparser

userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
base = "http://www.jobspider.com"
jobbase = "http://www.jobspider.com/job/"
startpage = "http://www.jobspider.com/job/browse-resumes.asp"
#startpage = "http://www.jobspider.com/job/resume-search-results.asp/category_"
#categorypage = "http://www.jobspider.com/job/resume-search-results.asp/category_#/page_#"

#initialize robotparser
rp = robotexclusionrulesparser.RobotExclusionRulesParser()
#rp = robotparser.RobotFileParser()
rp.user_agent = userAgent
rp.fetch = "http://www.jobspider.com/robots.txt"
#rp.read()



class Downloader:
    def __init__(self, delay=2, user_agent=userAgent, num_retries=2, cache=None):
        self.throttle = Throttle(delay)
        self.user_agent = user_agent
        self.num_retries = num_retries
        self.cache = cache

    def __call__(self, url):
        result = None
        if self.cache:
            try:
                result = self.cache[url]
            except KeyError:
                #url not in cache
                pass
            else:
                if self.num_retries > 0 and result['code'] == None or 500 <= result['code'] < 600:
                    #server error -> ignore cached data and redownload
                    result = None
        if result is None:
            self.throttle.wait(url)
            headers = {'User-agent': self.user_agent}
            result = self.download(url, headers, num_retries=self.num_retries)
            if self.cache:
                self.cache[url] = result
        return result
        

    def download(self, url, user_agent, num_retries=2):
        print("Downloading: ", url)
        request = Request(url, None, user_agent)
        #request.add_header('User-agent', userAgent)
        try:
            response = urlopen(request)
            html = response.read()
            code = response.code
        #except URLError as e:
            #print ('Download Error:', e.reason)
        except Exception as e:
            print ('Download Error:', str(e))
            html = None
            if hasattr(e,'code'):
                code = e.code
                if num_retries > 0 and 500 <= code < 600:
                    #retry for 5xx error
                    return self._get(url, user_agent, num_retries-1)
            else:
                code = None
        return {'html': html, 'code': code}





def crawl(start, cache=None):
    D = Downloader(delay=2, user_agent=userAgent, num_retries=2, cache=None)
    shtml = D(start)
    soup = BeautifulSoup(shtml['html'], 'html.parser')
    #print(soup)
    categories = soup.find("table", {"cellpadding":"5"}).findAll("a")
    #print(categories)
    for category in categories:
        if rp.is_allowed(userAgent, category.attrs['href']): 
            link = urljoin(jobbase, category.attrs['href'])
            html = D(link) 
            if html['html'] is None:
                continue
            else:
                getresumes(html['html'])
                psoup = BeautifulSoup(html['html'], 'html.parser')
                pages = psoup.findAll("font", {"face":"arial", "size":"2"})
                pageElements = pages[1].contents
                if pageElements[1].name == "br":
                    continue
                else:
                    for el in pageElements:
                        if el.name == "a" and el.text != "Next >":
                            if rp.is_allowed(userAgent, el['href']): 
                                rlink = urljoin(jobbase, el['href'])
                                rhtml = D(rlink) 
                                if rhtml['html'] is None:
                                    continue
                                else:
                                    getresumes(rhtml['html'], cache=cache)
                            else:
                                print("blocked by robots.txt", el['href'])
                        else:
                            continue
                    #crawl(url+"/page_")
        else:
            print("blocked by robots.txt", category.attrs['href'])
    
    
#def crawl(url):
#    #p = download("https://en.wikipedia.org/wiki/42_(number)")
#    #print(p)
#    max_err = 3
#    num_err = 0
#    for category in itertools.count(1):
#        url = startpage+str(category)
#        if rp.is_allowed(userAgent, url):
#        #if rp.can_fetch(userAgent, url):
#            html = download(url)
#            if html is None:
#                num_err += 1
#                if num_err == max_err:
#                    break
#            else:
#                #success
#                getresumes(html)
#                num_err = 0
#                crawl(url+"/page_")
#        else:
#            print("blocked by robots.txt", url)
            
            
def getresumes(html, cache=None):
    D = Downloader(delay=2, user_agent=userAgent, num_retries=2, cache=cache)
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find("table", {"border":"1"}).findAll("tr")
    for link in table[1:]:
        #print(link.find("a").attrs['href'])
        #if rp.can_fetch(userAgent, reslink):
        if rp.is_allowed(userAgent, link.find("a").attrs['href']):
            reslink = base+link.find("a").attrs['href']
            respage = D(reslink)  #base+link.find("a").attrs['href'])
            if respage['html'] is None:
                continue
            else:
                resumesoup = BeautifulSoup(respage['html'], 'html.parser')
                #print(resumesoup.find("table", {"cellspacing":"1","cellpadding":"1"}))
                print("_____",end="")
                print(resumesoup.find("table", {"cellspacing":"1","cellpadding":"1"}).findAll("b"),end="")
                print("_____")
                if resumesoup.find("table", {"cellspacing":"1","cellpadding":"1"}).text.strip().isprintable():
                    print(resumesoup.find("table", {"cellspacing":"1","cellpadding":"1"}).text.strip())
                else:
                    print(resumesoup.find("table", {"cellspacing":"1","cellpadding":"1"}).text.strip().encode('utf8', 'ignore').decode('utf8','ignore'))
        else:
            print("blocked by robots.txt", url)


class Throttle:
    def __init__(self, delay):
        #delay time
        self.delay = delay
        #timestamp of most recent domain access
        self.domains = {}

    def wait(self, url):
        domain = urlparse(url).netloc
        last_accessed = self.domains.get(domain)

        if self.delay > 0 and last_accessed is not None:
            sleep_secs = self.delay - (datetime.now() - last_accessed).seconds
            if sleep_secs > 0:
                time.sleep(sleep_secs)
        #update access time
        self.domains[domain] = datetime.now()


class DiskCache:
    def __init__(self, cache_dir='cache'):
        self.cache_dir=cache_dir
        #self.max_length = 255   #max_length

    def url_to_path(self, url):
        components = urlsplit(url)
        #append index.html to empty paths
        path = components.path
        if not path:
            path = '/index.html'
        elif path.endswith('/'):
            path += 'index.html'
        filename = components.netloc + path + components.query
        #replace invalid chars
        filename = re.sub('[^/0-9a-zA-Z\-.,;_ ]', '_', filename)
        #restrict max chars
        filename = '/'.join(segment[:255] for segment in filename.split('/'))
        return os.path.join(self.cache_dir, filename)

    def __getitem__(self, url):
        #load data from disk for this url
        path = self.url_to_path(url)
        if os.path.exists(path):
            with open(path, 'rb') as fp:
                data = zlib.decompress(fp.read())
                return pickle.loads(data)
        else:
            # url has not been cached
            raise KeyError(url + ' does not exist in cache')

    def __setitem__(self, url, result):
        #save data to disk for url
        path = self.url_to_path(url)
        folder = os.path.dirname(path)
        if not os.path.exists(folder):
            os.makedirs(folder)
        with open(path, 'wb') as fp:
            fp.write(zlib.compress(pickle.dumps(result)))

cache = DiskCache()

crawl(startpage, cache)

