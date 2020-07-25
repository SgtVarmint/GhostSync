TOLERANCE = .3;
SYNC_INTERVAL = 1;
USER_UPDATE_INTERVAL = 1;
FULLSCREEN_CONTROLS_TIMEOUT = 3;
LOBBY_SOUNDS_SETTING = "on";

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