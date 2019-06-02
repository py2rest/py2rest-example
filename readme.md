# Use case example application - Article App allowing:

* creating new articles
* creating comments
* tagging articles
* liking articles
* liking comments
* getting article details
* finding tagged articles

This example uses Django and Angular.

Most backend logic is in backend/articleapp/views and backend/articleapp/views, 
whereas frontend is mostly handled by frontend/src/app/components classes, which make use of 
code generated to frontend/src/app/gen via backend command 

`python manage.py py2rest`