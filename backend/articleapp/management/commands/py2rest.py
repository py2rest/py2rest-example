import os
import sys

from django.conf import settings
from django.core.management import BaseCommand

from py2rest.argresolvers import DjangoArgResolver
from py2rest.engines.ts.angular import AngularEngine
from py2rest.py2rest_gen import Py2Rest


class Command(BaseCommand):

    def handle(self, *args, **options):
        angular_path = os.path.join(os.path.dirname(settings.BASE_DIR), 'frontend', 'src', 'app', 'gen')
        py2re = Py2Rest('http://127.0.0.1:8000', [AngularEngine(generation_path=angular_path)],
                        DjangoArgResolver())
        py2re.read_decorated_endpoints()
        py2re.generate()
