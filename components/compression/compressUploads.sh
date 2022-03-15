newestVideo=`ls -Art /home/jon/mount/VideoDrive/Videos/Uploads/ | tail -n 1`


#for i in "$@"
#do
#	filePath=`echo "$filePath$i "`
#done

#filePath=`echo $filePath | sed "s/$//"`

#echo Test - $filePath

filePath="Uploads/$newestVideo"

rootVideoFolder="/home/jon/mount/VideoDrive/Videos/"
lowResFolder="_LowRes/"
inputFile="$rootVideoFolder$filePath"
outputFile="$rootVideoFolder$lowResFolder$filePath"

echo input - $inputFile

String ffmpegString

ffmpeg -n -i "$inputFile" -preset ultrafast -b:v 1000k "$outputFile"
