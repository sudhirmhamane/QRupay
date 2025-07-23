import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Heart, Save, ArrowLeft } from 'lucide-react';

const ProfileEdit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [formData, setFormData] = useState({
    blood_group: '',
    allergies: '',
    chronic_conditions: '',
    medications: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relation: '',
    additional_notes: '',
    gender: '',
    age: '',
    address: '',
    weight: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchMedicalProfile();
  }, [user, navigate]);

  const fetchMedicalProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('medical_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        // Use type assertion to allow extra fields like 'gender' and 'address'
        const profile = data as typeof data & { gender?: string; age?: number; weight?: string; address?: string };
        setFormData({
          blood_group: profile.blood_group || '',
          allergies: profile.allergies || '',
          chronic_conditions: profile.chronic_conditions || '',
          medications: profile.medications || '',
          emergency_contact_name: profile.emergency_contact_name || '',
          emergency_contact_phone: profile.emergency_contact_phone || '',
          emergency_contact_relation: profile.emergency_contact_relation || '',
          additional_notes: profile.additional_notes || '',
          gender: profile.gender || '',
          age: profile.age ? String(profile.age) : '',
          address: profile.address || '',
          weight: profile.weight ? String(profile.weight) : '',
        });
      }
    } catch (error: any) {
      console.error('Error fetching medical profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.emergency_contact_name || !formData.emergency_contact_phone) {
        toast({
          title: 'Error',
          description: 'Emergency contact name and phone are required',
          variant: 'destructive'
        });
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from('medical_profiles')
        .upsert({
          user_id: user?.id,
          ...formData,
          age: formData.age ? parseInt(formData.age) : null,
          weight: formData.weight ? parseFloat(formData.weight) : null
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Medical profile saved successfully!'
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error saving medical profile:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save medical profile',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              size="sm"
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-medical-primary" />
              <h1 className="text-xl font-bold text-medical-dark">Edit Medical Profile</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Blood Group */}
                <div className="space-y-2">
                  <Label htmlFor="blood_group">Blood Group</Label>
                  <Select
                    value={formData.blood_group}
                    onValueChange={(value) => handleInputChange('blood_group', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Emergency Contact Name */}
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_name">Emergency Contact Name *</Label>
                  <Input
                    id="emergency_contact_name"
                    type="text"
                    value={formData.emergency_contact_name}
                    onChange={(e) => handleInputChange('emergency_contact_name', e.target.value)}
                    required
                    placeholder="Full name of emergency contact"
                  />
                </div>

                {/* Emergency Contact Phone */}
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_phone">Emergency Contact Phone *</Label>
                  <Input
                    id="emergency_contact_phone"
                    type="tel"
                    value={formData.emergency_contact_phone}
                    onChange={(e) => handleInputChange('emergency_contact_phone', e.target.value)}
                    required
                    placeholder="Phone number"
                  />
                </div>

                {/* Emergency Contact Relation */}
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_relation">Relationship</Label>
                  <Input
                    id="emergency_contact_relation"
                    type="text"
                    value={formData.emergency_contact_relation}
                    onChange={(e) => handleInputChange('emergency_contact_relation', e.target.value)}
                    placeholder="e.g., Spouse, Parent, Sibling"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min={0}
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter your age"
                  />
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min={0}
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="Enter your weight"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your address"
                    rows={2}
                  />
                </div>
              </div>

              {/* Allergies */}
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  placeholder="List any known allergies (medications, food, environmental)"
                  rows={3}
                />
              </div>

              {/* Chronic Conditions */}
              <div className="space-y-2">
                <Label htmlFor="chronic_conditions">Chronic Conditions</Label>
                <Textarea
                  id="chronic_conditions"
                  value={formData.chronic_conditions}
                  onChange={(e) => handleInputChange('chronic_conditions', e.target.value)}
                  placeholder="List any chronic medical conditions"
                  rows={3}
                />
              </div>

              {/* Current Medications */}
              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  value={formData.medications}
                  onChange={(e) => handleInputChange('medications', e.target.value)}
                  placeholder="List current medications and dosages"
                  rows={3}
                />
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="additional_notes">Additional Notes</Label>
                <Textarea
                  id="additional_notes"
                  value={formData.additional_notes}
                  onChange={(e) => handleInputChange('additional_notes', e.target.value)}
                  placeholder="Any other important medical information for emergency responders"
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                variant="medical"
                className="w-full flex items-center gap-2"
                disabled={loading}
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Medical Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfileEdit;