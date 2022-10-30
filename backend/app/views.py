from django.shortcuts import render
from django.contrib.auth.decorators import login_required
def p1(request):
    return render(request, 'ancient_corinth.html')
    
def blog(request):
    return render(request, 'blog.html')

def p2(request):
    return render(request, 'castle_of_La_Muela.html')

def p3(request):
    return render(request, 'coyote_village_mesa_verde.html')

def p4(request):
    return render(request, 'histria_fotress.html')
@login_required
def home(request):
    return render(request, 'home.html')

def p5(request):
    return render(request, 'karahan_tepe.html')

def locations(request):
    return render(request, 'locations.html')

def p6(request):
    return render(request, 'mar_saba.html')

def blog(request):
    return render(request, 'new_blog.html')

def room(request):
    return render(request, 'room.html')

def create(request):
    return render(request, 'create.html')

def p7(request):
    return render(request, 'temple_of_eshmun.html')

def p8(request):
    return render(request, 'the_great_pyramid_of_giza.html')

def p9(request):
    return render(request, 'the_pyramid_of_hellinikon_argolis_greece.html')

def user(request):
    return render(request, 'user.html')

def p10(request):
    return render(request, 'valley_of_the_kings_tombs__luxor_egypt.html')

def p11(request):
    return render(request, 'xian.html')