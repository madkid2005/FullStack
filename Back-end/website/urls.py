from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

# documentation with spectacular package
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from django.http import JsonResponse

def preflight(request):
    if request.method == "OPTIONS":
        response = JsonResponse({'message': 'Preflight allowed'})
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, DELETE'
        response['Access-Control-Allow-Headers'] = 'Authorization, Content-Type, X-API-KEY'
        return response
urlpatterns = [
   path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   
   path('admin/', admin.site.urls),
   path('api/users/', include('users.urls')),
   path('api/products/', include('products.urls')),
   path('api/orders/', include('orders.urls')),
   path('api/seller-dashboard/', include('seller_panel.urls')),
   path('api/dashboard/', include('dashboard.urls')),
   path('api/payments/', include('payments.urls')),
   path('api/cart/', include('cart.urls')),



   # docs
   path('api/schema/', SpectacularAPIView.as_view(), name="schema"),
   path('api/schema/docs', SpectacularSwaggerView.as_view(url_name='schema')),



]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)