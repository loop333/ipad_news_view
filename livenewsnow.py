#!python3
# -*- coding: utf-8 -*-
import urllib.request
import ssl
import json

context = ssl._create_unverified_context()

resp = urllib.request.urlopen('https://www.livenewsnow.com/wp-json/wp/v2/pages?per_page=10', context=context)
pages = json.load(resp)
print('no of pages=', len(pages))
for page in pages:
#    print(json.dumps(page, indent=2))
    print(' page', page['id'], page['link'])

n = 1
while 1:
    resp = urllib.request.urlopen('https://www.livenewsnow.com/wp-json/wp/v2/posts?per_page=20&page='+str(n), context=context)
    posts = json.load(resp)
    print('no of posts=', len(posts))
    for post in posts:
#        print(json.dumps(post, indent=2))
#        break
        print(' post', post['id'], post['link'], post['slug'])
    if len(posts) < 20:
        break
    n = n + 1
