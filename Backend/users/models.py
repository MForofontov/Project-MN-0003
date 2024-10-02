from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth import get_user_model
from django.utils import timezone

# Create your models here.

class CustomUserManager(BaseUserManager):
    """
    Custom manager for CustomUser model.
    """

    def create_user(self, email: str, password: str = None, **extra_fields: dict) -> 'CustomUser':
        """
        Create and return a regular user with an email and password.

        Parameters
        ----------
        email : str
            The email address of the user.
        password : str, optional
            The password for the user.
        **extra_fields : dict
            Additional fields for the user.

        Returns
        -------
        CustomUser
            The created user instance.

        Raises
        ------
        ValueError
            If the email is not provided.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, password: str = None, **extra_fields: dict) -> 'CustomUser':
        """
        Create and return a superuser with an email and password.

        Parameters
        ----------
        email : str
            The email address of the superuser.
        password : str, optional
            The password for the superuser.
        **extra_fields : dict
            Additional fields for the superuser.

        Returns
        -------
        CustomUser
            The created superuser instance.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model that uses email instead of username.
    """
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self) -> str:
        """
        Return a string representation of the user.

        Returns
        -------
        str
            The email of the user.
        """
        return self.email

User = get_user_model()

