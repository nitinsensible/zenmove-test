===========================================================
READ ME File for using/testing Parse Prototype of ZenMove
===========================================================

--------------
Installations
--------------
1. Download and install ActivePython from http://www.activestate.com/activepython/downloads
2. Download Jinja2 templates engine. https://pypi.python.org/pypi/Jinja2
3. Unzip the Jinja2 source and goto jinja2 directory and execute 'python setup.py install'.
   This will install jinja2 templates

------------------------
Running the Test Server:
------------------------
1. Start a command prompt
2. Goto 'test' directory of ParseProto folder.
3. execute 'python zen.py'.
4. This will start a python web server on 'localhost:8080'.
5. Start browser and goto 'localhost:8080/test/test_move_post'. This will open
   'move_post' test screen.
      
-----------------------------
Developing new screens/pages
-----------------------------
1. Lets assume you are developing a 'sign_up' template.
2. Add 'sign_up.html' template in 'templates' directory. This is knockoutjs template
3. Add 'test_sign_up.html' template in 'templates/tests' directory. This is a Jinja2 template
   Check the example of 'test_move_post.html' for 'move_post' test template.
   Usually you will want to extend 'test_base.html' template. 'test_base.html' template
   implements basic page layotu and includes neccessary css and js files.
4. Start browser and goto 'localhost:8080/tests/test_sign_up' (dont add '/' or .html)

-----------
TO DO
-----------
1. Build scripts
   (a) for combining all javascript files into a single javascript files
   (b) combining all the page templates in 'templates' directory into a single index.html.
2. Router
   Still working on using Knockback/Parse router for defining the various pages.

