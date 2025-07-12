import React, { useState, useEffect } from 'react';
import { Download, Play, Pause, Video, Music, Image, FileText, Link, Check, X, Loader2, Trash2, Search } from 'lucide-react';

const MediaDownloaderApp = () => {
  const [url, setUrl] = useState('');
  const [downloads, setDownloads] = useState([]);
  const [activeTab, setActiveTab] = useState('downloader');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [downloadType, setDownloadType] = useState('video');
  const [mediaInfo, setMediaInfo] = useState(null);

  // Sample download data
  const sampleDownloads = [
    {
      id: 1,
      title: 'Amazing Sunset Timelapse',
      url: 'https://example.com/video1',
      type: 'video',
      size: '125 MB',
      progress: 100,
      status: 'completed',
      thumbnail: 'https://via.placeholder.com/60x60/FF6B6B/white?text=VID'
    },
    {
      id: 2,
      title: 'Lo-Fi Hip Hop Mix',
      url: 'https://example.com/audio1',
      type: 'audio',
      size: '45 MB',
      progress: 65,
      status: 'downloading',
      thumbnail: 'https://via.placeholder.com/60x60/4ECDC4/white?text=AUD'
    },
    {
      id: 3,
      title: 'Nature Photography',
      url: 'https://example.com/image1',
      type: 'image',
      size: '8.5 MB',
      progress: 100,
      status: 'completed',
      thumbnail: 'https://via.placeholder.com/60x60/45B7D1/white?text=IMG'
    }
  ];

  useEffect(() => {
    setDownloads(sampleDownloads);
  }, []);

  const getMediaIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'audio': return <Music className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-yellow-400';
      case 'downloading': return 'text-yellow-500';
      case 'failed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const analyzeUrl = async () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate URL analysis
    setTimeout(() => {
      const mockInfo = {
        title: 'Sample Media File',
        type: 'video',
        size: '89 MB',
        duration: '5:42',
        quality: ['720p', '1080p', '4K'],
        formats: ['MP4', 'WEBM', 'AVI']
      };
      setMediaInfo(mockInfo);
      setIsAnalyzing(false);
    }, 2000);
  };

  const startDownload = () => {
    if (!mediaInfo) return;
    
    const newDownload = {
      id: Date.now(),
      title: mediaInfo.title,
      url: url,
      type: downloadType,
      size: downloadType === 'audio' ? '12 MB' : downloadType === 'image' ? '2.5 MB' : mediaInfo.size,
      progress: 0,
      status: 'downloading',
      thumbnail: `https://via.placeholder.com/60x60/FCD34D/black?text=${downloadType.toUpperCase().slice(0,3)}`
    };
    
    setDownloads([newDownload, ...downloads]);
    setUrl('');
    setMediaInfo(null);
    setActiveTab('downloads');
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setDownloads(prev => prev.map(d => 
          d.id === newDownload.id 
            ? { ...d, progress: 100, status: 'completed' }
            : d
        ));
      } else {
        setDownloads(prev => prev.map(d => 
          d.id === newDownload.id 
            ? { ...d, progress: Math.round(progress) }
            : d
        ));
      }
    }, 500);
  };

  const deleteDownload = (id) => {
    setDownloads(downloads.filter(d => d.id !== id));
  };

  return (
    <div className="max-w-md mx-auto bg-black text-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-4">
        <h1 className="text-xl font-bold text-center text-black">Media Downloader</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-900 border-b border-gray-800">
        <button
          onClick={() => setActiveTab('downloader')}
          className={`flex-1 py-3 px-4 text-center ${
            activeTab === 'downloader' 
              ? 'bg-yellow-500 text-black' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Download className="w-5 h-5 mx-auto mb-1" />
          Download
        </button>
        <button
          onClick={() => setActiveTab('downloads')}
          className={`flex-1 py-3 px-4 text-center ${
            activeTab === 'downloads' 
              ? 'bg-yellow-500 text-black' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <FileText className="w-5 h-5 mx-auto mb-1" />
          Downloads
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'downloader' && (
          <div className="space-y-4">
            {/* URL Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Enter Media URL</label>
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Link className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={
                      downloadType === 'image' 
                        ? 'https://instagram.com/p/xyz or image URL' 
                        : 'https://youtube.com/watch?v=...'
                    }
                    className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={analyzeUrl}
                  disabled={!url.trim() || isAnalyzing}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors text-black font-medium"
                >
                  {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Download Type Selection */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <h3 className="font-medium mb-3 text-yellow-400">Download Type</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setDownloadType('video')}
                  className={`p-3 rounded-lg border transition-colors ${
                    downloadType === 'video' 
                      ? 'bg-yellow-500 text-black border-yellow-400' 
                      : 'bg-gray-800 border-gray-700 hover:border-yellow-500'
                  }`}
                >
                  <Video className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm">Video</span>
                </button>
                <button
                  onClick={() => setDownloadType('audio')}
                  className={`p-3 rounded-lg border transition-colors ${
                    downloadType === 'audio' 
                      ? 'bg-yellow-500 text-black border-yellow-400' 
                      : 'bg-gray-800 border-gray-700 hover:border-yellow-500'
                  }`}
                >
                  <Music className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm">Audio Only</span>
                </button>
                <button
                  onClick={() => setDownloadType('image')}
                  className={`p-3 rounded-lg border transition-colors ${
                    downloadType === 'image' 
                      ? 'bg-yellow-500 text-black border-yellow-400' 
                      : 'bg-gray-800 border-gray-700 hover:border-yellow-500'
                  }`}
                >
                  <Image className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm">Image</span>
                </button>
              </div>
            </div>

            {/* Media Info */}
            {mediaInfo && (
              <div className="bg-gray-900 rounded-lg p-4 space-y-3 border border-gray-800">
                <div className="flex items-center space-x-3">
                  {getMediaIcon(downloadType)}
                  <div>
                    <h3 className="font-medium text-yellow-400">{mediaInfo.title}</h3>
                    <p className="text-sm text-gray-400">{mediaInfo.size} • {mediaInfo.duration}</p>
                  </div>
                </div>
                
                <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-yellow-400">
                    {downloadType === 'audio' ? <Music className="w-4 h-4" /> : 
                     downloadType === 'image' ? <Image className="w-4 h-4" /> : 
                     <Video className="w-4 h-4" />}
                    <span className="text-sm font-medium">
                      {downloadType === 'audio' ? 'Audio-only download selected' : 
                       downloadType === 'image' ? 'Image download selected' : 
                       'Video download selected'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-yellow-400">
                      {downloadType === 'audio' ? 'Audio Quality' : 
                       downloadType === 'image' ? 'Image Quality' : 
                       'Video Quality'}
                    </label>
                    <select className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:border-yellow-500 focus:outline-none">
                      {downloadType === 'audio' ? (
                        <>
                          <option value="128k">128 kbps</option>
                          <option value="192k">192 kbps</option>
                          <option value="256k">256 kbps</option>
                          <option value="320k">320 kbps (Best)</option>
                        </>
                      ) : downloadType === 'image' ? (
                        <>
                          <option value="original">Original Quality</option>
                          <option value="high">High Quality</option>
                          <option value="medium">Medium Quality</option>
                          <option value="thumbnail">Thumbnail</option>
                        </>
                      ) : (
                        mediaInfo.quality.map((q, i) => (
                          <option key={i} value={q}>{q}</option>
                        ))
                      )}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-yellow-400">Format</label>
                    <select className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:border-yellow-500 focus:outline-none">
                      {downloadType === 'audio' ? (
                        <>
                          <option value="mp3">MP3</option>
                          <option value="aac">AAC</option>
                          <option value="flac">FLAC</option>
                          <option value="wav">WAV</option>
                        </>
                      ) : downloadType === 'image' ? (
                        <>
                          <option value="jpg">JPG</option>
                          <option value="png">PNG</option>
                          <option value="webp">WEBP</option>
                          <option value="original">Original Format</option>
                        </>
                      ) : (
                        mediaInfo.formats.map((f, i) => (
                          <option key={i} value={f}>{f}</option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <button
                  onClick={startDownload}
                  className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors flex items-center justify-center space-x-2 text-black font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>Start {downloadType === 'audio' ? 'Audio' : downloadType === 'image' ? 'Image' : 'Video'} Download</span>
                </button>
              </div>
            )}

            {/* Supported Sites */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <h3 className="font-medium mb-2 text-yellow-400">Supported Sites</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>YouTube</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Instagram</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Pinterest</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Unsplash</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Vimeo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>TikTok</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Twitter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Reddit</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="space-y-4">
            {downloads.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Download className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No downloads yet</p>
              </div>
            ) : (
              downloads.map((download) => (
                <div key={download.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="flex items-center space-x-3">
                    <img
                      src={download.thumbnail}
                      alt=""
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{download.title}</h3>
                      <p className="text-sm text-gray-400">
                        {download.size} • {download.type === 'audio' ? 'Audio Only' : download.type === 'image' ? 'Image' : 'Video'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getMediaIcon(download.type)}
                      <button
                        onClick={() => deleteDownload(download.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className={getStatusColor(download.status)}>
                        {download.status === 'completed' && '✓ Completed'}
                        {download.status === 'downloading' && '↓ Downloading...'}
                        {download.status === 'failed' && '✗ Failed'}
                      </span>
                      <span className="text-yellow-400">{download.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          download.status === 'completed' ? 'bg-yellow-500' :
                          download.status === 'downloading' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${download.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaDownloaderApp;
