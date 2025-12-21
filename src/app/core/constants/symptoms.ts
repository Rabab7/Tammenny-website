

export const SYMPTOM_SPECIALTY_MAP = new Map<string, string>([
 // Cardiology
  ['chest pain', 'Cardiology'],
  ['shortness of breath', 'Cardiology'],
  ['irregular heartbeat', 'Cardiology'],
  ['high blood pressure', 'Cardiology'] ,

   // Neurology
  ['headache', 'Neurology'],
  ['dizziness', 'Neurology'],
  ['seizures', 'Neurology'],
  ['memory loss', 'Neurology'],

   // Hepatology
  ['jaundice', 'Hepatology'],
  ['abdominal pain', 'Hepatology'],
  ['dark urine', 'Hepatology'],
  ['liver pain', 'Hepatology'],

   // Pediatrics
  ['fever', 'Pediatrics'],
  ['vomiting', 'Pediatrics'],
  ['loss of appetite', 'Pediatrics'],
  ['child cough', 'Pediatrics'],

   // Eyecare
  ['blurred vision', 'Eyecare'],
  ['eye redness', 'Eyecare'],
  ['eye pain', 'Eyecare'],
  ['dry eyes', 'Eyecare'],

   // Physical Therapy
  ['muscle pain', 'Physical Therapy'],
  ['joint stiffness', 'Physical Therapy'],
  ['back pain', 'Physical Therapy'],
  ['post surgery rehab', 'Physical Therapy'],


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