<h4>To design a cross platform created the Django API to interface the frontend with the backend python code</h4>


## Django_Installation

**step:1**
Install pip- Open command prompt and enter following command-
python -m pip install -U pip

**step:2**
Install virtual environment- Enter following command in cmd-
pip install virtualenv
virtualenv env_site

**step:3**
Change directory to env_site by this command-
cd env_site/Scripts/activate

**step:4**
Install Django- Install django by giving following command-
pip install django

**step:5**
Change directory to your project path where you want to create a project
django-admin startproject Project_Name
cd Project_Name
python manage.py runserver

# Django API Features

When the user selects the backend as python the main server send a get and post request to the django api.
If the main server sends a post request to the Django api . In django server the backend code updates in the secondapp and frotend code in the templates folder
Similarly whenever the main server sends a get request the django api returns the backend code and frotend code previously reflected by the user in the json format.
It reflects the same backend and frotend code in another pre configured sample django project. So the user can able to download it at the end from the main server. It is workable in local and deployable in any cloud platform. 