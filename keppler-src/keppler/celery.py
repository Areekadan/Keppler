from __future__ import absolute_import
import os
from celery import Celery
from keppler.settings import base

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "keppler.settings.development")

app = Celery("keppler")

app.config_from_object("keppler.settings.development", namespace="CELERY"),

app.autodiscover_tasks(lambda: base.INSTALLED_APPS)
