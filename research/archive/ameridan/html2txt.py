import sys, re, html
from html.parser import HTMLParser

class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.out=[]; self.skip=0; self.href=None
        self.in_article=False; self.depth=0
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag in ('script','style','noscript','svg','form','nav'):
            self.skip+=1; return
        if self.skip: return
        if tag=='a' and a.get('href'):
            self.href=a['href']; self.out.append('[')
        elif tag in ('p','div','br','li','h1','h2','h3','h4','tr','blockquote','article','section'):
            self.out.append('\n')
            if tag=='li': self.out.append(' - ')
            if tag in('h1','h2','h3','h4'): self.out.append('\n## ')
        elif tag=='img':
            src=a.get('src') or a.get('data-orig-file') or ''
            alt=a.get('alt','')
            self.out.append(f' [IMG {alt} {src}] ')
        # comment metadata
        cls=a.get('class') or ''
        if 'comment-body' in cls or 'comment-author' in cls:
            self.out.append('\n>>> ')
    def handle_endtag(self, tag):
        if tag in ('script','style','noscript','svg','form','nav') and self.skip:
            self.skip-=1; return
        if self.skip: return
        if tag=='a' and self.href is not None:
            self.out.append(f']({self.href})'); self.href=None
        elif tag in ('p','div','li','h1','h2','h3','h4','tr','blockquote'):
            self.out.append('\n')
    def handle_data(self, d):
        if self.skip: return
        self.out.append(d)
for f in sys.argv[1:]:
    s=open(f,encoding='utf-8',errors='replace').read()
    # cut to main content
    m=re.search(r'<main|<div id="content"|<div id="primary"', s)
    if m: s=s[m.start():]
    m=re.search(r'<div id="secondary"|<aside id="secondary"|<footer id="colophon"', s)
    if m: s=s[:m.start()]
    p=P(); p.feed(s)
    t=''.join(p.out)
    t=re.sub(r'[ \t]+',' ',t); t=re.sub(r'\n\s*\n+','\n\n',t)
    open(f[:-5]+'.txt','w').write(html.unescape(t))
    print(f, len(t))
