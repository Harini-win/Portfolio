import React, { useState, useEffect, useRef } from 'react';
import CustomCursor from "./CustomCursor";
import StarfieldBackground from "./StarfieldBackground";
import ProjectsSection from './projects';
import PortfolioHero from './home';
import ClubsSection from './clubs';
import LeadershipResearchSection from './leadership';
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);
function Typewriter({ taglines, speed = 80, pause = 1200 }) {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let i = -1;
    setDisplayed(""); 
    setTyping(true);
    const typeInterval = setInterval(() => {
      if (i < taglines[currentTagline].length-1) {
        i++;
        setDisplayed((prev) => prev + taglines[currentTagline][i]);
        
      } else {
        clearInterval(typeInterval);
        setTyping(false);
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [currentTagline, taglines, speed]);

  useEffect(() => {
    if (!typing) {
      const pauseTimeout = setTimeout(() => {
        setCurrentTagline((prev) => (prev + 1) % taglines.length);
      }, pause);
      return () => clearTimeout(pauseTimeout);
    }
  }, [typing, taglines.length, pause]);

  return (
    <span className="inline-block">
      {displayed}
      <span className="animate-pulse">{typing ? "|" : ""}</span>
    </span>
  );
}

const Portfolio = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const heroRef = useRef();
  const particlesRef = useRef([]);
  
  const taglines = [
    'CSE Undergrad',
    'IITM BS undergrad', 
    'Prompt engineer',
    'AI practitoner',
    'ML Enthusiast',
    'Data analyst'
  ];

  const techStack = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "data:image/png;base64,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",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
  "https://geopandas.org/en/stable/_images/geopandas_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/9/91/QGIS_logo_new.svg",
  "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg",
  "data:image/png;base64,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",
  "https://python.langchain.com/img/brand/wordmark.png",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAC0CAMAAAB4+cOfAAABL1BMVEX/3i0yfv//////ZEb/XUf/0TBOfPP/YjAedv8ufP//3SMoev//4Cz/ZEP/4ywWdP//3BT/Wjf/3AD/Xz//Yz7/Yzckf///++j/X0fm7/////z//O7/5F2kwf//aEX0+P+PtP94pv//7ZxMjf//+Nv/99HW4///76quyP9onP//4D3/879elv+/1P//6Hr/xDP/qjnL3P+Frv//5+P/2NL/qZv/64z/emL/VTD/ycH/8bL/5GFeeuT/4kr1ZU1FiP/aanbd6f//uTb/nDz/9MX/wLf/tKj/nYz/kYP/3Xf/6oK4zf//5m7/8e//f2j/inXs0drQaYGwcKRweNfHbYzlaGeocavxZlW+bpRueNmOdcODds7XanztZ1z/ckT/f0H/jT//oTv/yzL/sjj/qIeqv3EfAAAK0klEQVR4nO3di3rayBUH8BEmDoh6kWGXmAXMLTYXG2/BMb6tQ9mNY9fGaZNsk7bbettN3/8ZOgI7loQuczl/OeTjPIC++JczZ2bODBJLLMM32GP/A77UWMIExBImIAAw1XG/167UBoM6j8GgVmn3+uMqxZP3Xxyfvz64uLi8/PPe3tWw0dp59bxE8WCfIIXZvq51mplsyo7MQ6RS2Wy20KzXemPFB+8fH1werhwdrfPI80g+Me2weOSss8nwZOt7yr/DDiqYcXsw4iKZdDpt+EeaC2WzzUGvKPXgm+ODQy6Sz6+tPETyCXOELZTrXrWeE/0t06CAGbc7PCsyASBenlTWEMW5Ob5Y4SniJPGDuePh6XNKh6MN06+NUqnANPGPTCrTrEQNq/3Xh3k/lCCYO5zukGZY6cFsDwqCmeKTOaNKcN7cvD5cX/dHCYOZ4XSvtrT+qmlowBQro6yayp1NKrV77TtbHb8JU4mAsW1y3YbubKUM06/zSqvBMo1MKj3wps3+RT5cJRpmmjcTvbRRhLkeZbVV7myynb7jwS/+cpSPUBGCmQ6pk7hhKvx/mobFjnS22btnORRhEYPhYZmtOGEqRopOZUaTavanLJFjSA6G07CW4hwlDXNdoGaZ0ez+9Y0oiwSMTbMTB8x2E8FiGIXVt2KDSBqG05yplGEpmGqdquR6WIx3330rziIJw8vwnvzkLQPTzugsW0Jc3n/8ToZFFsamka7C4jDFJihdCr88FS4uijD2eHoGgmlrrXJDXN6/lBpFijB8NSyXNIIw1U4WwmIU3kmnixoMT5pTmUojBtMvgNJl9W+S1UUDhplMYnoSgqlg5mij8Oua/DBSh2Es1yCF6aBcPqgMIx0YZk1EF8LRMMURZhgZhbdP1Vg0YJjZFSw0kTDbBmSStsuL2jDSg+FLGrHuZxRMn3If7XL5qO6iA8OHk9DmKQLmGlVeflxTLC/6MMwS6dOEw7Qxi13u8q2OiyYME1nrhcK0Uas6TRddGJFpOwzmi3XRhhHImRCYL9dFHyZaJhimh6q7q1p1lwgmsgIHwmyDXIzVj9ouFDAsF75xCoIpgpa7RkFjXUcKw6zQDk0ATHWEmaf5PkBpO42AMbth+6YAmF3U/uiD8v6IHIaZZWmYGqzPQOJCBMOsoSRMDzRRG6vaEzUpDMsFb5v8YIqg+kJTeClhQgqwH0wTVXjfURReUhjzTAIG1sh8T1NgKGGCy8w8zBhVYAovaQoMKQzLBfSt5mFgK5i/ExUYWhizKwgDm6n/QTaQSGGCBpMXpqh/fywgCLZIEBjm3wT2wnRgS16qGYkcxn8B7IFB9RqMVcJ8IYbx7457YGCV9xe6yksOw/zqrxumjUqYHykHEjmM3+0ZNwyIxSj8iTRhqGGYNd+AcMGg1rwG5VQNgWmEw6CmauqEIYdh5lzKOGFwFYY4Yehh5quMEwbEYhTeEicMPQxj3pRxwODWMLRTEgRm7jTFAYNrw1AnDABmrjHzALMNazeskK56MTDM2gqCqaN2Sf8kH0kIGHMSAFPFNXrJEwYBw8ySPwzqihD1bgAG4ym/n2FwR2wLAuMpv/cwuLPqf9OPJAiM5yjlHmZR9tVImJYfzEKNJAyMeyzdwVRxtz4AIwkDw3KleZgF2g7gYFwtzjuYwQKt7mAw5tU8TAHjQnrKBodx9X5nMEXYPonyNAkOk3vmhcGVGOoWFRTGWWRmMDVUifkVUmJQMObQC7O7OK0YKEzZCwPrgv9roWCcPXG2iLUXBuOovlOYPqr2GpjaC4NxVN8pTAW1ISA/NwHDmA03zIKte4Ewe26YDqr2fsDUXhxM2Q0DOzjBbAhwMOzMDYNhwc3WOBhWcsJUUZMSphmDhLFcMLhlDKLfC4V5WMjYMLAfsxFeeY4J5uE80obpw35ssolxAcK8csHAmg6g2guE2XHCLFjD92uAAe0IgDAnThjYsfWiwywz5quB2YinxuBmpSVMzDAr8axjcK9xQMFsglw8K1/YXmkBYZ47YaoLB3P7DQrG3XaQ/N7Co8Ns/IaCMV0wiRHGBQfzHxTMwwtCpjCog0gYzM8gGG/PF3X3GQWT/PQHEMzEDYM604fB/ICCabhhUHsCGAx+4TuDQb3OAQUTwzLm7rbDYmUMbra2PLcdUCduKBjYpOS46TuDAR1eoy6awSalPS8M6MI8CuZ3EIzz0vwMBlR9QTCbIBfXe0Hu7vkuUsbgNgRmYg6mDqm+GJjkH1G1dzIPgykyIJgnMZSYe5jiAsFsokaS82L4598rQV4cA4GBrWLcr5G5h4G8CAQCg9tBDv1gxgsDsxHHZO34FS1iLCFggN27hC8M4q4vAiaOXowLBjEvIWBiWfY6YRC/owXAJP+Lb/d6YABtPARMDM07Dwzgd5H0MLgelfeVQw4Y+vJLDxNX6XXB0N+Dpoe5hZVe74e6nC/vIu/jkcMkf4qhdzcPQ37rgRwGljC5uZequ14QSH0iSQ2T/ISaq+cSxg1Dvcijhomn4eADQ11liGFirDBeGOK3pRDDxHBdKAiGuC1DCwNbw/i8m3X+neGk3QdSmDhuC4XAkP5EhzZj8FdYw2BIp2xKmHgOTUJgqoTfWCWEieM+YjhM4ppuMBHC4A6TAr7+5/O1HLpvNtDB4AbSqb+LH0yVyoUOJvaB5P/hKbIfXdBlTLwzUhAM2RdzqGCSP4ESJuTrdv5f/SNqjBPBJGO47ywIU6X5XjwNDLDPG1RgAmESY5LVDAnMxi2Kxf/DSuEwNJ+KpIFBrWBCPhIZAkOyz6aAiXdPLQBDMTURwOAmpKvAvzwCJlHXltGHga14LZ+mnShMoqMrow0DO6m2gnYCQjDaMrowj+gSDqMrowmDG0f+LRgJGM06owfzePVFACZR01nPaME82nwkBqO1ntGB2YC5NERcomESPfXdgTrMxubvKJfQ9a4MTGJsqO61lWGSvzHMetdkYfsjSZhEdVdxOKnCJH9GbQPKfkdIyjDKJVgNZgNXXoL7Uoowib7ScFKCSd4+wbiYLLCPqQ6TqHay8jVYBYYPI8w4sk5D2lLqMPa7z6STRh4mufkDKF2Czo/0YeykAcNswNIlV5ZKFzkYvqQpyE1PkjDJW9DixWKCixdVGLt7JTOepGDya5++gaSLaQ2FJ2llmESxLlGEJWDy+f+ZkHQxrcn8BTsATCKx3RHeIwjD5NcvbhKloWnSs5yKLnW1YSRoBGE4y/70wc+uLFIa0ypvRfwtpDA2TVbkcykiMGvrRwc3nx9cGloWGUtONVvUYXitqWWi63A0TP7o5bn7wd+3uhRpY1rWUKm26MLwuN7NRgypCJi19fXLFz4P3tqzNG3MXFlyPTcXGjB22oxCh1QYDFd5c34T8ODSSVndxrS6Da1kmYYWDI9xbZQKzJsgmLV8mMosnrXKprwNH0HdoUZleQhdGB7FdsdI+SaOH4yNsnJ5HK4yi9LOHpNIHJNDnrb0c2UWBDB2bFc66RRPnXQYjG3CUc73JR78/MTGidLhJhylsaWwwg0KIhg7ir1KfZTNplKZTCY9JVp9usYjz4OLHB0dXrx+IZIp3ihtta7OrJztY4eDw7RFcrnupPGKKlPugxBmFsXtXqVW7+w2R4UCz5jNl4dvLi8Ozo/3VUicUdp61RpeTcpnXZuEse5ZebI3bOxsUZPMghzma4klTEAsYQJiCRMQS5iA+D8zPN3VHtHkpgAAAABJRU5ErkJggg==",
  "https://ollama.com/public/ollama.png",
  "https://pandas.pydata.org/static/img/pandas_mark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  "https://matplotlib.org/_static/logo2_compressed.svg",
  "https://plotly.com/all_static/images/plotly-logo.png",
  "https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png",
  "https://upload.wikimedia.org/wikipedia/commons/c/c6/Wireshark_icon_new.png",
  "https://opencv.org/wp-content/uploads/2022/05/logo.png",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "data:image/png;base64,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",
  "data:image/png;base64,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"
];

  const experiences = [
    {
      company: 'Anju Soft',
      period: 'May 2025 - Jun 2025',
      role: 'AI & Database Intern',
      description: 'Implement local LLM in existing pipeline to cut down the cost of API calls. Worked on building efficient patient recommendation SP in current database. Built a DRAG model with chromaDB and Langchain to recommend patients based on their symptoms and medical history.'
    },
    {
      company: 'SCOPE, VITCC', 
      period: 'May 2025 - Jul 2025',
      role: 'Summer Research Intern - AI Orchestration',
      description: 'Designed LLM-powered educational agents using Lang Chain and Lang Graph'
    },
    {
      company: 'Infosys (Pragathi Cohort 3)',
      period: 'Jan 2025 - Apr 2025',
      role: 'Data Analytics Intern', 
      description: 'Constructed 15+ Excel-based pivot tables to analyze sales data, customer demographics, and marketing campaign performance, providing actionable insights that directly supported optimization strategies across three departments'
    },
    {
      company: 'ISACA',
      period: 'Jan 2023 - Apr 2023',
      role: 'Cyber Security Intern', 
      description: 'Evaluated 100+ industrial IoT sensors across diverse manufacturing environments to pinpoint common vulnerabilities, then documented remediation strategies to reduce potential security breaches by up to 30%'
    }
  ];
useEffect(() => {
  document.querySelectorAll(".text-block").forEach((block) => {
    const st = SplitText.create(block, { type: "chars", charsClass: "char" });
    st.chars.forEach((char) => {
      gsap.set(char, { attr: { "data-content": char.innerHTML } });
    });
    block.onpointermove = (e) => {
      st.chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100)
          gsap.to(char, {
            overwrite: true,
            duration: 1.2 - dist / 100,
            scrambleText: {
              text: char.dataset.content,
              chars: ".",
              speed: 0.2,
            },
            ease: "none",
          });
      });
    };
  });
}, []);
  return (
      <div className="bg-black text-white min-h-screen">
        <CustomCursor />
        <StarfieldBackground />
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-gray-900 rounded-full px-10 py-4 flex space-x-8">
          <a href="#home" className="text-gray-300 hover:bg-purple-600 hover:text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-colors duration-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span>Home</span>
          </a>
          
          <a href="#project" className="text-gray-300 hover:bg-purple-600 hover:text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-colors duration-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span>Projects</span>
          </a>
          
          <a href="#skill" className="text-gray-300 hover:bg-purple-600 hover:text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-colors duration-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>Skills</span>
          </a>
          
          <a href="#experience" className="text-gray-300 hover:bg-purple-600 hover:text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-colors duration-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
              <path d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z"/>
            </svg>
            <span>Experience</span>
          </a>
          
          <a href="#contact" className="text-gray-300 hover:bg-purple-600 hover:text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-colors duration-200 whitespace-nowrap">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>Contact me</span>
          </a>
        </div>
      </nav>
   
    <PortfolioHero taglines={taglines} Typewriter={Typewriter} />
    <ProjectsSection />
<section id="skill" className="py-20 px-4 sm:px-8">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-center text-3xl sm:text-5xl font-bold mb-16 relative z-20">Tech Stacks</h2>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4">
      {techStack.map((tech, index) => (
        <div
          key={index}
          className="group rounded-2xl p-2 text-center"
        >
          <img 
            src={tech} 
            alt="Tech Logo"
            className="w-20 h-20 sm:w-20 sm:h-20 mx-auto mb-4 object-contain bg-white rounded-lg p-2 cursor-pointer transition-all duration-300 filter brightness-100 contrast-100 grayscale-0 hover:brightness-100 hover:contrast-100 hover:grayscale-0 sm:filter sm:brightness-50 sm:contrast-70 sm:grayscale sm:group-hover:brightness-100 sm:group-hover:contrast-100 sm:group-hover:grayscale-0"
          />
        </div>
      ))}
    </div>
  </div>
</section>

      <section id="experience" className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-16">
            My <span className="text-purple-500">Work Experience</span>
          </h2>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>
            
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-center mb-16 group">
                <div className="w-4 h-4 bg-purple-500 rounded-full border-4 border-black z-10 mr-8"></div>
                <div className="flex-1 grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-300 mb-2">{exp.company}</h3>
                    <p className="text-gray-500">{exp.period}</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{exp.role}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed text-block">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LeadershipResearchSection />
      <ClubsSection />
   <footer id="contact" className="py-20 px-4 sm:px-8 border-t border-gray-800 relative z-30">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      <div>
        <h3 className="text-gray-400 font-medium mb-4">NAVIGATION</h3>
        <ul className="space-y-2">
          <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
          <li><a href="#project" className="text-gray-300 hover:text-white transition-colors">Projects</a></li>
          <li><a href="#experience" className="text-gray-300 hover:text-white transition-colors">Experience</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-gray-400 font-medium mb-4">CONTACT</h3>
        <ul className="space-y-2">
          <li><a href="https://www.linkedin.com/in/harini-s-4b127428b/" className="text-gray-300 hover:text-white transition-colors">LinkedIn →</a></li>
          <li><a href="https://github.com/Harini-win" className="text-gray-300 hover:text-white transition-colors">Github →</a></li>
          <li><a href="mailto:harini.selvakummar@gmail.com" className="text-gray-300 hover:text-white transition-colors">Email →</a></li>
          <li><a href="/resume.pdf" className="text-gray-300 hover:text-white transition-colors">Resume →</a></li>
        </ul>
      </div>
      <div className="hidden lg:block"></div>
      <div className="sm:text-right mt-8 sm:mt-0">
        <div className="flex sm:justify-end items-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-gray-300">Available For Work</span>
        </div>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-800 gap-4">
      <p className="text-gray-500 text-sm text-center sm:text-left">
        © 2025 . Harini S. All Rights Reserved.
      </p>
      <p className="text-gray-500 text-sm text-center sm:text-right">
        Crafted With React JS And Tailwind CSS.
      </p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Portfolio;