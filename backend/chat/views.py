from django.shortcuts import render


def index(request):
    return render(request, 'chat/index.html', {'connection_string': 'localhost:3000'})
