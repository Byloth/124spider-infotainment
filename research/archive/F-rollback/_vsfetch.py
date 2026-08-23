#!/usr/bin/env python3
"""Fetch VerticalScope (XenForo) forum pages behind PoW challenge; save HTML and extract posts to markdown."""
import re,hashlib,subprocess,sys,html,os
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
H=["-H","Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8","-H","Accept-Language: en-US,en;q=0.9","-H","Upgrade-Insecure-Requests: 1","-H","Sec-Fetch-Dest: document","-H","Sec-Fetch-Mode: navigate","-H","Sec-Fetch-Site: none","-H","Sec-Fetch-User: ?1","-H",'sec-ch-ua: "Chromium";v="127", "Not)A;Brand";v="99"',"-H","sec-ch-ua-mobile: ?0","-H",'sec-ch-ua-platform: "Windows"',"--compressed"]
def get(url, cj="cj.txt", cookie=None):
    cmd=["curl","-s","-L","-m","90","-A",UA,*H,"-b",cj,"-c",cj]
    if cookie: cmd+=["-b",cookie]
    return subprocess.run(cmd+[url],capture_output=True).stdout.decode("utf-8","ignore")
def fetch(url):
  import time
  for attempt in range(2):
    cj="cj%d.txt"%attempt
    if os.path.exists(cj): os.remove(cj)
    body=get(url,cj=cj)
    if "POW_CHALLENGE_DATA" in body:
        g=lambda k: re.search(k+r":'([^']*)'", body).group(1)
        nonce,hmac,diff,dc,issued=g("challenge_nonce"),g("challenge_hmac"),int(g("difficulty")),g("difficulty_char"),g("issued_at")
        i=0
        while True:
            i+=1;u=str(i);h=hashlib.sha256((nonce+issued+u).encode()).hexdigest()
            if h.startswith(dc*diff): break
        body=get(url,cj=cj,cookie=f"pow_bypass={nonce}|{issued}|{u}|{h}|{hmac}")
    if len(body)>5000 and "POW_CHALLENGE_DATA" not in body: return body
    sys.stderr.write(f"retry {attempt} len={len(body)}\n"); time.sleep(2)
  return body
def strip(s):
    s=re.sub(r"<blockquote.*?</blockquote>", lambda m: "\n> [quote] "+re.sub(r"<[^>]+>"," ",m.group(0))[:600].strip()+"\n", s, flags=re.S)
    s=re.sub(r"<br\s*/?>","\n",s); s=re.sub(r"</p>","\n",s); s=re.sub(r"<li>","\n- ",s)
    s=re.sub(r'<a [^>]*href="([^"]+)"[^>]*>(.*?)</a>', lambda m: m.group(2)+" ("+m.group(1)+")", s, flags=re.S)
    s=re.sub(r"<[^>]+>","",s); s=html.unescape(s)
    s=re.sub(r"[ \t]+"," ",s); s=re.sub(r"\n\s*\n+","\n",s)
    return s.strip()
def extract(body):
    out=[]
    t=re.search(r"<title>([^<]*)",body); out.append("# "+(html.unescape(t.group(1)) if t else ""))
    pos=0; seen=set()
    for m in re.finditer(r'<div class="bbWrapper">', body):
        i=m.start()
        # only consider bbWrappers inside message-body articles (skip quotes preview etc.)
        pre=body[max(0,i-6000):i]
        a=list(re.finditer(r'data-author="([^"]*)"',pre)); author=a[-1].group(1) if a else "?"
        p=list(re.finditer(r'(?:data-content="post-|id="post-|id="js-post-)(\d+)"',pre)); pid=p[-1].group(1) if p else "pos%d"%i
        if pid in seen: continue
        seen.add(pid)
        d=list(re.finditer(r'<time[^>]*datetime="([^"]+)"[^>]*qid="post-date-time"',pre)); 
        if not d: d=list(re.finditer(r'<time[^>]*datetime="([^"]+)"',pre))
        date=d[-1].group(1)[:10] if d else "?"
        rest=body[m.end():]
        c=re.search(r'(.*?)(?:<div class="js-selectToQuoteEnd|</article>)', rest, flags=re.S)
        content=strip(c.group(1)) if c else "(no content)"
        out.append(f"\n## [{author}] {date} (post {pid})\n{content}")
    return "\n".join(out)
if __name__=="__main__":
    for a in sys.argv[1:]:
        url,out=a.split("@@")
        body=fetch(url)
        open(out+".html","w").write(body)
        md=extract(body)
        open(out+".md","w").write(md)
        n=md.count("\n## [")
        pages=re.findall(r'/page-(\d+)',body)
        print(out, len(body), "posts:",n, "lastpage:", max([int(p) for p in pages],default=1), re.search(r"<title>([^<]*)",body).group(1)[:80] if "<title>" in body else "NOTITLE")
