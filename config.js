//User Settings
TOLERANCE = .3;
SYNC_INTERVAL = 1;
USER_UPDATE_INTERVAL = 1;
FULLSCREEN_CONTROLS_TIMEOUT = 3;
LOBBY_SOUNDS_SETTING = "on";
REACTION_STAY_TIME = 3;
LOBBY_REACTIONS_SETTING = "on";
OUT_OF_SYNCS_BEFORE_JIMMY = 4
OUT_OF_SYNCS_BUILD_BUFFER = 2;
PLAYER_VOLUME = 1;
JIMMYNET_SETTING_TOGGLED = false;

//Lobby settings
ADSKIP_ENABLED = true;

//On the fly globals:  do not change
var fullscreenEnabled = false;
var youtubePlayer;
var trackingInfo = new Array();
var queue = new Array();
var youtubeLookupTable = new Array();
var videoEnded = false;
var mobile = false;
var youtubeDisabled;
var youtubeReady = false;
var pausedTimeStamp = "";
var initialTrackingInfoPulled = false;
var userActive = true;
var addFavoriteModeActive = false;
var removeFavoriteModeActive = false;
var favoriteEmojis = new Array();
var activeReactions = new Array();
var queuedReaction = "none";
var jimmyNet = false;
var videoInfoActive = false;
var controlsLocked = false;
var theaterMode = false;
var videoFileData;
var videoFileData_loadedVideo;
var hideButtonRightToggle = false;

//Graphics
DEFAULT_THUMBNAIL = "/graphics/ThumbnailUnavailable.png";

//Text
DEFAULT_BROWSER_MESSAGE = "\"Hey, it's me, GhostStink.  Find a video to play off to the left\"";