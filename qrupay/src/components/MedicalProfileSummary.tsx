import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Heart, Pill, Phone, User } from 'lucide-react';

interface MedicalProfile {
  id: string;
  blood_group: string | null;
  allergies: string | null;
  chronic_conditions: string | null;
  medications: string | null;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relation: string | null;
  additional_notes: string | null;
  gender?: string | null;
  age?: string | number | null;
  address?: string | null;
  weight?: string | number | null;
}

interface MedicalProfileSummaryProps {
  profile: MedicalProfile;
  compact?: boolean;
}

export const MedicalProfileSummary: React.FC<MedicalProfileSummaryProps> = ({ 
  profile, 
  compact = false 
}) => {
  if (compact) {
    return (
      <Card className="border-medical-primary/20">
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-medical-primary" />
                <span className="font-medium">{profile.emergency_contact_name}</span>
              </div>
              {profile.blood_group && (
                <Badge variant="destructive">{profile.blood_group}</Badge>
              )}
            </div>
            {/* Gender, Age, Weight, Address */}
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {profile.gender && <span>Gender: {profile.gender}</span>}
              {profile.age && <span>Age: {profile.age}</span>}
              {profile.weight && <span>Weight: {profile.weight} kg</span>}
              {profile.address && <span>Address: {profile.address}</span>}
            </div>
            {profile.allergies && (
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-destructive">Allergies</p>
                  <p className="text-sm text-muted-foreground">{profile.allergies}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Emergency Contact */}
      <Card className="border-medical-primary">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-medical-primary">
            <Phone className="w-5 h-5" />
            Emergency Contact Number
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">{profile.emergency_contact_name}</p>
              {profile.emergency_contact_relation && (
                <p className="text-muted-foreground">{profile.emergency_contact_relation}</p>
              )}
            </div>
            <p className="text-medical-primary font-medium">{profile.emergency_contact_phone}</p>
          </div>
        </CardContent>
      </Card>

      {/* Personal Details Section */}
      <Card className="border-medical-accent border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-medical-accent">
            <User className="w-5 h-5" />
            Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-6 text-base text-medical-dark font-medium">
            {profile.gender && (
              <div>
                <span className="block text-muted-foreground text-sm">Gender</span>
                <span>{profile.gender}</span>
              </div>
            )}
            {profile.age && (
              <div>
                <span className="block text-muted-foreground text-sm">Age</span>
                <span>{profile.age}</span>
              </div>
            )}
            {profile.weight && (
              <div>
                <span className="block text-muted-foreground text-sm">Weight</span>
                <span>{profile.weight} kg</span>
              </div>
            )}
            {profile.address && (
              <div className="w-full">
                <span className="block text-muted-foreground text-sm">Address</span>
                <span>{profile.address}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Medical Information Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Critical Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Critical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile.blood_group && (
              <div>
                <p className="text-sm text-muted-foreground">Blood Group</p>
                <Badge variant="destructive" className="text-base px-3 py-1">
                  {profile.blood_group}
                </Badge>
              </div>
            )}

            {profile.allergies && (
              <div>
                <p className="text-sm text-muted-foreground">Allergies</p>
                <div className="bg-destructive/10 border border-destructive/20 rounded p-2 mt-1">
                  <p className="text-sm font-medium text-destructive">⚠️ ALLERGIC TO:</p>
                  <p className="text-sm">{profile.allergies}</p>
                </div>
              </div>
            )}

            {profile.chronic_conditions && (
              <div>
                <p className="text-sm text-muted-foreground">Medical Conditions</p>
                <p className="text-sm bg-muted p-2 rounded mt-1">
                  {profile.chronic_conditions}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medications & Notes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Pill className="w-5 h-5" />
              Medications & Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile.medications && (
              <div>
                <p className="text-sm text-muted-foreground">Current Medications</p>
                <p className="text-sm bg-muted p-2 rounded mt-1">
                  {profile.medications}
                </p>
              </div>
            )}

            {profile.additional_notes && (
              <div>
                <p className="text-sm text-muted-foreground">Additional Notes</p>
                <p className="text-sm bg-muted p-2 rounded mt-1">
                  {profile.additional_notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
