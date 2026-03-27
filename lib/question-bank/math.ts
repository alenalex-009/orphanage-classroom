import type { Question } from "./types";

export const MATH_FRACTIONS: Question[] = [
  { id:"mf1", type:"mcq", title:"What does the fraction ½ mean?", options:[{id:"a",text:"1 out of 3 equal parts",isCorrect:false},{id:"b",text:"1 out of 2 equal parts",isCorrect:true},{id:"c",text:"2 out of 1 parts",isCorrect:false},{id:"d",text:"Half a number",isCorrect:false}], xpReward:10 },
  { id:"mf2", type:"mcq", title:"Which fraction is bigger — ½ or ¼?", options:[{id:"a",text:"¼",isCorrect:false},{id:"b",text:"They are equal",isCorrect:false},{id:"c",text:"½",isCorrect:true},{id:"d",text:"Cannot tell",isCorrect:false}], xpReward:10 },
  { id:"mf3", type:"mcq", title:"A pizza is cut into 4 equal slices. You eat 1 slice. What fraction did you eat?", options:[{id:"a",text:"½",isCorrect:false},{id:"b",text:"¼",isCorrect:true},{id:"c",text:"¾",isCorrect:false},{id:"d",text:"4/1",isCorrect:false}], xpReward:10 },
  { id:"mf4", type:"mcq", title:"What is the top number of a fraction called?", options:[{id:"a",text:"Denominator",isCorrect:false},{id:"b",text:"Whole number",isCorrect:false},{id:"c",text:"Numerator",isCorrect:true},{id:"d",text:"Remainder",isCorrect:false}], xpReward:10 },
  { id:"mf5", type:"mcq", title:"½ + ½ = ?", options:[{id:"a",text:"¼",isCorrect:false},{id:"b",text:"½",isCorrect:false},{id:"c",text:"1",isCorrect:true},{id:"d",text:"2",isCorrect:false}], xpReward:10 },
  { id:"mf6", type:"mcq", title:"Which fraction equals one whole?", options:[{id:"a",text:"½",isCorrect:false},{id:"b",text:"¾",isCorrect:false},{id:"c",text:"2/4",isCorrect:false},{id:"d",text:"4/4",isCorrect:true}], xpReward:10 },
  { id:"mf7", type:"story", title:"The Sharing Cake", body:"Maya baked a cake and cut it into 8 equal pieces. She gave 3 pieces to her friends. What fraction of the cake did she give away?", options:[{id:"a",text:"3/5",isCorrect:false},{id:"b",text:"8/3",isCorrect:false},{id:"c",text:"3/8",isCorrect:true},{id:"d",text:"5/8",isCorrect:false}], xpReward:15 },
  { id:"mf8", type:"mcq", title:"What is the bottom number of a fraction called?", options:[{id:"a",text:"Numerator",isCorrect:false},{id:"b",text:"Denominator",isCorrect:true},{id:"c",text:"Divisor",isCorrect:false},{id:"d",text:"Factor",isCorrect:false}], xpReward:10 },
];

export const MATH_ADDITION: Question[] = [
  { id:"ma1", type:"mcq", title:"What is 7 + 5?", options:[{id:"a",text:"11",isCorrect:false},{id:"b",text:"12",isCorrect:true},{id:"c",text:"13",isCorrect:false},{id:"d",text:"10",isCorrect:false}], xpReward:10 },
  { id:"ma2", type:"mcq", title:"What is 23 + 14?", options:[{id:"a",text:"36",isCorrect:false},{id:"b",text:"37",isCorrect:true},{id:"c",text:"38",isCorrect:false},{id:"d",text:"34",isCorrect:false}], xpReward:10 },
  { id:"ma3", type:"mcq", title:"What is 0 + 9?", options:[{id:"a",text:"0",isCorrect:false},{id:"b",text:"90",isCorrect:false},{id:"c",text:"9",isCorrect:true},{id:"d",text:"1",isCorrect:false}], xpReward:10 },
  { id:"ma4", type:"mcq", title:"Riya has 8 apples. Her friend gives her 6 more. How many does she have?", options:[{id:"a",text:"12",isCorrect:false},{id:"b",text:"13",isCorrect:false},{id:"c",text:"14",isCorrect:true},{id:"d",text:"15",isCorrect:false}], xpReward:10 },
  { id:"ma5", type:"mcq", title:"What is 45 + 55?", options:[{id:"a",text:"90",isCorrect:false},{id:"b",text:"100",isCorrect:true},{id:"c",text:"99",isCorrect:false},{id:"d",text:"105",isCorrect:false}], xpReward:10 },
  { id:"ma6", type:"mcq", title:"Which number makes this true: 6 + ___ = 10?", options:[{id:"a",text:"3",isCorrect:false},{id:"b",text:"5",isCorrect:false},{id:"c",text:"4",isCorrect:true},{id:"d",text:"6",isCorrect:false}], xpReward:10 },
  { id:"ma7", type:"mcq", title:"What is 19 + 11?", options:[{id:"a",text:"28",isCorrect:false},{id:"b",text:"29",isCorrect:false},{id:"c",text:"30",isCorrect:true},{id:"d",text:"31",isCorrect:false}], xpReward:10 },
  { id:"ma8", type:"story", title:"The Marble Collection", body:"Sam has 17 marbles. He wins 8 more in a game. Then his sister gives him 5. How many marbles does Sam have now?", options:[{id:"a",text:"25",isCorrect:false},{id:"b",text:"28",isCorrect:false},{id:"c",text:"30",isCorrect:true},{id:"d",text:"32",isCorrect:false}], xpReward:15 },
];

export const MATH_SUBTRACTION: Question[] = [
  { id:"ms1", type:"mcq", title:"What is 15 - 7?", options:[{id:"a",text:"7",isCorrect:false},{id:"b",text:"8",isCorrect:true},{id:"c",text:"9",isCorrect:false},{id:"d",text:"6",isCorrect:false}], xpReward:10 },
  { id:"ms2", type:"mcq", title:"What is 20 - 6?", options:[{id:"a",text:"12",isCorrect:false},{id:"b",text:"13",isCorrect:false},{id:"c",text:"14",isCorrect:true},{id:"d",text:"15",isCorrect:false}], xpReward:10 },
  { id:"ms3", type:"mcq", title:"There are 10 birds on a tree. 4 fly away. How many are left?", options:[{id:"a",text:"5",isCorrect:false},{id:"b",text:"6",isCorrect:true},{id:"c",text:"7",isCorrect:false},{id:"d",text:"4",isCorrect:false}], xpReward:10 },
  { id:"ms4", type:"mcq", title:"What is 100 - 45?", options:[{id:"a",text:"54",isCorrect:false},{id:"b",text:"56",isCorrect:false},{id:"c",text:"55",isCorrect:true},{id:"d",text:"65",isCorrect:false}], xpReward:10 },
  { id:"ms5", type:"mcq", title:"Which is correct: 9 - ___ = 3?", options:[{id:"a",text:"5",isCorrect:false},{id:"b",text:"7",isCorrect:false},{id:"c",text:"6",isCorrect:true},{id:"d",text:"4",isCorrect:false}], xpReward:10 },
  { id:"ms6", type:"mcq", title:"What is 50 - 25?", options:[{id:"a",text:"20",isCorrect:false},{id:"b",text:"25",isCorrect:true},{id:"c",text:"30",isCorrect:false},{id:"d",text:"35",isCorrect:false}], xpReward:10 },
  { id:"ms7", type:"mcq", title:"A bag has 12 sweets. You eat 5. How many remain?", options:[{id:"a",text:"6",isCorrect:false},{id:"b",text:"7",isCorrect:true},{id:"c",text:"8",isCorrect:false},{id:"d",text:"9",isCorrect:false}], xpReward:10 },
  { id:"ms8", type:"mcq", title:"What is 33 - 18?", options:[{id:"a",text:"14",isCorrect:false},{id:"b",text:"15",isCorrect:true},{id:"c",text:"16",isCorrect:false},{id:"d",text:"17",isCorrect:false}], xpReward:10 },
];

export const MATH_MULTIPLICATION: Question[] = [
  { id:"mm1", type:"mcq", title:"What is 3 × 4?", options:[{id:"a",text:"7",isCorrect:false},{id:"b",text:"12",isCorrect:true},{id:"c",text:"34",isCorrect:false},{id:"d",text:"9",isCorrect:false}], xpReward:10 },
  { id:"mm2", type:"mcq", title:"What is 5 × 6?", options:[{id:"a",text:"11",isCorrect:false},{id:"b",text:"25",isCorrect:false},{id:"c",text:"30",isCorrect:true},{id:"d",text:"56",isCorrect:false}], xpReward:10 },
  { id:"mm3", type:"mcq", title:"What is 7 × 7?", options:[{id:"a",text:"14",isCorrect:false},{id:"b",text:"49",isCorrect:true},{id:"c",text:"77",isCorrect:false},{id:"d",text:"42",isCorrect:false}], xpReward:10 },
  { id:"mm4", type:"mcq", title:"4 bags of 5 apples each. How many apples total?", options:[{id:"a",text:"9",isCorrect:false},{id:"b",text:"45",isCorrect:false},{id:"c",text:"20",isCorrect:true},{id:"d",text:"25",isCorrect:false}], xpReward:10 },
  { id:"mm5", type:"mcq", title:"What is 8 × 9?", options:[{id:"a",text:"63",isCorrect:false},{id:"b",text:"72",isCorrect:true},{id:"c",text:"81",isCorrect:false},{id:"d",text:"89",isCorrect:false}], xpReward:10 },
  { id:"mm6", type:"mcq", title:"What is 10 × 10?", options:[{id:"a",text:"20",isCorrect:false},{id:"b",text:"100",isCorrect:true},{id:"c",text:"1000",isCorrect:false},{id:"d",text:"110",isCorrect:false}], xpReward:10 },
  { id:"mm7", type:"mcq", title:"Which equals 2 × 8?", options:[{id:"a",text:"28",isCorrect:false},{id:"b",text:"14",isCorrect:false},{id:"c",text:"16",isCorrect:true},{id:"d",text:"18",isCorrect:false}], xpReward:10 },
  { id:"mm8", type:"story", title:"The Flower Garden", body:"Priya plants 6 rows of flowers. Each row has 7 flowers. How many flowers does she plant in total?", options:[{id:"a",text:"13",isCorrect:false},{id:"b",text:"36",isCorrect:false},{id:"c",text:"42",isCorrect:true},{id:"d",text:"48",isCorrect:false}], xpReward:15 },
];

export const MATH_SHAPES: Question[] = [
  { id:"msh1", type:"mcq", title:"How many sides does a triangle have?", options:[{id:"a",text:"2",isCorrect:false},{id:"b",text:"3",isCorrect:true},{id:"c",text:"4",isCorrect:false},{id:"d",text:"5",isCorrect:false}], xpReward:10 },
  { id:"msh2", type:"mcq", title:"What shape has 4 equal sides?", options:[{id:"a",text:"Rectangle",isCorrect:false},{id:"b",text:"Triangle",isCorrect:false},{id:"c",text:"Square",isCorrect:true},{id:"d",text:"Circle",isCorrect:false}], xpReward:10 },
  { id:"msh3", type:"mcq", title:"How many corners does a circle have?", options:[{id:"a",text:"1",isCorrect:false},{id:"b",text:"2",isCorrect:false},{id:"c",text:"0",isCorrect:true},{id:"d",text:"Infinite",isCorrect:false}], xpReward:10 },
  { id:"msh4", type:"mcq", title:"A rectangle has how many sides?", options:[{id:"a",text:"3",isCorrect:false},{id:"b",text:"4",isCorrect:true},{id:"c",text:"5",isCorrect:false},{id:"d",text:"6",isCorrect:false}], xpReward:10 },
  { id:"msh5", type:"mcq", title:"What 3D shape looks like a ball?", options:[{id:"a",text:"Cube",isCorrect:false},{id:"b",text:"Cone",isCorrect:false},{id:"c",text:"Sphere",isCorrect:true},{id:"d",text:"Cylinder",isCorrect:false}], xpReward:10 },
  { id:"msh6", type:"mcq", title:"How many sides does a hexagon have?", options:[{id:"a",text:"5",isCorrect:false},{id:"b",text:"7",isCorrect:false},{id:"c",text:"6",isCorrect:true},{id:"d",text:"8",isCorrect:false}], xpReward:10 },
  { id:"msh7", type:"mcq", title:"What shape is a door usually?", options:[{id:"a",text:"Circle",isCorrect:false},{id:"b",text:"Triangle",isCorrect:false},{id:"c",text:"Rectangle",isCorrect:true},{id:"d",text:"Square",isCorrect:false}], xpReward:10 },
  { id:"msh8", type:"mcq", title:"Which shape has no straight edges?", options:[{id:"a",text:"Square",isCorrect:false},{id:"b",text:"Triangle",isCorrect:false},{id:"c",text:"Circle",isCorrect:true},{id:"d",text:"Rectangle",isCorrect:false}], xpReward:10 },
];

export const MATH_COUNTING: Question[] = [
  { id:"mc1", type:"mcq", title:"What comes after 19?", options:[{id:"a",text:"18",isCorrect:false},{id:"b",text:"21",isCorrect:false},{id:"c",text:"20",isCorrect:true},{id:"d",text:"90",isCorrect:false}], xpReward:10 },
  { id:"mc2", type:"mcq", title:"Count by 2s: 2, 4, 6, ___", options:[{id:"a",text:"7",isCorrect:false},{id:"b",text:"8",isCorrect:true},{id:"c",text:"9",isCorrect:false},{id:"d",text:"10",isCorrect:false}], xpReward:10 },
  { id:"mc3", type:"mcq", title:"Count by 5s: 5, 10, 15, ___", options:[{id:"a",text:"18",isCorrect:false},{id:"b",text:"20",isCorrect:true},{id:"c",text:"19",isCorrect:false},{id:"d",text:"25",isCorrect:false}], xpReward:10 },
  { id:"mc4", type:"mcq", title:"What is the number before 100?", options:[{id:"a",text:"101",isCorrect:false},{id:"b",text:"99",isCorrect:true},{id:"c",text:"90",isCorrect:false},{id:"d",text:"98",isCorrect:false}], xpReward:10 },
  { id:"mc5", type:"mcq", title:"How many tens are in 50?", options:[{id:"a",text:"5",isCorrect:true},{id:"b",text:"50",isCorrect:false},{id:"c",text:"10",isCorrect:false},{id:"d",text:"15",isCorrect:false}], xpReward:10 },
  { id:"mc6", type:"mcq", title:"Count the fingers on 3 hands: how many?", options:[{id:"a",text:"10",isCorrect:false},{id:"b",text:"12",isCorrect:false},{id:"c",text:"15",isCorrect:true},{id:"d",text:"20",isCorrect:false}], xpReward:10 },
  { id:"mc7", type:"mcq", title:"Which number is the largest?", options:[{id:"a",text:"67",isCorrect:false},{id:"b",text:"89",isCorrect:true},{id:"c",text:"76",isCorrect:false},{id:"d",text:"78",isCorrect:false}], xpReward:10 },
  { id:"mc8", type:"mcq", title:"Count by 10s: 10, 20, 30, ___", options:[{id:"a",text:"35",isCorrect:false},{id:"b",text:"41",isCorrect:false},{id:"c",text:"40",isCorrect:true},{id:"d",text:"50",isCorrect:false}], xpReward:10 },
];
