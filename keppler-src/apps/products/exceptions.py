from rest_framework.exceptions import APIException


class ProductNotFound(APIException):
    status_code = 404
    dafault_detail = "This product is not in our records."
