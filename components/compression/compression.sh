rootFolder="/home/jon/mount/VideoDrive/Videos"
normalMoviesFolder="/Movies"
lowResMoviesFolder="/_LowRes/Movies"
normalTVFolder="/TV"
lowResTVFolder="/_LowRes/TV"
normalUploadsFolder="/Uploads"
lowResUploadsFolder="/_LowRes/Uploads"
IFS=$'\n'

echo Started \- `date` >> /home/jon/logs/compression.log

for i in `find "$rootFolder$normalTVFolder" -name "*.mp4"`
do
	currentShow=`echo $i | sed 's/.*Videos\/TV\///' | sed 's/\/.*//'`
	currentSeason=`echo $i | sed 's/.*Season\ //' | sed 's/\/.*//'`
	outputFile=`echo $i | sed s:"$normalTVFolder":"$lowResTVFolder":`

	#Create show folder if it doesn't exist
	if [ ! -d "$rootFolder$lowResTVFolder/$currentShow" ]
	then
		echo "$rootFolder$lowResTVFolder/$currentShow"
		mkdir -p "$rootFolder$lowResTVFolder/$currentShow"
	fi

	#Create season folder if it doesn't exist
	if [ ! -d "$rootFolder$lowResTVFolder/$currentShow/Season $currentSeason" ]
	then
		echo "$rootFolder$lowResTVFolder/$currentShow/Season $currentSeason"
		mkdir -p "$rootFolder$lowResTVFolder/$currentShow/Season $currentSeason"
	fi
	ffmpeg -n -i $i -preset ultrafast -b:v 1000k $outputFile
done

for i in `find "$rootFolder$normalMoviesFolder" -name "*.mp4"`
do
	outputFile=`echo $i | sed s:"$normalMoviesFolder":"$lowResMoviesFolder":`

	ffmpeg -n -i $i -preset ultrafast -b:v 1000k $outputFile
done

for i in `find "$rootFolder$normalUploadsFolder" -name "*.mp4"`
do
	outputFile=`echo $i | sed s:"$normalUploadsFolder":"$lowResUploadsFolder":`

	ffmpeg -n -i $i -preset ultrafast -b:v 1000k $outputFile
done

echo Completed \- `date` >> /home/jon/logs/compression.log
