from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth import get_user_model
from django.utils import timezone
from typing import List, Optional, Dict, Any

# Create your models here.

class CustomUserManager(BaseUserManager):
    """
    Custom manager for CustomUser model.
    """

    def create_user(self, email: str, extra_fields: Dict[str, Any], password: Optional[str] = None) -> 'CustomUser':
        """
        Create and return a regular user with an email and password.

        Parameters
        ----------
        email : str
            The email address of the user.
        extra_fields: Dict[str, Any]
            Additional fields for the user.
        password : Optional[str], optional
            The password for the user.

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
        user: CustomUser  = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, extra_fields: Dict[str, Any], password: Optional[str] = None) -> 'CustomUser':
        """
        Create and return a superuser with an email and password.

        Parameters
        ----------
        email : str
            The email address of the superuser.
        extra_fields: Dict[str, Any]
            Additional fields for the user.
        password : Optional[str], optional
            The password for the superuser.

        Returns
        -------
        CustomUser
            The created superuser instance.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email=email, password=password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model that uses email instead of username.
    """
    REGISTRATION_METHOD_CHOICES = [
        ('custom', 'custom_Login'),
        ('google', 'google_OAuth'),
        ('facebook', 'facebook_OAuth'),
    ]

    email: str = models.EmailField(unique=True)
    first_name: str = models.CharField(max_length=30, blank=True)
    last_name: str = models.CharField(max_length=30, blank=True)
    date_of_birth: Optional[str] = models.DateField(blank=True, null=True)
    phone_number: Optional[str] = models.CharField(max_length=15, blank=True, null=True)
    address: str = models.CharField(max_length=255, blank=True)
    registration_method: str = models.CharField(max_length=20, choices=REGISTRATION_METHOD_CHOICES, default='custom')
    is_active: bool = models.BooleanField(default=True)
    is_staff: bool = models.BooleanField(default=False)
    is_email_verified: bool = models.BooleanField(default=False)
    date_joined: timezone.datetime = models.DateTimeField(default=timezone.now)

    objects: CustomUserManager = CustomUserManager()

    USERNAME_FIELD: str = 'email'
    REQUIRED_FIELDS: List[str] = []

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
