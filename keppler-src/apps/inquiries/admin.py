from django.contrib import admin
from .models import Inquiry


class InquiryAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "phone_number", "message"]


admin.site.register(Inquiry, InquiryAdmin)
