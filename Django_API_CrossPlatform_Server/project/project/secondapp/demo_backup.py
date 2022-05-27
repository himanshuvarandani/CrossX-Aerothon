from django.shortcuts import render
from django.http import JsonResponse
import sys
import traceback
#from .urls import error_message
# Create your views here.

def error_message():
    try:
        from .views import index1
    except BaseException as ex:
        # Get current system exception
        ex_type, ex_value, ex_traceback = sys.exc_info()
        # Extract unformatter stack traces as tuples
        trace_back = traceback.extract_tb(ex_traceback)
        # Format stacktrace
        #stack_trace = "No traces found"
        stack_trace = []
        for trace in trace_back:
            #stack_trace = "File : {} , Line : {}, Func.Name : {}, Message : {}".format(trace[0], trace[1], trace[2], trace[3])
            stack_trace.append("File : %s , Line : %d, Func.Name : %s, Message : %s" % (trace[0], trace[1], trace[2], trace[3]))
        dict_error = {}
        dict_error['Exception_type'] = str(ex_type)
        dict_error['Exception_message'] = str(ex_value)
        dict_error['Stack_trace'] = str(stack_trace)
        return dict_error

def index2(request):
    #commentsb added 12345
    dict_error = error_message()
    msg = "Sorry backend code is not working getting the error "
    dict_error['msg'] = msg
    my_dic = dict_error
    return render(request,'error.html',context=my_dic)
