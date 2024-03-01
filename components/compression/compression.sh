rootFolder="/home/jon/mount/VideoDrive/Videos"
normalMoviesFolder="/Movies"
lowResMoviesFolder="/_LowRes/Movies"
normalTVFolder="/TV"
lowResTVFolder="/_LowRes/TV"
normalUploadsFolder="/Uploads"
lowResUploadsFolder="/_LowRes/Uploads"
IFS=$'\n'
count=0
failedCount=0

echo `date` \- Started >> /home/jon/logs/compression.log

echo --------------------
echo `date` \- Started

for r in 1 2
do

for i in `find "$rootFolder$normalTVFolder" -name "*.mp4" -o -name "*.mkv"`
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

	if [ ! -f $outputFile ]
	then
		ffmpeg -n -i $i -preset ultrafast -b:v 1000k $outputFile
		if (( $r == 1 ))
		then
			count=$(expr $count + 1)
		else
			echo Failed - $outputFile
                        echo Failed - $outputFile >> /home/jon/logs/compression.log
			failedCount=$(expr $failedCount + 1)
		fi
	fi
done

for i in `find "$rootFolder$normalMoviesFolder" -name "*.mp4" -o -name "*.mkv"`
do
	outputFile=`echo $i | sed s:"$normalMoviesFolder":"$lowResMoviesFolder":`


	if [ ! -f $outputFile ]
        then
                ffmpeg -n -i $i -preset ultrafast -b:v 1000k $outputFile
                if (( $r == 1 ))
		then
                        count=$(expr $count + 1)
                else
			echo Failed - $outputFile
                        echo Failed - $outputFile >> /home/jon/logs/compression.log
                        failedCount=$(expr $failedCount + 1)
                fi
        fi
done

for i in `find "$rootFolder$normalUploadsFolder" -name "*.mp4" -o -name "*.mkv"`
do
	outputFile=`echo $i | sed s:"$normalUploadsFolder":"$lowResUploadsFolder":`

	if [ ! -f $outputFile ]
        then
                ffmpeg -n -i $i -preset ultrafast -b:v 1000k $outputFile
                if (( $r == 1 ))
		then
                        count=$(expr $count + 1)
                else
			echo Failed - $outputFile
			echo Failed - $outputFile >> /home/jon/logs/compression.log
                        failedCount=$(expr $failedCount + 1)
                fi
        fi
done
done

echo `date` \- Completed >> /home/jon/logs/compression.log
echo Processed $count Files >> /home/jon/logs/compression.log
if (( $failedCount > 0 ))
then
        echo $failedCount Files Failed To Process >> /home/jon/logs/compression.log
fi
echo -------------------- >> /home/jon/logs/compression.log



echo `date` \- Completed
echo Processed $count Files
if (( $failedCount > 0 ))
then
	echo $failedCount Files Failed To Process
fi
echo --------------------
