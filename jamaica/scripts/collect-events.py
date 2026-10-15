#!/usr/bin/env python3
"""Collect public organisational Event JSON-LD into a review file, never the live inventory.

Usage: python jamaica/scripts/collect-events.py --from-date 2026-10-15 --through 2027-01-15 --output /tmp/jamaica-event-candidates.json
"""
import argparse, concurrent.futures, html, json, re, urllib.request
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

JAMAICA = ZoneInfo('America/Jamaica')
BASE = 'https://www.caribtix.com'


def local_datetime(value):
    parsed = datetime.fromisoformat(value.replace('Z', '+00:00'))
    if parsed.tzinfo is None:
        raise ValueError('Source timestamp has no timezone; review manually')
    return parsed.astimezone(JAMAICA).isoformat()


def extract_events(document, url):
    records = []
    for block in re.findall(r'<script[^>]*type=[\"\']application/ld\+json[\"\'][^>]*>(.*?)</script>', document, re.S | re.I):
        value = json.loads(html.unescape(block))
        objects = value if isinstance(value, list) else value.get('@graph', [value])
        for event in objects:
            if event.get('@type') != 'Event':
                continue
            address = event.get('location', {}).get('address', {})
            country = address.get('addressCountry', '')
            if isinstance(country, dict):
                country = country.get('name', '')
            if str(country).lower() not in ['jamaica', 'jm']:
                continue
            start, end = local_datetime(event['startDate']), local_datetime(event['endDate'])
            if end < start:
                raise ValueError('Event end precedes start')
            duration = datetime.fromisoformat(end) - datetime.fromisoformat(start)
            records.append(dict(source=url, name=event['name'].strip(), sourceStart=event['startDate'], sourceEnd=event['endDate'], jamaicaStart=start, jamaicaEnd=end, location=event.get('location'), organiser=event.get('organizer'), warnings=['Review organiser copy, parish boundary, date conflicts, duplicate products, price and public attendance before import.'] + (['Long span: may be a season or ticket-sales window, not a continuous event.'] if duration.days > 7 else [])))
    return records


def fetch(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'TonysGuideEventResearch/1.0'})
    with urllib.request.urlopen(request, timeout=35) as response:
        return response.read().decode('utf-8')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--from-date', required=True)
    parser.add_argument('--through', required=True)
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    start, end = datetime.fromisoformat(args.from_date).date().isoformat(), datetime.fromisoformat(args.through).date().isoformat()
    if end < start:
        parser.error('--through must be on or after --from-date')
    listing = fetch(BASE + '/event/listing')
    urls = sorted(set(BASE + path for path in re.findall(r'href="(/event/[^"?#]+)"', listing)))
    def collect(url):
        try:
            return dict(source=url, records=[e for e in extract_events(fetch(url), url) if e['jamaicaEnd'][:10] >= start and e['jamaicaStart'][:10] <= end])
        except Exception as error:
            return dict(source=url, error=str(error))
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(collect, urls))
    output = dict(collectedAt=datetime.now(JAMAICA).isoformat(), window=dict(start=start, end=end), requiresReview=True, automaticPublication=False, discovered=len(urls), results=results)
    Path(args.output).write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n')
    print(f'Saved {sum(len(r.get("records", [])) for r in results)} candidates from {len(urls)} public event pages; {sum("error" in r for r in results)} source errors. No site files updated.')


if __name__ == '__main__':
    main()
