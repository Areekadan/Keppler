import pytest


def test_user_str(base_user):
    """Test user model string representation"""
    assert base_user.__str__() == f"{base_user.username}"


def test_user_short_name(base_user):
    """Test user models get_short_name method"""
    short_name = f"{base_user.username}"
    assert base_user.get_short_name() == short_name


def test_user_full_name(base_user):
    """Test user models get_full_name method"""
    full_name = f"{base_user.first_name} {base_user.last_name}"
    assert base_user.get_full_name == full_name


def test_base_user_email_is_normalized(base_user):
    """Test new users email normailization"""
    email = "nick@keppler.com"
    assert base_user.email == email.lower()


def test_super_user_email_is_normalized(super_user):
    """Test admin users email normalization"""
    email = "nick@keppler.com"
    assert super_user.email == email.lower()


def test_super_user_is_not_staff(user_factory):
    """Test error is raised when admin user has is_staff set to false"""
    with pytest.raises(ValueError) as err:
        user_factory.create(is_superuser=True, is_staff=False)
    assert str(err.value) == "Superusers must be staff. (is_staff = True)"


def test_super_user_is_not_superuser(user_factory):
    """Test error is raised when admin user has is_superuser set to False"""
    with pytest.raises(ValueError) as err:
        user_factory.create(is_superuser=False, is_staff=True)
    assert str(err.value) == "Superusers must be superusers. (is_superuser = True)"


def test_create_superuser_with_no_email(user_factory):
    """Test creation of superuser without an email address raises error"""
    with pytest.raises(ValueError) as err:
        user_factory.create(email=None, is_superuser=True, is_staff=True)
    assert str(err.value) == "Email must be provided to create an admin account."


def test_create_superuser_with_no_password(user_factory):
    """Test creation of superuser without a password raises error"""
    with pytest.raises(ValueError) as err:
        user_factory.create(is_superuser=True, is_staff=True, password=None)
    assert str(err.value) == "Password must be provided for an admin account."


def test_create_user_with_no_email(user_factory):
    """Test creation of new user with no email address raises error"""
    with pytest.raises(ValueError) as err:
        user_factory.create(email=None)
    assert str(err.value) == "Email must be provided to create a user account."


def test_create_use_with_no_username(user_factory):
    """Test creation of new user with no username raises an error"""
    with pytest.raises(ValueError) as err:
        user_factory.create(username=None)
    assert str(err.value) == "Username must be provided."


def test_create_user_with_no_firstname(user_factory):
    """Test creation of new user without a firstname raises error"""
    with pytest.raises(ValueError) as err:
        user_factory.create(first_name=None)
    assert str(err.value) == "First name must be provided."


def test_create_user_with_no_lastname(user_factory):
    """Test creation of new user without a lastname raises error"""
    with pytest.raises(ValueError) as err:
        user_factory.create(last_name=None)
    assert str(err.value) == "Last name must be provided."


def test_user_email_incorrect(user_factory):
    """Test Error is raised when a non-valid email is provided"""
    with pytest.raises(ValueError) as err:
        user_factory.create(email="keppler.com")
    assert str(err.value) == "Must provide a valid email address."
