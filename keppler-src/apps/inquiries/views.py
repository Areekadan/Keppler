from django.core.mail import send_mail
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from keppler.settings.development import DEFAULT_FROM_EMAIL

from .models import Inquiry


class SendInquiry(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data

        try:
            subject = data["subject"]
            name = data["name"]
            email = data["email"]
            message = data["message"]
            from_email = data["email"]
            recipient_list = [DEFAULT_FROM_EMAIL]

            send_mail(subject, message, from_email, recipient_list, fail_silently=True)

            inquiry = Inquiry(name=name, email=email, subject=subject, message=message)
            inquiry.save()

            return Response({"success": "Your message was successfully submitted"})
        except:
            return Response({"fail": "Message was not sent. Please try again."})
