from rest_framework.exceptions import APIException


class ProfileNotFound(APIException):
    status_code = 404
    default_detail = "The Requested Profile Is Not In Our Records."


class NotYourProfile(APIException):
    status_code = 403
    default_detail = "You Are Not Authorized To Edit This Profile."
