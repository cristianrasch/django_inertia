from django.contrib import messages
from django.contrib.messages import get_messages
from inertia.share import share

def shared(request):
    share(request, 'endpoint', request.path_info)

    flash = {'notice': [], 'alert': []}
    for msg in get_messages(request):
        if msg.level == messages.SUCCESS:
            flash['notice'].append(msg.message)

        if msg.level == messages.WARNING:
            flash['alert'].append(msg.message)
    share(request, 'flash', flash)
