'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Globe,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import universities from '@/data/universities.json';

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedField, setSelectedField] = useState('All');
  const [filteredUniversities, setFilteredUniversities] = useState(universities);

  const countries = ['All', ...new Set(universities.map((u) => u.country))];
  const fields = [
    'All',
    ...new Set(universities.flatMap((u) => u.fields)),
  ].sort();

  useEffect(() => {
    let filtered = universities;

    if (searchTerm) {
      filtered = filtered.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCountry !== 'All') {
      filtered = filtered.filter((uni) => uni.country === selectedCountry);
    }

    if (selectedField !== 'All') {
      filtered = filtered.filter((uni) => uni.fields.includes(selectedField));
    }

    setFilteredUniversities(filtered);
  }, [searchTerm, selectedCountry, selectedField]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold gradient-text mb-4">
              Top Universities Worldwide
            </h1>
            <p className="text-xl text-gray-600">
              Explore {universities.length} leading universities across the globe
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect p-6 rounded-2xl mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Country Filter */}
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country === 'All' ? 'All Countries' : country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
                >
                  {fields.map((field) => (
                    <option key={field} value={field}>
                      {field === 'All' ? 'All Fields' : field}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredUniversities.length} of {universities.length}{' '}
              universities
            </div>
          </motion.div>

          {/* Universities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((uni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-effect p-6 rounded-2xl hover:shadow-xl transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    #{uni.ranking}
                  </div>
                  <GraduationCap className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {uni.name}
                </h3>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Globe className="w-4 h-4" />
                  <span>{uni.country}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {uni.fields.slice(0, 3).map((field, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {field}
                    </span>
                  ))}
                  {uni.fields.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      +{uni.fields.length - 3} more
                    </span>
                  )}
                </div>

                <a
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-medium transition-colors"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No universities found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

