(function () {
  'use strict';

  const FIELD_MAP = {
    playlist: '.field-playlists',
    video:    '.field-videos',
    channel:  '.field-channels',
  };

  function toggle(value) {
    Object.entries(FIELD_MAP).forEach(function ([type, selector]) {
      const row = document.querySelector(selector);
      if (row) row.style.display = (value === type) ? '' : 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const select = document.getElementById('id_content_type');
    if (!select) return;

    toggle(select.value);
    select.addEventListener('change', function () {
      toggle(this.value);
    });
  });
})();
