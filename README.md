# Memnut blog site

# todo

#auth
~~+ submit signup form on pressing enter~~
+ resubmit verification code button
+ signUp / signIn error messages for user
+ distinguish between dev and prod for better error reporting during dev
+ figure out how to turn default cognito error messages into user facing messages
+ redirect to profile on succesful signUp/ siginIn
+ allow usernames
+ user settings page
+ loading screen on signIn / signUp
+ enable OAuth signup / signin
+ signIn forgot password flow

#blog
+ figure out theming best practices for react / gatsby

#code
+ ~~routing best practices (currently using reach router)~~
    + gatsby uses reach router and also Link component from 'gatsby'
+ update onComponentDidMount usage
+ switch stateless componentes to functions

#maps
+ ~~how to get street view~~
    + set streetViewControl to true in option to map component
+ ~~why are styles being ignored even though they are being set on map load (page map.js)~~
    + have to pass options prop to googlemps component instead of using onmapload https://github.com/google-map-react/google-map-react/blob/master/API.md
+ map markers do not display in street view, figure out how to display markers correctly in street view
    + https://developers.google.com/maps/documentation/javascript/reference/overlay-view
+ map labels can be set in the styles passed to the map options prop (poi.park etc)


#The main idea so far

Blog posts link to a place which gives information about which elements are stored at the loci
The blog post can be read independently. Information in the blog posts is stored in street view as map markers on loci.
blog posts are free, access to street view is for paid subscriptions only.