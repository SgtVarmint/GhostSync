#NEW CODE (Updated 2/5/2021)
temp1=`curl $1`
temp2=`echo $temp1 | grep -o '"videoPrimaryInfoRenderer":{"title":{"runs":\[{"text":.*}\]},"viewCount"'`
temp3=`echo $temp2 | sed s/.*:.//`
echo $temp3 | sed s/\".*//

#OLD CODE (No longer works Feb. 2021)
#wget -qO temp1 $1
#cat temp1 | grep -o '\\"title\\":\\".*\\",\\"lengthSeconds\\":' > temp2
#cat temp2 | sed s/.*:..// > temp3
#cat temp3 | sed s/\\\\\".*//
#rm temp1 temp2 temp3
