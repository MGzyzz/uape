from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from accounts.models import User, Profile, UserOnboarding


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name = 'Profile'


class UserOnboardingInline(admin.StackedInline):
    model = UserOnboarding
    can_delete = False
    verbose_name = 'Onboarding'
    fields = ('field', 'occupation', 'skills', 'current_step')
    readonly_fields = ('current_step',)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    inlines = [ProfileInline, UserOnboardingInline]
    ordering = ['email']
    list_display = ['email', 'first_name', 'last_name', 'is_staff', 'is_active']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )
    search_fields = ['email', 'first_name', 'last_name']
