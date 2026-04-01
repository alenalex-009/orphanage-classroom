import type { Question } from "./types";

// ── MIDDLE SCHOOL MATH (Grade 6-8) ───────────────────────────────────────────

export const MATH_ALGEBRA: Question[] = [
  { id:"mal1", type:"mcq", title:"Solve: x + 7 = 12. What is x?", options:[{id:"a",text:"4",isCorrect:false},{id:"b",text:"5",isCorrect:true},{id:"c",text:"6",isCorrect:false},{id:"d",text:"19",isCorrect:false}], xpReward:10 },
  { id:"mal2", type:"mcq", title:"Solve: 3x = 18. What is x?", options:[{id:"a",text:"5",isCorrect:false},{id:"b",text:"6",isCorrect:true},{id:"c",text:"15",isCorrect:false},{id:"d",text:"21",isCorrect:false}], xpReward:10 },
  { id:"mal3", type:"mcq", title:"Simplify: 4x + 3x", options:[{id:"a",text:"7",isCorrect:false},{id:"b",text:"43x",isCorrect:false},{id:"c",text:"7x",isCorrect:true},{id:"d",text:"12x",isCorrect:false}], xpReward:10 },
  { id:"mal4", type:"mcq", title:"If y = 2x + 3 and x = 4, what is y?", options:[{id:"a",text:"9",isCorrect:false},{id:"b",text:"10",isCorrect:false},{id:"c",text:"11",isCorrect:true},{id:"d",text:"14",isCorrect:false}], xpReward:10 },
  { id:"mal5", type:"mcq", title:"Solve: 2x - 5 = 9. What is x?", options:[{id:"a",text:"5",isCorrect:false},{id:"b",text:"6",isCorrect:false},{id:"c",text:"7",isCorrect:true},{id:"d",text:"8",isCorrect:false}], xpReward:10 },
  { id:"mal6", type:"mcq", title:"What is the value of 3² + 4²?", options:[{id:"a",text:"25",isCorrect:true},{id:"b",text:"49",isCorrect:false},{id:"c",text:"14",isCorrect:false},{id:"d",text:"7",isCorrect:false}], xpReward:10 },
  { id:"mal7", type:"mcq", title:"Which expression equals 2(x + 3)?", options:[{id:"a",text:"2x + 3",isCorrect:false},{id:"b",text:"2x + 6",isCorrect:true},{id:"c",text:"2x + 5",isCorrect:false},{id:"d",text:"x + 6",isCorrect:false}], xpReward:10 },
  { id:"mal8", type:"story", title:"The Taxi Problem", body:"A taxi charges ₹50 base fare plus ₹12 per kilometre. Riya paid ₹170 in total. Write and solve an equation to find the distance she travelled.", options:[{id:"a",text:"10 km",isCorrect:true},{id:"b",text:"8 km",isCorrect:false},{id:"c",text:"12 km",isCorrect:false},{id:"d",text:"14 km",isCorrect:false}], xpReward:15 },
];

export const MATH_PERCENTAGES: Question[] = [
  { id:"mp1", type:"mcq", title:"What is 25% of 200?", options:[{id:"a",text:"25",isCorrect:false},{id:"b",text:"50",isCorrect:true},{id:"c",text:"75",isCorrect:false},{id:"d",text:"100",isCorrect:false}], xpReward:10 },
  { id:"mp2", type:"mcq", title:"A shirt costs ₹500 with 20% discount. What is the sale price?", options:[{id:"a",text:"₹380",isCorrect:false},{id:"b",text:"₹400",isCorrect:true},{id:"c",text:"₹420",isCorrect:false},{id:"d",text:"₹450",isCorrect:false}], xpReward:10 },
  { id:"mp3", type:"mcq", title:"Convert 0.75 to a percentage:", options:[{id:"a",text:"7.5%",isCorrect:false},{id:"b",text:"75%",isCorrect:true},{id:"c",text:"0.75%",isCorrect:false},{id:"d",text:"750%",isCorrect:false}], xpReward:10 },
  { id:"mp4", type:"mcq", title:"A class of 40 students: 30 passed. What percentage passed?", options:[{id:"a",text:"65%",isCorrect:false},{id:"b",text:"70%",isCorrect:false},{id:"c",text:"75%",isCorrect:true},{id:"d",text:"80%",isCorrect:false}], xpReward:10 },
  { id:"mp5", type:"mcq", title:"If 15% of x = 45, what is x?", options:[{id:"a",text:"200",isCorrect:false},{id:"b",text:"250",isCorrect:false},{id:"c",text:"300",isCorrect:true},{id:"d",text:"350",isCorrect:false}], xpReward:10 },
  { id:"mp6", type:"mcq", title:"Price increased from ₹200 to ₹250. Percentage increase?", options:[{id:"a",text:"20%",isCorrect:false},{id:"b",text:"25%",isCorrect:true},{id:"c",text:"30%",isCorrect:false},{id:"d",text:"50%",isCorrect:false}], xpReward:10 },
  { id:"mp7", type:"mcq", title:"What is 12½% as a fraction?", options:[{id:"a",text:"1/4",isCorrect:false},{id:"b",text:"1/8",isCorrect:true},{id:"c",text:"1/6",isCorrect:false},{id:"d",text:"1/10",isCorrect:false}], xpReward:10 },
  { id:"mp8", type:"mcq", title:"A product's price after 10% tax on ₹1000 is?", options:[{id:"a",text:"₹1010",isCorrect:false},{id:"b",text:"₹1100",isCorrect:true},{id:"c",text:"₹1050",isCorrect:false},{id:"d",text:"₹900",isCorrect:false}], xpReward:10 },
];

export const MATH_RATIOS: Question[] = [
  { id:"mr1", type:"mcq", title:"Simplify the ratio 12:8", options:[{id:"a",text:"6:4",isCorrect:false},{id:"b",text:"3:2",isCorrect:true},{id:"c",text:"4:3",isCorrect:false},{id:"d",text:"2:3",isCorrect:false}], xpReward:10 },
  { id:"mr2", type:"mcq", title:"If the ratio of boys to girls is 3:2 and there are 15 boys, how many girls?", options:[{id:"a",text:"8",isCorrect:false},{id:"b",text:"9",isCorrect:false},{id:"c",text:"10",isCorrect:true},{id:"d",text:"12",isCorrect:false}], xpReward:10 },
  { id:"mr3", type:"mcq", title:"₹600 shared in ratio 1:2:3. Largest share is?", options:[{id:"a",text:"₹100",isCorrect:false},{id:"b",text:"₹200",isCorrect:false},{id:"c",text:"₹300",isCorrect:true},{id:"d",text:"₹400",isCorrect:false}], xpReward:10 },
  { id:"mr4", type:"mcq", title:"Which ratio is equivalent to 2:5?", options:[{id:"a",text:"4:8",isCorrect:false},{id:"b",text:"6:15",isCorrect:true},{id:"c",text:"4:12",isCorrect:false},{id:"d",text:"3:8",isCorrect:false}], xpReward:10 },
  { id:"mr5", type:"mcq", title:"A recipe uses flour and sugar in ratio 3:1. For 12 cups flour, how much sugar?", options:[{id:"a",text:"2 cups",isCorrect:false},{id:"b",text:"3 cups",isCorrect:false},{id:"c",text:"4 cups",isCorrect:true},{id:"d",text:"6 cups",isCorrect:false}], xpReward:10 },
  { id:"mr6", type:"mcq", title:"Speed = Distance ÷ Time. If distance = 120 km and time = 3 hours, speed is?", options:[{id:"a",text:"30 km/h",isCorrect:false},{id:"b",text:"40 km/h",isCorrect:true},{id:"c",text:"50 km/h",isCorrect:false},{id:"d",text:"60 km/h",isCorrect:false}], xpReward:10 },
  { id:"mr7", type:"mcq", title:"If 5 workers complete a task in 8 days, how long for 10 workers (same rate)?", options:[{id:"a",text:"2 days",isCorrect:false},{id:"b",text:"4 days",isCorrect:true},{id:"c",text:"8 days",isCorrect:false},{id:"d",text:"16 days",isCorrect:false}], xpReward:10 },
  { id:"mr8", type:"mcq", title:"Map scale 1:50000. 2cm on map = how many km in real life?", options:[{id:"a",text:"0.5 km",isCorrect:false},{id:"b",text:"1 km",isCorrect:true},{id:"c",text:"2 km",isCorrect:false},{id:"d",text:"10 km",isCorrect:false}], xpReward:10 },
];

export const MATH_DECIMALS: Question[] = [
  { id:"md1", type:"mcq", title:"What is 3.7 + 2.45?", options:[{id:"a",text:"5.15",isCorrect:false},{id:"b",text:"6.15",isCorrect:true},{id:"c",text:"6.12",isCorrect:false},{id:"d",text:"5.75",isCorrect:false}], xpReward:10 },
  { id:"md2", type:"mcq", title:"What is 8.6 - 3.24?", options:[{id:"a",text:"5.36",isCorrect:true},{id:"b",text:"5.46",isCorrect:false},{id:"c",text:"4.36",isCorrect:false},{id:"d",text:"5.26",isCorrect:false}], xpReward:10 },
  { id:"md3", type:"mcq", title:"0.3 × 0.4 = ?", options:[{id:"a",text:"1.2",isCorrect:false},{id:"b",text:"0.12",isCorrect:true},{id:"c",text:"0.012",isCorrect:false},{id:"d",text:"12",isCorrect:false}], xpReward:10 },
  { id:"md4", type:"mcq", title:"Round 4.567 to 2 decimal places:", options:[{id:"a",text:"4.56",isCorrect:false},{id:"b",text:"4.57",isCorrect:true},{id:"c",text:"4.6",isCorrect:false},{id:"d",text:"4.567",isCorrect:false}], xpReward:10 },
  { id:"md5", type:"mcq", title:"Convert ⅝ to decimal:", options:[{id:"a",text:"0.5",isCorrect:false},{id:"b",text:"0.6",isCorrect:false},{id:"c",text:"0.625",isCorrect:true},{id:"d",text:"0.58",isCorrect:false}], xpReward:10 },
  { id:"md6", type:"mcq", title:"Which decimal is largest: 0.9, 0.09, 0.99, 0.909?", options:[{id:"a",text:"0.9",isCorrect:false},{id:"b",text:"0.909",isCorrect:false},{id:"c",text:"0.99",isCorrect:true},{id:"d",text:"0.09",isCorrect:false}], xpReward:10 },
  { id:"md7", type:"mcq", title:"18 ÷ 0.6 = ?", options:[{id:"a",text:"3",isCorrect:false},{id:"b",text:"30",isCorrect:true},{id:"c",text:"108",isCorrect:false},{id:"d",text:"0.3",isCorrect:false}], xpReward:10 },
  { id:"md8", type:"mcq", title:"Which is equivalent to 0.25?", options:[{id:"a",text:"1/2",isCorrect:false},{id:"b",text:"1/4",isCorrect:true},{id:"c",text:"1/5",isCorrect:false},{id:"d",text:"1/3",isCorrect:false}], xpReward:10 },
];

export const MATH_STATISTICS: Question[] = [
  { id:"mst1", type:"mcq", title:"Find the mean of: 4, 7, 9, 10, 10", options:[{id:"a",text:"7",isCorrect:false},{id:"b",text:"8",isCorrect:true},{id:"c",text:"9",isCorrect:false},{id:"d",text:"10",isCorrect:false}], xpReward:10 },
  { id:"mst2", type:"mcq", title:"Find the median of: 3, 5, 7, 9, 11", options:[{id:"a",text:"5",isCorrect:false},{id:"b",text:"7",isCorrect:true},{id:"c",text:"9",isCorrect:false},{id:"d",text:"6",isCorrect:false}], xpReward:10 },
  { id:"mst3", type:"mcq", title:"Find the mode of: 2, 3, 3, 4, 5, 3, 6", options:[{id:"a",text:"2",isCorrect:false},{id:"b",text:"4",isCorrect:false},{id:"c",text:"3",isCorrect:true},{id:"d",text:"5",isCorrect:false}], xpReward:10 },
  { id:"mst4", type:"mcq", title:"Range of data set 5, 12, 3, 18, 7 is?", options:[{id:"a",text:"13",isCorrect:false},{id:"b",text:"15",isCorrect:true},{id:"c",text:"12",isCorrect:false},{id:"d",text:"18",isCorrect:false}], xpReward:10 },
  { id:"mst5", type:"mcq", title:"In a bar chart, what does the height of each bar represent?", options:[{id:"a",text:"The category label",isCorrect:false},{id:"b",text:"The frequency or value of that category",isCorrect:true},{id:"c",text:"The total of all data",isCorrect:false},{id:"d",text:"The percentage",isCorrect:false}], xpReward:10 },
  { id:"mst6", type:"mcq", title:"Probability of getting heads on a fair coin toss:", options:[{id:"a",text:"1/4",isCorrect:false},{id:"b",text:"1/3",isCorrect:false},{id:"c",text:"1/2",isCorrect:true},{id:"d",text:"2/3",isCorrect:false}], xpReward:10 },
  { id:"mst7", type:"mcq", title:"Probability of rolling a 6 on a fair die:", options:[{id:"a",text:"1/3",isCorrect:false},{id:"b",text:"1/4",isCorrect:false},{id:"c",text:"1/5",isCorrect:false},{id:"d",text:"1/6",isCorrect:true}], xpReward:10 },
  { id:"mst8", type:"story", title:"Survey Results", body:"30 students were asked their favourite subject. 10 chose Maths, 8 English, 7 Science, 5 History. What percentage chose Maths?", options:[{id:"a",text:"25%",isCorrect:false},{id:"b",text:"30%",isCorrect:false},{id:"c",text:"33%",isCorrect:true},{id:"d",text:"40%",isCorrect:false}], xpReward:15 },
];

// ── HIGH SCHOOL MATH (Grade 9-12) ────────────────────────────────────────────

export const MATH_TRIGONOMETRY: Question[] = [
  { id:"mt1", type:"mcq", title:"In a right triangle, sin(θ) = opposite / ?", options:[{id:"a",text:"Adjacent",isCorrect:false},{id:"b",text:"Hypotenuse",isCorrect:true},{id:"c",text:"Base",isCorrect:false},{id:"d",text:"Height",isCorrect:false}], xpReward:10 },
  { id:"mt2", type:"mcq", title:"What is sin(30°)?", options:[{id:"a",text:"√3/2",isCorrect:false},{id:"b",text:"1",isCorrect:false},{id:"c",text:"1/2",isCorrect:true},{id:"d",text:"0",isCorrect:false}], xpReward:10 },
  { id:"mt3", type:"mcq", title:"What is cos(60°)?", options:[{id:"a",text:"√3/2",isCorrect:false},{id:"b",text:"1",isCorrect:false},{id:"c",text:"1/2",isCorrect:true},{id:"d",text:"0",isCorrect:false}], xpReward:10 },
  { id:"mt4", type:"mcq", title:"tan(45°) = ?", options:[{id:"a",text:"0",isCorrect:false},{id:"b",text:"1",isCorrect:true},{id:"c",text:"√3",isCorrect:false},{id:"d",text:"Undefined",isCorrect:false}], xpReward:10 },
  { id:"mt5", type:"mcq", title:"Pythagoras: In a right triangle with legs 3 and 4, hypotenuse = ?", options:[{id:"a",text:"6",isCorrect:false},{id:"b",text:"7",isCorrect:false},{id:"c",text:"5",isCorrect:true},{id:"d",text:"12",isCorrect:false}], xpReward:10 },
  { id:"mt6", type:"mcq", title:"sin²θ + cos²θ = ?", options:[{id:"a",text:"0",isCorrect:false},{id:"b",text:"2",isCorrect:false},{id:"c",text:"1",isCorrect:true},{id:"d",text:"Depends on θ",isCorrect:false}], xpReward:10 },
  { id:"mt7", type:"mcq", title:"What is sin(90°)?", options:[{id:"a",text:"0",isCorrect:false},{id:"b",text:"1/2",isCorrect:false},{id:"c",text:"1",isCorrect:true},{id:"d",text:"√3/2",isCorrect:false}], xpReward:10 },
  { id:"mt8", type:"mcq", title:"The reciprocal of sin(θ) is:", options:[{id:"a",text:"cos(θ)",isCorrect:false},{id:"b",text:"tan(θ)",isCorrect:false},{id:"c",text:"cosec(θ)",isCorrect:true},{id:"d",text:"sec(θ)",isCorrect:false}], xpReward:10 },
];

export const MATH_CALCULUS_BASICS: Question[] = [
  { id:"mc1", type:"mcq", title:"The derivative of x² is:", options:[{id:"a",text:"x",isCorrect:false},{id:"b",text:"2x",isCorrect:true},{id:"c",text:"x²",isCorrect:false},{id:"d",text:"2",isCorrect:false}], xpReward:10 },
  { id:"mc2", type:"mcq", title:"The derivative of a constant (e.g., 5) is:", options:[{id:"a",text:"5",isCorrect:false},{id:"b",text:"1",isCorrect:false},{id:"c",text:"0",isCorrect:true},{id:"d",text:"Undefined",isCorrect:false}], xpReward:10 },
  { id:"mc3", type:"mcq", title:"What does a derivative represent geometrically?", options:[{id:"a",text:"Area under a curve",isCorrect:false},{id:"b",text:"Slope of the tangent line",isCorrect:true},{id:"c",text:"Volume under a surface",isCorrect:false},{id:"d",text:"Length of a curve",isCorrect:false}], xpReward:10 },
  { id:"mc4", type:"mcq", title:"∫x dx = ?", options:[{id:"a",text:"x + C",isCorrect:false},{id:"b",text:"x²/2 + C",isCorrect:true},{id:"c",text:"2x + C",isCorrect:false},{id:"d",text:"1/x + C",isCorrect:false}], xpReward:10 },
  { id:"mc5", type:"mcq", title:"The derivative of sin(x) is:", options:[{id:"a",text:"-sin(x)",isCorrect:false},{id:"b",text:"-cos(x)",isCorrect:false},{id:"c",text:"cos(x)",isCorrect:true},{id:"d",text:"tan(x)",isCorrect:false}], xpReward:10 },
  { id:"mc6", type:"mcq", title:"If f(x) = 3x³, what is f'(x)?", options:[{id:"a",text:"3x²",isCorrect:false},{id:"b",text:"9x²",isCorrect:true},{id:"c",text:"x³",isCorrect:false},{id:"d",text:"9x³",isCorrect:false}], xpReward:10 },
  { id:"mc7", type:"mcq", title:"What is a limit in calculus?", options:[{id:"a",text:"The maximum value of a function",isCorrect:false},{id:"b",text:"The value a function approaches as input approaches a given value",isCorrect:true},{id:"c",text:"The minimum value of a function",isCorrect:false},{id:"d",text:"The area under a function",isCorrect:false}], xpReward:10 },
  { id:"mc8", type:"mcq", title:"Integration is the reverse operation of:", options:[{id:"a",text:"Multiplication",isCorrect:false},{id:"b",text:"Logarithm",isCorrect:false},{id:"c",text:"Differentiation",isCorrect:true},{id:"d",text:"Exponentiation",isCorrect:false}], xpReward:10 },
];
