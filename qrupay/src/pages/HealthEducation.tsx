import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Apple, 
  Droplets, 
  Heart, 
  Activity, 
  Clock, 
  Target, 
  BookOpen,
  Utensils,
  Ban,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Header } from "@/components/Header";

const nutritionTips = [
  {
    category: 'Fruits & Vegetables',
    icon: <Apple className="w-6 h-6" />,
    color: 'bg-green-500',
    tips: [
      {
        title: 'Eat the Rainbow',
        description: 'Consume 5-9 servings of colorful fruits and vegetables daily',
        benefits: ['Rich in vitamins', 'High in fiber', 'Antioxidant protection'],
        examples: ['Berries', 'Leafy greens', 'Orange vegetables', 'Citrus fruits']
      },
      {
        title: 'Seasonal Eating',
        description: 'Choose seasonal, local produce when possible',
        benefits: ['Maximum nutrition', 'Better taste', 'Lower cost'],
        examples: ['Spring: asparagus, strawberries', 'Summer: tomatoes, berries', 'Fall: squash, apples']
      }
    ]
  },
  {
    category: 'Hydration',
    icon: <Droplets className="w-6 h-6" />,
    color: 'bg-blue-500',
    tips: [
      {
        title: 'Daily Water Intake',
        description: 'Drink 8-10 glasses of water daily (64-80 oz)',
        benefits: ['Improved energy', 'Better skin', 'Enhanced brain function'],
        examples: ['Start with water upon waking', 'Drink before meals', 'Carry a water bottle']
      },
      {
        title: 'Hydrating Foods',
        description: 'Include water-rich foods in your diet',
        benefits: ['Additional hydration', 'Extra nutrients', 'Feeling fuller'],
        examples: ['Watermelon', 'Cucumber', 'Lettuce', 'Soup']
      }
    ]
  },
  {
    category: 'Heart Health',
    icon: <Heart className="w-6 h-6" />,
    color: 'bg-red-500',
    tips: [
      {
        title: 'Omega-3 Fatty Acids',
        description: 'Include healthy fats for cardiovascular health',
        benefits: ['Reduced inflammation', 'Lower cholesterol', 'Heart protection'],
        examples: ['Salmon', 'Walnuts', 'Chia seeds', 'Avocado']
      },
      {
        title: 'Limit Sodium',
        description: 'Keep sodium intake under 2,300mg daily',
        benefits: ['Lower blood pressure', 'Reduced bloating', 'Heart protection'],
        examples: ['Use herbs/spices', 'Read food labels', 'Choose fresh over processed']
      }
    ]
  }
];

const foodsToAvoid = [
  {
    category: 'Processed Foods',
    icon: <Ban className="w-6 h-6" />,
    items: [
      {
        food: 'Fast Food Burgers',
        reason: 'High in trans fats, sodium, and calories',
        healthyAlternative: 'Homemade lean turkey burger with whole grain bun',
        impact: 'Increases risk of heart disease and obesity'
      },
      {
        food: 'Packaged Snacks',
        reason: 'High in preservatives, artificial flavors, and empty calories',
        healthyAlternative: 'Fresh fruits, nuts, or homemade trail mix',
        impact: 'Can lead to nutrient deficiencies and weight gain'
      },
      {
        food: 'Sugary Drinks',
        reason: 'High in added sugars with no nutritional value',
        healthyAlternative: 'Water with lemon, herbal tea, or sparkling water',
        impact: 'Increases diabetes and obesity risk'
      }
    ]
  },
  {
    category: 'High Sugar Foods',
    icon: <AlertCircle className="w-6 h-6" />,
    items: [
      {
        food: 'Candy & Sweets',
        reason: 'Pure sugar causes blood sugar spikes',
        healthyAlternative: 'Dark chocolate (70% cacao) or fresh fruit',
        impact: 'Can cause energy crashes and dental problems'
      },
      {
        food: 'Pastries & Donuts',
        reason: 'High in sugar, trans fats, and refined flour',
        healthyAlternative: 'Whole grain muffins with fruit',
        impact: 'Contributes to inflammation and weight gain'
      }
    ]
  }
];

const mealPlanning = {
  breakfast: [
    {
      option: 'Power Bowl',
      ingredients: ['Oatmeal', 'Berries', 'Nuts', 'Greek yogurt'],
      benefits: 'High fiber, protein, and antioxidants',
      prepTime: '5 minutes'
    },
    {
      option: 'Green Smoothie',
      ingredients: ['Spinach', 'Banana', 'Protein powder', 'Almond milk'],
      benefits: 'Vitamins, minerals, and easy digestion',
      prepTime: '3 minutes'
    }
  ],
  lunch: [
    {
      option: 'Rainbow Salad',
      ingredients: ['Mixed greens', 'Colorful vegetables', 'Lean protein', 'Olive oil dressing'],
      benefits: 'Complete nutrition and sustained energy',
      prepTime: '10 minutes'
    },
    {
      option: 'Quinoa Bowl',
      ingredients: ['Quinoa', 'Roasted vegetables', 'Chickpeas', 'Tahini'],
      benefits: 'Complete protein and complex carbs',
      prepTime: '15 minutes'
    }
  ],
  dinner: [
    {
      option: 'Baked Salmon',
      ingredients: ['Salmon fillet', 'Steamed broccoli', 'Sweet potato', 'Herbs'],
      benefits: 'Omega-3s, fiber, and vitamins',
      prepTime: '25 minutes'
    },
    {
      option: 'Veggie Stir-fry',
      ingredients: ['Mixed vegetables', 'Tofu/chicken', 'Brown rice', 'Ginger'],
      benefits: 'Balanced macro and micronutrients',
      prepTime: '20 minutes'
    }
  ]
};

const HealthEducation = () => {
  const [selectedTab, setSelectedTab] = useState('nutrition');
  const [completedTips, setCompletedTips] = useState<string[]>([]);

  const toggleTipCompletion = (tipId: string) => {
    setCompletedTips(prev => 
      prev.includes(tipId) 
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent/20">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-medical mb-4">
            📚 Health Education Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn about nutrition, healthy eating habits, and lifestyle choices 
            for optimal health and wellness.
          </p>
        </div>

        {/* Progress Tracker */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-6 h-6 text-medical" />
              <span>Your Health Learning Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tips Completed</span>
                <span>{completedTips.length}/12</span>
              </div>
              <Progress value={(completedTips.length / 12) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="nutrition" className="flex items-center space-x-2">
              <Utensils className="w-4 h-4" />
              <span>Nutrition</span>
            </TabsTrigger>
            <TabsTrigger value="avoid" className="flex items-center space-x-2">
              <Ban className="w-4 h-4" />
              <span>Foods to Avoid</span>
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Meal Planning</span>
            </TabsTrigger>
            <TabsTrigger value="habits" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Healthy Habits</span>
            </TabsTrigger>
          </TabsList>

          {/* Nutrition Tips */}
          <TabsContent value="nutrition">
            <div className="grid gap-6">
              {nutritionTips.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.color} text-white`}>
                        {category.icon}
                      </div>
                      <span>{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {category.tips.map((tip, tipIndex) => {
                        const tipId = `${categoryIndex}-${tipIndex}`;
                        const isCompleted = completedTips.includes(tipId);
                        
                        return (
                          <Card key={tipIndex} className={`border transition-all ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{tip.title}</CardTitle>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleTipCompletion(tipId)}
                                  className={isCompleted ? 'text-green-600' : 'text-gray-400'}
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </Button>
                              </div>
                              <CardDescription>{tip.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div>
                                  <h5 className="font-semibold text-medical mb-1">Benefits:</h5>
                                  <ul className="text-sm space-y-1">
                                    {tip.benefits.map((benefit, idx) => (
                                      <li key={idx} className="flex items-center space-x-2">
                                        <CheckCircle className="w-3 h-3 text-green-500" />
                                        <span>{benefit}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-medical mb-1">Examples:</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {tip.examples.map((example, idx) => (
                                      <Badge key={idx} variant="secondary" className="text-xs">
                                        {example}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Foods to Avoid */}
          <TabsContent value="avoid">
            <div className="space-y-6">
              {foodsToAvoid.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-red-600">
                      {category.icon}
                      <span>{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <Card key={itemIndex} className="border-red-100">
                          <CardContent className="p-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold text-red-600 mb-2">{item.food}</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  <strong>Why to avoid:</strong> {item.reason}
                                </p>
                                <p className="text-sm text-red-500">
                                  <strong>Health impact:</strong> {item.impact}
                                </p>
                              </div>
                              <div className="bg-green-50 p-3 rounded-lg">
                                <h5 className="font-semibold text-green-600 mb-2">Healthy Alternative:</h5>
                                <p className="text-sm text-green-700">{item.healthyAlternative}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Meal Planning */}
          <TabsContent value="meals">
            <div className="grid gap-6">
              {Object.entries(mealPlanning).map(([mealType, meals]) => (
                <Card key={mealType}>
                  <CardHeader>
                    <CardTitle className="capitalize">{mealType} Ideas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {meals.map((meal, index) => (
                        <Card key={index} className="border-medical/20">
                          <CardHeader>
                            <CardTitle className="text-lg text-medical">{meal.option}</CardTitle>
                            <CardDescription>
                              <Clock className="w-4 h-4 inline mr-1" />
                              {meal.prepTime}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <h5 className="font-semibold mb-2">Ingredients:</h5>
                                <div className="flex flex-wrap gap-1">
                                  {meal.ingredients.map((ingredient, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {ingredient}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h5 className="font-semibold mb-1">Benefits:</h5>
                                <p className="text-sm text-muted-foreground">{meal.benefits}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Healthy Habits */}
          <TabsContent value="habits">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-6 h-6 text-medical" />
                    <span>Daily Habits</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Start your day with a glass of water',
                      'Take a 10-minute walk after meals',
                      'Eat mindfully without distractions',
                      'Include protein in every meal',
                      'Get 7-9 hours of quality sleep'
                    ].map((habit, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>{habit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-medical" />
                    <span>Weekly Goals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Try 2 new healthy recipes',
                      'Meal prep for 3 days',
                      'Exercise 150 minutes total',
                      'Limit processed foods to 2 servings',
                      'Drink 8 glasses of water daily'
                    ].map((goal, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Target className="w-5 h-5 text-medical" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Quick Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>💡 Quick Health Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      tip: 'Plate Method',
                      description: 'Fill half your plate with vegetables, 1/4 with lean protein, 1/4 with whole grains'
                    },
                    {
                      tip: 'Mindful Eating',
                      description: 'Chew slowly, put fork down between bites, and listen to hunger cues'
                    },
                    {
                      tip: 'Portion Control',
                      description: 'Use smaller plates, measure portions initially, and avoid eating from packages'
                    }
                  ].map((tip, index) => (
                    <Card key={index} className="bg-medical-light/20">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-medical mb-2">{tip.tip}</h4>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default HealthEducation;