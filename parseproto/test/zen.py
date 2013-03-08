'''
simple test server for testing Travis Zenmove code.

(a) serve static files for testing
(b) some templating code is  used so that each individual screen can be tested
independently
(c) build.py then combines all individual templates into a single html file.
'''
import os
import urlparse
import urllib2
import StringIO
import gzip

import web
from web.contrib import template

urls = (
  '/test/(.+)', 'ZenMoveTemplate',
  '/(.+)', 'ZenMoveStatic',  
)

class ZenMoveTemplate(object):    
    def GET(self, templatename):
        root_path = os.environ['ROOT_PATH']
        template_path = os.path.join(root_path, 'templates')
        try:
            render = template.render_jinja(template_path)
            return getattr(render, templatename, '')
        except:
            return 'template %s not found' % templatename

class ZenMoveStatic(object):    
    def GET(self, path):
        root_path = os.environ['ROOT_PATH']
        try:
            with open(os.path.join(root_path, path), "rb") as f:
                return f.read()
        except:
            raise web.notfound()
        return 'file not found'
                
if __name__ == "__main__":
    #change the current directory to one level up so that the template/js
    #etc work.
    os.environ['ROOT_PATH'] = os.path.abspath(os.path.join(os.getcwd(), '..'))
    
    app = web.application(urls, globals())
    app.run()
    