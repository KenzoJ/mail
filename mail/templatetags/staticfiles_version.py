# mail/templatetags/staticfiles_version.py

from django import template
from django.templatetags.static import static
from django.utils.safestring import mark_safe
import hashlib

register = template.Library()

@register.simple_tag
def staticfiles_version(path):
    version = hashlib.md5(path.encode()).hexdigest()[:6]
    return mark_safe(f"{static(path)}?v={version}")