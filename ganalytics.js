GAnalytics = {}

GAnalytics.pageview = function(pageLocation) {
  console.log("Analytics code is not loaded yet.");
};

GAnalytics.event = function(category, action, label, value) {
  console.log("Analytics code is not loaded yet.");
};

GAnalytics.screenview = function(appName, screenName, appVersion) {
  console.log("Analytics code is not loaded yet.");
};

GAnalytics.usertime = function(category, name, time, label) {
  console.log("Analytics code is not loaded yet.");
}

GAnalytics._trackuser = function() {
  console.log("Analytics code is not loaded yet.");
}

load = function(i,s,o,g,r,a,m) {
  i['GoogleAnalyticsObject']=r;
  i[r]=i[r] || function(){
    (i[r].q=i[r].q||[]).push(arguments)}
  ,i[r].l=1*new Date();
    a=s.createElement(o), m=s.getElementsByTagName(o)[0];
    a.async=1;
    a.src=g;
    m.parentNode.insertBefore(a,m)
};

if(Meteor.settings && Meteor.settings.public !== undefined && Meteor.settings.public.ga !== undefined && Meteor.settings.public.ga.account !== undefined) {

  load(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  var gaSettings = Meteor.settings.public.ga,
      gaConfig = {};

  if(typeof gaSettings.debug == 'undefined') gaSettings.debug = false;
  if(typeof gaSettings.trackUserId == 'undefined') gaSettings.trackUserId = false;

  // cookie settings
  if(typeof gaSettings.cookieName !== 'undefined')
    gaConfig.cookieName = gaSettings.cookieName;

  if(typeof gaSettings.cookieDomain !== 'undefined')
    gaConfig.cookieDomain = gaSettings.cookieDomain;
  
  if(typeof gaSettings.cookieExpires !== 'undefined')
    gaConfig.cookieExpires = gaSettings.cookieExpires;

  if(!!gaSettings.trackUserId && Meteor.userId()) {
    gaConfig.userId = Meteor.userId();
  }
  // if gaConfig is still empty, default it to 'auto'
  if(Object.keys(gaConfig).length === 0)
    gaConfig = 'auto';

  ga('create', gaSettings.account, gaConfig);

  if (gaSettings.trackInterests)
    ga('require', 'displayfeatures');

  if (gaSettings.trackInPage)
    ga('require', 'linkid', 'linkid.js');

  GAnalytics.pageview = function(pageLocation) {
    if(!!gaSettings.debug)
      console.log("Logging pageview: "+pageLocation)
    if(!pageLocation) {
      pageLocation = window.location.pathname;
    }

    GAnalytics._trackuser();
    ga('send', 'pageview', pageLocation);
  }
  
  GAnalytics.event = function(category, action, label, value) {
    if(!!gaSettings.debug)
      console.log("Logging event: "+category+" | "+ action + " | " + label + " | " + value)

    GAnalytics._trackuser();
    ga('send', 'event', category, action, label, value);
  }

  GAnalytics.screenview = function(appName, screenName, appVersion) {
    if(!!gaSettings.debug)
      console.log("Logging screenview: appName - "+ appName + ", screenName - " + screenName + ", appVersion - " + appVersion);
      if(!appName) {
        appName = 'unknown';
      }
      if(!screenName) {
        screenName = window.location.pathname;
      }
      var event = {
        'appName' : appName,
        'screenName' : screenName
      }
      if(appVersion) event['appVersion'] = appVersion;

      GAnalytics._trackuser();
      ga('send', 'screenview', event);
  }

  GAnalytics.usertime = function(category, name, time, label) {
    if(!!gaSettings.debug)
      console.log("Logging usertime: category- "+ category + ", name - " + name + ", time - " + time + ", label - " + label);

      GAnalytics._trackuser();
      if(!label) {
        ga('send', 'timing', category, name, time);
      } else {
        ga('send', 'timing', category, name, time, label);
      }
  }

  GAnalytics._trackuser = function() {
    if(!!gaSettings.trackUserId) {
      var user_id = Meteor.userId();

      if(!!gaSettings.debug)
        console.log("Tracking user_id: " + user_id);

      if(user_id) {
        ga('set', '&uid', user_id);
        ga('set', 'dimension1', user_id);
      }
    }
  }

} else {
  console.log("public.ga.account has not been set in your settings.json file.");
}



