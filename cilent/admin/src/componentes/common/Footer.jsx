import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">

          {/* Left side */}
          <div className="text-sm text-gray-300 mb-4 md:mb-0">
            © 2025 YourWebsite. All rights reserved.
          </div>

          {/* Right side - Links */}
          <div className="flex space-x-4 text-sm">
            Design By Sayeed Alam
          </div>
        </div>
      </div>
    </footer>
  )
}
