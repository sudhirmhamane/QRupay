import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Stethoscope, 
  AlertTriangle, 
  Phone, 
  Clock, 
  Heart, 
  Brain, 
  Thermometer,
  Activity,
  Eye,
  Ear
} from 'lucide-react';
import { Header } from "@/components/Header";

const symptomCategories = {
  general: {
    title: 'General Symptoms',
    icon: <Activity className="w-5 h-5" />,
    symptoms: [
      { id: 'fever', name: 'Fever', severity: 'moderate' },
      { id: 'fatigue', name: 'Fatigue/Tiredness', severity: 'mild' },
      { id: 'headache', name: 'Headache', severity: 'mild' },
      { id: 'dizziness', name: 'Dizziness', severity: 'moderate' },
      { id: 'weakness', name: 'General Weakness', severity: 'mild' },
      { id: 'chills', name: 'Chills', severity: 'mild' }
    ]
  },
  respiratory: {
    title: 'Respiratory',
    icon: <Activity className="w-5 h-5" />,
    symptoms: [
      { id: 'cough', name: 'Cough', severity: 'mild' },
      { id: 'shortness_breath', name: 'Shortness of Breath', severity: 'severe' },
      { id: 'chest_pain', name: 'Chest Pain', severity: 'severe' },
      { id: 'wheezing', name: 'Wheezing', severity: 'moderate' },
      { id: 'sore_throat', name: 'Sore Throat', severity: 'mild' },
      { id: 'runny_nose', name: 'Runny Nose', severity: 'mild' }
    ]
  },
  cardiovascular: {
    title: 'Heart & Circulation',
    icon: <Heart className="w-5 h-5" />,
    symptoms: [
      { id: 'chest_pressure', name: 'Chest Pressure', severity: 'severe' },
      { id: 'palpitations', name: 'Heart Palpitations', severity: 'moderate' },
      { id: 'swelling', name: 'Swelling in Legs/Feet', severity: 'moderate' },
      { id: 'rapid_heartbeat', name: 'Rapid Heartbeat', severity: 'moderate' },
      { id: 'irregular_heartbeat', name: 'Irregular Heartbeat', severity: 'severe' }
    ]
  },
  neurological: {
    title: 'Neurological',
    icon: <Brain className="w-5 h-5" />,
    symptoms: [
      { id: 'severe_headache', name: 'Severe Headache', severity: 'severe' },
      { id: 'confusion', name: 'Confusion', severity: 'severe' },
      { id: 'memory_loss', name: 'Memory Problems', severity: 'moderate' },
      { id: 'numbness', name: 'Numbness/Tingling', severity: 'moderate' },
      { id: 'vision_changes', name: 'Vision Changes', severity: 'severe' },
      { id: 'speech_difficulty', name: 'Difficulty Speaking', severity: 'severe' }
    ]
  },
  digestive: {
    title: 'Digestive',
    icon: <Activity className="w-5 h-5" />,
    symptoms: [
      { id: 'nausea', name: 'Nausea', severity: 'mild' },
      { id: 'vomiting', name: 'Vomiting', severity: 'moderate' },
      { id: 'diarrhea', name: 'Diarrhea', severity: 'mild' },
      { id: 'abdominal_pain', name: 'Abdominal Pain', severity: 'moderate' },
      { id: 'loss_appetite', name: 'Loss of Appetite', severity: 'mild' },
      { id: 'severe_abdominal_pain', name: 'Severe Abdominal Pain', severity: 'severe' }
    ]
  }
};

const emergencySymptoms = [
  'shortness_breath',
  'chest_pain',
  'chest_pressure',
  'severe_headache',
  'confusion',
  'vision_changes',
  'speech_difficulty',
  'irregular_heartbeat',
  'severe_abdominal_pain'
];

const conditionDatabase = {
  'common_cold': {
    name: 'Common Cold',
    probability: 'High',
    matchingSymptoms: ['runny_nose', 'sore_throat', 'cough', 'fatigue', 'headache'],
    description: 'A viral infection of the upper respiratory tract',
    recommendations: [
      'Rest and stay hydrated',
      'Use over-the-counter pain relievers if needed',
      'Gargle with salt water for sore throat',
      'Use a humidifier or breathe steam'
    ],
    whenToSeekHelp: 'If symptoms worsen or last more than 10 days'
  },
  'flu': {
    name: 'Influenza (Flu)',
    probability: 'High',
    matchingSymptoms: ['fever', 'fatigue', 'headache', 'cough', 'chills', 'weakness'],
    description: 'A viral infection that affects the respiratory system',
    recommendations: [
      'Rest and get plenty of sleep',
      'Drink lots of fluids',
      'Take fever reducers if needed',
      'Stay home to avoid spreading illness'
    ],
    whenToSeekHelp: 'If you have difficulty breathing, persistent fever, or severe symptoms'
  },
  'heart_attack': {
    name: 'Possible Heart Attack',
    probability: 'Emergency',
    matchingSymptoms: ['chest_pain', 'chest_pressure', 'shortness_breath', 'palpitations'],
    description: 'A medical emergency requiring immediate attention',
    recommendations: [
      'CALL 911 IMMEDIATELY',
      'Chew aspirin if not allergic',
      'Sit down and rest',
      'Do not drive yourself to hospital'
    ],
    whenToSeekHelp: 'SEEK EMERGENCY CARE NOW'
  },
  'stroke': {
    name: 'Possible Stroke',
    probability: 'Emergency',
    matchingSymptoms: ['severe_headache', 'confusion', 'vision_changes', 'speech_difficulty', 'numbness'],
    description: 'A medical emergency affecting blood flow to the brain',
    recommendations: [
      'CALL 911 IMMEDIATELY',
      'Note the time symptoms started',
      'Do not give food or water',
      'Keep person calm and lying down'
    ],
    whenToSeekHelp: 'SEEK EMERGENCY CARE NOW'
  },
  'gastroenteritis': {
    name: 'Gastroenteritis (Stomach Bug)',
    probability: 'Moderate',
    matchingSymptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever'],
    description: 'Inflammation of the stomach and intestines',
    recommendations: [
      'Stay hydrated with clear fluids',
      'Rest and avoid solid foods initially',
      'Gradually return to bland foods',
      'Wash hands frequently'
    ],
    whenToSeekHelp: 'If severe dehydration, blood in stool, or high fever occurs'
  }
};

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const analyzeSymptoms = () => {
    const hasEmergencySymptoms = selectedSymptoms.some(symptom => 
      emergencySymptoms.includes(symptom)
    );

    if (hasEmergencySymptoms) {
      setResults([conditionDatabase.heart_attack, conditionDatabase.stroke]);
      setShowResults(true);
      return;
    }

    const possibleConditions = [];
    
    // Check each condition for symptom matches
    Object.entries(conditionDatabase).forEach(([key, condition]) => {
      const matchCount = condition.matchingSymptoms.filter(symptom =>
        selectedSymptoms.includes(symptom)
      ).length;
      
      if (matchCount >= 2) {
        possibleConditions.push({
          ...condition,
          matchPercentage: (matchCount / condition.matchingSymptoms.length) * 100
        });
      }
    });

    // Sort by match percentage
    possibleConditions.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    setResults(possibleConditions);
    setShowResults(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'bg-red-500';
      case 'moderate': return 'bg-orange-500';
      case 'mild': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setCurrentStep(1);
    setShowResults(false);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent/20">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-medical mb-4">
            🩺 Symptom Checker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get preliminary health guidance based on your symptoms. 
            This tool provides general information and is not a substitute for professional medical advice.
          </p>
        </div>

        {/* Emergency Warning */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Emergency Warning:</strong> If you're experiencing severe chest pain, difficulty breathing, 
            sudden confusion, or other life-threatening symptoms, call 911 immediately.
          </AlertDescription>
        </Alert>

        {!showResults ? (
          <div className="space-y-8">
            {/* Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Symptom Assessment Progress</h3>
                  <span className="text-sm text-muted-foreground">
                    {selectedSymptoms.length} symptoms selected
                  </span>
                </div>
                <Progress value={Math.min((selectedSymptoms.length / 5) * 100, 100)} />
              </CardContent>
            </Card>

            {/* Symptom Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Stethoscope className="w-6 h-6 text-medical" />
                  <span>Select Your Symptoms</span>
                </CardTitle>
                <CardDescription>
                  Choose all symptoms you're currently experiencing. Select at least 2-3 symptoms for better assessment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-6">
                    {Object.entries(symptomCategories).map(([key, category]) => (
                      <TabsTrigger key={key} value={key} className="flex items-center space-x-1 text-xs">
                        {category.icon}
                        <span className="hidden sm:inline">{category.title}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(symptomCategories).map(([key, category]) => (
                    <TabsContent key={key} value={key}>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {category.symptoms.map((symptom) => (
                          <Card 
                            key={symptom.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              selectedSymptoms.includes(symptom.id) 
                                ? 'border-medical bg-medical-light/20' 
                                : 'border-gray-200'
                            }`}
                            onClick={() => handleSymptomToggle(symptom.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <Checkbox 
                                  checked={selectedSymptoms.includes(symptom.id)}
                                  onChange={() => {}}
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium">{symptom.name}</h4>
                                  <Badge 
                                    className={`${getSeverityColor(symptom.severity)} text-white text-xs mt-1`}
                                  >
                                    {symptom.severity}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="mt-8 flex justify-center">
                  <Button 
                    onClick={analyzeSymptoms}
                    disabled={selectedSymptoms.length < 1}
                    className="bg-medical hover:bg-medical-dark text-white"
                    size="lg"
                  >
                    Analyze Symptoms ({selectedSymptoms.length} selected)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Results */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-medical">Assessment Results</h2>
              <Button onClick={resetChecker} variant="outline">
                Start New Assessment
              </Button>
            </div>

            {results.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold mb-4">No Clear Match Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Your symptoms don't clearly match common conditions in our database. 
                    This doesn't mean nothing is wrong.
                  </p>
                  <Button variant="outline" onClick={() => window.open('tel:911')}>
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Healthcare Provider
                  </Button>
                </CardContent>
              </Card>
            ) : (
              results.map((condition, index) => (
                <Card key={index} className={`${
                  condition.probability === 'Emergency' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-medical/20'
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={`${
                        condition.probability === 'Emergency' ? 'text-red-600' : 'text-medical'
                      }`}>
                        {condition.name}
                      </CardTitle>
                      <Badge className={`${
                        condition.probability === 'Emergency' 
                          ? 'bg-red-500' 
                          : condition.probability === 'High'
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                      } text-white`}>
                        {condition.probability} Match
                      </Badge>
                    </div>
                    {condition.matchPercentage && (
                      <CardDescription>
                        {Math.round(condition.matchPercentage)}% symptom match
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{condition.description}</p>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Recommended Actions:</h4>
                        <ul className="space-y-1">
                          {condition.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-medical mt-1">•</span>
                              <span className={
                                rec.includes('911') || rec.includes('EMERGENCY') 
                                  ? 'text-red-600 font-semibold' 
                                  : ''
                              }>
                                {rec}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`p-3 rounded-lg ${
                        condition.probability === 'Emergency' 
                          ? 'bg-red-100 border border-red-200' 
                          : 'bg-blue-50 border border-blue-200'
                      }`}>
                        <div className="flex items-start space-x-2">
                          <Clock className={`w-5 h-5 mt-0.5 ${
                            condition.probability === 'Emergency' ? 'text-red-600' : 'text-blue-600'
                          }`} />
                          <div>
                            <h5 className={`font-semibold ${
                              condition.probability === 'Emergency' ? 'text-red-800' : 'text-blue-800'
                            }`}>
                              When to Seek Medical Help:
                            </h5>
                            <p className={`text-sm ${
                              condition.probability === 'Emergency' ? 'text-red-700' : 'text-blue-700'
                            }`}>
                              {condition.whenToSeekHelp}
                            </p>
                          </div>
                        </div>
                      </div>

                      {condition.probability === 'Emergency' && (
                        <div className="flex space-x-4">
                          <Button 
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => window.open('tel:911')}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call 911
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {/* Disclaimer */}
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-2">Important Medical Disclaimer</h3>
                <p className="text-sm text-gray-600">
                  This symptom checker is for informational purposes only and should not replace 
                  professional medical advice, diagnosis, or treatment. Always consult with a 
                  qualified healthcare provider for proper medical evaluation and care.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default SymptomChecker;