import type { Question } from "./types";

// ── PHYSICS (Grade 8-12) ─────────────────────────────────────────────────────

export const SCIENCE_PHYSICS: Question[] = [
  { id:"sph1", type:"mcq", title:"Newton's First Law states that an object at rest stays at rest unless acted upon by:", options:[{id:"a",text:"Gravity",isCorrect:false},{id:"b",text:"An unbalanced force",isCorrect:true},{id:"c",text:"Friction",isCorrect:false},{id:"d",text:"Momentum",isCorrect:false}], xpReward:10 },
  { id:"sph2", type:"mcq", title:"Force = Mass × ? (Newton's 2nd Law)", options:[{id:"a",text:"Velocity",isCorrect:false},{id:"b",text:"Speed",isCorrect:false},{id:"c",text:"Acceleration",isCorrect:true},{id:"d",text:"Distance",isCorrect:false}], xpReward:10 },
  { id:"sph3", type:"mcq", title:"The unit of force is:", options:[{id:"a",text:"Joule",isCorrect:false},{id:"b",text:"Newton",isCorrect:true},{id:"c",text:"Watt",isCorrect:false},{id:"d",text:"Pascal",isCorrect:false}], xpReward:10 },
  { id:"sph4", type:"mcq", title:"Speed = Distance ÷ Time. A car travels 180 km in 3 hours. Speed is?", options:[{id:"a",text:"50 km/h",isCorrect:false},{id:"b",text:"60 km/h",isCorrect:true},{id:"c",text:"70 km/h",isCorrect:false},{id:"d",text:"90 km/h",isCorrect:false}], xpReward:10 },
  { id:"sph5", type:"mcq", title:"Which of these is a scalar quantity?", options:[{id:"a",text:"Velocity",isCorrect:false},{id:"b",text:"Force",isCorrect:false},{id:"c",text:"Speed",isCorrect:true},{id:"d",text:"Displacement",isCorrect:false}], xpReward:10 },
  { id:"sph6", type:"mcq", title:"The unit of electrical resistance is:", options:[{id:"a",text:"Volt",isCorrect:false},{id:"b",text:"Ampere",isCorrect:false},{id:"c",text:"Ohm",isCorrect:true},{id:"d",text:"Watt",isCorrect:false}], xpReward:10 },
  { id:"sph7", type:"mcq", title:"Ohm's Law: V = ?", options:[{id:"a",text:"I + R",isCorrect:false},{id:"b",text:"I × R",isCorrect:true},{id:"c",text:"I ÷ R",isCorrect:false},{id:"d",text:"I - R",isCorrect:false}], xpReward:10 },
  { id:"sph8", type:"mcq", title:"The speed of light in a vacuum is approximately:", options:[{id:"a",text:"3 × 10⁶ m/s",isCorrect:false},{id:"b",text:"3 × 10⁸ m/s",isCorrect:true},{id:"c",text:"3 × 10¹⁰ m/s",isCorrect:false},{id:"d",text:"3 × 10⁴ m/s",isCorrect:false}], xpReward:10 },
  { id:"sph9", type:"mcq", title:"Kinetic energy = ½ × m × v². Object of 2kg at 3m/s has KE =?", options:[{id:"a",text:"6 J",isCorrect:false},{id:"b",text:"9 J",isCorrect:true},{id:"c",text:"12 J",isCorrect:false},{id:"d",text:"18 J",isCorrect:false}], xpReward:10 },
  { id:"sph10", type:"mcq", title:"Which type of wave does not require a medium to travel?", options:[{id:"a",text:"Sound wave",isCorrect:false},{id:"b",text:"Water wave",isCorrect:false},{id:"c",text:"Electromagnetic wave",isCorrect:true},{id:"d",text:"Seismic wave",isCorrect:false}], xpReward:10 },
];

export const SCIENCE_CHEMISTRY: Question[] = [
  { id:"sc1", type:"mcq", title:"What is the chemical symbol for water?", options:[{id:"a",text:"WO",isCorrect:false},{id:"b",text:"H₂O",isCorrect:true},{id:"c",text:"HO₂",isCorrect:false},{id:"d",text:"H₂O₂",isCorrect:false}], xpReward:10 },
  { id:"sc2", type:"mcq", title:"The atomic number of Carbon is:", options:[{id:"a",text:"4",isCorrect:false},{id:"b",text:"6",isCorrect:true},{id:"c",text:"8",isCorrect:false},{id:"d",text:"12",isCorrect:false}], xpReward:10 },
  { id:"sc3", type:"mcq", title:"Which gas do plants absorb during photosynthesis?", options:[{id:"a",text:"Oxygen",isCorrect:false},{id:"b",text:"Nitrogen",isCorrect:false},{id:"c",text:"Carbon dioxide",isCorrect:true},{id:"d",text:"Hydrogen",isCorrect:false}], xpReward:10 },
  { id:"sc4", type:"mcq", title:"pH of pure water is:", options:[{id:"a",text:"0",isCorrect:false},{id:"b",text:"7",isCorrect:true},{id:"c",text:"14",isCorrect:false},{id:"d",text:"6",isCorrect:false}], xpReward:10 },
  { id:"sc5", type:"mcq", title:"An acid has a pH:", options:[{id:"a",text:"Greater than 7",isCorrect:false},{id:"b",text:"Equal to 7",isCorrect:false},{id:"c",text:"Less than 7",isCorrect:true},{id:"d",text:"Greater than 14",isCorrect:false}], xpReward:10 },
  { id:"sc6", type:"mcq", title:"NaCl is the chemical formula for:", options:[{id:"a",text:"Baking soda",isCorrect:false},{id:"b",text:"Common salt",isCorrect:true},{id:"c",text:"Sugar",isCorrect:false},{id:"d",text:"Vinegar",isCorrect:false}], xpReward:10 },
  { id:"sc7", type:"mcq", title:"Which state of matter has definite volume but no definite shape?", options:[{id:"a",text:"Solid",isCorrect:false},{id:"b",text:"Liquid",isCorrect:true},{id:"c",text:"Gas",isCorrect:false},{id:"d",text:"Plasma",isCorrect:false}], xpReward:10 },
  { id:"sc8", type:"mcq", title:"The Periodic Table was developed by:", options:[{id:"a",text:"Isaac Newton",isCorrect:false},{id:"b",text:"Albert Einstein",isCorrect:false},{id:"c",text:"Dmitri Mendeleev",isCorrect:true},{id:"d",text:"Marie Curie",isCorrect:false}], xpReward:10 },
  { id:"sc9", type:"mcq", title:"Chemical formula of carbon dioxide:", options:[{id:"a",text:"CO",isCorrect:false},{id:"b",text:"CO₂",isCorrect:true},{id:"c",text:"C₂O",isCorrect:false},{id:"d",text:"C₂O₂",isCorrect:false}], xpReward:10 },
  { id:"sc10", type:"mcq", title:"An exothermic reaction:", options:[{id:"a",text:"Absorbs heat",isCorrect:false},{id:"b",text:"Releases heat",isCorrect:true},{id:"c",text:"Changes colour only",isCorrect:false},{id:"d",text:"Requires electricity",isCorrect:false}], xpReward:10 },
];

export const SCIENCE_BIOLOGY: Question[] = [
  { id:"sb1", type:"mcq", title:"The basic unit of life is:", options:[{id:"a",text:"Tissue",isCorrect:false},{id:"b",text:"Organ",isCorrect:false},{id:"c",text:"Cell",isCorrect:true},{id:"d",text:"Molecule",isCorrect:false}], xpReward:10 },
  { id:"sb2", type:"mcq", title:"Which organelle is the powerhouse of the cell?", options:[{id:"a",text:"Nucleus",isCorrect:false},{id:"b",text:"Ribosome",isCorrect:false},{id:"c",text:"Mitochondria",isCorrect:true},{id:"d",text:"Golgi body",isCorrect:false}], xpReward:10 },
  { id:"sb3", type:"mcq", title:"DNA stands for:", options:[{id:"a",text:"Deoxyribose Natural Acid",isCorrect:false},{id:"b",text:"Deoxyribonucleic Acid",isCorrect:true},{id:"c",text:"Dinitric Acid",isCorrect:false},{id:"d",text:"Double Nucleic Acid",isCorrect:false}], xpReward:10 },
  { id:"sb4", type:"mcq", title:"Which blood group is the universal donor?", options:[{id:"a",text:"A",isCorrect:false},{id:"b",text:"B",isCorrect:false},{id:"c",text:"AB",isCorrect:false},{id:"d",text:"O",isCorrect:true}], xpReward:10 },
  { id:"sb5", type:"mcq", title:"How many chambers does the human heart have?", options:[{id:"a",text:"2",isCorrect:false},{id:"b",text:"3",isCorrect:false},{id:"c",text:"4",isCorrect:true},{id:"d",text:"5",isCorrect:false}], xpReward:10 },
  { id:"sb6", type:"mcq", title:"Osmosis is the movement of:", options:[{id:"a",text:"Solutes from high to low concentration",isCorrect:false},{id:"b",text:"Water across a semi-permeable membrane from low to high solute concentration",isCorrect:true},{id:"c",text:"Gases through a membrane",isCorrect:false},{id:"d",text:"Blood through capillaries",isCorrect:false}], xpReward:10 },
  { id:"sb7", type:"mcq", title:"Which vitamin is produced when skin is exposed to sunlight?", options:[{id:"a",text:"Vitamin A",isCorrect:false},{id:"b",text:"Vitamin B12",isCorrect:false},{id:"c",text:"Vitamin C",isCorrect:false},{id:"d",text:"Vitamin D",isCorrect:true}], xpReward:10 },
  { id:"sb8", type:"mcq", title:"Mitosis results in how many daughter cells?", options:[{id:"a",text:"1",isCorrect:false},{id:"b",text:"2",isCorrect:true},{id:"c",text:"4",isCorrect:false},{id:"d",text:"8",isCorrect:false}], xpReward:10 },
  { id:"sb9", type:"mcq", title:"Which organ produces insulin?", options:[{id:"a",text:"Liver",isCorrect:false},{id:"b",text:"Kidney",isCorrect:false},{id:"c",text:"Pancreas",isCorrect:true},{id:"d",text:"Stomach",isCorrect:false}], xpReward:10 },
  { id:"sb10", type:"mcq", title:"The theory of evolution by natural selection was proposed by:", options:[{id:"a",text:"Gregor Mendel",isCorrect:false},{id:"b",text:"Charles Darwin",isCorrect:true},{id:"c",text:"Louis Pasteur",isCorrect:false},{id:"d",text:"Robert Hooke",isCorrect:false}], xpReward:10 },
];

export const SCIENCE_HUMAN_BODY: Question[] = [
  { id:"shb1", type:"mcq", title:"How many bones are in the adult human body?", options:[{id:"a",text:"186",isCorrect:false},{id:"b",text:"196",isCorrect:false},{id:"c",text:"206",isCorrect:true},{id:"d",text:"216",isCorrect:false}], xpReward:10 },
  { id:"shb2", type:"mcq", title:"Which organ filters blood and produces urine?", options:[{id:"a",text:"Liver",isCorrect:false},{id:"b",text:"Kidney",isCorrect:true},{id:"c",text:"Spleen",isCorrect:false},{id:"d",text:"Pancreas",isCorrect:false}], xpReward:10 },
  { id:"shb3", type:"mcq", title:"The largest organ of the human body is:", options:[{id:"a",text:"Liver",isCorrect:false},{id:"b",text:"Brain",isCorrect:false},{id:"c",text:"Skin",isCorrect:true},{id:"d",text:"Intestine",isCorrect:false}], xpReward:10 },
  { id:"shb4", type:"mcq", title:"Normal resting heart rate for adults (beats per minute):", options:[{id:"a",text:"40-50",isCorrect:false},{id:"b",text:"60-100",isCorrect:true},{id:"c",text:"110-130",isCorrect:false},{id:"d",text:"130-150",isCorrect:false}], xpReward:10 },
  { id:"shb5", type:"mcq", title:"Which part of the brain controls balance and coordination?", options:[{id:"a",text:"Cerebrum",isCorrect:false},{id:"b",text:"Cerebellum",isCorrect:true},{id:"c",text:"Medulla",isCorrect:false},{id:"d",text:"Thalamus",isCorrect:false}], xpReward:10 },
  { id:"shb6", type:"mcq", title:"Haemoglobin in red blood cells carries:", options:[{id:"a",text:"Glucose",isCorrect:false},{id:"b",text:"Carbon dioxide only",isCorrect:false},{id:"c",text:"Oxygen",isCorrect:true},{id:"d",text:"Antibodies",isCorrect:false}], xpReward:10 },
  { id:"shb7", type:"mcq", title:"Which system is responsible for fighting infections?", options:[{id:"a",text:"Digestive system",isCorrect:false},{id:"b",text:"Immune system",isCorrect:true},{id:"c",text:"Nervous system",isCorrect:false},{id:"d",text:"Endocrine system",isCorrect:false}], xpReward:10 },
  { id:"shb8", type:"mcq", title:"The smallest bones in the body are found in the:", options:[{id:"a",text:"Fingers",isCorrect:false},{id:"b",text:"Toes",isCorrect:false},{id:"c",text:"Ear",isCorrect:true},{id:"d",text:"Nose",isCorrect:false}], xpReward:10 },
];
