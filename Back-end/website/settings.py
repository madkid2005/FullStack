from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
import os
from django.core.exceptions import ImproperlyConfigured

load_dotenv()

# Base dir
BASE_DIR = Path(__file__).resolve().parent.parent

# SECRET_KEY
SECRET_KEY = os.environ.get('SECRET_KEY')

# API_KEY
API_KEY = os.environ.get('API_KEY')
if not API_KEY:
    raise ImproperlyConfigured("API_KEY is not set in environment variables")

# DEBUG
DEBUG = True

# ALLOWED_HOSTS
ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # rest framework
    'rest_framework',
    'rest_framework_swagger',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    # additional 
    'corsheaders',
    'drf_spectacular',
    'fernet_fields',
    # apps
    'products',
    'users',
    'orders',
    'seller_panel',
    'payments',
    'dashboard',
    'cart',
    'axes',  
]



MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'website.middleware.APIKeyMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'csp.middleware.CSPMiddleware',
    'axes.middleware.AxesMiddleware',

]

ROOT_URLCONF = 'website.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'website.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),  # Path to your database file
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]


LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {

    # JWT token to limit access to api endpoints
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    # manage permissions 
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    # for making documentation with drf-spectacular package
    'DEFAULT_SCHEMA_CLASS': (
        'drf_spectacular.openapi.AutoSchema'
    ),

    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '50/minute',
        'user': '100/minute'
    },
}

AUTH_USER_MODEL = 'users.MyUser'

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),  # مدت زمان اعتبار توکن دسترسی
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),  # مدت زمان اعتبار توکن رفرش
    'ROTATE_REFRESH_TOKENS': False,  # چرخش توکن‌ها بعد از هر بار استفاده
    'BLACKLIST_AFTER_ROTATION': True,  # سیاهه‌برداری از توکن‌های استفاده شده
    'AUTH_HEADER_TYPES': ('Bearer',),  # نوع هدر توکن برای ارسال درخواست‌ها
    'SIGNING_KEY': SECRET_KEY,  # کلید امضای توکن‌ها (همان SECRET_KEY پروژه)
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'ALGORITHM': 'HS256',  # الگوریتم رمزگذاری
    'TOKEN_TYPE_CLAIM': 'token_type',

}

# / CORS / Allow requests from localhost:3000 (React)
# CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Frontend (React, etc.)
    # "https://your-frontend-domain.com",  # If deployed
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    "content-type",
    "x-api-key",
    "authorization",
    "x-csrftoken",
]

CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
]

# kavenegar
Kavenegar_API = ''

# drf-spectacular
SPECTACULAR_SETTINGS = {
    'TITLE': 'Django DRF -Takkharid-Shop-Website',

}

# تنظیمات اعتبارسنجی رمز عبور
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 'OPTIONS': {'min_length': 8}},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]
# Enforce security on session 
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True  # Prevent JavaScript access to cookies
SESSION_COOKIE_SAMESITE = 'Strict'  # Protect against CSRF attacks (adjust to 'Lax' for cross-site functionality)

# جلوگیری از حملات CSRF 
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = 'Strict'  # Protect against CSRF attacks (adjust to 'Lax' for cross-site functionality)

# هدرهای امنیتی HTTP
SECURE_HSTS_SECONDS = 9  # ۱ سال
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
X_FRAME_OPTIONS = 'DENY'
SECURE_BROWSER_XSS_FILTER = True

# CSP
CSP_DEFAULT_SRC = ["'self'"]
CSP_SCRIPT_SRC = ["'self'", "https://trusted.cdn.com"]
CSP_STYLE_SRC = ["'self'", "https://trusted.cdn.com"]
CSP_IMG_SRC = ["'self'", "https://trusted.image.cdn.com"]
CSP_FONT_SRC = ["'self'", "https://trusted.fonts.com"]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

#Ensure HTTPS
SECURE_SSL_REDIRECT = False
SECURE_HSTS_SECONDS = 31536000  # Enforce HSTS for one year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True  # Opt-in to HSTS preload list
X_FRAME_OPTIONS = 'DENY'  # Prevent clickjacking
SECURE_CONTENT_TYPE_NOSNIFF = True  # Prevent MIME type sniffing
SECURE_BROWSER_XSS_FILTER = True  # Enable XSS protection in browsers


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
}


AXES_FAILURE_LIMIT = 10  # Number of failed attempts before blocking
AXES_COOLOFF_TIME = timedelta(minutes=30)  # Cool-off time before unblocking
AXES_ENABLED = True  # Enable Axes functionality
AXES_LOCK_OUT_BY_COMBINATION_USER_AND_IP = True  # Lock out by user and IP combination

AXES_USERNAME_CALLABLE = None  # Default username extraction method
AXES_IP_ADDRESS_CALLABLE = None  # Default IP address extraction method
AXES_ONLY_USER_FAILURES = False  # False enables username + IP checks



AUTHENTICATION_BACKENDS = [
    'axes.backends.AxesStandaloneBackend',  # Updated Axes backend
    'django.contrib.auth.backends.ModelBackend',  # Default Django authentication backend
]