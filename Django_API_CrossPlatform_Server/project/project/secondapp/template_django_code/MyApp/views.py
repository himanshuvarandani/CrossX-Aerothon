from django.shortcuts import render 
# Create your views here.
def index1(request):
    #commentsb added 12345
    msg = "No issues code is working fine"
    my_dic = {'msg' : msg}
    return render(request,'index.html',context=my_dic)