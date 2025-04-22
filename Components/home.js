import { useState } from 'react';
import Image from 'next/image';

export default function VoroniPrimarySchoolWebsite() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* WhatsApp Fixed Icon */}
      <a 
        href="https://wa.me/254704548982" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed right-4 bottom-16 z-50 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Chat with Headteacher on WhatsApp"
      >
        <img 
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjQ4cHgiIGhlaWdodD0iNDhweCI+PHBhdGggZmlsbD0iIzI1RDM2NiIgZD0iTTI0LDRDMTIuOTU0LDQsNCwxMi45NTQsNCwyNGMwLDMuMzA3LDAuODMsNi40MTgsMi4yODcsOS4xNjZsLTEuNTM5LDcuMDE3YzAuMTkxLDAuODY2LDAuMTEsOS45MTYsMC4xMSw5LjkxNmMwLjQ4NCwwLjk3NywxLjY3MSwxLjIxNywyLjQzMywwLjUxOEw0LjEsMzUuNzkxYzAsMCw2LjA2OCw2LjA0NywxMC41NzU2LDYuMDQ3QzM1LjA0Niw0MS44MzgsNDQsMzIuODg0LDQ0LDI0QzQ0LDEyLjk1NCwzNS4wNDYsNCwyNCw0eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zNS4wNzYsMzAuMTJjMCwwLTIuMDI5LTEuMDMtMy4zMjktMS43NTVsLTAuNTE0LTAuMjk3Yy0xLjA3LTAuNS0xLjgyOC0wLjI1NC0yLjI3OSwwLjMyOGwtMS4yNzksMS43ODdjLTAuNjQ0LDAuNjczLTEuNDc3LDAuNjQxLTEuNDc3LDAuNjQxYy0zLjI0MS0wLjgyNy01LjM4Ni0zLjA3OC02LjYxNS00LjY4NnMtMS45ODgtNC4wMDUtMS45ODgtNC4wMDVjMCwwLTAuMDkxLTAuODEyLDAuNTc5LTEuNDEzbDEuNzItMS4xNTNjMC42MjEtMC40NDksMC44MjctMS4yMTcsMC4zMjMtMi4yMjlsLTAuMjMzLTAuNDY4Yy0wLjY3My0xLjM3LTEuNTg2LTMuNDEtMS41ODYtMy40MWMtMC40NjgtMC45MzUtMS4zMzQtMS4yODItMi4xNDgtMC44NTJjLTAuNzExLDAuMzc1LTEuNDEzLDAuODc2LTEuOTg4LDEuNDc3Yy0wLjUyNywwLjU1LTEuMDcxLDEuMDk4LTEuNTQxLDIuMDk0Yy0wLjA4LDAuMTY5LTAuMTQyLDAuMzM0LTAuMTg3LDAuNWMtMC42NzMsMi4zNzQsMC40MjcsNS4xMjksMS44ODMsNy44OTFjMC44ODYsMS42NTEsMi4yODIsMy40NzksMy45MDQsNS4wODJzMy42MzgsMi45MzQsNS4yNjYsMy43ODRjMi44MDIsMS4yNDEsNS42NjQsMi4xOTksNy45ODcsMS40NzdjMC4xNjQtMC4wNSwwLjMyMi0wLjExNCwwLjQ4Ni0wLjE5N2MwLjk3Ny0wLjUxLDEuNTA4LTEuMTAyLDIuMDI5LTEuNjY1YzAuNTUtMC42MDEsMS4wMS0xLjMzNiwxLjM1My0yLjA2OUM0MS4yNjEsMzEuODI0LDM1Ljk4LDMwLjU3MywzNS4wNzYsMzAuMTJ6Ii8+PC9zdmc+"
          alt="WhatsApp Icon"
          className="w-12 h-12"
        />
      </a>
      
      {/* Header */}     
      <header className="bg-blue-700 text-white shadow-md w-full px-4 py-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <i className="fas fa-school text-3xl mr-3"></i>
            <div>
              <span className="text-2xl font-bold">Voroni Primary School</span>
              <p className="text-sm text-blue-200">Kwale County</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            <li><a href="#" className="hover:text-blue-200 transition">Home</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">About Us</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Academics</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Admissions</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Gallery</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Blog</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Contact</a></li>
          </ul>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="px-4 py-2 border border-white rounded hover:bg-blue-600 transition">
              Log In
            </button>
            <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-400 transition">
              Register
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-2xl focus:outline-none"
          >
            <i className={`fas ${showMobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </nav>
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-3">
              <li><a href="#" className="block hover:text-blue-200">Home</a></li>
              <li><a href="#" className="block hover:text-blue-200">About Us</a></li>
              <li><a href="#" className="block hover:text-blue-200">Academics</a></li>
              <li><a href="#" className="block hover:text-blue-200">Admissions</a></li>
              <li><a href="#" className="block hover:text-blue-200">Gallery</a></li>
              <li><a href="#" className="block hover:text-blue-200">Blog</a></li>
              <li><a href="#" className="block hover:text-blue-200">Contact</a></li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <button className="px-4 py-2 border border-white rounded hover:bg-blue-600 transition">
                Log In
              </button>
              <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-400 transition">
                Register
              </button>
            </div>
          </div>
        )}
      </header>
      
      {/* Hero Section */}
      <section className="relative bg-blue-800 text-white py-16 w-full px-4">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Voroni Primary School</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Nurturing young minds for a brighter future in Kwale County</p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-400 transition font-bold">
              Apply for Admission
            </button>
            <button className="px-6 py-3 border-2 border-white rounded-md hover:bg-white hover:text-blue-800 transition font-bold">
              Learn More
            </button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-white w-full px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src="/api/placeholder/600/400" alt="Voroni Primary School" className="rounded-lg shadow-md w-full" />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">About Our School</h2>
            <p className="mb-4">
              Founded in 1998, Voroni Primary School is a center of excellence in primary education located in the heart 
              of Kwale County. We provide quality education to children from ages 6 to 14 in a nurturing and stimulating 
              environment.
            </p>
            <p className="mb-6">
              Our dedicated team of qualified teachers is committed to helping each child reach their full potential 
              through a balanced curriculum that focuses on academic excellence, character development, and 
              extracurricular activities.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-700 mb-2">Qualified Teachers</h3>
                <p>Experienced educators dedicated to student success</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-700 mb-2">Modern Facilities</h3>
                <p>Well-equipped classrooms and play areas</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-700 mb-2">Holistic Education</h3>
                <p>Focus on academic, social, and physical development</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-700 mb-2">Safe Environment</h3>
                <p>Secure and child-friendly campus</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-blue-50 w-full px-4 text-center">
        <h2 className="text-3xl font-bold mb-2 text-blue-700">Why Choose Voroni Primary School?</h2>
        <p className="mb-12 max-w-3xl mx-auto">Our school offers numerous advantages that make it the perfect place for your child's educational journey</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-500 text-4xl mb-4">
              <i className="fas fa-book-reader"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Academic Excellence</h3>
            <p>Our curriculum is designed to challenge students while fostering a love for learning. We consistently achieve outstanding results in national examinations.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-500 text-4xl mb-4">
              <i className="fas fa-users"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Small Class Sizes</h3>
            <p>With smaller student-to-teacher ratios, we ensure each child receives personalized attention to thrive academically and socially.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-500 text-4xl mb-4">
              <i className="fas fa-palette"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Arts & Sports</h3>
            <p>We emphasize the importance of extracurricular activities through robust arts, music, and sports programs that develop well-rounded individuals.</p>
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-16 bg-white w-full px-4">
        <h2 className="text-3xl font-bold mb-2 text-blue-700 text-center">School Blog</h2>
        <p className="mb-12 text-center max-w-3xl mx-auto">Stay updated with the latest news, events, and achievements from our school community</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="relative w-full h-48">
              <Image 
                src="/images/Kwale.png"
                alt="Kwale County Science Fair"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div className="p-6">
              <p className="text-blue-600 text-sm mb-2">May 10, 2024</p>
              <h3 className="text-xl font-bold mb-3">Our Students Excel in County Science Fair</h3>
              <p className="mb-4">We are proud to announce that our students won several top awards at this year's Kwale County Science Fair, showcasing their innovative projects...</p>
              <a href="#" className="text-blue-700 font-bold hover:text-blue-500">Read More →</a>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <img src="/api/placeholder/400/250" alt="Blog post" className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-blue-600 text-sm mb-2">April 22, 2024</p>
              <h3 className="text-xl font-bold mb-3">New Library Resources for Enhanced Learning</h3>
              <p className="mb-4">Thanks to generous donations from our community partners, we've expanded our library with hundreds of new books and digital resources...</p>
              <a href="#" className="text-blue-700 font-bold hover:text-blue-500">Read More →</a>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <img src="/api/placeholder/400/250" alt="Blog post" className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-blue-600 text-sm mb-2">March 15, 2024</p>
              <h3 className="text-xl font-bold mb-3">Why Primary Education Matters</h3>
              <p className="mb-4">Primary education forms the foundation of a child's academic journey. At Voroni, we focus on building strong fundamentals and essential life skills...</p>
              <a href="#" className="text-blue-700 font-bold hover:text-blue-500">Read More →</a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <a href="#" className="inline-block px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition">View All Blog Posts</a>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-blue-700 py-16 text-white text-center w-full px-4">
        <h2 className="text-3xl font-bold mb-4">Join Voroni Primary School Today</h2>
        <p className="mb-8 max-w-3xl mx-auto text-lg">
          Give your child the gift of quality education in a nurturing environment. 
          Applications for the next academic year are now open.
        </p>
        <button className="px-8 py-3 bg-white text-blue-700 rounded-md hover:bg-blue-100 transition font-bold text-lg">
          Apply Now
        </button>
      </section>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-white pt-12 pb-6 w-full px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Voroni Primary School</h3>
            <p className="mb-4">Providing quality primary education in Kwale County since 1998.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-300">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-300">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://wa.me/254704548982" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTI0LDRDMTIuOTU0LDQsNCwxMi45NTQsNCwyNGMwLDMuMzA3LDAuODMsNi40MTgsMi4yODcsOS4xNjZsLTEuNTM5LDcuMDE3YzAuMTkxLDAuODY2LDAuMTEsOS45MTYsMC4xMSw5LjkxNmMwLjQ4NCwwLjk3NywxLjY3MSwxLjIxNywyLjQzMywwLjUxOEw0LjEsMzUuNzkxYzAsMCw2LjA2OCw2LjA0NywxMC41NzU2LDYuMDQ3QzM1LjA0Niw0MS44MzgsNDQsMzIuODg0LDQ0LDI0QzQ0LDEyLjk1NCwzNS4wNDYsNCwyNCw0eiIvPjxwYXRoIGZpbGw9IiMyNWQzNjYiIGQ9Ik0zNS4wNzYsMzAuMTJjMCwwLTIuMDI5LTEuMDMtMy4zMjktMS43NTVsLTAuNTE0LTAuMjk3Yy0xLjA3LTAuNS0xLjgyOC0wLjI1NC0yLjI3OSwwLjMyOGwtMS4yNzksMS43ODdjLTAuNjQ0LDAuNjczLTEuNDc3LDAuNjQxLTEuNDc3LDAuNjQxYy0zLjI0MS0wLjgyNy01LjM4Ni0zLjA3OC02LjYxNS00LjY4NnMtMS45ODgtNC4wMDUtMS45ODgtNC4wMDVjMCwwLTAuMDkxLTAuODEyLDAuNTc5LTEuNDEzbDEuNzItMS4xNTNjMC42MjEtMC40NDksMC44MjctMS4yMTcsMC4zMjMtMi4yMjlsLTAuMjMzLTAuNDY4Yy0wLjY3My0xLjM3LTEuNTg2LTMuNDEtMS41ODYtMy40MWMtMC40NjgtMC45MzUtMS4zMzQtMS4yODItMi4xNDgtMC44NTJjLTAuNzExLDAuMzc1LTEuNDEzLDAuODc2LTEuOTg4LDEuNDc3Yy0wLjUyNywwLjU1LTEuMDcxLDEuMDk4LTEuNTQxLDIuMDk0Yy0wLjA4LDAuMTY5LTAuMTQyLDAuMzM0LTAuMTg3LDAuNWMtMC42NzMsMi4zNzQsMC40MjcsNS4xMjksMS44ODMsNy44OTFjMC44ODYsMS42NTEsMi4yODIsMy40NzksMy45MDQsNS4wODJzMy42MzgsMi45MzQsNS4yNjYsMy43ODRjMi44MDIsMS4yNDEsNS42NjQsMi4xOTksNy45ODcsMS40NzdjMC4xNjQtMC4wNSwwLjMyMi0wLjExNCwwLjQ4Ni0wLjE5N2MwLjk3Ny0wLjUxLDEuNTA4LTEuMTAyLDIuMDI5LTEuNjY1YzAuNTUtMC42MDEsMS4wMS0xLjMzNiwxLjM1My0yLjA2OUM0MS4yNjEsMzEuODI0LDM1Ljk4LDMwLjU3MywzNS4wNzYsMzAuMTJ6Ii8+PC9zdmc+"
                  alt="WhatsApp Icon"
                  className="inline-block w-6 h-6"
                />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300">Home</a></li>
              <li><a href="#" className="hover:text-blue-300">About Us</a></li>
              <li><a href="#" className="hover:text-blue-300">Admissions</a></li>
              <li><a href="#" className="hover:text-blue-300">Calendar</a></li>
              <li><a href="#" className="hover:text-blue-300">Parent Portal</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mr-3 mt-1"></i>
                <span>Voroni Primary School, Kwale County, Kenya</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-3"></i>
                <span>+254 704 548 982</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3"></i>
                <span>info@voroniprimary.ac.ke</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">School Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>7:30 AM - 3:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>8:00 AM - 12:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday & Holidays:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Voroni Primary School. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}