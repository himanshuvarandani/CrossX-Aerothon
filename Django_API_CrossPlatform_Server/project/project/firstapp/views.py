from django.shortcuts import render
from django.http import JsonResponse
import shutil
import os
import sys
import json
from django.core.wsgi import get_wsgi_application
import subprocess
from django.http import HttpResponse
#from project.reload_web import restart_server
# Create your views here.
#touch /var/www/vijayasatyad_pythonanywhere_com_wsgi.py
#{% load static %}
#<link rel="stylesheet" href="{% static 'index.css' %}">
#https://vijayasatyad.pythonanywhere.com/download_file
#project/secondapp/template_django_code/MyApp/views.py

def write_file(path,data):
    f = open(path, "w")
    f.write(data)
    f.close()

def index(request):
    if request.method=='POST':
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            Frontendhtml_code = body['frontendhtmlcode']
            Frontendcss_code = body['frontendcsscode']
            Frontendjs_code = body['frontendjscode']
            Backend_code = body['backendcode']
        except:
            Frontendhtml_code = request.POST['frontendhtmlcode']
            Frontendcss_code = request.POST['frontendcsscode']
            Frontendjs_code = request.POST['frontendjscode']
            Backend_code = request.POST['backendcode']

        #main Project
        #Frotend_code
        html_path = "project/secondapp/templates/index.html"
        css_path = "project/secondapp/static/index.css"
        js_path = "project/secondapp/static/index.js"

        write_file(html_path,Frontendhtml_code)
        write_file(css_path,Frontendcss_code)
        write_file(js_path,Frontendjs_code)

        #backend python
        python_path = 'project/secondapp/views.py'
        write_file(python_path,Backend_code)

        #downloaded project
        #Frotend_Code
        html_path = "project/secondapp/template_django_code/MyApp/templates/index.html"
        css_path = "project/secondapp/template_django_code/MyApp/static/index.css"
        js_path = "project/secondapp/template_django_code/MyApp/static/index.js"

        write_file(html_path,Frontendhtml_code)
        write_file(css_path,Frontendcss_code)
        write_file(js_path,Frontendjs_code)

        #backend python
        python_path = 'project/secondapp/template_django_code/MyApp/views.py'
        write_file(python_path,Backend_code)
        run_server()
        return JsonResponse({"output": "Saved"})
    elif request.method=='GET':
        with open("project/secondapp/templates/index.html") as f:
            html_code = f.readlines()
        html_code = "".join(html_code)

        with open('project/secondapp/static/index.css') as f:
            css_code = f.readlines()
        css_code = "".join(css_code)

        with open("project/secondapp/static/index.js") as f:
            js_code = f.readlines()
        js_code = "".join(js_code)

        with open('project/secondapp/views.py') as f:
            python_code = f.readlines()
        python_code = "".join(python_code)

        return JsonResponse({"frontendhtmlcode": html_code, "frontendcsscode": css_code,'frontendjscode':js_code, 'backendcode':python_code})
    else:
        return render(request,"index.html")

def run_server():
        os.chdir("project")
        from reload_web import restart_server
        #subprocess.call([r"project/reload_web.sh"])
        restart_server
        #return JsonResponse({"output": "Saved"})

def download_file(request):
    #from pathlib import Path
    #downloads_path = str(Path.home() / "Downloads")
    shutil.make_archive("Demo_download_test", 'zip',"project/secondapp/template_django_code")
    zip_file = open("Demo_download_test.zip", 'rb')
    response = HttpResponse(zip_file, content_type='application/force-download')
    response['Content-Disposition'] = 'attachment; filename="%s"' % 'foo.zip'
    return response



def main(request):
    return render(request,"index1.html")



