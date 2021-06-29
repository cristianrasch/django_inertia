import json
# import sys
# from pprint import pprint

from django.contrib import messages
from django.contrib.messages import get_messages
from django.views import View
from inertia.views import render_inertia
from django.shortcuts import redirect


def index(request):
    msg = next((msg.message
                for msg in get_messages(request)
                if msg.level == messages.SUCCESS),
               'Hello from Index!')

    return render_inertia(
        request,
        'Index',
        props={'msg': msg},
    )


def page1(request):
    return render_inertia(
        request,
        'Index',
        props={'msg': 'Hello from Page #1!'},
    )


def page2(request):
    return render_inertia(
        request,
        'Index',
        props={'msg': 'Hello from Page #2!'},
    )


class FormView(View):
    def get(self, request, *args, **kwargs):
        return render_inertia(
            request,
            'Form',
            props={'errors': {}},
        )

    def post(self, request, *args, **kwargs):
        errors = {}

        # if request.FILES:
        #     print("--", file=sys.stderr)
        #     pprint(request.FILES, stream=sys.stderr)
        #     print("--", file=sys.stderr)

        data = request.POST or json.loads(request.body)
        email = data.get("email")
        if not email:
            errors["email"] = "Email cannot be blank"

        passwd = data.get("password")
        if not passwd:
            errors["password"] = "Password cannot be blank"

        if not errors and (email != "email@example.com" or passwd != "secret"):
            err = "Email and/or password is/are incorrect"
            messages.add_message(request, messages.WARNING, err)
            errors["base"] = err

        if not errors:
            messages.add_message(request, messages.SUCCESS, f"Welcome abord '{email}'!")
            return redirect('index')

        return render_inertia(
            request,
            'Form',
            props={'errors': errors},
        )
