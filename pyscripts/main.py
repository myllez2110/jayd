import yt_dlp
import os
import browser_cookie3
import sys
import json

def detect_browser():
    for browser in ['chrome', 'firefox']:
        try:
            cj = getattr(browser_cookie3, browser)()
            if any("youtube.com" in cookie.domain for cookie in cj):
                return browser
        except Exception:
            continue
    return 'chrome'  # Default to Chrome if no browser detected

def download_from_youtube(url, output_folder, audio_only=False):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    browser = detect_browser()

    ydl_opts = {
        'ignoreerrors': True,
        'outtmpl': os.path.join(output_folder, '%(title)s.%(ext)s'),
        'cookies_from_browser': browser,
        'user_agent': (
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/115.0.0.0 Safari/537.36'
        ),
        'noplaylist': False,
    }

    if audio_only:
        ydl_opts.update({
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        })
    else:
        ydl_opts.update({
            'format': 'bestvideo[height<=1080]+bestaudio/best',
            'merge_output_format': 'mp4',
            'postprocessors': [{
                'key': 'FFmpegVideoConvertor',
                'preferedformat': 'mp4',
            }],
        })

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        return {"success": True, "message": "Download completed successfully"}
    except Exception as e:
        return {"success": False, "message": str(e)}

if __name__ == "__main__":
    # Expect JSON input from stdin
    input_data = json.loads(sys.stdin.read())
    
    url = input_data.get('url')
    output_folder = input_data.get('outputPath')
    audio_only = input_data.get('audioOnly', False)
    
    result = download_from_youtube(url, output_folder, audio_only)
    print(json.dumps(result))