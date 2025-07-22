import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Search, 
  Hospital, 
  Ambulance, 
  HeartHandshake,
  Stethoscope,
  Users,
  Shield
} from 'lucide-react';
import { Header } from "@/components/Header";

const emergencyServices = [
  {
    name: 'Emergency Medical Services (911)',
    type: 'emergency',
    phone: '911',
    description: 'Immediate emergency medical response for life-threatening situations',
    available: '24/7',
    responseTime: '8-12 minutes average',
    icon: <Ambulance className="w-8 h-8" />
  },
  {
    name: 'Poison Control Center',
    type: 'emergency',
    phone: '1-800-222-1222',
    description: 'Expert guidance for poisoning emergencies and toxic exposures',
    available: '24/7',
    responseTime: 'Immediate phone support',
    icon: <Shield className="w-8 h-8" />
  },
  {
    name: 'National Suicide Prevention Lifeline',
    type: 'crisis',
    phone: '988',
    description: 'Crisis support for mental health emergencies and suicide prevention',
    available: '24/7',
    responseTime: 'Immediate phone support',
    icon: <HeartHandshake className="w-8 h-8" />
  },
  {
    name: 'Crisis Text Line',
    type: 'crisis',
    phone: 'Text HOME to 741741',
    description: 'Text-based crisis support for mental health emergencies',
    available: '24/7',
    responseTime: 'Under 5 minutes',
    icon: <Users className="w-8 h-8" />
  }
];

const hospitalTypes = [
  {
    name: 'Emergency Rooms',
    description: 'For life-threatening conditions requiring immediate care',
    examples: ['Heart attack', 'Stroke', 'Severe trauma', 'Difficulty breathing'],
    waitTime: '0-4 hours',
    cost: '$$$',
    icon: <Hospital className="w-6 h-6" />
  },
  {
    name: 'Urgent Care Centers',
    description: 'For non-emergency conditions that need prompt attention',
    examples: ['Minor cuts', 'Sprains', 'Fever', 'UTIs'],
    waitTime: '15-60 minutes',
    cost: '$$',
    icon: <Stethoscope className="w-6 h-6" />
  },
  {
    name: 'Walk-in Clinics',
    description: 'For basic medical needs and routine care',
    examples: ['Cold symptoms', 'Vaccinations', 'Check-ups', 'Prescriptions'],
    waitTime: '10-30 minutes',
    cost: '$',
    icon: <Users className="w-6 h-6" />
  }
];

const sampleHospitals = [
  {
    name: 'Central Medical Center',
    type: 'Emergency Room',
    address: '123 Health Street, Medical District',
    phone: '(555) 123-4567',
    distance: '2.3 miles',
    rating: 4.5,
    specialties: ['Emergency Medicine', 'Trauma Care', 'Cardiology'],
    waitTime: '45 min',
    hasER: true
  },
  {
    name: 'QuickCare Urgent Center',
    type: 'Urgent Care',
    address: '456 Care Avenue, Downtown',
    phone: '(555) 987-6543',
    distance: '1.1 miles',
    rating: 4.2,
    specialties: ['General Medicine', 'Minor Surgery', 'Diagnostics'],
    waitTime: '20 min',
    hasER: false
  },
  {
    name: 'Family Health Clinic',
    type: 'Walk-in Clinic',
    address: '789 Wellness Blvd, Suburb',
    phone: '(555) 456-7890',
    distance: '3.7 miles',
    rating: 4.0,
    specialties: ['Primary Care', 'Preventive Medicine', 'Vaccinations'],
    waitTime: '15 min',
    hasER: false
  },
  {
    name: 'Metropolitan Hospital',
    type: 'Emergency Room',
    address: '321 Medical Plaza, City Center',
    phone: '(555) 234-5678',
    distance: '4.2 miles',
    rating: 4.7,
    specialties: ['Emergency Medicine', 'Surgery', 'ICU'],
    waitTime: '1 hr 15 min',
    hasER: true
  }
];

const healthResources = [
  {
    category: 'Telehealth Services',
    resources: [
      {
        name: 'Doctor on Demand',
        description: 'Video consultations with licensed physicians',
        cost: '$75-$200 per visit',
        availability: '24/7'
      },
      {
        name: 'Teladoc',
        description: 'Virtual healthcare for non-emergency conditions',
        cost: '$50-$150 per visit',
        availability: '24/7'
      }
    ]
  },
  {
    category: 'Mental Health',
    resources: [
      {
        name: 'BetterHelp',
        description: 'Online therapy and counseling services',
        cost: '$60-$90 per week',
        availability: 'Scheduled sessions'
      },
      {
        name: 'NAMI Support Groups',
        description: 'Free mental health support groups',
        cost: 'Free',
        availability: 'Weekly meetings'
      }
    ]
  },
  {
    category: 'Pharmacy Services',
    resources: [
      {
        name: '24-Hour Pharmacies',
        description: 'CVS, Walgreens locations with 24/7 service',
        cost: 'Varies by medication',
        availability: '24/7'
      },
      {
        name: 'GoodRx Discounts',
        description: 'Prescription drug discount program',
        cost: 'Free app, discounts vary',
        availability: 'Always'
      }
    ]
  }
];

const HealthServices = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredHospitals = sampleHospitals.filter(hospital => {
    if (selectedType === 'all') return true;
    return hospital.type.toLowerCase().includes(selectedType.toLowerCase());
  });

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'emergency room': return 'bg-red-500';
      case 'urgent care': return 'bg-orange-500';
      case 'walk-in clinic': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent/20">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-medical mb-4">
            🏥 Health Services Directory
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find emergency services, hospitals, clinics, and healthcare resources near you. 
            Get the right care at the right place and time.
          </p>
        </div>

        {/* Emergency Services Banner */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center space-x-2">
              <Ambulance className="w-6 h-6" />
              <span>Emergency Services - Call Immediately</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {emergencyServices.map((service, index) => (
                <Card key={index} className="border-red-300">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-red-600">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-800 mb-1">{service.name}</h4>
                        <Button 
                          className="bg-red-600 hover:bg-red-700 text-white mb-2 w-full"
                          onClick={() => window.open(`tel:${service.phone}`)}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          {service.phone}
                        </Button>
                        <p className="text-xs text-red-700 mb-1">{service.description}</p>
                        <p className="text-xs text-red-600">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {service.available}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Care Type Guide */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🏥 Where Should You Go?</CardTitle>
            <CardDescription>
              Choose the right type of healthcare facility based on your condition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {hospitalTypes.map((type, index) => (
                <Card key={index} className="border-medical/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-medical">
                      {type.icon}
                      <span>{type.name}</span>
                    </CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold mb-2">Common conditions:</h5>
                        <div className="flex flex-wrap gap-1">
                          {type.examples.map((example, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Wait time: <strong>{type.waitTime}</strong></span>
                        <span>Cost: <strong>{type.cost}</strong></span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hospital Finder */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-medical" />
              <span>Find Healthcare Facilities Near You</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Enter your location (e.g., zip code, city)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'emergency', 'urgent', 'clinic'].map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    onClick={() => setSelectedType(type)}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {filteredHospitals.map((hospital, index) => (
                <Card key={index} className="border-l-4 border-l-medical">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-medical mb-2">{hospital.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{hospital.address}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{hospital.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span>{hospital.distance} away</span>
                          <span>Current wait: {hospital.waitTime}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getTypeColor(hospital.type)} text-white mb-2`}>
                          {hospital.type}
                        </Badge>
                        {hospital.hasER && (
                          <Badge className="bg-red-500 text-white ml-2">
                            24/7 ER
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-semibold mb-2">Specialties:</h5>
                      <div className="flex flex-wrap gap-1">
                        {hospital.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button 
                        onClick={() => window.open(`tel:${hospital.phone}`)}
                        className="bg-medical hover:bg-medical-dark text-white"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(hospital.address)}`)}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Resources */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Additional Health Resources</CardTitle>
            <CardDescription>
              Alternative healthcare options and support services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {healthResources.map((category, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-medical mb-4">{category.category}</h3>
                  <div className="space-y-4">
                    {category.resources.map((resource, resourceIndex) => (
                      <Card key={resourceIndex} className="border-medical/20">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">{resource.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                          <div className="flex justify-between text-xs">
                            <span>Cost: <strong>{resource.cost}</strong></span>
                            <span>Available: <strong>{resource.availability}</strong></span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-8 bg-gray-50">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Important Notice</h3>
            <p className="text-sm text-gray-600">
              This directory provides general information about healthcare facilities and services. 
              Wait times, availability, and services may vary. Always call ahead to confirm current 
              information and availability. In case of emergency, call 911 immediately.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HealthServices;