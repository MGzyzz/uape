import io
import os
import tempfile
from datetime import datetime

from django.contrib import admin, messages
from django.core import management
from django.http import HttpResponse
from django.shortcuts import redirect, render


def backup_view(request):
    if not request.user.is_superuser:
        from django.http import HttpResponseForbidden
        return HttpResponseForbidden("Superusers only.")

    if request.method == 'POST':
        action = request.POST.get('action')

        if action == 'export':
            buf = io.StringIO()
            management.call_command(
                'dumpdata',
                '--natural-foreign',
                '--natural-primary',
                '--exclude=contenttypes',
                '--exclude=auth.permission',
                '--exclude=admin.logentry',
                '--exclude=token_blacklist',
                '--indent=2',
                stdout=buf,
            )
            data = buf.getvalue()
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            response = HttpResponse(data, content_type='application/json')
            response['Content-Disposition'] = f'attachment; filename="uape_backup_{timestamp}.json"'
            return response

        elif action == 'import':
            backup_file = request.FILES.get('backup_file')
            if not backup_file:
                messages.error(request, 'Файл не выбран.')
                return redirect('/admin/backup/')

            if not backup_file.name.endswith('.json'):
                messages.error(request, 'Поддерживается только формат .json.')
                return redirect('/admin/backup/')

            tmp_path = None
            try:
                with tempfile.NamedTemporaryFile(
                    mode='wb', suffix='.json', delete=False
                ) as f:
                    for chunk in backup_file.chunks():
                        f.write(chunk)
                    tmp_path = f.name

                management.call_command('loaddata', tmp_path, verbosity=0)
                messages.success(request, f'База данных успешно восстановлена из «{backup_file.name}».')
            except Exception as e:
                messages.error(request, f'Ошибка при импорте: {e}')
            finally:
                if tmp_path and os.path.exists(tmp_path):
                    os.unlink(tmp_path)

            return redirect('/admin/backup/')

    context = {
        **admin.site.each_context(request),
        'title': 'Backup & Restore',
    }
    return render(request, 'admin/backup.html', context)
