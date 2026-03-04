"""
Seed script: creates Sections with YouTube channels for all onboarding fields.
Run with: poetry run python manage.py shell < seed_sections.py
"""
from courses.models import Section, Channel
from courses.services.youtube import fetch_channel

SEED_DATA = [
    {
        'field': 'Building Websites',
        'title': 'Popular channels for Web Development',
        'order': 1,
        'channel_ids': [
            'UC29ju8bIPH5as8OGnQzwJyA',  # Traversy Media
            'UCW5YeuERMmlnqo4oq8vwUpg',  # The Net Ninja
            'UCJZv4d5rbIKd4QHMPkcABvA',  # Kevin Powell
        ],
    },
    {
        'field': 'Creating Mobile Apps',
        'title': 'Popular channels for Mobile Development',
        'order': 2,
        'channel_ids': [
            'UCsBjURrPoezykLs9EqgamOA',  # Fireship
            'UC8butISFwT-Wl7EV0hUK0BQ',  # freeCodeCamp
            'UCVPmhJDM9jT-TEZocrWTCqg',  # Flutter (official)
        ],
    },
    {
        'field': 'Data Analysis',
        'title': 'Popular channels for Data Analysis',
        'order': 3,
        'channel_ids': [
            'UCCTVrRjP8OkQl77U7yIDwSQ',  # Corey Schafer
            'UC4JX40jDee_tINbkjycV4Sg',  # Tech With Tim
            'UC8butISFwT-Wl7EV0hUK0BQ',  # freeCodeCamp
        ],
    },
    {
        'field': 'Artificial Intelligence',
        'title': 'Popular channels for AI & Machine Learning',
        'order': 4,
        'channel_ids': [
            'UCYO_jab_esuFRV4b17AJtAg',  # 3Blue1Brown
            'UCfzlCWGWYyg3irv_Fk9NjRA',  # Sentdex
            'UC8butISFwT-Wl7EV0hUK0BQ',  # freeCodeCamp
        ],
    },
    {
        'field': 'Server-Side Development',
        'title': 'Popular channels for Backend Development',
        'order': 5,
        'channel_ids': [
            'UC29ju8bIPH5as8OGnQzwJyA',  # Traversy Media
            'UCsBjURrPoezykLs9EqgamOA',  # Fireship
            'UCCTVrRjP8OkQl77U7yIDwSQ',  # Corey Schafer
        ],
    },
    {
        'field': 'UI Development',
        'title': 'Popular channels for UI Development',
        'order': 6,
        'channel_ids': [
            'UCJZv4d5rbIKd4QHMPkcABvA',  # Kevin Powell
            'UCW5YeuERMmlnqo4oq8vwUpg',  # The Net Ninja
            'UC29ju8bIPH5as8OGnQzwJyA',  # Traversy Media
        ],
    },
    {
        'field': 'Game Creation',
        'title': 'Popular channels for Game Development',
        'order': 7,
        'channel_ids': [
            'UC8butISFwT-Wl7EV0hUK0BQ',  # freeCodeCamp
            'UCqJ-Xo29CKyLTjn6z2XwYAw',  # Game Maker's Toolkit
            'UCYbK_tjZ2OrIZFBvU6CCSpA',  # Brackeys
        ],
    },
    {
        'field': 'Cybersecurity',
        'title': 'Popular channels for Cybersecurity',
        'order': 8,
        'channel_ids': [
            'UC9x0AN7BWHpCDHSm9NiJFJQ',  # NetworkChuck
            'UCVeW9qkBjo3zosnqUbG7CFw',  # John Hammond
            'UC8butISFwT-Wl7EV0hUK0BQ',  # freeCodeCamp
        ],
    },
    {
        'field': 'Cloud & Infrastructure',
        'title': 'Popular channels for Cloud & DevOps',
        'order': 9,
        'channel_ids': [
            'UCdngmbVKX1Tgre699-XLlUA',  # TechWorld with Nana
            'UC8butISFwT-Wl7EV0hUK0BQ',  # freeCodeCamp
            'UCsBjURrPoezykLs9EqgamOA',  # Fireship
        ],
    },
    {
        'field': 'Task Automation',
        'title': 'Popular channels for Task Automation',
        'order': 10,
        'channel_ids': [
            'UCCTVrRjP8OkQl77U7yIDwSQ',  # Corey Schafer
            'UC4JX40jDee_tINbkjycV4Sg',  # Tech With Tim
            'UC8butISFwT-Wl7EV0hUK0BQ',  # freeCodeCamp
        ],
    },
    {
        'field': 'General Programming',
        'title': 'Popular channels for Programming',
        'order': 11,
        'channel_ids': [
            'UCWv7vMbMWH4-V0ZXdmDpPBA',  # Programming with Mosh
            'UCxX9wt5FWQUAAz4UrysqK9A',  # CS Dojo
            'UC8butISFwT-Wl7EV0hUK0BQ',  # freeCodeCamp
        ],
    },
]


def get_or_create_channel(channel_id):
    existing = Channel.objects.filter(youtube_id=channel_id).first()
    if existing:
        print(f"  [skip] Channel already exists: {existing.name}")
        return existing
    try:
        data = fetch_channel(channel_id)
        channel = Channel.objects.create(
            youtube_id=channel_id,
            name=data['name'],
            subscribers=data['subscribers'],
            avatar_url=data['avatar_url'],
            description=data['description'],
            url=data['url'],
        )
        print(f"  [ok]   Created channel: {channel.name}")
        return channel
    except Exception as e:
        print(f"  [err]  Channel {channel_id}: {e}")
        return None


for entry in SEED_DATA:
    print(f"\n=== {entry['field']} ===")

    channels = []
    for cid in entry['channel_ids']:
        ch = get_or_create_channel(cid)
        if ch:
            channels.append(ch)

    section, created = Section.objects.get_or_create(
        field=entry['field'],
        content_type='channel',
        defaults={
            'title': entry['title'],
            'order': entry['order'],
        },
    )
    section.channels.set(channels)
    print(f"  [{'created' if created else 'updated'}] Section: {section.title} ({len(channels)} channels)")

print("\nDone!")
