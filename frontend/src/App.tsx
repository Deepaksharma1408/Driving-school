import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StudentPortalModal } from './components/layout/StudentPortalModal';
import { ArticleModal } from './components/layout/ArticleModal';
import { ExitIntentModal } from './components/ui/ExitIntentModal';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { DrivingLessons } from './pages/DrivingLessons';
import { CarHire } from './pages/CarHire';
import { LessonAndCar } from './pages/LessonAndCar';
import { TestPreparation } from './pages/TestPreparation';
import { Locations } from './pages/Locations';
import { FAQ } from './pages/FAQ';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Book } from './pages/Book';
import { Admin } from './pages/Admin';
import { LogbookCalculator } from './pages/LogbookCalculator';
import { Quiz } from './pages/Quiz';
import { SubmitReview } from './pages/SubmitReview';
import { SavingsCalculator } from './pages/SavingsCalculator';
import { Instructors } from './pages/Instructors';
import { Referral } from './pages/Referral';
import { LiveTracking } from './pages/LiveTracking';
import { Cockpit } from './pages/Cockpit';
import { Badges } from './pages/Badges';
import { Schedule } from './pages/Schedule';

import { BlogArticle } from './types';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-shell">
        <Navbar onOpenStudentPortal={() => setIsStudentPortalOpen(true)} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home onSelectArticle={setSelectedArticle} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/lessons" element={<DrivingLessons />} />
            <Route path="/driving-lessons" element={<DrivingLessons />} />
            <Route path="/car-hire" element={<CarHire />} />
            <Route path="/lesson-and-car" element={<LessonAndCar />} />
            <Route path="/test-preparation" element={<TestPreparation />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog onSelectArticle={setSelectedArticle} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/logbook" element={<LogbookCalculator />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/submit-review" element={<SubmitReview />} />
            <Route path="/calculator" element={<SavingsCalculator />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/track" element={<LiveTracking />} />
            <Route path="/cockpit" element={<Cockpit />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/schedule" element={<Schedule />} />
            {/* Fallback route */}
            <Route path="*" element={<Home onSelectArticle={setSelectedArticle} />} />
          </Routes>
        </main>

        <Footer />

        {/* Global Dialog Modals */}
        <StudentPortalModal 
          isOpen={isStudentPortalOpen} 
          onClose={() => setIsStudentPortalOpen(false)} 
        />

        <ArticleModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
        />

        {/* Global Floating Widgets & Lead Magnets */}
        <ExitIntentModal />
      </div>

      <style>{`
        .app-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-main);
        }
        .main-content {
          flex: 1;
        }
      `}</style>
    </Router>
  );
};

export default App;
