import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Phone, AlertTriangle, Heart, Zap, Droplets, Shield } from 'lucide-react';
import { Header } from "@/components/Header";

const emergencyCategories = [
  {
    id: 'bites',
    title: 'Animal Bites & Stings',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-red-500',
    scenarios: [
      {
        type: 'Snake Bite',
        severity: 'Critical',
        steps: [
          'Call emergency services immediately (911)',
          'Keep victim calm and still',
          'Remove jewelry near bite area',
          'Mark swelling progression with pen',
          'DO NOT cut, suck, or apply ice',
          'Get to hospital ASAP for antivenom'
        ],
        timeframe: '0-5 minutes',
        warning: 'Never attempt to catch or identify the snake'
      },
      {
        type: 'Dog Bite',
        severity: 'Moderate',
        steps: [
          'Control bleeding with clean cloth',
          'Clean wound gently with water',
          'Apply antibiotic ointment',
          'Cover with sterile bandage',
          'Seek medical attention for tetanus shot',
          'Report to local authorities if unknown dog'
        ],
        timeframe: '0-30 minutes',
        warning: 'Watch for signs of infection over next 24-48 hours'
      },
      {
        type: 'Bee/Wasp Sting',
        severity: 'Mild-Severe',
        steps: [
          'Remove stinger by scraping (not pinching)',
          'Apply cold compress for 10-15 minutes',
          'Take antihistamine for swelling',
          'Monitor for allergic reaction signs',
          'Call 911 if severe swelling, difficulty breathing',
          'Apply topical pain relief if needed'
        ],
        timeframe: '0-15 minutes',
        warning: 'Seek emergency help if face/throat swelling occurs'
      }
    ]
  },
  {
    id: 'choking',
    title: 'Choking & Breathing',
    icon: <Droplets className="w-6 h-6" />,
    color: 'bg-blue-500',
    scenarios: [
      {
        type: 'Adult Choking',
        severity: 'Critical',
        steps: [
          'Ask "Are you choking?" - if cannot speak, act immediately',
          'Stand behind person, wrap arms around waist',
          'Make fist, place above navel below ribcage',
          'Grasp fist with other hand, thrust upward',
          'Continue until object expelled or person unconscious',
          'If unconscious, start CPR and call 911'
        ],
        timeframe: '0-3 minutes',
        warning: 'Time is critical - brain damage occurs after 4-6 minutes'
      },
      {
        type: 'Infant Choking (under 1 year)',
        severity: 'Critical',
        steps: [
          'Hold baby face down on your forearm',
          'Support head with your hand',
          'Give 5 back blows between shoulder blades',
          'Turn baby over, give 5 chest thrusts',
          'Check mouth, remove visible object',
          'Repeat until object expelled or baby unconscious'
        ],
        timeframe: '0-2 minutes',
        warning: 'Never use abdominal thrusts on infants'
      }
    ]
  },
  {
    id: 'cardiac',
    title: 'Heart Emergency',
    icon: <Heart className="w-6 h-6" />,
    color: 'bg-red-600',
    scenarios: [
      {
        type: 'Heart Attack',
        severity: 'Critical',
        steps: [
          'Call 911 immediately',
          'Have person sit down and rest',
          'Loosen tight clothing',
          'Give aspirin if not allergic (chew, dont swallow)',
          'Monitor breathing and pulse',
          'Be ready to perform CPR if needed'
        ],
        timeframe: '0-5 minutes',
        warning: 'Every minute counts - do not delay emergency call'
      },
      {
        type: 'CPR Adult',
        severity: 'Critical',
        steps: [
          'Check responsiveness - tap shoulders, shout',
          'Call 911 or have someone else call',
          'Place heel of hand on center of chest',
          'Push hard and fast 2 inches deep',
          'Rate: 100-120 compressions per minute',
          'Allow complete chest recoil between compressions'
        ],
        timeframe: 'Continuous until help arrives',
        warning: 'Do not stop CPR until emergency services arrive'
      }
    ]
  },
  {
    id: 'bleeding',
    title: 'Bleeding & Wounds',
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-orange-500',
    scenarios: [
      {
        type: 'Severe Bleeding',
        severity: 'Critical',
        steps: [
          'Call 911 for severe bleeding',
          'Apply direct pressure with clean cloth',
          'Do not remove cloth if soaked - add more on top',
          'Elevate wounded area above heart if possible',
          'Apply pressure to pressure points if needed',
          'Treat for shock - keep person warm and calm'
        ],
        timeframe: '0-10 minutes',
        warning: 'Loss of consciousness indicates severe blood loss'
      },
      {
        type: 'Deep Cut',
        severity: 'Moderate',
        steps: [
          'Clean your hands first',
          'Apply direct pressure to stop bleeding',
          'Clean wound gently with water',
          'Apply antibiotic ointment',
          'Cover with sterile bandage',
          'Seek medical attention if deep or gaping'
        ],
        timeframe: '0-20 minutes',
        warning: 'Seek medical help if bleeding does not stop'
      }
    ]
  }
];

const FirstAid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('bites');

  const filteredScenarios = emergencyCategories
    .find(cat => cat.id === selectedCategory)
    ?.scenarios.filter(scenario =>
      scenario.type.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'Moderate': return 'bg-orange-500';
      case 'Mild-Severe': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent/20">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-medical mb-4">
            🚑 Emergency First Aid Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quick, life-saving instructions for common emergency situations. 
            Time is critical - follow these steps immediately.
          </p>
        </div>

        {/* Emergency Contact Banner */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4 text-red-800">
              <Phone className="w-8 h-8" />
              <div className="text-center">
                <h3 className="text-2xl font-bold">Emergency: 911</h3>
                <p className="text-sm">Call immediately for life-threatening situations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search emergency type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {emergencyCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                {category.icon}
                <span className="hidden sm:inline">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {emergencyCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid gap-6">
                {filteredScenarios.map((scenario, index) => (
                  <Card key={index} className="border-l-4 border-l-medical">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-3">
                          <AlertTriangle className="w-6 h-6 text-medical" />
                          <span>{scenario.type}</span>
                        </CardTitle>
                        <Badge className={`${getSeverityColor(scenario.severity)} text-white`}>
                          {scenario.severity}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center space-x-4">
                        <span>⏱️ Action needed: {scenario.timeframe}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-medical mb-2">Step-by-Step Instructions:</h4>
                          <ol className="space-y-2">
                            {scenario.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start space-x-3">
                                <span className="bg-medical text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                                  {stepIndex + 1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                            <div>
                              <h5 className="font-semibold text-red-800">Critical Warning:</h5>
                              <p className="text-red-700">{scenario.warning}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Disclaimer */}
        <Card className="mt-12 bg-gray-50 border-gray-200">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Medical Disclaimer</h3>
            <p className="text-sm text-gray-600">
              This guide provides basic first aid information and should not replace professional medical training. 
              Always call emergency services for serious injuries or if you're unsure about the severity of a situation.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FirstAid;