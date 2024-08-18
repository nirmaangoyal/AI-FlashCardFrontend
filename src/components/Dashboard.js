import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock book list
const bookList = [
  { id: 1, title: "Introduction to Psychology" },
  { id: 2, title: "Principles of Economics" },
  { id: 3, title: "World History: A Comprehensive Guide" },
  { id: 4, title: "Fundamentals of Computer Science" },
  { id: 5, title: "Biology: The Science of Life" },
];

// Mock flashcard data
const mockFlashcardData = {
  "What advantage do cleistogamous flowers have in terms of seed production, and what is the trade-off for this advantage?": "Cleistogamous flowers have the advantage of assured seed-set, even in the absence of pollinators. The trade-off for this advantage is that they are restricted to self-pollination, which limits genetic variation.",
  "What are the two parts of a flower where the two most important units of sexual reproduction develop?": "Ovules in the ovary and pollen grains in the anthers.",
  "What characteristic is unique to the mitotic divisions that occur prior to the 8-nucleate stage in the development of the female gametophyte or embryo sac?": "They are strictly free nuclear, meaning nuclear divisions are not followed immediately by cell wall formation.",
  "What is the function of the micropyle in the seed coat during germination?": "The micropyle facilitates entry of oxygen and water into the seed during germination.",
  "What is the function of the stalk called funicle in relation to the ovule in an angiosperm?": "The funicle attaches the ovule to the placenta.",
};

const Flashcard = ({ question, answer, isFlipped, onClick }) => (
    <div 
      className="flashcard cursor-pointer w-full h-64 relative"
      onClick={onClick}
    >
      <div 
        className={`absolute w-full h-full flex items-center justify-center p-4 rounded-lg transition-all duration-300 ease-in-out ${
          isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'
        }`}
        style={{ backfaceVisibility: 'hidden', backgroundColor: '#1F2937' }}
      >
        <p className="text-center">{question}</p>
      </div>
      <div 
        className={`absolute w-full h-full flex items-center justify-center p-4 rounded-lg transition-all duration-300 ease-in-out ${
          isFlipped ? 'opacity-100' : 'opacity-0 rotate-y-180'
        }`}
        style={{ backfaceVisibility: 'hidden', backgroundColor: '#2563EB' }}
      >
        <p className="text-center">{answer}</p>
      </div>
    </div>
  );
  
  const Dashboard = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
  
    const filteredBooks = bookList.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleSelectBook = (book) => {
      setSelectedBook(book);
      setSearchTerm(book.title);
      setIsDropdownOpen(false);
      setFlashcards([]);
      setCurrentCardIndex(0);
    };
  
    const generateFlashcards = () => {
      const generatedFlashcards = Object.entries(mockFlashcardData).map(([question, answer]) => ({ question, answer }));
      setFlashcards(generatedFlashcards);
      setCurrentCardIndex(0);
      setIsFlipped(false);
    };
  
    const handleNextCard = () => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
      setIsFlipped(false);
    };
  
    const handlePrevCard = () => {
      setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
      setIsFlipped(false);
    };
  
    const handleFlipCard = () => {
      setIsFlipped(!isFlipped);
    };
  
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Your Study Dashboard</h1>
        
        <div className="relative mb-8">
          <div className="flex items-center bg-gray-800 rounded-lg">
            <Search className="w-5 h-5 ml-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search or select a book"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none"
            />
          </div>
          
          {isDropdownOpen && (
            <ul className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
              {filteredBooks.map(book => (
                <li 
                  key={book.id}
                  onClick={() => handleSelectBook(book)}
                  className="p-3 hover:bg-gray-700 cursor-pointer"
                >
                  {book.title}
                </li>
              ))}
            </ul>
          )}
        </div>
  
        {selectedBook ? (
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedBook.title}</h2>
            {flashcards.length === 0 ? (
              <>
                <p className="mb-4">Here you can view and manage flashcards for {selectedBook.title}.</p>
                <button 
                  onClick={generateFlashcards}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Generate Flashcards
                </button>
              </>
            ) : (
              <div className="mt-6">
                <Flashcard 
                  question={flashcards[currentCardIndex].question}
                  answer={flashcards[currentCardIndex].answer}
                  isFlipped={isFlipped}
                  onClick={handleFlipCard}
                />
                <div className="flex justify-between mt-4">
                  <button 
                    onClick={handlePrevCard}
                    className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={handleNextCard}
                    className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-400">Select a book to view or generate flashcards.</p>
        )}
      </div>
    );
  };
  
  export default Dashboard;