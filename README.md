# JAYD (Just Another Youtube Downloader)

A minimalist Electron-based YouTube downloader with support for both video and audio downloads.

![JAYD Screenshot](https://i.imgur.com/placeholder.png)

## Features

- 🎥 Download YouTube videos in high quality
- 🎵 Extract audio from videos (MP3 format)
- 📂 Choose custom output location
- 🎞️ Playlist support
- 🔒 Uses browser cookies for authenticated content

## Prerequisites

Before running JAYD, make sure you have the following installed:

### Required Software

1. **Python 3.7+**
   - Download from [python.org](https://www.python.org/downloads/)
   - Ensure Python is added to your system's PATH

2. **FFmpeg**
   - **Windows**: 
     - Download from [ffmpeg.org](https://ffmpeg.org/download.html)
     - Add to system PATH
   - **macOS**:
     ```bash
     brew install ffmpeg
     ```
   - **Linux**:
     ```bash
     sudo apt install ffmpeg  # Ubuntu/Debian
     sudo pacman -S ffmpeg    # Arch Linux
     ```

### Python Libraries

Install the required Python packages:

```bash
pip install yt-dlp browser-cookie3
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/myllez2110/jayd.git
   cd jayd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm run electron:dev    # Development mode
   npm run electron:build  # Build executable
   ```

## Usage

1. Launch JAYD
2. Paste a YouTube URL (video or playlist)
3. Choose output folder
4. Toggle "Audio Only" if you want MP3 format
5. Click Download

## Troubleshooting

### Common Issues

1. **"FFmpeg not found" error**
   - Ensure FFmpeg is installed and added to your system's PATH
   - Restart the application after installing FFmpeg

2. **Download fails for age-restricted videos**
   - Make sure you're logged into YouTube in your default browser
   - The app uses your browser's cookies for authentication

3. **Python not found**
   - Verify Python is installed: `python --version`
   - Ensure Python is in your system's PATH

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.