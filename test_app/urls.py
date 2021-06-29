from django.urls import path

from . import views


urlpatterns = [
    path(
        '',
        views.index,
        name='index',
    ),
    path(
        'page1',
        views.page1,
        name='page1',
    ),
    path(
        'page2',
        views.page2,
        name='page2',
    ),
    path(
        'form',
        views.FormView.as_view(),
        name='form',
    ),
]