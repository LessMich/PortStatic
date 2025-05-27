import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Sample portfolio data - Michele can replace with real content later
  const portfolioItems = [
    {
      id: 1,
      title: "Electronic Music Production",
      description: "Complete production from composition to mastering for electronic music project. Handled sound design, synthesis, and final mix.",
      type: "audio",
      audioSrc: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Sample audio
      category: "Music Production"
    },
    {
      id: 2,
      title: "Short Film Sound Design",
      description: "Created atmospheric soundscapes and foley for independent short film. Managed dialogue editing and final audio post-production.",
      type: "youtube",
      videoId: "dQw4w9WgXcQ", // Sample video ID
      category: "Sound Design"
    },
    {
      id: 3,
      title: "Podcast Audio Engineering",
      description: "Multi-episode podcast series - audio cleanup, editing, mixing, and mastering. Enhanced dialogue clarity and added professional polish.",
      type: "audio",
      audioSrc: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Sample audio
      category: "Post-Production"
    },
    {
      id: 4,
      title: "Commercial Audio Branding",
      description: "Composed and produced audio logo and brand sound elements for advertising campaign. Created memorable sonic identity.",
      type: "youtube",
      videoId: "dQw4w9WgXcQ", // Sample video ID
      category: "Commercial"
    }
  ];

  const services = [
    {
      title: "Sound Design",
      description: "Creating immersive audio experiences for film, games, and interactive media",
      icon: "🎵"
    },
    {
      title: "Music Production",
      description: "Full-scale music production from composition to final mastering",
      icon: "🎧"
    },
    {
      title: "Audio Post-Production",
      description: "Professional editing, mixing, and mastering for all media formats",
      icon: "🎙️"
    },
    {
      title: "Multimedia Audio",
      description: "Interactive audio solutions for digital experiences and installations",
      icon: "🔊"
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentTrack]);

  const playTrack = (track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(track);
      setCurrentTime(0);
      setTimeout(() => {
        audioRef.current.play();
        setIsPlaying(true);
      }, 100);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold">
              <span className="text-yellow-400">Michele</span> Tedeschi
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-yellow-400 transition-colors">Home</a>
              <a href="#portfolio" className="hover:text-yellow-400 transition-colors">Portfolio</a>
              <a href="#services" className="hover:text-yellow-400 transition-colors">Services</a>
              <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/7605539/pexels-photo-7605539.jpeg')`
          }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-yellow-400">Michele</span> Tedeschi
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-gray-300">
            Sound Designer & Multimedia Audio Specialist
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Crafting immersive audio experiences across film, music, and interactive media. 
            From sound design to full production, I bring your creative vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#portfolio" 
              className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-yellow-400">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A showcase of diverse audio work spanning multiple formats and creative contexts
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioItems.map((item) => (
              <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-yellow-400 text-sm font-semibold">{item.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-300 mb-6">{item.description}</p>
                  
                  {item.type === 'audio' ? (
                    <div className="space-y-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <button
                            onClick={() => playTrack(item)}
                            className="flex items-center space-x-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-300 transition-colors"
                          >
                            <span>{currentTrack?.id === item.id && isPlaying ? '⏸️' : '▶️'}</span>
                            <span className="font-semibold">
                              {currentTrack?.id === item.id && isPlaying ? 'Pause' : 'Play'}
                            </span>
                          </button>
                          <span className="text-sm text-gray-400">
                            {currentTrack?.id === item.id ? formatTime(currentTime) : '0:00'} / 
                            {currentTrack?.id === item.id ? formatTime(duration) : '0:00'}
                          </span>
                        </div>
                        {currentTrack?.id === item.id && (
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${item.videoId}`}
                        title={item.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-yellow-400">Services</span> & Expertise
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Professional audio solutions tailored to your creative needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-800 rounded-lg p-8 hover:bg-gray-700 transition-colors">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-yellow-400">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-yellow-400">Michele</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-300">
                <p>
                  With years of experience in sound design and multimedia audio, I specialize in creating 
                  immersive audio experiences that enhance storytelling and engage audiences across all media formats.
                </p>
                <p>
                  My work spans from music production and film sound design to interactive audio for digital 
                  experiences. I believe in the power of sound to transform and elevate any creative project.
                </p>
                <p>
                  Whether you need a complete audio post-production workflow or specialized sound design elements, 
                  I bring technical expertise and creative vision to every collaboration.
                </p>
              </div>
              <div className="mt-8">
                <a 
                  href="#contact" 
                  className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
                >
                  Let's Collaborate
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/7098114/pexels-photo-7098114.jpeg" 
                alt="Michele at work"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get <span className="text-yellow-400">In Touch</span>
            </h2>
            <p className="text-xl text-gray-300">
              Ready to bring your project to life? Let's discuss your audio needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-400">📧</span>
                    <span>michele.tedeschi@email.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-400">📱</span>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-400">📍</span>
                    <span>Available for remote and on-location work</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">Project Inquiries</h3>
                <p className="text-gray-300">
                  I'm always excited to discuss new projects and creative collaborations. 
                  Whether you need sound design, music production, or audio post-production, 
                  let's explore how we can work together.
                </p>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Type</label>
                <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none">
                  <option>Sound Design</option>
                  <option>Music Production</option>
                  <option>Audio Post-Production</option>
                  <option>Multimedia Audio</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  rows="4" 
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Michele Tedeschi. Sound Designer & Multimedia Audio Specialist.
          </p>
        </div>
      </footer>

      {/* Audio Player */}
      {currentTrack && (
        <audio 
          ref={audioRef}
          src={currentTrack.audioSrc}
          className="hidden"
        />
      )}
    </div>
  );
};

export default App;