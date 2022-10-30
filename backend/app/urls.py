from django.urls import path
from .views import *
urlpatterns = [
    path('ancient_corinth',p1),
    path('castle_of_La_Muela',p2),
    path('coyote_village_mesa_verde',p3),
    path('histria_fotress',p4),
    path('karahan_tepe',p5),
    path('mar_saba',p6),
    path('temple_of_eshmun',p7),
    path('the_great_pyramid_of_giza',p8),
    path('the_pyramid_of_hellinikon_argolis_greece',p9),
    path('valley_of_the_kings_tombs__luxor_egypt',p10),
    path('xian',p11),
    path('locations',locations),
    path('chatroom',room),
    path('home',home),
    path('dashboard',home),
    path('create', create)

]