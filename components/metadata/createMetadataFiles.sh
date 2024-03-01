rootFolder="/home/jon/mount/VideoDrive/Videos"
normalMoviesFolder="/Movies"
metadataMoviesFolder="/_metadata/Movies"
normalTVFolder="/TV"
metadataTVFolder="/_metadata/TV"
IFS=$'\n'

#rm -r /home/jon/mount/VideoDrive/Videos/_metadata/Movies
#rm -r /home/jon/mount/VideoDrive/Videos/_metadata/TV

#mkdir /home/jon/mount/VideoDrive/Videos/_metadata/Movies
#mkdir /home/jon/mount/VideoDrive/Videos/_metadata/TV

echo Started \- `date` >> /home/jon/logs/createMetadataFiles.log

for i in `find "$rootFolder$normalTVFolder" -name "*.mp4" -o -name "*.mkv"`
do
	currentShow=`echo $i | sed 's/.*Videos\/TV\///' | sed 's/\/.*//'`
	currentSeason=`echo $i | sed 's/.*Season\ //' | sed 's/\/.*//'`
	outputFile=`echo $i | sed s:"$normalTVFolder":"$metadataTVFolder":`
	outputFile=`echo $outputFile | sed 's/\.mp4/\.txt/'`

	#Create show folder if it doesn't exist
	if [ ! -d "$rootFolder$metadataTVFolder/$currentShow" ]
	then
		echo "$rootFolder$metadataTVFolder/$currentShow"
		mkdir -p "$rootFolder$metadataTVFolder/$currentShow"
	fi

	#Create season folder if it doesn't exist
	if [ ! -d "$rootFolder$metadataTVFolder/$currentShow/Season $currentSeason" ]
	then
		echo "$rootFolder$metadataTVFolder/$currentShow/Season $currentSeason"
		mkdir -p "$rootFolder$metadataTVFolder/$currentShow/Season $currentSeason"
	fi
	
	ffmpeg -n -i $i -f ffmetadata $outputFile
done

for i in `find "$rootFolder$normalMoviesFolder" -name "*.mp4" -o -name "*.mkv"`
do
	outputFile=`echo $i | sed s:"$normalMoviesFolder":"$metadataMoviesFolder":`
	
	outputFile=`echo $outputFile | sed 's/\.mp4/\.txt/'`
	ffmpeg -n -i $i -f ffmetadata $outputFile
done

echo Completed \- `date` >> /home/jon/logs/createMetadataFiles.log
