from django.shortcuts import render


def index(request):
    host = request.get_host().split(':')[0]
    return render(request, 'chat/index.html', {'socket_connection_string': '{0}:{1}'.format(host, '3000')})
