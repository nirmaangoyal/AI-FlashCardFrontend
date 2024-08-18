import React from 'react';
import { Book, BrainCog, Download, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../utils/logo.webp';

const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded font-semibold transition duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Separator = () => (
  <div className="w-full h-px bg-gray-800 my-16"></div>
);

const Body = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); // Adjust this path as needed
  };

  return (
    <div className="min-h-screen bg-black text-gray-300">


      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
              <img src={logo} alt="AI Flashcards Logo" className="w-20 h-20 object-contain" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-white">Revolutionize Your Learning with AI-Powered Flashcards</h2>
          <p className="text-xl text-gray-400 mb-8">Master academic content faster and develop deeper understanding with our advanced RAG and LLM-generated flashcards.</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3" onClick={handleGetStarted}>
            Try AI Flashcards Now
          </Button>
        </section>

        <Separator />

        <section id="features" className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center text-white">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BrainCog className="w-12 h-12 text-blue-400" />}
              title="AI-Generated Flashcards"
              description="Our advanced AI creates comprehensive flashcards from popular academic books."
            />
            <FeatureCard 
              icon={<Book className="w-12 h-12 text-blue-400" />}
              title="Interactive Learning"
              description="Engage with textbooks, generate custom flashcards, and ask questions for deeper understanding."
            />
            <FeatureCard 
              icon={<Download className="w-12 h-12 text-blue-400" />}
              title="Easy Export"
              description="Download your flashcards for offline study or sharing with classmates."
            />
          </div>
        </section>

        <Separator />

        <section id="how-it-works" className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center text-white">How It Works</h3>
          <ol className="list-decimal list-inside space-y-4 text-lg text-gray-400">
            <li>Select your academic book from our extensive library.</li>
            <li>Our AI generates comprehensive flashcards using advanced RAG methods and LLMs.</li>
            <li>Study the flashcards to memorize key terms and concepts.</li>
            <li>Interact with the textbook to generate more specific flashcards or ask questions.</li>
            <li>Review and reinforce your learning with AI-guided study sessions.</li>
            <li>Download flashcards for offline study or sharing.</li>
          </ol>
        </section>

        <Separator />

        <section id="get-started" className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-white">Ready to Elevate Your Learning?</h3>
          <p className="text-xl text-gray-400 mb-8">Join thousands of students who have transformed their study habits with AI Flashcards.</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3" onClick={handleGetStarted}>
            Get Started for Free
          </Button>
        </section>
      </main>

      <footer className="bg-gray-900 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 AI Flashcards. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h4 className="text-xl font-semibold mb-2 text-white">{title}</h4>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Body;