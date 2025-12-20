// src/app/core/constants/symptoms.ts (أنشئي هذا الملف)

export const SYMPTOM_SPECIALTY_MAP = new Map<string, string>([
 ['headache', 'Neurology'],
 ['chest pain', 'Cardiology'],
 ['fever', 'Pediatrics'],
 ['cough', 'Pediatrics'],
 ['bone', 'Orthopedics'],
 ['fracture', 'Orthopedics'],
]);

/**
 
 * @param symptomsInput 
 * @returns 
 */
export function suggestSpecialty(symptomsInput: string): string | null {
 if (!symptomsInput) return null;
 
 const normalizedInput = symptomsInput.toLowerCase();
 
 for (const [symptomKey, specialty] of SYMPTOM_SPECIALTY_MAP.entries()) {
  if (normalizedInput.includes(symptomKey)) {
   return specialty;
  }
 }
 
 return ' No matching specialty was found. Please consult a general practitioner or choose a doctor who specializes in your symptoms.' ; // * no match found
}