from django.urls import path, include

urlpatterns = [
    path('v1/', include('recommendations.api.v1.urls')),
]
