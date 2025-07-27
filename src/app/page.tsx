'use client';

import Link from 'next/link';
import { Coffee, Utensils, ShoppingCart, ChevronRight, Check, Zap, BarChart2, Users, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-yellow-200 to-orange-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center space-x-2 mb-6"
          >
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-full">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <div className="flex space-x-1">
              <Utensils className="w-6 h-6 text-orange-500" />
              <ShoppingCart className="w-6 h-6 text-amber-500" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-800"
          >
            Revolutionize Your <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Restaurant</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
          >
            The all-in-one solution for inventory management, point of sale, and customer analytics designed specifically for food & beverage businesses.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/login"
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all font-medium shadow-md hover:shadow-lg flex items-center justify-center"
            >
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="bg-white text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-medium shadow-md hover:shadow-lg border border-gray-200"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to run your restaurant efficiently</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-orange-500" />,
                title: "Real-time Inventory",
                description: "Track stock levels, get low-stock alerts, and manage suppliers all in one place."
              },
              {
                icon: <ShoppingCart className="w-8 h-8 text-amber-500" />,
                title: "Smart POS System",
                description: "Process orders quickly with our intuitive point of sale interface."
              },
              {
                icon: <BarChart2 className="w-8 h-8 text-yellow-500" />,
                title: "Sales Analytics",
                description: "Understand your best-selling items and optimize your menu."
              },
              {
                icon: <Users className="w-8 h-8 text-orange-400" />,
                title: "Customer Management",
                description: "Track customer preferences and build loyalty programs."
              },
              {
                icon: <Clock className="w-8 h-8 text-amber-400" />,
                title: "Shift Scheduling",
                description: "Easily manage staff schedules and track hours worked."
              },
              {
                icon: <Shield className="w-8 h-8 text-yellow-400" />,
                title: "Security & Compliance",
                description: "Enterprise-grade security to protect your business data."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Simple Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that fits your business needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                description: "Perfect for small cafes and food trucks",
                features: ["Up to 2 locations", "Basic inventory", "Standard POS", "Email support"]
              },
              {
                name: "Professional",
                price: "$79",
                period: "/month",
                description: "Ideal for growing restaurants",
                features: ["Up to 5 locations", "Advanced analytics", "Staff management", "Priority support"],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For large restaurant chains",
                features: ["Unlimited locations", "Dedicated account manager", "API access", "24/7 support"]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-2 ${plan.popular ? 'border-orange-500 relative' : 'border-transparent'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block text-center py-3 px-6 rounded-lg font-medium transition-all ${plan.popular ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-orange-500 to-amber-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your restaurant?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of restaurants already using our platform to streamline their operations.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-medium shadow-md hover:shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="#features"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-medium"
            >
              See Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}