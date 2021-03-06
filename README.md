GAnalytics: Google Analytics for Meteor
===================================

Log page views and events to Google Analytics.

**NOTE:** This package uses the newer *analytics.js* file for ["Universal Analytics"](https://support.google.com/analytics/answer/2790010?hl=en). This package will not work if you are not on the newer collection system. 

### Installing
```
meteor add shadowsyc:ganalytics
```

If you don't have a settings.json file, you need to add one and load it according to the Meteor documentation. http://docs.meteor.com/#meteor_settings

In settings.json add
```json
{
  "public" : {
    "ga": {
      "account":"UA-XXXXXXX-Y"
    }
  }
}
```
### Usage
Example router code to log pageviews for routes:
```js
Meteor.Router.add({
  '/': function() {
    GAnalytics.pageview();
    GAnalytics.screenview('myapp','home','0.0.1');
    return 'home';}
})
```

In your controller code:
```js
GAnalytics.pageview();
GAnalytics.pageview("/hello");


GAnalytics.event("account","signin");
GAnalytics.event("account","signin","DataRiot");
GAnalytics.event("account","signin","DataRiot", 2);


GAnalytics.screenview("myapp","home","0.0.1");

// note time is in milliseconds
GAnalytics.usertime("quest","start",500);
GAnalytics.usertime("quest","start",500,"battle 3");
```

### Cookie Options & Advanced Features

You can also [provide options](https://developers.google.com/analytics/devguides/collection/analyticsjs/domains) for the Google Analytics cookie:

```json
{
  "public" : {
    "ga": {
      "account":"UA-XXXXXXX-Y",
      "cookieName": "new_cookie_name",
      "cookieDomain": "mynew.domain.com",
      "cookieExpires": 60 * 60 * 24 * 28,  // Time in seconds.
      "trackInterests": true,  // Enable also GA website and
      "trackInPage": true,     // force/ignore the Google check.
      "trackUserId": true      // enabling user_id tracking
    }
  }
}
```

### Debug Mode

If you pass `debug: true` as a setting, the package will output console logs on `GAnalytics.pageview()`, `GAnalytics.event()` and `GAnalytics.screenview()`.
