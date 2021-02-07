#NEW CODE (Updated 2/5/2021)
wget -qO temp1 $1
cat temp1 | grep -o '"videoPrimaryInfoRenderer":{"title":{"runs":\[{"text":.*}\]},"viewCount"' > temp2
cat temp2 | sed s/.*:.// > temp3
cat temp3 | sed s/\".*//
rm temp1 temp2 temp3

#OLD CODE (No longer works Feb. 2021)
#wget -qO temp1 $1
#cat temp1 | grep -o '\\"title\\":\\".*\\",\\"lengthSeconds\\":' > temp2
#cat temp2 | sed s/.*:..// > temp3
#cat temp3 | sed s/\\\\\".*//
#rm temp1 temp2 temp3
