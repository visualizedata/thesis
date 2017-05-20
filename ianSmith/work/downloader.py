import itertools
import sys
#import urlparse -(python2)
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
#import robotparser -(python2)
import robotexclusionrulesparser

userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"

#initialize robotparser
rp = robotexclusionrulesparser.RobotExclusionRulesParser()
#rp = robotparser.RobotFileParser() -(python2)
rp.user_agent = userAgent
rp.fetch = "http://www.jobspider.com/robots.txt"
#rp.read() -(python2)



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


