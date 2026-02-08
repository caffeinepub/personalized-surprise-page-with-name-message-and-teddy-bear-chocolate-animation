import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import TeddyChocolateAnimation from './components/TeddyChocolateAnimation';

function App() {
  const [girlfriendName, setGirlfriendName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [showSurprise, setShowSurprise] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [soundArmed, setSoundArmed] = useState(false);

  const isFormValid = girlfriendName.trim() !== '' && customMessage.trim() !== '';

  const handleSurprise = () => {
    if (isFormValid) {
      setShowSurprise(true);
      setAnimationKey(prev => prev + 1);
      setSoundArmed(true);
    }
  };

  const handleEdit = () => {
    setShowSurprise(false);
    setSoundArmed(false);
  };

  const handleReplay = () => {
    setAnimationKey(prev => prev + 1);
    setSoundArmed(true);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  if (showSurprise) {
    return (
      <div className="min-h-screen flex flex-col romantic-bg">
        <main className="flex-1 flex items-center justify-center p-4 py-8">
          <div className="w-full max-w-4xl">
            <div className="surprise-container">
              <div className="relative w-full">
                <TeddyChocolateAnimation 
                  key={animationKey} 
                  soundArmed={soundArmed}
                  isMuted={isMuted}
                />
                
                {/* Mute/Unmute Control */}
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    onClick={toggleMute}
                    variant="outline"
                    size="icon"
                    className="bg-white/90 backdrop-blur-sm border-romantic-border hover:bg-white shadow-lg"
                    title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5 text-romantic-muted" />
                    ) : (
                      <Volume2 className="h-5 w-5 text-romantic-primary" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="message-reveal text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-romantic-primary animate-fade-in">
                  Dear {girlfriendName} <Heart className="inline-block w-8 h-8 md:w-12 md:h-12 text-romantic-accent animate-pulse" />
                </h1>
                
                <Card className="bg-white/90 backdrop-blur-sm border-romantic-border shadow-romantic animate-slide-up">
                  <CardContent className="pt-6">
                    <p className="text-lg md:text-2xl text-romantic-text leading-relaxed whitespace-pre-wrap">
                      {customMessage}
                    </p>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delayed">
                  <Button 
                    onClick={handleReplay}
                    size="lg"
                    className="bg-romantic-accent hover:bg-romantic-accent-hover text-white shadow-lg"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Replay Animation
                  </Button>
                  <Button 
                    onClick={handleEdit}
                    variant="outline"
                    size="lg"
                    className="border-romantic-primary text-romantic-primary hover:bg-romantic-primary/10"
                  >
                    Edit Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="py-6 text-center text-sm text-romantic-muted">
          <p>
            © 2026. Built with <Heart className="inline-block w-4 h-4 text-romantic-accent animate-pulse" /> using{' '}
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-romantic-primary hover:text-romantic-accent transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col romantic-bg">
      <header className="py-8 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-romantic-primary flex items-center justify-center gap-3">
            <Heart className="w-10 h-10 text-romantic-accent animate-pulse" />
            Sweet Surprise
            <Heart className="w-10 h-10 text-romantic-accent animate-pulse" />
          </h1>
          <p className="mt-2 text-romantic-muted text-lg">
            Create a personalized surprise for someone special
          </p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm border-romantic-border shadow-romantic">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl text-romantic-primary">
              Create Your Surprise
            </CardTitle>
            <CardDescription className="text-base text-romantic-muted">
              Fill in the details below to create a magical moment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-romantic-text font-medium">
                Her Name <span className="text-romantic-accent">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter her name..."
                value={girlfriendName}
                onChange={(e) => setGirlfriendName(e.target.value)}
                className="border-romantic-border focus:border-romantic-primary focus:ring-romantic-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-romantic-text font-medium">
                Your Message <span className="text-romantic-accent">*</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Write your heartfelt message here..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={6}
                className="border-romantic-border focus:border-romantic-primary focus:ring-romantic-primary resize-none"
              />
              <p className="text-sm text-romantic-muted">
                Express your feelings in your own words
              </p>
            </div>

            <Button
              onClick={handleSurprise}
              disabled={!isFormValid}
              size="lg"
              className="w-full bg-romantic-accent hover:bg-romantic-accent-hover text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg py-6"
            >
              <Heart className="mr-2 h-6 w-6" />
              Create Surprise
            </Button>

            {!isFormValid && (girlfriendName !== '' || customMessage !== '') && (
              <p className="text-sm text-romantic-accent text-center">
                Please fill in both fields to continue
              </p>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="py-6 text-center text-sm text-romantic-muted">
        <p>
          © 2026. Built with <Heart className="inline-block w-4 h-4 text-romantic-accent animate-pulse" /> using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-romantic-primary hover:text-romantic-accent transition-colors underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
