const LeadershipResearchSection = () => {
  const scrollRef = useRef(null);
  const leadershipData = [
    {
      title: "President",
      role: "Mathematics Club",
      description: "Led a team of 100 members in organizing technical events, workshops,research and outreach activities",
      category: "Leadership"
    },
    {
      title: "Central Committee Head",
      role: "TechnoVIT'24",
      description: "Managed 300+ events in the international tech fest.",
      category: "Leadership"
    },
    {
      title: "IOT based Smart Garbage System",
      role: "International conference",
      description: "Authored a research paper focused on real-time waste management and optimization.",
      category: "Research"
    },
    {
      title: "R&D",
      role: "CSED",
      description: "Worked in R&D dept at Centre for social entrepreneurship and development.",
      category: "Research"
    },
    {
      title: "SRIP",
      role: "VITCC",
      description: "Worked on improving the education system using AI.",
      category: "Research"
    },
    {
      title: "Organizer",
      role: "TechnoVIT'25",
      description: "Managed the website and logistics.",
      category: "Leadership"
    },
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; 

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
     
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

  
    animationId = requestAnimationFrame(scroll);

    
    const handleMouseEnter = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-20 px-8 bg-black bg-opacity-10">
      <div className="max-w-7xl mx-auto">
        <div className="mx-auto text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-white relative z-20">
            Leadership & <span className="text-purple-500">Research</span>
          </h2>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          
          {[...leadershipData, ...leadershipData].map((item, index) => (
            <div
              key={index}
              className="group bg-gray-900 bg-opacity-80 backdrop-blur-xl rounded-3xl p-6 hover:bg-opacity-90 transition-all duration-500 cursor-pointer relative overflow-hidden flex-shrink-0 w-72 border border-gray-700 border-opacity-30"
            >
              <div className="space-y-4">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  item.category === 'Leadership' 
                    ? 'bg-purple-500 bg-opacity-80 text-white' 
                    : 'bg-purple-500 bg-opacity-80 text-white'
                }`}>
                  {item.category}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-500 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-purple-400 text-sm font-medium mb-3">
                    {item.role}
                  </p>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
 
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 bg-gradient-to-br from-purple-500 via-transparent to-purple-500 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
     
      </div>
    </section>
  );
};

export default LeadershipResearchSection;
import React, { useEffect, useRef } from 'react';
