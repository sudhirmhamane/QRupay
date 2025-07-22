import { useEffect, useState } from 'react';
import { getMedications, addMedication, updateMedication, deleteMedication } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Database } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye, Pencil, Trash2, X, FileText } from 'lucide-react';
import { Header } from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  name: '',
  dosage: '',
  frequency: '',
  time: ['08:00'],
  start_date: '',
  end_date: '',
  notes: '',
};

type Medication = Database['public']['Tables']['medications']['Row'];

export default function MedicationReminders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewMed, setPreviewMed] = useState<Medication | null>(null);

  useEffect(() => {
    if (user) {
      getMedications(user.id).then(({ data }) => setMedications(data || []));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    if (editingId) {
      // Update
      const { error } = await updateMedication(editingId, {
        ...form,
        time: form.time,
        end_date: form.end_date || null,
        notes: form.notes || null,
        dosage: form.dosage || null,
      });
      setLoading(false);
      if (!error) {
        setForm(initialForm);
        setEditingId(null);
        getMedications(user.id).then(({ data }) => setMedications(data || []));
      } else {
        alert('Error updating medication: ' + error.message);
      }
    } else {
      // Add
      const { error } = await addMedication({
        ...form,
        user_id: user.id,
        time: form.time,
        start_date: form.start_date,
        end_date: form.end_date || null,
        notes: form.notes || null,
        dosage: form.dosage || null,
        created_at: new Date().toISOString(),
      });
      setLoading(false);
      if (!error) {
        setForm(initialForm);
        getMedications(user.id).then(({ data }) => setMedications(data || []));
      } else {
        alert('Error adding medication: ' + error.message);
      }
    }
  };

  const handleEdit = (med: Medication) => {
    setEditingId(med.id);
    setForm({
      name: med.name || '',
      dosage: med.dosage || '',
      frequency: med.frequency || '',
      time: med.time || ['08:00'],
      start_date: med.start_date || '',
      end_date: med.end_date || '',
      notes: med.notes || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    await deleteMedication(id);
    getMedications(user.id).then(({ data }) => setMedications(data || []));
    if (editingId === id) {
      setEditingId(null);
      setForm(initialForm);
    }
  };

  const handlePreview = (med: Medication) => {
    setPreviewMed(med);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-medical-dark">💊 Medication Reminders</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Form */}
          <div className="flex-1 min-w-[320px]">
            <div className="flex gap-2 mb-4">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>Dashboard</Button>
              <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
            </div>
            <Card className="mb-8 shadow-lg border-medical-primary/40">
              <CardHeader className="bg-medical-primary/10 rounded-t-lg">
                <CardTitle>{editingId ? 'Edit Medication' : 'Add a Medication'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddOrUpdate} className="space-y-4">
                  <Input name="name" value={form.name} onChange={handleChange} placeholder="Medication Name" required />
                  <Input name="dosage" value={form.dosage} onChange={handleChange} placeholder="Dosage (e.g. 500mg)" />
                  <Input name="frequency" value={form.frequency} onChange={handleChange} placeholder="Frequency (e.g. Once daily)" required />
                  <div className="flex gap-2 items-center">
                    <Input name="time" value={form.time[0]} onChange={e => setForm(f => ({ ...f, time: [e.target.value] }))} type="time" required className="w-40" />
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex gap-2 items-center">
                    <Input name="start_date" value={form.start_date} onChange={handleChange} type="date" required className="w-40" />
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex gap-2 items-center">
                    <Input name="end_date" value={form.end_date} onChange={handleChange} type="date" className="w-40" />
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <Textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes (optional)" />
                  <div className="flex gap-2">
                    <Button type="submit" className="w-full" disabled={loading} variant={editingId ? 'medical' : 'default'}>
                      {loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Medication' : 'Add Medication')}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline" onClick={handleCancelEdit} className="w-full">Cancel</Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          {/* Right: Medication List */}
          <div className="flex-1 min-w-[320px]">
            <h3 className="text-xl font-semibold mb-4 text-medical-dark">Your Medications</h3>
            {medications.length === 0 ? (
              <div className="text-center text-muted-foreground py-8 border rounded bg-white">No medications added yet.</div>
            ) : (
              <div className="space-y-4">
                {medications.map(med => (
                  <Card key={med.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border-l-4 border-medical-primary bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="destructive">{med.name}</Badge>
                        {med.dosage && <span className="text-sm text-gray-700">{med.dosage}</span>}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{med.frequency} at {med.time?.join(', ')}</div>
                      <div className="text-xs text-gray-500 mb-1">{med.start_date} to {med.end_date || 'Ongoing'}</div>
                      {med.notes && <div className="text-xs italic text-gray-700">{med.notes}</div>}
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0 ml-auto">
                      <Button onClick={() => handlePreview(med)} variant="outline" size="icon" title="Preview">
                        <Eye className="w-5 h-5 text-medical-primary" />
                      </Button>
                      <Button onClick={() => handleEdit(med)} variant="outline" size="icon" title="Edit">
                        <Pencil className="w-5 h-5 text-medical-primary" />
                      </Button>
                      <Button onClick={() => handleDelete(med.id)} variant="outline" size="icon" title="Delete">
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Preview Modal */}
        {previewMed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fade-in">
              <button className="absolute top-2 right-2" onClick={() => setPreviewMed(null)}>
                <X className="w-6 h-6 text-gray-400 hover:text-red-500" />
              </button>
              <h4 className="text-2xl font-bold mb-2 text-medical-primary flex items-center gap-2">
                <FileText className="w-6 h-6" /> {previewMed.name}
              </h4>
              <div className="mb-2 text-gray-700">{previewMed.dosage}</div>
              <div className="mb-2 text-gray-700">{previewMed.frequency} at {previewMed.time?.join(', ')}</div>
              <div className="mb-2 text-gray-500 text-sm">{previewMed.start_date} to {previewMed.end_date || 'Ongoing'}</div>
              {previewMed.notes && <div className="mb-2 italic text-gray-600">{previewMed.notes}</div>}
            </div>
          </div>
        )}
      </div>
    </>
  );
} 