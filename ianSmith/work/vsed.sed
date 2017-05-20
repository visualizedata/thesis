#updated data cleaner

g/^$/d
g/^JobSpider.com has chosen/d
s/"//g

#run jsoner.awk on file

#optionally remove unicode chars if your pc doesnt dig that kind of thing vvv
#s/[\d128-\d255]/\-/g

s/^"Downloading/},{"Downloading/g
g/^Candidate Contact Info/d
s/,\n},/},\r/g
s/^"_____/"rCategories":/g
s/":" <\/b>/"/g
s/_____"//g
s/ <\/b>/"/g
s/<\/b>/"/g
s/<b>/"/g
s/"\s*/"/g
s/\\/ /g
s/_\+,$/",/g
s/_\+},$/"},/g
s/<hr>//g
s/\/<hr>//g
#actually just this will work for the xml bits vvv
s/<\w>*//g
s/<\/\w>*//g


